import React from 'react';

interface BtnBgShadowProps {
  // Legacy support - predefined radius mappings
  borderRadius?: '0' | '3' | '4' | '14' | '100' | string;
  translate?: '0' | '1' | '2' | '4' | '6';
  className?: string;
  
  // Enhanced support - actual CSS border radius values
  actualBorderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  
  // Dynamic sizing to match parent
  width?: string;
  height?: string;
  matchParent?: boolean;
}

export const BtnBgShadow: React.FC<BtnBgShadowProps> = ({
  borderRadius = '3',
  translate = '2',
  className = '',
  actualBorderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  width,
  height,
}) => {
  // Legacy border radius mappings for backward compatibility
  const legacyRadiusClasses: Record<string, string> = {
    '0': 'rounded-none',
    '3': 'rounded-[3px]',
    '4': 'rounded-[4px]',
    '14': 'rounded-[14px]',
    '100': 'rounded-full',
  };
  
  // Translate mappings
  const translateClasses: Record<string, string> = {
    '0': 'translate-[0px]',
    '1': 'translate-[1px]',
    '2': 'translate-[2px]',
    '4': 'translate-[4px]',
    '6': 'translate-[6px]',
  };
  
  // Determine the border radius to use
  const getBorderRadiusStyle = (): React.CSSProperties => {
    // If we have individual corner radius values, use them
    if (borderTopLeftRadius || borderTopRightRadius || borderBottomLeftRadius || borderBottomRightRadius) {
      return {
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius,
        borderBottomRightRadius: borderBottomRightRadius,
      };
    }
    
    // If we have an actual border radius value, use it
    if (actualBorderRadius) {
      return {
        borderRadius: actualBorderRadius,
      };
    }
    
    // Fall back to legacy system - return empty object to use Tailwind classes
    return {};
  };
  
  // Get the appropriate Tailwind radius class (for legacy support)
  const getTailwindRadiusClass = (): string => {
    // If we're using actual CSS values, don't apply Tailwind classes
    if (actualBorderRadius || borderTopLeftRadius || borderTopRightRadius || borderBottomLeftRadius || borderBottomRightRadius) {
      return '';
    }
    
    // Use legacy mapping
    return legacyRadiusClasses[borderRadius] || 'rounded-[3px]';
  };
  
  // Get translate class
  const translateClass = translateClasses[translate] || 'translate-[2px]';
  
  // Build inline styles
  const inlineStyles: React.CSSProperties = {
    ...getBorderRadiusStyle(),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };
  
  // Build CSS classes
  const cssClasses = [
    translateClass,
    'absolute inset-0 h-full w-full bg-black',
    getTailwindRadiusClass(),
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={cssClasses}
      style={inlineStyles}
    />
  );
};