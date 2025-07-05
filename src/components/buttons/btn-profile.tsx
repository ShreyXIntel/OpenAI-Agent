import { BtnBgShadow } from './btn-bg-shadow';

interface BtnProfileProps {
  btn_color?: 'green' | 'yellow' | 'blue' | 'purple' | 'red';
  btn_style?: 'square' | 'square_rounded' | 'circle';
  btn_type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon_comp?: React.ReactNode;
  orientation?: 'ImageText' | 'TextImage';
}

export const BtnProfile = ({
  btn_style = 'square_rounded',
  btn_type = 'button',
  className = '',
}: BtnProfileProps) => {
  // Map button styles to the appropriate Tailwind classes
  const borderRadiusStyles = {
    square: 'rounded-none',
    square_rounded: 'rounded-[4px]',
    circle: 'rounded-full ',
  };
  const borderWidthStyles = {
    square: 'border-4',
    square_rounded: 'border-4',
    circle: 'border-2 ',
  };

  const shadowBorderRadius = {
    square: '0',
    square_rounded: '4',
    circle: '100',
  };

  return (
    <div className="relative">
      <BtnBgShadow borderRadius={shadowBorderRadius[btn_style]} />
      <button
        type={btn_type}
        className={`${borderRadiusStyles[btn_style]} ${borderRadiusStyles[btn_style]} ${borderWidthStyles[btn_style]} relative z-10 flex h-12 w-12 items-center gap-1 border-gray-900 font-bold transition-all outline-none hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1.5px] active:translate-y-[1.5px] ${className}`}
      >
        <img
          src="/images/shrey.jpg"
          alt="Profile"
          className={`h-full w-full ${borderRadiusStyles[btn_style]}`}
        />
      </button>
    </div>
  );
};
