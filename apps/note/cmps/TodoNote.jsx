

export function TodoNote({ note, onUpdateNote }) {
  const handleCheckboxChange = (todoIndex) => {
    const updatedTodos = note.info.todos.map((todo, index) => {
      if (index === todoIndex) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    onUpdateNote({ ...note, info: { ...note.info, todos: updatedTodos } });
  };



  return (
    <div className="todo-note">
    <ul style={{ listStyleType: "none", padding: 0 }} >
      {note.info.todos.map((todo, index) => (
        <li key={index}>
          <label >
          <input type="checkbox" checked={todo.checked} onChange={() => handleCheckboxChange(index)}/>
          <span className="label">{todo.txt }</span>
          </label>
           </li>
      ))}
    </ul>
    </div>
  );
}