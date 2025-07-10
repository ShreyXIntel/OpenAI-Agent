import { tauriProxyService } from "./tauriProxyService";

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: string;
  ext_expires_in: string;
}

export interface ModelInfo {
  modelName: string;
  maxInferenceTokens: number;
  maxCompletionTokens: number;
  version: string;
  modelReference: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  correlationId?: string;
  messages: ChatMessage[];
  model: string;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  stream?: boolean;
  response_format?: {
    type: 'json_schema';
    json_schema: {
      name: string;
      schema: any;
      strict: boolean;
    };
  };
}

export interface ApiConfig {
  baseUrl: string;
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
  httpProxy?: string;
  httpsProxy?: string;
  noProxy?: string;
}

class IntelGenAIService {
  private config: ApiConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.config = {
      baseUrl: import.meta.env.VITE_GENAI_BASE_URL || 'https://apis-internal.intel.com/generativeaiinference/v1',
      tokenUrl: import.meta.env.VITE_AUTH_TOKEN_URL || 'https://apis-internal.intel.com/v1/auth/token',
      clientId: import.meta.env.VITE_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
      httpProxy: import.meta.env.VITE_HTTP_PROXY || '',
      httpsProxy: import.meta.env.VITE_HTTPS_PROXY || '',
      noProxy: import.meta.env.VITE_NO_PROXY || '',
    };
    
    this.loadTokenFromStorage();
    this.setupProxyEnvironment();
  }

  private loadTokenFromStorage() {
    try {
      const tokenData = localStorage.getItem('intel_genai_token');
      if (tokenData) {
        const parsed = JSON.parse(tokenData);
        this.accessToken = parsed.access_token;
        this.tokenExpiry = parsed.expiry_timestamp;
        
        // Check if token is still valid
        if (this.tokenExpiry && Date.now() < this.tokenExpiry) {
          this.setupAutoRefresh();
        } else {
          this.clearToken();
        }
      }
    } catch (error) {
      console.error('Error loading token from storage:', error);
      this.clearToken();
    }
  }

  private saveTokenToStorage(tokenResponse: TokenResponse) {
    const expiryTimestamp = Date.now() + (parseInt(tokenResponse.expires_in) * 1000);
    const tokenData = {
      access_token: tokenResponse.access_token,
      token_type: tokenResponse.token_type,
      expires_in: tokenResponse.expires_in,
      expiry_timestamp: expiryTimestamp,
    };
    
    localStorage.setItem('intel_genai_token', JSON.stringify(tokenData));
    this.accessToken = tokenResponse.access_token;
    this.tokenExpiry = expiryTimestamp;
  }

  private clearToken() {
    localStorage.removeItem('intel_genai_token');
    this.accessToken = null;
    this.tokenExpiry = null;
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private setupAutoRefresh() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (this.tokenExpiry) {
      // Refresh 5 minutes before expiry
      const refreshTime = this.tokenExpiry - Date.now() - (5 * 60 * 1000);
      if (refreshTime > 0) {
        this.refreshTimer = setTimeout(() => {
          this.refreshToken().catch(console.error);
        }, refreshTime);
      }
    }
  }

  private setupProxyEnvironment() {
    // Configure proxy using Tauri proxy service
    tauriProxyService.setProxyConfig({
      httpProxy: this.config.httpProxy,
      httpsProxy: this.config.httpsProxy,
      noProxy: this.config.noProxy,
    });
  }

  private createProxyFetch(): typeof fetch {
    // Use Tauri proxy service for enhanced proxy support
    return tauriProxyService.createProxyFetch();
  }

  async getToken(): Promise<TokenResponse> {
    if (!this.config.clientId || !this.config.clientSecret) {
      throw new Error('Client ID and Client Secret must be configured');
    }

    // Use Basic Auth as shown in Postman
    const credentials = btoa(`${this.config.clientId}:${this.config.clientSecret}`);
    
    const customFetch = this.createProxyFetch();
    
    const response = await customFetch(this.config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'read:org', // Default scope, can be made configurable
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const tokenResponse: TokenResponse = await response.json();
    this.saveTokenToStorage(tokenResponse);
    this.setupAutoRefresh();
    
    return tokenResponse;
  }

  async refreshToken(): Promise<TokenResponse> {
    console.log('Refreshing token...');
    return this.getToken();
  }

  async getModelInfo(): Promise<ModelInfo[]> {
    await this.ensureValidToken();

    const customFetch = this.createProxyFetch();
    const response = await customFetch(`${this.config.baseUrl}/info`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Model info request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async chatCompletion(request: ChatCompletionRequest): Promise<Response> {
    await this.ensureValidToken();

    const customFetch = this.createProxyFetch();
    const response = await customFetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correlationId: request.correlationId || crypto.randomUUID(),
        ...request,
      }),
    });

    if (!response.ok) {
      throw new Error(`Chat completion request failed: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  private async ensureValidToken() {
    if (!this.accessToken || !this.tokenExpiry || Date.now() >= this.tokenExpiry) {
      await this.getToken();
    }
  }

  getTokenInfo() {
    if (!this.accessToken || !this.tokenExpiry) {
      return null;
    }

    const now = Date.now();
    const timeUntilExpiry = this.tokenExpiry - now;
    const isValid = timeUntilExpiry > 0;
    
    return {
      isValid,
      timeUntilExpiry,
      expiresAt: new Date(this.tokenExpiry),
      accessToken: this.accessToken,
    };
  }

  updateConfig(newConfig: Partial<ApiConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.setupProxyEnvironment();
  }

  isConfigured(): boolean {
    return !!(this.config.clientId && this.config.clientSecret);
  }

  // Utility method to estimate token usage (rough approximation)
  estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token for English text
    return Math.ceil(text.length / 4);
  }

  enableAutoRefresh() {
    this.setupAutoRefresh();
  }

  disableAutoRefresh() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // Test basic connectivity to Intel APIs
      const proxyConnected = await tauriProxyService.testProxyConnection();
      if (!proxyConnected) {
        return {
          success: false,
          message: 'Cannot connect to Intel APIs. Please check your proxy configuration and network connection.',
        };
      }

      // Test authentication endpoint
      const customFetch = this.createProxyFetch();
      const response = await customFetch(this.config.tokenUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (response.ok || response.status === 401) {
        // 401 is expected without credentials, but means the endpoint is reachable
        return {
          success: true,
          message: 'Successfully connected to Intel GenAI APIs.',
        };
      } else {
        return {
          success: false,
          message: `API endpoint returned status ${response.status}. Please check your configuration.`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  getProxyStatus(): string {
    return tauriProxyService.getProxyStatus();
  }
}

export const intelGenAIService = new IntelGenAIService();