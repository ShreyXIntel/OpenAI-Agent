import { Copy } from "lucide-react";
import { BtnBgShadow } from "../components/buttons/btn-bg-shadow";
import InputPompt from "../components/inputs/input-pompt";
import { Button } from "../components/buttons/button";

type IndicatorStyle = "square" | "square_rounded" | "circle";

interface ChatProps {
  input_style?: IndicatorStyle;
}

const Chat = ({ input_style = "square_rounded" }: ChatProps) => {
  const BtnBgShadowRadius: Record<IndicatorStyle, string> = {
    square: "0",
    square_rounded: "4",
    circle: "100",
  };
  return (
    <div className="w-screen h-[calc(100%-180px)] flex items-center justify-center">
      <div className="w-[90%] h-full flex flex-col items-center justify-center gap-2">
        {/* Chatbox */}
        <div className="bg-white w-full h-[600px] @max-2xl:h-[900px] border-2 rounded-sm flex flex-col font-archivo text-sm">
          {/* User chat  */}
          <div className="w-full min-h-[30px] p-2">
            <div className="w-full min-h-[40px] flex items-center justify-start">
              <span className="bg-chat-bg-user text-chat-text-user px-2 py-1.5 rounded-sm font-semibold border-2">
                Hi, how are you doing today
              </span>
            </div>
          </div>

          {/* AI chat  */}
          <div className="w-full min-h-[30px] p-2 flex flex-col">
            <div className="relative max-w-[95%] min-h-[40px] text-start flex flex-col items-center">
              <p className="bg-chat-bg-ai text-chat-text-ai px-2 py-4 pb-6 rounded-sm font-bold">
                Hi, I'm good how are you? How can I help you today? Hi, I'm good
                how are you? How can I help you today? Hi, I'm good how are you?
                How can I help you today?
              </p>
              <div className="w-full flex items-center justify-end px-4">
                <Button
                  className="h-[28px]"
                  placeholder="Copy"
                  btn_color="green"
                  icon_comp={<Copy className="size-3.5" />}
                  isBtnShadow={false}
                />
              </div>
            </div>
          </div>

          {/* User chat  */}
          <div className="w-full min-h-[30px] p-2">
            <div className="w-full min-h-[40px] flex items-center">
              <span className="bg-chat-bg-user text-chat-text-user px-2 py-1.5 rounded-sm font-semibold">
                Hi, how are you doing today
              </span>
            </div>
          </div>
        </div>

        {/* Prompt Input + Image preview */}
        <div className="relative w-full min-h-[100px] max-h-96 flex">
          <BtnBgShadow borderRadius={BtnBgShadowRadius[input_style]} />
          <InputPompt placeholder="Say hi 👋..." />
        </div>
      </div>
    </div>
  );
};

export default Chat;
