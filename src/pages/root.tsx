import {
  Bot,
  ChevronDown,
  Forward,
  Logs,
  Plus,
  RefreshCcw,
  Settings,
} from "lucide-react";

import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { BtnBgShadow } from "../components/buttons/btn-bg-shadow";
import { Button } from "../components/buttons/button";
import InputPompt from "../components/inputs/input-pompt";

type IndicatorStyle = "square" | "square_rounded" | "circle";

interface RootProps {
  indicator_style?: IndicatorStyle;
}

const Root = ({ indicator_style = "square_rounded" }: RootProps) => {
  const [refreshTokenButtonHovered, setRefreshTokenButtonHovered] =
    useState(false);

  const location = useLocation();

  const tabs = [
    {
      id: "chat",
      path: "/chat",
      name: "Chat",
      img: <Bot className="text-[18px]" />,
      btn_color: "bg-button-purple",
      text_color: "text-background",
    },
    {
      id: "logs",
      path: "/logs",
      name: "Logs",
      img: <Logs className="text-[18px]" />,
      btn_color: "bg-button-yellow",
      text_color: "text-foreground",
    },
  ];

  // Find current tab index based on current path
  const currenttabIndex = tabs.findIndex(
    (tab) => tab.path === location.pathname
  );

  const borderRadiusStyles: Record<IndicatorStyle, string> = {
    square: "rounded-none",
    square_rounded: "rounded-[4px]",
    circle: "rounded-full",
  };

  const BtnBgShadowRadius: Record<IndicatorStyle, string> = {
    square: "0",
    square_rounded: "4",
    circle: "100",
  };

  return (
    <div className="w-screen h-screen bg-background overflow-hidden">
      <div className="relative flex items-center justify-start w-screen h-[150px]">
        {/* Intel x OpenAI Logo */}
        <div className="h-full w-[10%] pl-4">
          <img className="" src="/images/intelai.png" alt="" width={150} />
        </div>

        <div className="h-full w-[calc(100%-10%)] flex flex-col ">
          <div className="h-1/2"></div>
          <div className="h-1/2 flex justify-between items-center">
            {/* Tabs - Chat, Logs, Settings */}
            <div className="flex h-fit gap-3">
              {tabs.map((tab, index) => (
                <div key={tab.id} className="relative flex">
                  <BtnBgShadow
                    borderRadius={BtnBgShadowRadius[indicator_style]}
                  />
                  <Link
                    to={tab.path}
                    className={`border-border flex cursor-pointer items-center justify-center gap-[6px] font-bold transition-all hover:-translate-x-[1px] hover:-translate-y-[1px] ${
                      borderRadiusStyles[indicator_style]
                    } relative border-2 ${
                      index === currenttabIndex
                        ? `${tab.btn_color} ${tab.text_color} translate-x-[1.5px] translate-y-[1.5px] px-4 py-1 hover:translate-x-[1.5px] hover:translate-y-[1.5px] active:translate-x-[1.5px] active:translate-y-[1.5px]`
                        : "bg-card-background p-[6px]"
                    }`}
                    aria-label={`Go to ${tab.id} tab`}
                  >
                    {index === currenttabIndex ? (
                      <>
                        {tab.img}
                        <span className="font-mono font-extrabold uppercase text-shadow-xs/20">
                          {tab.name}
                        </span>
                      </>
                    ) : (
                      tab.img
                    )}
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex pr-4 gap-3">
              {/* Refresh token button */}
              <div className="w-[200px]  font-bold">
                <Button
                  btn_color="blue"
                  className=""
                  placeholder={
                    refreshTokenButtonHovered ? "Refresh Token" : "10:20"
                  }
                  icon_comp={<RefreshCcw className=" w-4.5" />}
                  onMouseEnter={() => setRefreshTokenButtonHovered(true)}
                  onMouseLeave={() => setRefreshTokenButtonHovered(false)}
                />
              </div>
              {/* Settings button */}
              <div className="w-fit font-bold">
                <Button
                  btn_color="yellow"
                  className=""
                  placeholder=""
                  icon_comp={<Settings className=" w-6.5" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-screen h-[calc(100%-180px)]">
        {/* Chatbox */}
        <div className="w-full h-full flex items-center justify-center">
          {/* Prompt + Image preview */}
          <div className="relative flex items-end justify-center w-[90%] h-[120px]">
            <InputPompt placeholder="Say hi 👋..." />
            <div className="absolute z-20 bottom-4 w-full flex items-center justify-between ">
              {/* Add document or image  */}
              <div className="pl-4">
                <Button placeholder="" icon_comp={<Plus />}></Button>
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
        </div>
      </div>

      <div className="w-screen h-[30px] bg-statusbar">
        {/* Status bar like VS Code */}
        {/* Proxy connected? */}
        {/* Token Refresh */}
        {/* Author */}
      </div>
    </div>
  );
};

export default Root;
