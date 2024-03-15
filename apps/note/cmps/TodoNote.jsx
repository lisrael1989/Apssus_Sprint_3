

export function TodoNote({ note }) {
  return (
    <ul>
      {note.info.todos.map((todo, index) => (
        <li key={index}>{todo.txt}</li>
        
      ))}
    </ul>
  );
}