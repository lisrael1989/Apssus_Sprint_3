const {useState}=React

export function AddNotes( {onAddNote}) {
  const [inputType, setInputType] = useState('NoteTxt'); 
  const [inputValue, setInputValue] = useState('');

  const placeholders = {
    NoteTxt: "What's on your mind...",
    NoteImg: "Enter image URL...",
    NoteVideo: "Enter video URL...",
    NoteTodos: "Enter comma separated list...",
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

   
      let info;
      switch (inputType) {
        case "NoteTxt":
        info={
          txt:inputValue
        }
          break;
        case "NoteImg":
        info={
         url:inputValue
        }
          break;
        case "NoteVideo":
        info={
         url:inputValue
        }
          break;
          case "NoteTodos":
            info={
              todos: inputValue
              .split(",")
              .map((txt) => ({ txt: txt.trim(), doneAt: null })),
            }
            break;
        default:
          info={url:inputValue}
          break;
      }
   
      const newNoteData = {
        type: inputType,
        info: info,
      };
  
  
    onAddNote(newNoteData);
    setInputValue(''); 
  };

  const isSelected = (type) => {
    return inputType === type ? 'selected' : '';
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
      <button className={`fas fa-font ${isSelected('NoteTxt')}`} title="Add Text note" onClick={() => handleInputTypeChange('NoteTxt')}></button>
      <button className={`fas fa-image ${isSelected('NoteImg')}`} title="Add image note" onClick={() => handleInputTypeChange('NoteImg')}></button>
      <button className={`fas fa-video ${isSelected('NoteVideo')}`} title="Add Video note" onClick={() => handleInputTypeChange('NoteVideo')}></button>
      <button className={`fas fa-list ${isSelected('NoteTodos')}`} title="Add Todo note" onClick={() => handleInputTypeChange('NoteTodos')}></button>
      <button className="fas fa-check" title="Submit note" onClick={handleSubmit}></button>
    </div>
  );
}

