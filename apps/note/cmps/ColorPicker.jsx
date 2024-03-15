
export function ColorPicker ({ currentColor, onChangeColor }) {
  return (
    <input
      type="color"
      value={currentColor}
      onChange={(ev) => onChangeColor(ev.target.value)}
      style={{ cursor: 'pointer', marginLeft: '10px' }}
    />
  );
}