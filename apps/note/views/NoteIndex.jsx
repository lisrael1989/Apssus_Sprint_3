const { useState, useEffect } = React;
import { noteService } from "./../services/note.service.js";
import { utilService } from "../../../services/util.service.js";
import {
  eventBusService,
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js";

import { NotePreview } from "./NotePreview.jsx";
import { UserMsg } from "../cmps/UserMsg.jsx";
import { NoteHeader } from "../cmps/NoteHeader.jsx";
import { AddNotes } from "../cmps/AddNotes.jsx";
import { TodoNote } from "../cmps/TodoNote.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter());
  const [userMsg, setUserMsg] = useState("");

  useEffect(() => {
    loadNotes();
  }, [filterBy]);

  function loadNotes() {
    noteService.query(filterBy).then((notes) => {
      setNotes(notes);
    });
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

        showSuccessMsg(`note removed successfully (${noteId})`);
      })
      .catch((err) => {
        console.log("Had issues removing note", err);
        showErrorMsg(`note removed successfully (${noteId})`);
      });
  }

  function onDuplicateNote(noteToDuplicate) {
    const newNote = { ...noteToDuplicate, id: "", createdAt: Date.now() };

    noteService
      .save(newNote)
      .then((savedNote) => {
        setNotes((prevNotes) => [...prevNotes, savedNote]);
        showSuccessMsg("Note duplicated successfully");
      })
      .catch((err) => {
        console.error("Error duplicating note", err);
        showErrorMsg("Error duplicating note");
      });
  }

  function onUpdateNoteColor(noteId, color) {
    console.log(`Updating note ${noteId} with color ${color}`);

    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        console.log("Found note to update:", note);
        return { ...note, style: { ...note.style, backgroundColor: color } };
      }
      return note;
    });
    console.log("Updated notes array:", updatedNotes);
    setNotes(updatedNotes);

    const noteToUpdate = updatedNotes.find((note) => note.id === noteId);
    noteService
      .save(noteToUpdate)
      .then(() => {
        console.log("Note color updated successfully in service");
        loadNotes();
      })
      .catch((err) => console.error("Failed to save note color change", err));
  }

  function onAddNote(newNote) {
    noteService
      .save(newNote)
      .then((savedNote) => {
        setNotes((prevNotes) => [...prevNotes, savedNote]);
        showSuccessMsg("Note added successfully");
      })
      .catch((err) => {
        console.error("Error adding note", err);
        showErrorMsg("Error adding note");
      });
  }

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
  }

  function flashMsg(txt) {
    setUserMsg(txt);
    setTimeout(() => {
      setUserMsg("");
    }, 3000);
  }

  function handleUpdateNote(updatedNote) {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    // setNotes(updatedNotes);

    noteService
      .save(updatedNote)
      .then(() => {
        console.log("Note updated successfully");
      })
      .catch((err) => {
        console.error("Failed to update note", err);
      });
  }

  function onTogglePin(noteId) {
   
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
      
        return { ...note, isPinned: !note.isPinned };
      }
      return note;
    });
    setNotes(updatedNotes); 
  
   
    noteService.save(updatedNotes.find(note => note.id === noteId))
      .then(() => {
        showSuccessMsg('Note pin status toggled successfully');
      })
      .catch((err) => {
        console.error('Failed to save note pin status change', err);
        showErrorMsg('Error toggling note pin status');
      });
  }
  


if (!notes) {
  return <div>load</div>
}
  return (
    <section className="note-index">
      <NoteHeader onSetFilter={onSetFilter} filterBy={{ filterBy }} />

      <AddNotes onAddNote={onAddNote} />

      {notes && notes.some((note) => note.isPinned) && (
      <div>
    <h2>Pinned</h2>
    <React.Fragment>
      <NotePreview
        notes={notes.filter((note) => note.isPinned)}
        onRemoveNote={onRemoveNote}
        onDuplicateNote={onDuplicateNote}
        onUpdateNoteColor={onUpdateNoteColor}
        onUpdateNote={handleUpdateNote}
        onTogglePin={onTogglePin}
      />
    </React.Fragment>
      </div>
)}

{/* {notes && notes.some(note => note.isPinned) && <hr className='line-hr' />} */}

{notes && notes.some((note) => !note.isPinned) && (
      <div>
    <h2>Others</h2>
    <React.Fragment>
      <NotePreview
        notes={notes.filter((note) => !note.isPinned)}
        onRemoveNote={onRemoveNote}
        onDuplicateNote={onDuplicateNote}
        onUpdateNoteColor={onUpdateNoteColor}
        onUpdateNote={handleUpdateNote}
        onTogglePin={onTogglePin}
        
      />
    </React.Fragment>
      </div>
)}

      
      {/* <NotePreview
        notes={notes}
        onRemoveNote={onRemoveNote}
        onDuplicateNote={onDuplicateNote}
        onUpdateNoteColor={onUpdateNoteColor}
        onUpdateNote={handleUpdateNote}
        onTogglePin={onTogglePin}

      /> */}

      <UserMsg msg={userMsg} />
    </section>
  );
}
