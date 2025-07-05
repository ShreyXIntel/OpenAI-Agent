import { BtnBgShadow } from "../buttons/btn-bg-shadow";

interface InputPromptProp {
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?: string | undefined;
  className?: string;

  input_style?: "square" | "square_rounded" | "circle";
  //   input_color?: 'green' | 'yellow' | 'blue' | 'purple' | 'red';
}

const InputPompt = ({
  value,
  onChange,
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
    <div className="relative w-full h-full">
      <BtnBgShadow borderRadius={BtnBgShadowRadius[input_style]} />
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} ${borderRadiusStyles[input_style]} resize-none relative z-20 w-full min-h-full border-[3px] border-gray-900 bg-white px-4 py-2 pr-[120px] font-bold hover:-translate-x-[1px] hover:-translate-y-[1px] focus:translate-x-[1.5px] focus:translate-y-[1.5px]`}
      />
    </div>
  );
};

export default InputPompt;
