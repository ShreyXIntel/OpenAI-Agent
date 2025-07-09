import AdvButtonExamples from "./components/advuse";

const DevMode = () => {
  return (
    <div className="w-screen h-[calc(100%-180px)] flex flex-col overflow-auto">
      <span>1. Add Clipboard</span>
      <span>2. Add Persisted Scope</span>
      <span>3. Add Deeplinking</span>
      <span>4. Add Autostart</span>
      <span>5. Add chat history</span>
      <span>6. Add chat url</span>
      <span>7. Add chat saving</span>
      <span>8. Add auto refresh button</span>
      <span>8. Add theme switcher</span>

      <AdvButtonExamples/>
    </div>
  );
};

export default DevMode;
