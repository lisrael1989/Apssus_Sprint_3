const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React



export function MailFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
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
        <img
            src="assets\img\gmail.png" className="gmail-img-header"
        ></img>
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
        <nav>
            <NavLink className="fa-solid fa-house" to="/"></NavLink>
            <NavLink className="fa-solid fa-address-card" to="/about"></NavLink>
            <NavLink className="fa-solid fa-envelope-open" to="/mail"></NavLink>
            <NavLink className="fa-solid fa-note-sticky" to="/note"></NavLink>
        </nav>
    </div>
}