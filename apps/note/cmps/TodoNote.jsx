

export function TodoNote({ note }) {
  return (
    <div className="todo-note">
    <ul style={{ listStyleType: "none", padding: 0 }} >
      {note.info.todos.map((todo, index) => (
        <li key={index}>
          <label >
          <input type="checkbox" />
          <span className="label">{todo.txt }</span>
          </label>
           </li>
      ))}
    </ul>
    </div>
  );
}