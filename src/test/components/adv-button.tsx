import React from "react";
import { BtnBgShadow } from "./adv-btn-bg-shadow";

// Extended color palette
type ButtonColor = 
  | "green" | "yellow" | "blue" | "purple" | "red" 
  | "teal" | "orange" | "pink" | "indigo" | "cyan"
  | "lime" | "amber" | "emerald" | "violet" | "rose"
  | "slate" | "gray" | "zinc" | "neutral" | "stone"
  | "transparent" | "white" | "black";

type ButtonStyle = "square" | "square_rounded" | "circle" | "no_background" | "custom";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "custom";
type CursorType = "pointer" | "default" | "wait" | "text" | "move" | "not-allowed" | "grab" | "grabbing" | "crosshair" | "help";
type TransitionType = "none" | "fast" | "normal" | "slow" | "bounce" | "custom";
type OrientationType = "icon-text" | "text-icon" | "icon-only" | "text-only";

interface AdvButtonProps {
  // Core props
  type?: "button" | "submit" | "reset";
  placeholder?: string;
  icon?: React.ReactNode;
  orientation?: OrientationType;
  disabled?: boolean;
  
  // Event handlers
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  
  // Styling presets
  color?: ButtonColor;
  style?: ButtonStyle;
  size?: ButtonSize;
  
  // Colors - comprehensive color control
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  disabledBackgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  activeTextColor?: string;
  disabledTextColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  activeBorderColor?: string;
  disabledBorderColor?: string;
  
  // Dimensions
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  
  // Spacing
  padding?: string;
  paddingX?: string;
  paddingY?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginX?: string;
  marginY?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  gap?: string;
  
  // Borders
  borderWidth?: string;
  borderStyle?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  
  // Typography
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  letterSpacing?: string;
  lineHeight?: string;
  
  // Interactive states
  cursor?: CursorType;
  userSelect?: "none" | "auto" | "text" | "all";
  outline?: string;
  focusOutline?: string;
  
  // Transform effects
  enableHoverTransform?: boolean;
  enableActiveTransform?: boolean;
  hoverTransform?: string;
  activeTransform?: string;
  hoverTranslateX?: string;
  hoverTranslateY?: string;
  activeTranslateX?: string;
  activeTranslateY?: string;
  scale?: string;
  hoverScale?: string;
  activeScale?: string;
  rotate?: string;
  hoverRotate?: string;
  activeRotate?: string;
  
  // Transitions
  transition?: TransitionType | string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
  
  // Shadow and visual effects
  enableShadow?: boolean;
  shadowColor?: string;
  shadowRadius?: "0" | "1" | "2" | "4" | "6" | string;
  shadowTranslate?: "0" | "1" | "2" | "4" | "6";
  boxShadow?: string;
  hoverBoxShadow?: string;
  activeBoxShadow?: string;
  
  // Layout and positioning
  display?: string;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  
  // Flexbox properties
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  flex?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  
  // Additional styling
  opacity?: string;
  hoverOpacity?: string;
  activeOpacity?: string;
  disabledOpacity?: string;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  
  // Custom classes
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  tabIndex?: number;
  role?: string;
  
  // Advanced customization
  customStyles?: React.CSSProperties;
  hoverStyles?: React.CSSProperties;
  activeStyles?: React.CSSProperties;
  disabledStyles?: React.CSSProperties;
  
  // Animation
  animationClass?: string;
  hoverAnimationClass?: string;
  activeAnimationClass?: string;
}

interface ColorPreset {
  bg: string;
  hover: string;
  text: string;
}

interface SizePreset {
  padding: string;
  fontSize: string;
  minHeight: string;
  minWidth: string;
}

export const AdvButton: React.FC<AdvButtonProps> = ({
  // Core props with defaults
  type = "button",
  placeholder = "",
  icon,
  orientation = "icon-text",
  disabled = false,
  
  // Event handlers
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  
  // Styling presets
  color = "purple",
  style = "square_rounded",
  size = "md",
  
  // Colors
  backgroundColor,
  hoverBackgroundColor,
  activeBackgroundColor,
  disabledBackgroundColor,
  textColor,
  hoverTextColor,
  activeTextColor,
  disabledTextColor,
  borderColor,
  hoverBorderColor,
  activeBorderColor,
  disabledBorderColor,
  
  // Dimensions
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  
  // Spacing
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginX,
  marginY,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  gap,
  
  // Borders
  borderWidth,
  borderStyle,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  
  // Typography
  fontSize,
  fontWeight,
  fontFamily,
  textAlign,
  textTransform,
  letterSpacing,
  lineHeight,
  
  // Interactive states
  cursor = "pointer",
  userSelect,
  outline,
  focusOutline,
  
  // Transform effects
  enableHoverTransform = true,
  enableActiveTransform = true,
  hoverTransform,
  activeTransform,
  hoverTranslateX,
  hoverTranslateY,
  activeTranslateX,
  activeTranslateY,
  scale,
  hoverScale,
  activeScale,
  rotate,
  hoverRotate,
  activeRotate,
  
  // Transitions
  transition = "normal",
  transitionDuration,
  transitionTimingFunction,
  transitionDelay,
  
  // Shadow and visual effects
  enableShadow = true,
  shadowColor,
  shadowRadius = "4",
  shadowTranslate = "2",
  boxShadow,
  hoverBoxShadow,
  activeBoxShadow,
  
  // Layout and positioning
  display,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  
  // Flexbox properties
  justifyContent,
  alignItems,
  flexDirection,
  flexWrap,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  
  // Additional styling
  opacity,
  hoverOpacity,
  activeOpacity,
  disabledOpacity,
  overflow,
  
  // Custom classes
  className = "",
  containerClassName = "",
  iconClassName = "",
  textClassName = "",
  
  // Accessibility
  ariaLabel,
  ariaDescribedBy,
  tabIndex,
  role,
  
  // Advanced customization
  customStyles,
  hoverStyles,
  activeStyles,
  disabledStyles,
  
  // Animation
  animationClass,
  hoverAnimationClass,
  activeAnimationClass,
}) => {
  
  // Default color palettes
  const colorPresets: Record<ButtonColor, ColorPreset> = {
    green: { bg: "bg-button-green", hover: "hover:bg-button-green-hovered", text: "text-foreground" },
    yellow: { bg: "bg-button-yellow", hover: "hover:bg-button-yellow-hovered", text: "text-foreground" },
    blue: { bg: "bg-button-blue", hover: "hover:bg-button-blue-hovered", text: "text-yellow-300" },
    purple: { bg: "bg-button-purple", hover: "hover:bg-button-purple-hovered", text: "text-yellow-300" },
    red: { bg: "bg-button-red", hover: "hover:bg-button-red-hovered", text: "text-yellow-300" },
    teal: { bg: "bg-teal-500", hover: "hover:bg-teal-600", text: "text-white" },
    orange: { bg: "bg-orange-500", hover: "hover:bg-orange-600", text: "text-white" },
    pink: { bg: "bg-pink-500", hover: "hover:bg-pink-600", text: "text-white" },
    indigo: { bg: "bg-indigo-500", hover: "hover:bg-indigo-600", text: "text-white" },
    cyan: { bg: "bg-cyan-500", hover: "hover:bg-cyan-600", text: "text-white" },
    lime: { bg: "bg-lime-500", hover: "hover:bg-lime-600", text: "text-black" },
    amber: { bg: "bg-amber-500", hover: "hover:bg-amber-600", text: "text-black" },
    emerald: { bg: "bg-emerald-500", hover: "hover:bg-emerald-600", text: "text-white" },
    violet: { bg: "bg-violet-500", hover: "hover:bg-violet-600", text: "text-white" },
    rose: { bg: "bg-rose-500", hover: "hover:bg-rose-600", text: "text-white" },
    slate: { bg: "bg-slate-500", hover: "hover:bg-slate-600", text: "text-white" },
    gray: { bg: "bg-gray-500", hover: "hover:bg-gray-600", text: "text-white" },
    zinc: { bg: "bg-zinc-500", hover: "hover:bg-zinc-600", text: "text-white" },
    neutral: { bg: "bg-neutral-500", hover: "hover:bg-neutral-600", text: "text-white" },
    stone: { bg: "bg-stone-500", hover: "hover:bg-stone-600", text: "text-white" },
    transparent: { bg: "bg-transparent", hover: "hover:bg-gray-100/10", text: "text-foreground" },
    white: { bg: "bg-white", hover: "hover:bg-gray-50", text: "text-black" },
    black: { bg: "bg-black", hover: "hover:bg-gray-800", text: "text-white" },
  };
  
  // Border radius presets
  const borderRadiusPresets: Record<ButtonStyle, string> = {
    square: "rounded-none",
    square_rounded: "rounded-[4px]",
    circle: "rounded-full",
    no_background: "rounded-none",
    custom: borderRadius || "rounded-[4px]",
  };
  
  // Size presets
  const sizePresets: Record<ButtonSize, SizePreset> = {
    xs: { padding: "px-1 py-0.5", fontSize: "text-xs", minHeight: "min-h-[20px]", minWidth: "min-w-[20px]" },
    sm: { padding: "px-2 py-1", fontSize: "text-sm", minHeight: "min-h-[24px]", minWidth: "min-w-[24px]" },
    md: { padding: "px-2 py-1", fontSize: "text-base", minHeight: "min-h-[28px]", minWidth: "min-w-[32px]" },
    lg: { padding: "px-4 py-2", fontSize: "text-lg", minHeight: "min-h-[36px]", minWidth: "min-w-[40px]" },
    xl: { padding: "px-6 py-3", fontSize: "text-xl", minHeight: "min-h-[44px]", minWidth: "min-w-[48px]" },
    custom: { 
      padding: padding || "px-2 py-1", 
      fontSize: fontSize || "text-base", 
      minHeight: minHeight || "min-h-[28px]", 
      minWidth: minWidth || "min-w-[32px]" 
    },
  };
  
  // Transition presets
  const transitionPresets: Record<string, string> = {
    none: "",
    fast: "transition-all duration-150",
    normal: "transition-all",
    slow: "transition-all duration-500",
    bounce: "transition-all duration-300 ease-bounce",
  };
  
  // Cursor class
  const cursorClass = `cursor-${cursor}`;
  
  // Build transform classes
  const buildTransforms = () => {
    const hoverTransforms: string[] = [];
    const activeTransforms: string[] = [];
    
    if (enableHoverTransform) {
      if (hoverTransform) {
        hoverTransforms.push(hoverTransform);
      } else {
        if (hoverTranslateX || hoverTranslateY) {
          hoverTransforms.push(`hover:-translate-x-[${hoverTranslateX || '1px'}] hover:-translate-y-[${hoverTranslateY || '1px'}]`);
        } else if (style !== "no_background") {
          hoverTransforms.push("hover:-translate-x-[1px] hover:-translate-y-[1px]");
        }
      }
      
      if (hoverScale) hoverTransforms.push(`hover:scale-[${hoverScale}]`);
      if (hoverRotate) hoverTransforms.push(`hover:rotate-[${hoverRotate}]`);
    }
    
    if (enableActiveTransform) {
      if (activeTransform) {
        activeTransforms.push(activeTransform);
      } else {
        if (activeTranslateX || activeTranslateY) {
          activeTransforms.push(`active:translate-x-[${activeTranslateX || '1.5px'}] active:translate-y-[${activeTranslateY || '1.5px'}]`);
        } else if (style !== "no_background") {
          activeTransforms.push("active:translate-x-[1.5px] active:translate-y-[1.5px]");
        }
      }
      
      if (activeScale) activeTransforms.push(`active:scale-[${activeScale}]`);
      if (activeRotate) activeTransforms.push(`active:rotate-[${activeRotate}]`);
    }
    
    return {
      hover: hoverTransforms.join(" "),
      active: activeTransforms.join(" "),
    };
  };
  
  // Get current preset values
  const currentColorPreset = colorPresets[color];
  const currentBorderRadius = borderRadiusPresets[style];
  const currentSize = sizePresets[size];
  const currentTransition = transitionPresets[transition] || transition;
  const transforms = buildTransforms();
  
  // Determine if we should show background shadow
  const shouldShowShadow = enableShadow && style !== "no_background";
  
  // Calculate the actual border radius for the shadow
  const getShadowBorderRadius = () => {
    if (style === "custom") {
      // For custom style, use the actual border radius values
      if (borderTopLeftRadius || borderTopRightRadius || borderBottomLeftRadius || borderBottomRightRadius) {
        return {
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
        };
      }
      if (borderRadius) {
        return { actualBorderRadius: borderRadius };
      }
    }
    
    // For preset styles, use legacy mapping
    const legacyMapping: Record<ButtonStyle, string> = {
      square: "0",
      square_rounded: "4",
      circle: "100",
      no_background: "0",
      custom: "4",
    };
    
    return { borderRadius: legacyMapping[style] };
  };
  
  const shadowBorderRadiusProps = getShadowBorderRadius();
  
  // Build comprehensive styles
  const baseStyles: React.CSSProperties = {
    // Dimensions
    width: width,
    height: height,
    minWidth: minWidth || currentSize.minWidth.replace(/min-w-\[(.+)\]/, '$1'),
    minHeight: minHeight || currentSize.minHeight.replace(/min-h-\[(.+)\]/, '$1'),
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    
    // Spacing - handle padding logic
    ...(padding ? { padding } : {}),
    ...(paddingX || paddingY ? { 
      paddingLeft: paddingX, 
      paddingRight: paddingX, 
      paddingTop: paddingY, 
      paddingBottom: paddingY 
    } : {}),
    ...(paddingTop ? { paddingTop } : {}),
    ...(paddingRight ? { paddingRight } : {}),
    ...(paddingBottom ? { paddingBottom } : {}),
    ...(paddingLeft ? { paddingLeft } : {}),
    
    // Margin
    ...(margin ? { margin } : {}),
    ...(marginX || marginY ? { 
      marginLeft: marginX, 
      marginRight: marginX, 
      marginTop: marginY, 
      marginBottom: marginY 
    } : {}),
    ...(marginTop ? { marginTop } : {}),
    ...(marginRight ? { marginRight } : {}),
    ...(marginBottom ? { marginBottom } : {}),
    ...(marginLeft ? { marginLeft } : {}),
    
    // Colors
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(textColor ? { color: textColor } : {}),
    ...(borderColor ? { borderColor } : {}),
    
    // Borders
    ...(borderWidth ? { borderWidth } : {}),
    ...(borderStyle ? { borderStyle } : {}),
    ...(borderRadius ? { borderRadius } : {}),
    ...(borderTopLeftRadius ? { borderTopLeftRadius } : {}),
    ...(borderTopRightRadius ? { borderTopRightRadius } : {}),
    ...(borderBottomLeftRadius ? { borderBottomLeftRadius } : {}),
    ...(borderBottomRightRadius ? { borderBottomRightRadius } : {}),
    
    // Typography
    ...(fontSize ? { fontSize } : {}),
    ...(fontWeight ? { fontWeight } : {}),
    ...(fontFamily ? { fontFamily } : {}),
    ...(textAlign ? { textAlign } : {}),
    ...(textTransform ? { textTransform } : {}),
    ...(letterSpacing ? { letterSpacing } : {}),
    ...(lineHeight ? { lineHeight } : {}),
    
    // Visual effects
    ...(opacity ? { opacity } : {}),
    ...(overflow ? { overflow } : {}),
    ...(boxShadow ? { boxShadow } : {}),
    
    // Layout
    ...(display ? { display } : {}),
    ...(position ? { position } : {}),
    ...(top ? { top } : {}),
    ...(right ? { right } : {}),
    ...(bottom ? { bottom } : {}),
    ...(left ? { left } : {}),
    ...(zIndex !== undefined ? { zIndex } : {}),
    
    // Flexbox
    ...(justifyContent ? { justifyContent } : {}),
    ...(alignItems ? { alignItems } : {}),
    ...(flexDirection ? { flexDirection } : {}),
    ...(flexWrap ? { flexWrap } : {}),
    ...(flex ? { flex } : {}),
    ...(flexGrow !== undefined ? { flexGrow } : {}),
    ...(flexShrink !== undefined ? { flexShrink } : {}),
    ...(flexBasis ? { flexBasis } : {}),
    
    // Interactive
    ...(userSelect ? { userSelect } : {}),
    ...(outline ? { outline } : {}),
    
    // Custom styles override
    ...customStyles,
  };
  
  // Build class names
  const containerClasses = [
    "relative",
    containerClassName,
  ].filter(Boolean).join(" ");
  
  const buttonClasses = [
    // Base styles
    "flex items-center justify-center outline-none font-bold",
    
    // Color preset (if no custom colors provided)
    !backgroundColor && currentColorPreset.bg,
    !hoverBackgroundColor && currentColorPreset.hover,
    !textColor && currentColorPreset.text,
    
    // Border radius
    currentBorderRadius,
    
    // Size preset (if no custom dimensions provided)
    !padding && !paddingX && !paddingY && currentSize.padding,
    !fontSize && currentSize.fontSize,
    !minHeight && currentSize.minHeight,
    !minWidth && currentSize.minWidth,
    
    // Border (if not no_background)
    style !== "no_background" && !borderWidth && "border-3",
    style !== "no_background" && !borderColor && "border-gray-900",
    
    // Position for shadow
    shouldShowShadow && "relative z-10",
    
    // Cursor
    cursorClass,
    
    // Transitions
    currentTransition,
    
    // Transforms
    transforms.hover,
    transforms.active,
    
    // Gap
    !gap && icon && placeholder && "gap-1",
    
    // Disabled styles
    disabled && "opacity-50 cursor-not-allowed",
    
    // Animation classes
    animationClass,
    
    // Custom class names
    className,
  ].filter(Boolean).join(" ");
  
  // Content rendering based on orientation
  const renderContent = () => {
    const iconElement = icon && (
      <span className={iconClassName}>{icon}</span>
    );
    const textElement = placeholder && (
      <span className={textClassName}>{placeholder}</span>
    );
    
    switch (orientation) {
      case "text-icon":
        return (
          <>
            {textElement}
            {iconElement}
          </>
        );
      case "icon-only":
        return iconElement;
      case "text-only":
        return textElement;
      case "icon-text":
      default:
        return (
          <>
            {iconElement}
            {textElement}
          </>
        );
    }
  };
  
  return (
    <div className={containerClasses}>
      {/* Shadow component */}
      {shouldShowShadow && (
        <BtnBgShadow 
          {...shadowBorderRadiusProps}
          translate={shadowTranslate}
          className={shadowColor}
        />
      )}
      
      {/* Button */}
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        className={buttonClasses}
        style={baseStyles}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        tabIndex={tabIndex}
        role={role}
      >
        {renderContent()}
      </button>
    </div>
  );
};