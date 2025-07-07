import { BtnBgShadow } from "../buttons/btn-bg-shadow";

interface InputPromptProp {
  value?: string | number | readonly string[] | undefined;
  placeholder?: string | undefined;
  className?: string;
  input_style?: "square" | "square_rounded" | "circle";
  //   input_color?: 'green' | 'yellow' | 'blue' | 'purple' | 'red';
}

const InputPompt = ({
  value,
  placeholder,
  className,
  input_style = "square_rounded",
}: InputPromptProp) => {
  const borderRadiusStyles = {
    square: "rounded-none",
    square_rounded: "rounded-[4px]",
    circle: "rounded-full",
  };

  // Map button style to appropriate border radius for BgShadow
  const BtnBgShadowRadius = {
    square: "0",
    square_rounded: "4",
    circle: "100",
  };
  return (
    <div className="relative w-full max-h-[200px]">
      <BtnBgShadow borderRadius={BtnBgShadowRadius[input_style]} />
      <div className="relative w-full h-full bg-white border-[3px] border-gray-900 flex">
        <textarea
          value={value}
          placeholder={placeholder}
          contentEditable="true"
          className={`${className} ${borderRadiusStyles[input_style]} border resize-none z-20 w-full h-auto max-h-[calc(100%-55px)] overflow-y-auto overflow-x-hidden break-keep  bg-white px-4 py-2 outline-none font-bold hover:-translate-x-[1px] hover:-translate-y-[1px] focus:translate-x-[1.5px] focus:translate-y-[1.5px]`}
        />
      </div>
    </div>
  );
};

export default InputPompt;
