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


export function NoteIndex() {
    const [notes, setNotes] = useState(null);
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter());
    const [userMsg, setUserMsg] = useState("");

    useEffect(() => {
        loadNotes()
    }, [ [filterBy]])


    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
                setNotes(notes)
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
        const newNote = { ...noteToDuplicate, id:"", createdAt: Date.now() };
        noteService.save(newNote).then(savedNote => {
            setNotes((prevNotes) => [...prevNotes, savedNote]);
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

    return (

    <section className="note-index">
        <NoteHeader
            onSetFilter={onSetFilter}
            filterBy={{ filterBy }}/>

        <AddNotes 
        onAddNote={onAddNote}  
        />



        <NotePreview
            notes={notes}
            onRemoveNote={onRemoveNote}
            onDuplicateNote={onDuplicateNote}
            onUpdateNoteColor={onUpdateNoteColor}
            />
    
        <UserMsg msg={userMsg} />
        </section>
    )
}
