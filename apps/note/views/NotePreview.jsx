
import {ColorPicker} from "../cmps/ColorPicker.jsx";

export function NotePreview({ notes, onRemoveNote, onDuplicateNote, onUpdateNoteColor }) {
 

  return (
    
      <ul className="note-list">
        {notes && notes.map(note => (
          <li key={note.id} className="note-item" style={{ backgroundColor: note.style && note.style.backgroundColor }}>

            <div className="note-content">
              {note.type === 'NoteTxt' && <p className="type-txt">{note.info.txt}</p>}
              <h3 className="note-title">{note.info.title}</h3>
              {note.type === 'NoteImg' && <img src={note.info.url} alt={note.info.title} className="type-url" />}
            </div>

            <div className="note-actions">
              <button className="edit-btn fa-solid fa-pen-to-square"></button>
              <button className="color-btn fa-solid fa-palette"></button>
              <button className="remove-btn fa-solid fa-trash" onClick={() => onRemoveNote(note.id)}></button>
              <button className="pinned-btn fa-solid fa-thumbtack"></button>
              <button
                className="duplicate-btn fa-solid fa-copy"
                onClick={() => onDuplicateNote(note)}
              ></button>  
              <ColorPicker
              currentColor={note.style && note.style.backgroundColor  || '#ffffff'}
              onChangeColor={(color) => onUpdateNoteColor(note.id, color)}
            />        
              </div>

          </li>
        ))}
      </ul>
   
  );
}

