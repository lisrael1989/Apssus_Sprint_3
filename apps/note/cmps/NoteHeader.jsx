const { useState, useEffect } = React;
const { Link,NavLink } = ReactRouterDOM


export function NoteHeader({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNavBar = () => {
    setIsNavVisible(!isNavVisible);
  };

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
            className="keep-img-header"
            src="assets\img\keep.png"
            title="go back to notes"
          ></img>
      </Link>
      <h1 className="keep-name">keep</h1>
      
      <form className="search-header" onSubmit={onFilter}>
        <label htmlFor="title"></label>
        <input
          type="search"
          id="title"
          className="title"
          name="title"
          title="search by txt or title"
          value= {filterByToEdit.title} 
          onChange={handleChange}
          placeholder="Search..."
        />
      </form>
      <div className="nav-container">
        <img className="keep-btn" 
        src="assets\img\keep-header-btn.png" 
        title="navigation to other pages"
        alt=""
        onClick={toggleNavBar}/>

        {isNavVisible &&  (
        <nav className="nav-links">
            <NavLink className=" nav-icon fa-solid fa-house" to="/"></NavLink>
            <NavLink className=" nav-icon fa-solid fa-address-card" to="/about"></NavLink>
            <NavLink to="/mail"><img
            src="assets\img\gmail.png" className="gmail-note-header"
        ></img></NavLink>
            <NavLink to="/note"> <img
            className="keep-nev-btn"
          src="assets\img\keep.png"></img>
            </NavLink>
        </nav>
        )}
        </div>
    </header>
}


