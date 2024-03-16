const {useState}=React

export function AddNotes( {onAddNote}) {
  const [inputType, setInputType] = useState('NoteTxt'); 
  const [inputValue, setInputValue] = useState('');

  const placeholders = {
    NoteTxt: "What's on your mind...",
    NoteImg: "Enter image URL...",
    NoteVideo: "Enter video URL...",
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
          case "todo":
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



  return (
    <div className="note-input-container">
      <input
        type="text"
        placeholder={placeholders[inputType]}
        className="note-input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="fas fa-font" title="Add Text note" onClick={() => handleInputTypeChange('NoteTxt')}></button>
      <button className="fas fa-image" title="Add image note" onClick={() => handleInputTypeChange('NoteImg')}></button>
      <button className="fas fa-video" title="Add Video note" onClick={() => handleInputTypeChange('NoteVideo')}></button>
      <button className="fas fa-list" title="Add Todo note" onClick={() => handleInputTypeChange('todo')}></button>
      <button className="fas fa-check" onClick={handleSubmit}></button>
    </div>
  );
}

