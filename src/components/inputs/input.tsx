import { BtnBgShadow } from '../buttons/btn-bg-shadow';

interface InputProp {
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  className?: string;

  input_style?: 'square' | 'square_rounded' | 'circle';
  //   input_color?: 'green' | 'yellow' | 'blue' | 'purple' | 'red';
}
export const Input = ({
  value,
  onChange,
  type,
  placeholder,
  className,
  input_style = 'square_rounded',
}: InputProp) => {
  const borderRadiusStyles = {
    square: 'rounded-none',
    square_rounded: 'rounded-[4px]',
    circle: 'rounded-full',
  };

  // Map button style to appropriate border radius for BgShadow
  const BtnBgShadowRadius = {
    square: '0',
    square_rounded: '4',
    circle: '100',
  };
  return (
    <div className="relative w-full h-full">
      <BtnBgShadow borderRadius={BtnBgShadowRadius[input_style]} />
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`${className} ${borderRadiusStyles[input_style]} relative z-20 w-full h-full border-[3px] border-gray-900 bg-white px-4 py-3 font-bold outline-none hover:-translate-x-[1px] hover:-translate-y-[1px] focus:translate-x-[1.5px] focus:translate-y-[1.5px]`}
        placeholder={placeholder}
      />
    </div>
  );
};
