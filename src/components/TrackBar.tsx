import { useMemo } from 'react';

type Props = {
  max?: number;
  value?: number;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TrackBar: React.FC<Props> = ({ max = 100, value = 0, onChange, disabled }) => {
  const trackBarStyle = useMemo(() => ({ width: value ? `${value / max * 100}%` : "0%" }), [value, max]);
  return (
    <div className="track-bar">
      <input
        disabled={disabled}
        className="track-bar-range"
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={onChange}
      />
      <div className="track-bar-back">
        <div className="track-bar-fill" style={trackBarStyle}></div>
      </div>
    </div>
  );
};
