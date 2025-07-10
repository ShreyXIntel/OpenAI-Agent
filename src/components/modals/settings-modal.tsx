// src/components/modals/settings-modal.tsx
import { useState, useEffect } from "react";
import { X, Eye, EyeOff, RefreshCw, Check, AlertCircle, Wifi, WifiOff } from "lucide-react";
import { Button } from "../buttons/button";
import { intelGenAIService } from "../../services/intelGenAIService";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [httpProxy, setHttpProxy] = useState("");
  const [httpsProxy, setHttpsProxy] = useState("");
  const [noProxy, setNoProxy] = useState("");
  const [scope, setScope] = useState("");
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [connectionMessage, setConnectionMessage] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      // Load current settings from environment variables
      setClientId(import.meta.env.VITE_CLIENT_ID || "");
      setClientSecret(import.meta.env.VITE_CLIENT_SECRET || "");
      setBaseUrl(import.meta.env.VITE_GENAI_BASE_URL || "https://apis-internal.intel.com/generativeaiinference/v1");
      setTokenUrl(import.meta.env.VITE_AUTH_TOKEN_URL || "https://apis-internal.intel.com/v1/auth/token");
      setHttpProxy(import.meta.env.VITE_HTTP_PROXY || "");
      setHttpsProxy(import.meta.env.VITE_HTTPS_PROXY || "");
      setNoProxy(import.meta.env.VITE_NO_PROXY || "intel.com");
      setScope(import.meta.env.VITE_DEFAULT_SCOPE || "read:org");
      
      updateTokenInfo();
    }
  }, [isOpen]);

  const updateTokenInfo = () => {
    const info = intelGenAIService.getTokenInfo();
    setTokenInfo(info);
  };

  const handleSave = () => {
    // Update the service configuration
    intelGenAIService.updateConfig({
      clientId,
      clientSecret,
      baseUrl,
      tokenUrl,
      httpProxy,
      httpsProxy,
      noProxy,
    });

    // Note: In a real app, you'd want to securely store these credentials
    // For now, we're just updating the service instance
    console.log("Settings saved with proxy configuration");
    onClose();
  };

  const handleRefreshToken = async () => {
    setIsRefreshing(true);
    setRefreshStatus('idle');
    
    try {
      // Update config first
      intelGenAIService.updateConfig({
        clientId,
        clientSecret,
        baseUrl,
        tokenUrl,
        httpProxy,
        httpsProxy,
        noProxy,
      });

      await intelGenAIService.refreshToken();
      setRefreshStatus('success');
      updateTokenInfo();
      
      setTimeout(() => setRefreshStatus('idle'), 3000);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      setRefreshStatus('error');
      setTimeout(() => setRefreshStatus('idle'), 5000);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAutoRefreshToggle = () => {
    setAutoRefresh(!autoRefresh);
    if (!autoRefresh) {
      intelGenAIService.enableAutoRefresh();
    } else {
      intelGenAIService.disableAutoRefresh();
    }
  };

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    setConnectionMessage('');
    
    try {
      // Update config first
      intelGenAIService.updateConfig({
        clientId,
        clientSecret,
        baseUrl,
        tokenUrl,
        httpProxy,
        httpsProxy,
        noProxy,
      });

      const result = await intelGenAIService.testConnection();
      setConnectionStatus(result.success ? 'success' : 'error');
      setConnectionMessage(result.message);
      
      setTimeout(() => {
        setConnectionStatus('idle');
        setConnectionMessage('');
      }, 5000);
    } catch (error) {
      setConnectionStatus('error');
      setConnectionMessage(error instanceof Error ? error.message : 'Connection test failed');
      
      setTimeout(() => {
        setConnectionStatus('idle');
        setConnectionMessage('');
      }, 5000);
    }
  };

  const formatTokenExpiry = () => {
    if (!tokenInfo?.isValid) return 'Token expired or not available';
    
    const expiryDate = tokenInfo.expiresAt.toLocaleString();
    const minutes = Math.floor(tokenInfo.timeUntilExpiry / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `Valid for ${hours}h ${minutes % 60}m (expires: ${expiryDate})`;
    } else {
      return `Valid for ${minutes}m (expires: ${expiryDate})`;
    }
  };

  const getRefreshButtonIcon = () => {
    if (isRefreshing) return <RefreshCw className="w-4 h-4 animate-spin" />;
    if (refreshStatus === 'success') return <Check className="w-4 h-4" />;
    if (refreshStatus === 'error') return <AlertCircle className="w-4 h-4" />;
    return <RefreshCw className="w-4 h-4" />;
  };

  const getRefreshButtonColor = () => {
    if (refreshStatus === 'success') return 'green';
    if (refreshStatus === 'error') return 'red';
    return 'blue';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Intel GenAI Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Token Status */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Token Status</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Current Token:</span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={handleAutoRefreshToggle}
                      className="rounded"
                    />
                    Auto-refresh
                  </label>
                  <Button
                    placeholder={isRefreshing ? "Refreshing..." : "Refresh Now"}
                    icon_comp={getRefreshButtonIcon()}
                    onClick={handleRefreshToken}
                    disabled={isRefreshing}
                    btn_color={getRefreshButtonColor()}
                  />
                </div>
              </div>
              <p className={`text-sm ${tokenInfo?.isValid ? 'text-green-600' : 'text-red-600'}`}>
                {formatTokenExpiry()}
              </p>
              {refreshStatus === 'error' && (
                <p className="text-red-600 text-sm mt-2">
                  Failed to refresh token. Please check your credentials and network connection.
                </p>
              )}
              {refreshStatus === 'success' && (
                <p className="text-green-600 text-sm mt-2">
                  Token refreshed successfully!
                </p>
              )}
            </div>
          </div>

          {/* API Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">API Configuration</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Base URL
                </label>
                <input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://apis-internal.intel.com/generativeaiinference/v4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Token URL
                </label>
                <input
                  type="url"
                  value={tokenUrl}
                  onChange={(e) => setTokenUrl(e.target.value)}
                  placeholder="https://apis-internal.intel.com/v1/auth/token"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">OAuth Credentials</h3>
            <p className="text-sm text-gray-600">
              Get these credentials from APIGEE via your Intel IT administrator.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Client ID
                </label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Your Client ID from APIGEE"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Client Secret
                </label>
                <div className="relative">
                  <input
                    type={showClientSecret ? "text" : "password"}
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    placeholder="Your Secret from APIGEE"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowClientSecret(!showClientSecret)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showClientSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Scope
                </label>
                <input
                  type="text"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  placeholder="read:org"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Proxy Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Proxy Configuration</h3>
            <p className="text-sm text-gray-600">
              Required for Intel internal network access. Contact IT for proxy details.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  HTTP Proxy
                </label>
                <input
                  type="text"
                  value={httpProxy}
                  onChange={(e) => setHttpProxy(e.target.value)}
                  placeholder="http://proxy.intel.com:8080"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  HTTPS Proxy
                </label>
                <input
                  type="text"
                  value={httpsProxy}
                  onChange={(e) => setHttpsProxy(e.target.value)}
                  placeholder="http://proxy.intel.com:8080"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  No Proxy
                </label>
                <input
                  type="text"
                  value={noProxy}
                  onChange={(e) => setNoProxy(e.target.value)}
                  placeholder="intel.com,localhost,127.0.0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Comma-separated list of domains that should bypass the proxy
                </p>
              </div>
            </div>

            {/* Connection Test */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Network Connection Test</span>
                <Button
                  placeholder={connectionStatus === 'testing' ? "Testing..." : "Test Connection"}
                  icon_comp={
                    connectionStatus === 'testing' ? <RefreshCw className="w-4 h-4 animate-spin" /> :
                    connectionStatus === 'success' ? <Wifi className="w-4 h-4" /> :
                    connectionStatus === 'error' ? <WifiOff className="w-4 h-4" /> :
                    <Wifi className="w-4 h-4" />
                  }
                  onClick={handleTestConnection}
                  disabled={connectionStatus === 'testing'}
                  btn_color={
                    connectionStatus === 'success' ? 'green' :
                    connectionStatus === 'error' ? 'red' : 'blue'
                  }
                />
              </div>
              {connectionMessage && (
                <p className={`text-sm ${connectionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {connectionMessage}
                </p>
              )}
            </div>
          </div>

          {/* Current Token Display */}
          {tokenInfo?.accessToken && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Current Access Token</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs font-mono break-all text-gray-600">
                  {tokenInfo.accessToken.substring(0, 50)}...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button
            placeholder="Cancel"
            onClick={onClose}
            btn_color="blue"
          />
          <Button
            placeholder="Save Settings"
            onClick={handleSave}
            btn_color="blue"
          />
        </div>
      </div>
    </div>
  );
};