const { useState, useEffect } = React;
import { noteService} from "./../services/note.service.js";
import { utilService} from "../../../services/util.service.js";
import {
    eventBusService,
    showErrorMsg,
    showSuccessMsg,
  } from "../../../services/event-bus.service.js"

import { NotePreview } from "./NotePreview.jsx";
import { UserMsg } from "../cmps/UserMsg.jsx";
import { NoteHeader } from "../cmps/NoteHeader.jsx";
import { AddNotes } from "../cmps/AddNotes.jsx";
import { TodoNote} from "../cmps/TodoNote.jsx";


    export function NoteIndex() {
    const [notes, setNotes] = useState([]);
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter());
    const [userMsg, setUserMsg] = useState("");
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [unpinnedNotes, setUnpinnedNotes] = useState([]);

    useEffect(() => {
        loadNotes()
    }, [filterBy])


    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
              const pinned = notes.filter(note => note.isPinned);
              const unpinned = notes.filter(note => !note.isPinned);
              setPinnedNotes(pinned);
              setUnpinnedNotes(unpinned);
            })
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
        
        noteService.save(newNote).then(savedNote => {
          setNotes(prevNotes => [...prevNotes, savedNote]);
          showSuccessMsg('Note duplicated successfully');
        }).catch(err => {
          console.error('Error duplicating note', err);
          showErrorMsg('Error duplicating note');
        });
      }
      
  
      function onUpdateNoteColor(noteId, color) {
        console.log(`Updating note ${noteId} with color ${color}`); 
    
        const updatedNotes = notes.map((note) => {
            if (note.id === noteId) {
                console.log('Found note to update:', note); 
                return { ...note, style: { ...note.style, backgroundColor: color } };
            }
            return note;
        });
        console.log('Updated notes array:', updatedNotes); 
        setNotes(updatedNotes);
    
        const noteToUpdate = updatedNotes.find(note => note.id === noteId);
        noteService.save(noteToUpdate).then(() => {
            console.log('Note color updated successfully in service'); 
            loadNotes(); 
        }).catch(err => console.error('Failed to save note color change', err));
    }
    
    function onAddNote(newNote) {
      noteService.save(newNote).then(savedNote => {
          setNotes((prevNotes) => [...prevNotes, savedNote]);
          showSuccessMsg('Note added successfully');
      }).catch(err => {
          console.error('Error adding note', err);
          showErrorMsg('Error adding note');
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
        const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
        setNotes(updatedNotes);
    
        noteService.save(updatedNote).then(() => {
            console.log('Note updated successfully');
        }).catch(err => {
            console.error('Failed to update note', err);
        });
    }

    function togglePin(noteId) {
      const allNotes = [...pinnedNotes, ...unpinnedNotes];
      const noteIndex = allNotes.findIndex(note => note.id === noteId);
      if (noteIndex !== -1) {
          allNotes[noteIndex].isPinned = !allNotes[noteIndex].isPinned;
          noteService.save(allNotes[noteIndex]).then(() => {
              const pinned = allNotes.filter(note => note.isPinned);
              const unpinned = allNotes.filter(note => !note.isPinned);
              setPinnedNotes(pinned);
              setUnpinnedNotes(unpinned);
          }).catch(err => console.error('Failed to save note', err));
      }
  }
  

    return (

    <section className="note-index">
        <NoteHeader
            onSetFilter={onSetFilter}
            filterBy={{ filterBy }}/>

        <AddNotes 
        onAddNote={onAddNote}  
        />

        <h2 className="Pinned-Notes">Pinned</h2>
        <NotePreview
          notes={pinnedNotes}
          onRemoveNote={onRemoveNote}
          onDuplicateNote={onDuplicateNote}
          onUpdateNoteColor={onUpdateNoteColor}
          onUpdateNote={handleUpdateNote}
          onTogglePin={togglePin}
        />


        <h2 className="Unpinned-Notes">Others</h2>
        <NotePreview
          notes={unpinnedNotes}
          onRemoveNote={onRemoveNote}
          onDuplicateNote={onDuplicateNote}
          onUpdateNoteColor={onUpdateNoteColor}
          onUpdateNote={handleUpdateNote}
          onTogglePin={togglePin}
        />
    
        <UserMsg msg={userMsg} />
        </section>
    )
}
