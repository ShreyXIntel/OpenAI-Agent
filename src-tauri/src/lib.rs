// src-tauri/src/lib.rs
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize)]
struct HttpResponse {
    status: u16,
    status_text: String,
    headers: HashMap<String, String>,
    body: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct HttpOptions {
    method: String,
    headers: HashMap<String, String>,
    body: Option<String>,
}

#[tauri::command]
async fn set_env_var(key: String, value: String) -> Result<(), String> {
    std::env::set_var(&key, &value);
    println!("Set environment variable: {}={}", key, value);
    Ok(())
}

#[tauri::command]
async fn get_env_var(key: String) -> Result<Option<String>, String> {
    Ok(std::env::var(&key).ok())
}

#[tauri::command]
async fn http_request(url: String, options: HttpOptions) -> Result<HttpResponse, String> {
    let client = reqwest::Client::builder()
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let mut request_builder = match options.method.to_uppercase().as_str() {
        "GET" => client.get(&url),
        "POST" => client.post(&url),
        "PUT" => client.put(&url),
        "DELETE" => client.delete(&url),
        "HEAD" => client.head(&url),
        _ => return Err(format!("Unsupported HTTP method: {}", options.method)),
    };

    // Add headers
    for (key, value) in options.headers {
        request_builder = request_builder.header(&key, &value);
    }

    // Add body if present
    if let Some(body) = options.body {
        request_builder = request_builder.body(body);
    }

    // Execute request
    let response = request_builder
        .send()
        .await
        .map_err(|e| format!("HTTP request failed: {}", e))?;

    let status = response.status().as_u16();
    let status_text = response.status().canonical_reason().unwrap_or("Unknown").to_string();
    
    let mut headers = HashMap::new();
    for (key, value) in response.headers() {
        headers.insert(
            key.to_string(),
            value.to_str().unwrap_or("").to_string(),
        );
    }

    let body = response
        .text()
        .await
        .map_err(|e| format!("Failed to read response body: {}", e))?;

    Ok(HttpResponse {
        status,
        status_text,
        headers,
        body,
    })
}

#[tauri::command]
async fn test_network_connection(url: String) -> Result<bool, String> {
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(5))
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    match client.head(&url).send().await {
        Ok(response) => Ok(response.status().is_success() || response.status().is_client_error()),
        Err(_) => Ok(false),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            set_env_var,
            get_env_var,
            http_request,
            test_network_connection
        ])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}