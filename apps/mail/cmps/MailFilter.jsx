const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React



export function MailFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isNavVisible, setIsNavVisible] = useState(false);
    const toggleNavBar = () => {
        setIsNavVisible(!isNavVisible);
    }
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))

    }


    return <div className="header-mail">
        <Link to="/mail">  <img
            src="assets\img\gmail.png" className="gmail-img-header"
        ></img></Link>
        <div className="search-input">
            <form onSubmit={onFilter}>
                <input type="text"
                    id="from"
                    name="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                    placeholder="search" />
            </form>
        </div>
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
        </div>
}