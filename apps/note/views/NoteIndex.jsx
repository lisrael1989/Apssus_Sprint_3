const { useState, useEffect } = React;
import { noteService} from "./../services/note.service.js";

import { BookPreview } from "./BookPreview.jsx";

export function NoteIndex() {
    const [notes, setNotes] = useState(null);




    return (

    <section>
        <h1 className="note-title">Note app</h1>
        {/* <BookPreview
        books={books}
        
      />
         */}
        
        </section>
    )
}
