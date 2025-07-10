// src/services/tauriProxyService.ts
export interface ProxyConfig {
  httpProxy?: string;
  httpsProxy?: string;
  noProxy?: string;
}

import * as app from '@tauri-apps/api';

declare global {
  interface Window {
    __TAURI__: typeof app;
  }
}


class TauriProxyService {
  private config: ProxyConfig = {};

  setProxyConfig(config: ProxyConfig) {
    this.config = config;
    this.applyProxyToEnvironment();
  }

  private applyProxyToEnvironment() {
    // In Tauri, we can set environment variables that will affect the fetch behavior
    if (typeof window !== 'undefined' && window.__TAURI__) {
      // Use Tauri's command system to set environment variables
      this.setTauriEnvVariables();
    } else {
      // Fallback for browser environment or development
      console.log('Proxy configuration set:', this.config);
    }
  }

  private async setTauriEnvVariables() {
    try {
      // Import Tauri invoke function
      const { invoke } = await import('@tauri-apps/api/core');
      
      // Set environment variables via Tauri backend
      if (this.config.httpProxy) {
        await invoke('set_env_var', { key: 'HTTP_PROXY', value: this.config.httpProxy });
      }
      if (this.config.httpsProxy) {
        await invoke('set_env_var', { key: 'HTTPS_PROXY', value: this.config.httpsProxy });
      }
      if (this.config.noProxy) {
        await invoke('set_env_var', { key: 'NO_PROXY', value: this.config.noProxy });
      }
      
      console.log('Tauri proxy environment variables set successfully');
    } catch (error) {
      console.error('Failed to set Tauri environment variables:', error);
      // Fallback: Try setting on process.env if available (Node.js context)
      this.setProcessEnv();
    }
  }

  private setProcessEnv() {
    if (typeof process !== 'undefined' && process.env) {
      if (this.config.httpProxy) {
        process.env.HTTP_PROXY = this.config.httpProxy;
      }
      if (this.config.httpsProxy) {
        process.env.HTTPS_PROXY = this.config.httpsProxy;
      }
      if (this.config.noProxy) {
        process.env.NO_PROXY = this.config.noProxy;
      }
      console.log('Process environment variables set for proxy');
    }
  }

  // Create a custom fetch function that handles proxy properly
  createProxyFetch(): typeof fetch {
    return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      try {
        // First, try to use Tauri's fetch if available
        if (typeof window !== 'undefined' && window.__TAURI__) {
          return await this.tauriFetch(input, init);
        }
        
        // Fallback to regular fetch
        return await fetch(input, init);
      } catch (error) {
        // If there's a network error, it might be due to proxy issues
        if (error instanceof TypeError && error.message.includes('ERR_NAME_NOT_RESOLVED')) {
          throw new Error(`Network error: ${error.message}. Please check your proxy configuration and ensure you're connected to the Intel network.`);
        }
        throw error;
      }
    };
  }

  private async tauriFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    try {
      // Use Tauri's HTTP client which respects environment variables
      const { invoke } = await import('@tauri-apps/api/core');
      
      const url = typeof input === 'string' ? input : input.toString();
      const options = {
        method: init?.method || 'GET',
        headers: init?.headers || {},
        body: init?.body || undefined,
      };

      const response:Response = await invoke('http_request', { url, options });
      
      // Convert Tauri response to Fetch API Response
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    } catch (error) {
      console.error('Tauri fetch failed, falling back to regular fetch:', error);
      return fetch(input, init);
    }
  }

  // Test proxy connection
  async testProxyConnection(): Promise<boolean> {
    try {
      const proxyFetch = this.createProxyFetch();
      const response = await proxyFetch('https://apis-internal.intel.com/v1/auth/token', {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      return response.status < 500; // Accept any non-server error status
    } catch (error) {
      console.error('Proxy connection test failed:', error);
      return false;
    }
  }

  getProxyStatus(): string {
    const proxies = [];
    if (this.config.httpProxy) proxies.push('HTTP');
    if (this.config.httpsProxy) proxies.push('HTTPS');
    
    if (proxies.length === 0) return 'No proxy configured';
    return `Proxy: ${proxies.join(', ')}`;
  }

  isConfigured(): boolean {
    return !!(this.config.httpProxy || this.config.httpsProxy);
  }
}

export const tauriProxyService = new TauriProxyService();