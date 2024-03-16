
const{useState}=React



export function ColorPicker({ currentColor, onChangeColor }) {
  // Function to generate a random color
  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  // State to hold the random colors
  const [randomColors, setRandomColors] = useState(Array(4).fill().map(generateRandomColor));

  // Call this function when the color button is clicked to refresh the random colors
  const refreshRandomColors = () => {
    setRandomColors(Array(4).fill().map(generateRandomColor));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {randomColors.map(color => (
          <div
            key={color}
            onClick={() => onChangeColor(color)}
            style={{
              width: '20px',
              height: '20px',
              borderRadius:'50%',
              marginTop:"10px",
              padding:"5px 5px",
              backgroundColor: color,
              border:"1px solid gray",
              cursor: 'pointer',
              marginLeft: '5px'
            }}
          />
        ))}
      
      </div>
     <div className="color-picker-input">
      <input
        type="color"
       
        value={currentColor}
        onChange={(ev) => onChangeColor(ev.target.value)}
        onClick={refreshRandomColors}
        style={{ cursor: 'pointer', marginTop: '5px' }}
      />
     </div>
    </div>
  );
}


























// export function ColorPicker ({ currentColor, onChangeColor }) {
//   return (
//     <input
//       type="color"
//       value={currentColor}
//       onChange={(ev) => onChangeColor(ev.target.value)}
//       style={{ cursor: 'pointer', marginLeft: '10px' }}
//     />
//   );
// }


