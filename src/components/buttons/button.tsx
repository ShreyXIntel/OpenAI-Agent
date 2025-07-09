import { BtnBgShadow } from "./btn-bg-shadow";

interface ButtonProps {
  btn_color?: "green" | "yellow" | "blue" | "purple" | "red";
  btn_style?: "square" | "square_rounded" | "circle" | "no_background";
  btn_type?: "button" | "submit" | "reset";
  placeholder: string;
  className?: string;
  icon_comp?: React.ReactNode;
  orientation?: "ImageText" | "TextImage";
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: () => void;
}

export const Button = ({
  btn_color = "purple",
  btn_style = "square_rounded",
  btn_type = "button",
  placeholder,
  className = "",
  icon_comp,
  orientation = "ImageText",
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ButtonProps) => {
  // Map button styles to the appropriate Tailwind classes
  const bgColors = {
    green: "bg-button-green hover:bg-button-green-hovered",
    yellow: "bg-button-yellow hover:bg-button-yellow-hovered",
    blue: "bg-button-blue hover:bg-button-blue-hovered",
    purple: "bg-button-purple hover:bg-button-purple-hovered",
    red: "bg-button-red hover:bg-button-red-hovered",
    transparent: "bg-transparent",
  };

  const borderRadiusStyles = {
    square: "rounded-none",
    square_rounded: "rounded-[4px]",
    circle: "rounded-full",
    no_background: "rounded-none", // or whatever radius you prefer for no_background
  };

  // Determine text color based on button style
  const textColor =
    btn_color === "blue" || btn_color === "purple" || btn_color === "red"
      ? "text-yellow-300"
      : "text-foreground";

  // Map button style to appropriate border radius for BgShadow
  const BtnBgShadowRadius = {
    square: "0",
    square_rounded: "4",
    circle: "100",
    no_background: "0", // Not used, but keeping for consistency
  };

  // Determine if we should show background shadow and borders
  const isNoBackground = btn_style === "no_background";

  // Different styling for no_background vs regular buttons
  const buttonBaseClasses = isNoBackground
    ? "bg-transparent hover:bg-gray-100/10" // Transparent with subtle hover
    : `${bgColors[btn_color]} border-3 border-gray-900`;

  const buttonTransformClasses = isNoBackground
    ? "" // No transform effects for no_background
    : "hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1.5px] active:translate-y-[1.5px]";

  return (
    <div className="relative">
      {/* Only render BtnBgShadow if not no_background style */}
      {!isNoBackground && (
        <BtnBgShadow borderRadius={BtnBgShadowRadius[btn_style]} />
      )}

      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        type={btn_type}
        className={`${buttonBaseClasses} ${borderRadiusStyles[btn_style]} ${
          isNoBackground ? "" : "relative z-10"
        } flex min-w-[42px] min-h-[38px] w-full cursor-pointer items-center justify-center gap-1 px-2 py-1 font-bold transition-all outline-none ${buttonTransformClasses} ${textColor} ${className}`}
      >
        {orientation === "TextImage" ? (
          <>
            {placeholder}
            {icon_comp}
          </>
        ) : (
          <>
            {icon_comp}
            {placeholder}
          </>
        )}
      </button>
    </div>
  );
};
