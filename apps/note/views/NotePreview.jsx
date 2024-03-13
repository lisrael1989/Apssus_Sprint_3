

export function NotePreview({ notes }) {
 

  return (
    <article className="note-list">
      <ul>
        {notes && notes.map(note => (
          <li key={note.id} className="note-item">
            <div className="note-content">
              {note.type === 'NoteTxt' && <p className="type-txt">{note.info.txt}</p>}
              {note.type === 'NoteImg' && <img src={note.info.url} alt={note.info.title} className="type-url" />}
              <h3 className="note-title">{note.info.title}</h3>
            </div>
            <div className="note-actions">
              <button className="edit-btn fa-solid fa-pen-to-square"></button>
              <button className="color-btn fa-solid fa-palette"></button>
              <button className="remove-btn fa-solid fa-trash"></button>
              <button className="pinned-btn fa-solid fa-thumbtack"></button>
              <button className="send-email-btn fa-solid fa-envelope"></button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

