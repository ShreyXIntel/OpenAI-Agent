import { Workflow } from "lucide-react";

const Statusbar = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bottom-0 w-screen h-[30px] bg-statusbar text-gray-300 flex text-[12px] items-center justify-between px-4">
      {/* Proxy connected? */}
      <div className="flex  h-full gap-1 items-center">
        <Workflow className="text-green-500 size-4" />
        <span className="text-gray-300 ">Connected to OpenAI</span>
      </div>
      {/* Author */}
      <div>
        <span>
          Written and Designed By: <span className="">Shrey</span>
        </span>
      </div>
      <div>
        <span>© Copyright @ {year}</span>
      </div>
    </footer>
  );
};

export default Statusbar;
