const {useState}=React

export function AddNotes( {onAddNote}) {
  const [inputType, setInputType] = useState('txt'); 
  const [inputValue, setInputValue] = useState('');

  const placeholders = {
    text: "What's on your mind...",
    image: "Enter image URL...",
    video: "Enter video URL...",
    todo: "Enter comma separated list...",
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputTypeChange = (type) => {
    setInputType(type);
    setInputValue(''); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const newNoteData = {
      type: `Note${inputType.charAt(0).toUpperCase() + inputType.slice(1)}`,
      info: inputType === 'todo'
        ? { todos: inputValue.split(',').map(txt => ({ txt: txt.trim(), doneAt: null })) }
        : { url: inputValue },
    };
    
    onAddNote(newNoteData);
    setInputValue(''); 
  };



  return (
    <div className="note-input-container">
      <input
        type="text"
        placeholder={placeholders[inputType]}
        className="note-input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="fas fa-font" title="Add Text note" onClick={() => handleInputTypeChange('text')}></button>
      <button className="fas fa-image" title="Add image note" onClick={() => handleInputTypeChange('image')}></button>
      <button className="fas fa-video" title="Add Video note" onClick={() => handleInputTypeChange('video')}></button>
      <button className="fas fa-list" title="Add Todo note" onClick={() => handleInputTypeChange('todo')}></button>
      <button className="fas fa-check" onClick={handleSubmit}></button>
    </div>
  );
}

