import { BtnBgShadow } from '../buttons/btn-bg-shadow';

interface CheckboxProps {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Checkbox = ({ setChecked }: CheckboxProps) => {
  return (
    <div className="relative inline-block h-5 w-5">
      <BtnBgShadow translate="4" />
      <input
        id="pin-stacks"
        type="checkbox"
        className="relative z-10 h-5 w-5 rounded-[3px] border-2 border-gray-900 accent-yellow-400"
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  );
};
