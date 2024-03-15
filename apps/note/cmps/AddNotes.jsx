const {useState}=React



export function AddNotes() {


    return (
      <div className="note-input-container">
        <input type="text" placeholder="Take a note..." className="note-input" />
        <button className="todo-btn"><i className="fas fa-regular fa-square-check"></i></button>
        <button className="txt-btn"><i className="fas a-solid fa-pencil"></i></button>
        <button className="video-btn"><i className="fas fa-video"></i></button>
        <button className="img-btn"><i className="fas fa-regular fa-image"></i></button>
      </div>
    );
  }
  

