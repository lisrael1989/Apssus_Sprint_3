const {useState}=React
import {ColorPicker} from "../cmps/ColorPicker.jsx";
import {Note} from "../cmps/Note.jsx";


export function NotePreview({ notes, onRemoveNote, onDuplicateNote, onUpdateNoteColor }) {
  const [visibleColorPicker, setVisibleColorPicker] = useState({});
 


  const toggleColorPicker = (id) => {
    setVisibleColorPicker(prev => {
      const newState = { ...prev };
      newState[id] = !newState[id];
      return newState;
    });
  };

  const safeNotes = notes || [];


return (
  <ul className="note-list">
    {safeNotes.map(note => {
      if (note && typeof note.id !== 'undefined') {
        const backgroundColor = note.style && note.style.backgroundColor ? note.style.backgroundColor : '#ffffff';
        return (
          <li key={note.id} className="note-item" style={{ backgroundColor: backgroundColor }}>
             <Note note={note} />
            <div className="note-content">
              {note.type === 'NoteTxt' && <p className="type-txt">{note.info.txt}</p>}
              <h3 className="note-title">{note.info.title}</h3>
              {note.type === 'NoteImg' && <img src={note.info.url} alt={note.info.title} className="type-url" />}
            </div>

            <div className="note-actions">
              <button className="btn edit-btn fa-solid fa-pen-to-square"></button>
              <button className="btn remove-btn fa-solid fa-trash" onClick={() => onRemoveNote(note.id)}></button>
              <button className="btn pinned-btn fa-solid fa-thumbtack"></button>
              <button className="btn duplicate-btn fa-solid fa-copy" onClick={() => onDuplicateNote(note)}></button>
              <button className="btn color-btn fa-solid fa-palette" onClick={() => toggleColorPicker(note.id)}></button>
              {visibleColorPicker[note.id] && (
                <ColorPicker
                  currentColor={backgroundColor}
                  onChangeColor={(color) => onUpdateNoteColor(note.id, color)}
                />
              )}
            </div>
          </li>
        );
      } else {
        
        return null;
      }
    })}
  </ul>
);
}
