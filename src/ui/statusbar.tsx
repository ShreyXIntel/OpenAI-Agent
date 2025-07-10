// src/ui/statusbar.tsx
import { Workflow, Cpu, Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { intelGenAIService, type ModelInfo } from "../services/intelGenAIService";

const Statusbar = () => {
  const year = new Date().getFullYear();
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'loading'>('loading');
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        setConnectionStatus('loading');
        const models = await intelGenAIService.getModelInfo();
        // Get the first model (or find gpt-4o specifically)
        const gpt4oModel = models.find(m => m.modelName === 'gpt-4o') || models[0];
        setModelInfo(gpt4oModel);
        setConnectionStatus('connected');
      } catch (error) {
        console.error('Failed to fetch model info:', error);
        setConnectionStatus('disconnected');
      }
    };

    const updateTokenInfo = () => {
      const info = intelGenAIService.getTokenInfo();
      setTokenInfo(info);
    };

    // Initial fetch
    if (intelGenAIService.isConfigured()) {
      fetchModelInfo();
    } else {
      setConnectionStatus('disconnected');
    }

    updateTokenInfo();

    // Update token info every minute
    const tokenInterval = setInterval(updateTokenInfo, 60000);

    return () => {
      clearInterval(tokenInterval);
    };
  }, []);

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Workflow className="text-green-500 size-4" />;
      case 'loading':
        return <Workflow className="text-yellow-500 size-4 animate-pulse" />;
      default:
        return <Workflow className="text-red-500 size-4" />;
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'connected':
        return modelInfo ? `Connected to ${modelInfo.modelName}` : 'Connected to Intel GenAI';
      case 'loading':
        return 'Connecting...';
      default:
        return 'Disconnected';
    }
  };

  const formatTokenExpiry = () => {
    if (!tokenInfo?.isValid) return 'Token expired';
    
    const minutes = Math.floor(tokenInfo.timeUntilExpiry / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `Token: ${hours}h ${minutes % 60}m`;
    } else {
      return `Token: ${minutes}m`;
    }
  };

  return (
    <footer className="bottom-0 w-screen h-[30px] bg-statusbar text-gray-300 flex text-[12px] items-center justify-between px-4">
      {/* Connection Status */}
      <div className="flex h-full gap-1 items-center">
        {getConnectionIcon()}
        <span className="text-gray-300">{getConnectionText()}</span>
      </div>

      {/* Model Information */}
      {modelInfo && connectionStatus === 'connected' && (
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1">
            <Cpu className="size-3" />
            <span>Model: {modelInfo.modelName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="size-3" />
            <span>Max Input: {modelInfo.maxInferenceTokens.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>Max Output: {modelInfo.maxCompletionTokens.toLocaleString()}</span>
          </div>
          {tokenInfo && (
            <div className="flex items-center gap-1">
              <span className={tokenInfo.isValid ? 'text-green-400' : 'text-red-400'}>
                {formatTokenExpiry()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Author */}
      <div>
        <span>
          Written and Designed By: <span className="">Shrey</span>
        </span>
      </div>

      <div>
        <span>© Copyright @ {year}</span>
      </div>
    </footer>
  );
};

export default Statusbar;