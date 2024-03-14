const { useState, useEffect } = React;
import { noteService} from "./../services/note.service.js";
import {
    eventBusService,
    showErrorMsg,
    showSuccessMsg,
  } from "../../../services/event-bus.service.js"
import { NotePreview } from "./NotePreview.jsx";
import { UserMsg } from "../cmps/UserMsg.jsx";
import { NoteHeader } from "../cmps/NoteHeader.jsx";


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
            showErrorMsg(`Book removed successfully (${noteId})`);
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

    <section>

        <NoteHeader
        onSetFilter={onSetFilter}
            filterBy={{ filterBy }}/>

        <NotePreview
            notes={notes}
            onRemoveNote={onRemoveNote}
        />
        
     
        <UserMsg msg={userMsg} />
        </section>
    )
}
