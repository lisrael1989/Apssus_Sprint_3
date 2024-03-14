const { useState, useEffect } = React;
const { Link,NavLink } = ReactRouterDOM


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
            className="keep-img-header animate__animated animate__bounce"
            src="assets\img\keep.png"
          ></img>
      </Link>

     
      <form className="search-header" onSubmit={onFilter}>
        <label htmlFor="title"></label>
        <input
          type="search"
          id="title"
          className="title"
          name="title"
          value= {filterByToEdit.title} 
          onChange={handleChange}
          placeholder="Search..."
        />
      </form>
        <img className="keep-btn" src="assets\img\keep-header-btn.png" alt="" />
      {/* <nav>
             <NavLink className="fa-solid fa-house" to="/"></NavLink>
            <NavLink className="fa-solid fa-address-card" to="/about"></NavLink>
            <NavLink className="fa-solid fa-envelope-open" to="/mail"></NavLink>
            <NavLink className="fa-solid fa-note-sticky" to="/note"></NavLink>
        </nav> */}

    </header>
}

