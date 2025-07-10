// src/pages/root.tsx
import { Bot, Logs, RefreshCcw, Settings, Waypoints } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BtnBgShadow } from "../components/buttons/btn-bg-shadow";
import { Button } from "../components/buttons/button";
import { SettingsModal } from "../components/modals/settings-modal";
import Statusbar from "../ui/statusbar";
import { intelGenAIService } from "../services/intelGenAIService";

type IndicatorStyle = "square" | "square_rounded" | "circle";

interface RootProps {
  input_style?: IndicatorStyle;
}

const Root = ({ input_style = "square_rounded" }: RootProps) => {
  const [refreshTokenButtonHovered, setRefreshTokenButtonHovered] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    {
      id: "dev",
      path: "/dev",
      name: "Dev Mode",
      img: <Waypoints className="text-[18px]" />,
      btn_color: "bg-button-red",
      text_color: "text-white",
    },
  ];

  // Find current tab index based on current path
  const currenttabIndex = tabs.findIndex(
    (tab) =>
      tab.path === location.pathname ||
      (location.pathname === "/" && tab.path === "/chat")
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

  useEffect(() => {
    const updateTokenInfo = () => {
      const info = intelGenAIService.getTokenInfo();
      setTokenInfo(info);
    };

    updateTokenInfo();
    
    // Update token info every minute
    const interval = setInterval(updateTokenInfo, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefreshToken = async () => {
    if (!intelGenAIService.isConfigured()) {
      setIsSettingsOpen(true);
      return;
    }

    setIsRefreshing(true);
    try {
      await intelGenAIService.refreshToken();
      // Update token info after refresh
      const info = intelGenAIService.getTokenInfo();
      setTokenInfo(info);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      // Could show error message here
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatTokenTime = () => {
    if (!tokenInfo?.isValid) return "Token Expired";
    
    const minutes = Math.floor(tokenInfo.timeUntilExpiry / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}:${String(minutes % 60).padStart(2, '0')}`;
    } else {
      return `${minutes}m`;
    }
  };

  const getTokenDisplayText = () => {
    if (refreshTokenButtonHovered) {
      if (!intelGenAIService.isConfigured()) {
        return "Configure Settings";
      }
      return isRefreshing ? "Refreshing..." : "Refresh Token";
    }
    return formatTokenTime();
  };

  const getTokenButtonColor = () => {
    if (!intelGenAIService.isConfigured()) return "red";
    if (!tokenInfo?.isValid) return "red";
    
    const minutes = Math.floor(tokenInfo.timeUntilExpiry / (1000 * 60));
    if (minutes < 30) return "yellow";
    return "blue";
  };

  return (
    <div className="w-screen h-screen bg-background overflow-hidden">
      <div className="relative flex items-center justify-start w-screen h-[150px]">
        {/* Intel x OpenAI Logo */}
        <div className="h-full w-[10%] pl-4">
          <img className="" src="/images/intelai.png" alt="" width={150} />
        </div>

        <div className="h-full w-[calc(100%-10%)] flex flex-col ">
          <div className="h-1/2 text-3xl font-rubik font-bold flex items-center">
            Intel GenAI Chat Interface
          </div>
          <div className="h-1/2 flex justify-between items-center">
            {/* Tabs - Chat, Logs, Settings */}
            <div className="flex h-fit gap-3">
              {tabs.map((tab, index) => (
                <div key={tab.id} className="relative flex">
                  <BtnBgShadow borderRadius={BtnBgShadowRadius[input_style]} />
                  <Link
                    to={tab.path}
                    className={`border-border flex cursor-pointer items-center justify-center gap-[6px] font-bold transition-all hover:-translate-x-[1px] hover:-translate-y-[1px] ${
                      borderRadiusStyles[input_style]
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
              <div className="w-[200px] font-bold">
                <Button
                  btn_color={getTokenButtonColor()}
                  className=""
                  placeholder={getTokenDisplayText()}
                  icon_comp={
                    <RefreshCcw className={`w-4.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  }
                  onMouseEnter={() => setRefreshTokenButtonHovered(true)}
                  onMouseLeave={() => setRefreshTokenButtonHovered(false)}
                  onClick={handleRefreshToken}
                  disabled={isRefreshing}
                />
              </div>
              
              {/* Settings button */}
              <div className="w-fit font-bold">
                <Button
                  btn_color="yellow"
                  className=""
                  placeholder=""
                  icon_comp={<Settings className="w-6.5" />}
                  onClick={() => setIsSettingsOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />

      {/* Status bar */}
      <Statusbar />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default Root;