import { ChevronDown, Forward, Paperclip } from "lucide-react";
import { Button } from "../buttons/button";
import { useState } from "react";

interface InputPromptProp {
  value?: string | number | readonly string[] | undefined;
  placeholder?: string | undefined;
  className?: string;
  input_style?: "square" | "square_rounded" | "circle";
  //   input_color?: 'green' | 'yellow' | 'blue' | 'purple' | 'red';
}

const InputPompt = ({
  className,
  input_style = "square_rounded",
}: InputPromptProp) => {
  const [message, setMessage] = useState("");

  const borderRadiusStyles = {
    square: "rounded-none",
    square_rounded: "rounded-[4px]",
    circle: "rounded-full",
  };

  return (
    <div className="relative w-full max-h-[300px] border-[3px] bg-white">
      {/* Input area */}
      <div className="relative w-full h-[calc(100%-55px)] ">
        <div
          className={`${className} ${borderRadiusStyles[input_style]} overflow-x-hidden overflow-y-hidden whitespace-pre-wrap break-words max-h-[100%] min-h-[44px] invisible leading-[24px] resize-none z-20 w-full h-auto break-keep bg-white px-4 py-2 outline-none font-bold hover:-translate-x-[1px] hover:-translate-y-[1px] focus:translate-x-[1.5px] focus:translate-y-[1.5px]`}
        >
          <span className="py-4">{message}</span>
          {/* dummy text*/}
        </div>
        {/* this div element is a dummy message element */}
        <textarea
          className="absolute right-0 top-0 bottom-0 left-0 py-2 px-4 resize-none outline-none leading-[24px] font-main font-bold"
          value={message}
          placeholder="Say Hi 👋..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
        />
      </div>

      {/* Chat buttons */}
      <div className="absolute z-20 bottom-4 w-full flex items-center justify-between ">
        {/* Add document or image  */}
        <div className="pl-4">
          <Button className="" placeholder="" icon_comp={<Paperclip className="size-[20px]"/>}></Button>
        </div>
        <div className="flex items-center justify-center gap-3 pr-4">
          {/* Send button */}
          <Button
            className="flex items-center justify-center"
            placeholder="GPT 40"
            icon_comp={<ChevronDown className=" w-3.5" />}
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
          />
        </div>
      </div>
    </div>
  );
};

export default InputPompt;

// backup
// {
//   <div className="relative w-full h-full bg-white border-[3px] border-gray-900 flex">
//           <textarea
//             value={value}
//             placeholder={placeholder}
//             contentEditable="true"
//             className={`${className} ${borderRadiusStyles[input_style]} border resize-none z-20 w-full h-auto max-h-[calc(100%-55px)] overflow-y-auto overflow-x-hidden break-keep  bg-white px-4 py-2 outline-none font-bold hover:-translate-x-[1px] hover:-translate-y-[1px] focus:translate-x-[1.5px] focus:translate-y-[1.5px]`}
//           />
//         </div>
// }
