// src/ui/chat.tsx
import { Copy, Loader, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { BtnBgShadow } from "../components/buttons/btn-bg-shadow";
import InputPrompt from "../components/inputs/input-prompt";
import { Button } from "../components/buttons/button";
import { intelGenAIService, type ChatMessage } from "../services/intelGenAIService";

type IndicatorStyle = "square" | "square_rounded" | "circle";

interface ChatProps {
  input_style?: IndicatorStyle;
}

interface ChatEntry {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  error?: string;
  imagePath?: string;
}

const Chat = ({ input_style = "square_rounded" }: ChatProps) => {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const BtnBgShadowRadius: Record<IndicatorStyle, string> = {
    square: "0",
    square_rounded: "4",
    circle: "100",
  };

  useEffect(() => {
    // Scroll to bottom when new messages are added
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (message: Omit<ChatEntry, 'id' | 'timestamp'>): string => {
    const id = crypto.randomUUID();
    const newMessage: ChatEntry = {
      ...message,
      id,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return id;
  };

  const updateMessage = (id: string, updates: Partial<ChatEntry>) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could show a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleSendMessage = async (userMessage: string, imagePath?: string) => {
    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
      imagePath,
    });

    // Add loading assistant message
    const assistantId = addMessage({
      role: 'assistant',
      content: '',
      isLoading: true,
    });

    setIsStreaming(true);

    try {
      // Prepare messages for API
      const apiMessages: ChatMessage[] = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses.',
        },
        ...messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ];

      // For now, we'll use simple text completion
      // You can extend this to handle structured output by adding response_format
      const response = await intelGenAIService.chatCompletion({
        messages: apiMessages,
        model: 'gpt-4o',
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      });

      if (!response.body) {
        throw new Error('No response body received');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      // Update message to remove loading state
      updateMessage(assistantId, { isLoading: false });

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              
              if (delta) {
                assistantContent += delta;
                updateMessage(assistantId, { content: assistantContent });
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error);
            }
          }
        }
      }

    } catch (error) {
      console.error('Chat completion error:', error);
      updateMessage(assistantId, {
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        content: 'Sorry, I encountered an error while processing your request.',
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-screen h-[calc(100%-180px)] flex items-center justify-center">
      <div className="w-[90%] h-full flex flex-col items-center justify-center gap-2">
        {/* Chatbox */}
        <div className="bg-chatbox-bg w-full h-[600px] @max-2xl:h-[900px] border-2 rounded-sm flex flex-col font-archivo text-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Start a conversation with Intel GenAI...</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="w-full">
                  {message.role === 'user' ? (
                    // User message
                    <div className="flex justify-end">
                      <div className="max-w-[80%] flex flex-col items-end">
                        <div className="bg-chat-bg-user text-chat-text-user px-3 py-2 rounded-sm font-semibold border-2 mb-1">
                          {message.content}
                          {message.imagePath && (
                            <div className="mt-2 text-xs opacity-75">
                              📎 {message.imagePath.split('/').pop()}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Assistant message
                    <div className="flex justify-start">
                      <div className="max-w-[95%] flex flex-col">
                        <div className="bg-chat-bg-ai text-chat-text-ai px-3 py-3 rounded-sm font-bold border mb-2">
                          {message.isLoading ? (
                            <div className="flex items-center gap-2">
                              <Loader className="w-4 h-4 animate-spin" />
                              <span>Thinking...</span>
                            </div>
                          ) : message.error ? (
                            <div className="flex items-center gap-2 text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span>{message.content}</span>
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap">
                              {message.content}
                            </div>
                          )}
                        </div>
                        
                        {!message.isLoading && !message.error && message.content && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(message.timestamp)}
                            </span>
                            <Button
                              className="h-[28px]"
                              placeholder="Copy"
                              btn_color="green"
                              icon_comp={<Copy className="size-3.5" />}
                              isBtnShadow={false}
                              onClick={() => copyToClipboard(message.content)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Prompt Input */}
        <div className="relative w-full min-h-[100px] max-h-96 flex">
          <BtnBgShadow borderRadius={BtnBgShadowRadius[input_style]} />
          <InputPrompt 
            placeholder="Ask Intel GenAI anything..." 
            onSend={handleSendMessage}
          />
        </div>

        {/* Status indicator */}
        {isStreaming && (
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            <span>AI is responding...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;