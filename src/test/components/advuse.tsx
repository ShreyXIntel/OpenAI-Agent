import React from "react";
import { Send, Download, Settings, Heart, Star } from "lucide-react";
import { AdvButton } from "./adv-button";

const AdvButtonExamples: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Basic Usage - Uses defaults from original component */}
      <section>
        <h2 className="text-xl font-bold mb-4">
          Basic Usage (Same as Original)
        </h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton placeholder="Purple Default" icon={<Send />} />
          <AdvButton placeholder="Green" color="green" icon={<Download />} />
          <AdvButton placeholder="Blue" color="blue" icon={<Settings />} />
          <AdvButton placeholder="Yellow" color="yellow" icon={<Star />} />
          <AdvButton placeholder="Red" color="red" icon={<Heart />} />
        </div>
      </section>

      {/* New Colors */}
      <section>
        <h2 className="text-xl font-bold mb-4">Extended Color Palette</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton placeholder="" color="amber" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="black" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="blue" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="cyan" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="emerald" icon={<Send />} />

          <AdvButton placeholder="Emerald" color="gray" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="green" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="indigo" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="lime" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="neutral" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="orange" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="pink" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="purple" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="red" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="rose" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="slate" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="stone" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="teal" icon={<Send />} />
          <AdvButton
            placeholder="Emerald"
            color="transparent"
            icon={<Send />}
          />
          <AdvButton placeholder="Emerald" color="violet" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="white" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="yellow" icon={<Send />} />
          <AdvButton placeholder="Emerald" color="zinc" icon={<Send />} />
        </div>
      </section>

      {/* Different Sizes */}
      <section>
        <h2 className="text-xl font-bold mb-4">Size Variations</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <AdvButton placeholder="XS" size="xs" icon={<Send />} />
          <AdvButton placeholder="Small" size="sm" icon={<Send />} />
          <AdvButton placeholder="Medium" size="md" icon={<Send />} />
          <AdvButton placeholder="Large" size="lg" icon={<Send />} />
          <AdvButton placeholder="XL" size="xl" icon={<Send />} />
        </div>
      </section>

      {/* Custom Dimensions */}
      <section>
        <h2 className="text-xl font-bold mb-4">Custom Dimensions</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton
            placeholder="Wide Button"
            width="200px"
            height="50px"
            icon={<Send />}
          />
          <AdvButton
            placeholder="Tall"
            width="80px"
            height="80px"
            icon={<Send />}
            orientation="text-icon"
          />
          <AdvButton
            placeholder="Min/Max"
            minWidth="100px"
            maxWidth="300px"
            icon={<Send />}
          />
        </div>
      </section>

      {/* Custom Colors */}
      <section>
        <h2 className="text-xl font-bold mb-4">Custom Colors</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton
            placeholder="Custom BG"
            backgroundColor="#ff6b6b"
            textColor="white"
            hoverBackgroundColor="#ff5252"
            icon={<Heart />}
          />
          <AdvButton
            placeholder="Gradient Style"
            backgroundColor="linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
            textColor="white"
            borderColor="#5a67d8"
            icon={<Star />}
          />
          <AdvButton
            placeholder="Custom Border"
            backgroundColor="transparent"
            textColor="#2d3748"
            borderColor="#e53e3e"
            borderWidth="3px"
            hoverBackgroundColor="#e53e3e"
            hoverTextColor="white"
            icon={<Settings />}
          />
        </div>
      </section>

      {/* Custom Spacing */}
      <section>
        <h2 className="text-xl font-bold mb-4">Custom Spacing</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton
            placeholder="Big Padding"
            paddingX="2rem"
            paddingY="1rem"
            icon={<Send />}
          />
          <AdvButton
            placeholder="Asymmetric"
            paddingLeft="2rem"
            paddingRight="1rem"
            paddingTop="0.5rem"
            paddingBottom="1rem"
            icon={<Send />}
          />
          <AdvButton placeholder="Big Gap" gap="1rem" icon={<Send />} />
        </div>
      </section>

      {/* Custom Border Radius */}
      <section>
        <h2 className="text-xl font-bold mb-4">Custom Border Radius</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton placeholder="No Radius" style="square" icon={<Send />} />
          <AdvButton placeholder="Round" style="circle" icon={<Send />} />
          <AdvButton
            placeholder="Custom Radius"
            borderRadius="20px"
            style="custom"
            icon={<Send />}
          />
          <AdvButton
            placeholder="Asymmetric Radius"
            borderTopLeftRadius="0px"
            borderTopRightRadius="20px"
            borderBottomLeftRadius="20px"
            borderBottomRightRadius="0px"
            style="custom"
            icon={<Send />}
          />
        </div>
      </section>

      {/* Custom Transforms */}
      <section>
        <h2 className="text-xl font-bold mb-4">Custom Transform Effects</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton
            placeholder="No Transform"
            enableHoverTransform={false}
            enableActiveTransform={false}
            icon={<Send />}
          />
          <AdvButton
            placeholder="Scale Effect"
            hoverScale="1.1"
            activeScale="0.95"
            enableHoverTransform={false}
            enableActiveTransform={false}
            icon={<Send />}
          />
          <AdvButton
            placeholder="Rotate Effect"
            hoverRotate="5deg"
            activeRotate="-5deg"
            enableHoverTransform={false}
            enableActiveTransform={false}
            icon={<Send />}
          />
          <AdvButton
            placeholder="Custom Transform"
            hoverTransform="hover:scale-110 hover:rotate-3"
            activeTransform="active:scale-95 active:rotate-1"
            icon={<Send />}
          />
        </div>
      </section>

      {/* Typography Customization */}
      <section>
        <h2 className="text-xl font-bold mb-4">Typography Customization</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton
            placeholder="Big Text"
            fontSize="1.5rem"
            fontWeight="900"
            icon={<Send />}
          />
          <AdvButton
            placeholder="UPPERCASE"
            textTransform="uppercase"
            letterSpacing="2px"
            icon={<Send />}
          />
          <AdvButton
            placeholder="Different Font"
            fontFamily="serif"
            fontWeight="300"
            icon={<Send />}
          />
        </div>
      </section>

      {/* Orientation Examples */}
      <section>
        <h2 className="text-xl font-bold mb-4">Orientation Options</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton
            placeholder="Icon-Text"
            orientation="icon-text"
            icon={<Send />}
          />
          <AdvButton
            placeholder="Text-Icon"
            orientation="text-icon"
            icon={<Send />}
          />
          <AdvButton
            orientation="icon-only"
            icon={<Send />}
            ariaLabel="Send message"
          />
          <AdvButton placeholder="Text Only" orientation="text-only" />
        </div>
      </section>

      {/* Shadow Customization */}
      <section>
        <h2 className="text-xl font-bold mb-4">Shadow Options</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton
            placeholder="No Shadow"
            enableShadow={false}
            icon={<Send />}
          />
          <AdvButton
            placeholder="Custom Shadow"
            boxShadow="0 10px 25px rgba(0,0,0,0.3)"
            hoverBoxShadow="0 15px 35px rgba(0,0,0,0.4)"
            icon={<Send />}
          />
          <AdvButton
            placeholder="Colored Shadow"
            shadowColor="bg-purple-500"
            shadowTranslate="6"
            icon={<Send />}
          />
        </div>
      </section>

      {/* Advanced Customization */}
      <section>
        <h2 className="text-xl font-bold mb-4">Advanced Customization</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton
            placeholder="Gaming Button"
            backgroundColor="linear-gradient(45deg, #1a202c, #2d3748)"
            textColor="#00ff88"
            borderColor="#00ff88"
            borderWidth="2px"
            hoverBackgroundColor="linear-gradient(45deg, #2d3748, #4a5568)"
            hoverTextColor="#00ffaa"
            boxShadow="0 0 20px rgba(0, 255, 136, 0.3)"
            hoverBoxShadow="0 0 30px rgba(0, 255, 136, 0.5)"
            transition="all 0.3s ease"
            icon={<Send />}
          />
          <AdvButton
            placeholder="Retro Style"
            backgroundColor="#ff6b9d"
            textColor="white"
            borderRadius="0"
            borderWidth="4px"
            borderColor="#000"
            fontFamily="monospace"
            fontWeight="bold"
            textTransform="uppercase"
            boxShadow="4px 4px 0px #000"
            hoverTransform="hover:translate-x-1 hover:translate-y-1"
            hoverBoxShadow="2px 2px 0px #000"
            enableShadow={false}
            icon={<Star />}
          />
        </div>
      </section>

      {/* Interaction States */}
      <section>
        <h2 className="text-xl font-bold mb-4">Interaction States</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvButton placeholder="Disabled" disabled={true} icon={<Send />} />
          <AdvButton
            placeholder="Custom Disabled"
            disabled={true}
            disabledOpacity="0.3"
            disabledBackgroundColor="#gray-200"
            icon={<Send />}
          />
          <AdvButton
            placeholder="Different Cursor"
            cursor="grab"
            icon={<Send />}
          />
        </div>
      </section>
    </div>
  );
};

export default AdvButtonExamples;
