const {useState}=React
import {ColorPicker} from "../cmps/ColorPicker.jsx";
import {Note} from "../cmps/Note.jsx";


export function NotePreview({ notes, onRemoveNote, onDuplicateNote, onUpdateNoteColor, onUpdateNote,onTogglePin }) {
  const [visibleColorPicker, setVisibleColorPicker] = useState({});
 

  const toggleColorPicker = (noteId) => {
    setVisibleColorPicker(prev => ({ ...prev, [noteId]: !prev[noteId] }));
  };


  return (
    <ul className="note-list">
      {notes.map(note => {
        const backgroundColor = note.style && note.style.backgroundColor ? note.style.backgroundColor : '#ffffff';
        return (
          <li key={note.id} className="note-item" style={{ backgroundColor }}>
            <Note note={note}  onUpdateNote={onUpdateNote} />
            <div className="note-actions">
              <button className="btn edit-btn fa-solid fa-pen-to-square"></button>
              <button className="btn pinned-btn fa-solid fa-thumbtack" onClick={() => onTogglePin(note.id)}></button>
              <button className="btn remove-btn fa-solid fa-trash" onClick={() => onRemoveNote(note.id)}></button>
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
      })}
    </ul>
  );
}