const { useState, useEffect } = React;
import { noteService} from "./../services/note.service.js";

import { NotePreview } from "./NotePreview.jsx";

export function NoteIndex() {
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        loadNotes()
    }, [])


    function loadNotes() {
        noteService.query()
            .then((notes) => {
                setNotes(notes)
            })
    }


    return (

    <section>
        <h1 className="note-title">Note app</h1>
        
        <NotePreview
            notes={notes}
        />
        
     
        
        </section>
    )
}
