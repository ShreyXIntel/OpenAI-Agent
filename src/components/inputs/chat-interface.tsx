import { Send, Plus } from "lucide-react";

import { useState } from "react";
import { Button } from "../buttons/button";
import InputPrompt from "./input-pompt";

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log("Sending:", inputValue);
      setInputValue(""); // Clear input after sending
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Chat Messages Area - grows to fill available space */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {/* Your chat messages will go here */}
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            Sample message content...
          </div>
          <div className="bg-blue-500 text-white p-3 rounded-lg shadow-sm ml-auto max-w-xs">
            User message...
          </div>
        </div>
      </div>

      {/* Input Area - Fixed at bottom, expands upward */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-2">
            {/* Add attachment button */}
            <div className="flex-shrink-0 mb-2">
              <Button
                btn_style="no_background"
                btn_color="purple"
                placeholder=""
                icon_comp={<Plus className="w-5 h-5" />}
                className="!w-auto !px-2"
              />
            </div>

            {/* Expandable input area */}
            <div className="flex-1">
              <InputPrompt
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                input_style="square_rounded"
                minHeight={60}
                maxHeight={200}
                className="text-sm"
              />
            </div>

            {/* Send button - positioned at bottom right of input */}
            <div className="absolute bottom-2 right-2 z-30">
              <Button
                btn_style="square_rounded"
                btn_color="purple"
                placeholder=""
                icon_comp={<Send className="w-4 h-4" />}
                onClick={handleSend}
                className="!w-auto !px-3 !py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;