// src/components/inputs/input-prompt.tsx
import { ChevronDown, Forward, Paperclip, Zap } from "lucide-react";
import { Button } from "../buttons/button";
import { useState, useEffect } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { intelGenAIService } from "../../services/intelGenAIService";

interface InputPromptProp {
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string | undefined;
  className?: string;
  input_style?: "square" | "square_rounded" | "circle";
  minHeight?: number;
  maxHeight?: number;
  onSend?: (message: string, imagePath?: string) => void;
}

const InputPrompt = ({
  className,
  input_style = "square_rounded",
  placeholder = "Say Hi 👋...",
  minHeight = 60,
  maxHeight = 200,
  onSend,
}: InputPromptProp) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [tokenEstimate, setTokenEstimate] = useState(0);
  const [modelInfo, setModelInfo] = useState<any>(null);

  const borderRadiusStyles = {
    square: "rounded-none",
    square_rounded: "rounded-[4px]",
    circle: "rounded-full",
  };

  useEffect(() => {
    // Get model info for token limits
    const fetchModelInfo = async () => {
      try {
        const models = await intelGenAIService.getModelInfo();
        const gpt4oModel = models.find(m => m.modelName === 'gpt-4o') || models[0];
        setModelInfo(gpt4oModel);
      } catch (error) {
        console.error('Failed to fetch model info:', error);
      }
    };

    if (intelGenAIService.isConfigured()) {
      fetchModelInfo();
    }
  }, []);

  useEffect(() => {
    // Estimate tokens whenever message changes
    const estimated = intelGenAIService.estimateTokens(message);
    setTokenEstimate(estimated);
  }, [message]);

  const handleAttachFile = async () => {
    try {
      const file = await open({
        multiple: false,
        directory: false,
        filters: [
          {
            name: "Images",
            extensions: ["png", "jpg", "jpeg", "gif", "bmp", "webp"]
          }
        ]
      });
      
      if (file) {
        setSelectedFile(file as string);
        console.log("File selected:", file);
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message, selectedFile || undefined);
      setMessage("");
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const getTokenColor = () => {
    if (!modelInfo) return "text-gray-500";
    
    const maxTokens = modelInfo.maxInferenceTokens;
    const percentage = (tokenEstimate / maxTokens) * 100;
    
    if (percentage < 50) return "text-green-500";
    if (percentage < 80) return "text-yellow-500";
    return "text-red-500";
  };

  const formatTokens = (tokens: number) => {
    if (tokens < 1000) return tokens.toString();
    return `${(tokens / 1000).toFixed(1)}k`;
  };

  return (
    <div className="relative w-full max-h-[300px] border-[3px] bg-white">
      {/* Token estimation display */}
      <div className="absolute top-2 right-2 z-30 flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
        <Zap className="size-3" />
        <span className={getTokenColor()}>
          {formatTokens(tokenEstimate)}
          {modelInfo && (
            <span className="text-gray-400 ml-1">
              / {formatTokens(modelInfo.maxInferenceTokens)}
            </span>
          )}
        </span>
      </div>

      {/* File attachment preview */}
      {selectedFile && (
        <div className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-blue-100 px-2 py-1 rounded text-xs">
          <span className="text-blue-700">📎 {selectedFile.split('/').pop()}</span>
          <button 
            onClick={clearFile}
            className="text-red-500 hover:text-red-700 ml-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="relative w-full h-[calc(100%-55px)]">
        <div
          className={`${className} ${borderRadiusStyles[input_style]} overflow-x-hidden overflow-y-hidden whitespace-pre-wrap break-words max-h-[100%] min-h-[44px] invisible leading-[24px] resize-none z-20 w-full h-auto break-keep bg-white px-4 py-2 outline-none font-bold hover:-translate-x-[1px] hover:-translate-y-[1px] focus:translate-x-[1.5px] focus:translate-y-[1.5px]`}
          style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
        >
          <span className="py-4">{message}</span>
        </div>
        
        <textarea
          className="absolute right-0 top-0 bottom-0 left-0 py-2 px-4 pr-16 pt-8 resize-none outline-none leading-[24px] font-main font-bold"
          value={message}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyPress}
          style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
        />
      </div>

      {/* Chat buttons */}
      <div className="absolute z-20 bottom-4 w-full flex items-center justify-between">
        {/* Add document or image */}
        <div className="pl-4">
          <Button
            onClick={handleAttachFile}
            className=""
            placeholder=""
            icon_comp={<Paperclip className="size-[20px]" />}
            btn_color="blue"
          />
        </div>
        
        <div className="flex items-center justify-center gap-3 pr-4">
          {/* Model selector */}
          <Button
            className="flex items-center justify-center"
            placeholder={modelInfo?.modelName || "GPT-4o"}
            icon_comp={<ChevronDown className="w-3.5" />}
            btn_style="no_background"
            btn_color="green"
            orientation="TextImage"
          />

          {/* Send button */}
          <Button
            className=""
            placeholder="Send"
            icon_comp={<Forward />}
            orientation="TextImage"
            onClick={handleSend}
            disabled={!message.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default InputPrompt;