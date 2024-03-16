
import {TextNote} from "./TextNote.jsx"
import {ImageNote} from "./ImageNote.jsx"
import {VideoNote} from "./VideoNote.jsx"
import {TodoNote} from "./TodoNote.jsx"

export function Note({note,onUpdateNote}) {
  
  const renderNoteType = () => {
    switch (note.type) {
      case 'NoteTxt':
        return <TextNote note={note} />;
      case 'NoteImg':
        return <ImageNote note={note} />;
      case 'NoteVideo':
        return <VideoNote note={note} />;
      case 'NoteTodos':
        return <TodoNote note={note} onUpdateNote={onUpdateNote} />;
      default:
        return <p>Unknown note type</p>;
       
    }

  };

  return <div style={{width:"100%"}}>{renderNoteType()}</div>;

}