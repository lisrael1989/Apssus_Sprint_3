const { useState, useEffect } = React;
const { Link } = ReactRouterDOM


export function NoteHeader({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function onFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    console.log(value, field, type);
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }));
    console.log(filterByToEdit);
  }


    return <header className="note-header">
      
    

        <Link to="/note">
          <img
            className="keep-img animate__animated animate__bounce"
            src="assets\img\keep.png"
          ></img>
      </Link>
       
      <form onSubmit={onFilter}>
        <label htmlFor="title"></label>
        <input
          type="search"
          id="title"
          name="title"
          value= {filterByToEdit.title} 
          onChange={handleChange}
          placeholder="Search..."
        />

      </form>

    </header>
}

