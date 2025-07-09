import { BtnBgShadow } from "../components/buttons/btn-bg-shadow";
import InputPompt from "../components/inputs/input-pompt";

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
        <div className="bg-white w-full h-[600px] @max-2xl:h-[900px] border-2 rounded-sm flex items-center justify-center">
          <span className="font-bold text-gray-400 ">
            This is chatbox. Under Development...✨
          </span>
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
