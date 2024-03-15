const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React



export function MailFilter({ onSetFilter, filterBy, isRead, setSortBy, sortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isNavVisible, setIsNavVisible] = useState(false)
    const [isSelectsVisible, setIsSelectsVisible] = useState(false)
    const toggleNavBar = () => {
        setIsNavVisible(!isNavVisible)

    }
    function toggleSelectsVisibility() {
        setIsSelectsVisible(!isSelectsVisible)
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

    function handleSortChange(ev) {
        const { name, value } = ev.target
        setSortBy(prev => ({ ...prev, [name]: value }))
    }



    function letters(body, maxLength = 23) {
        return body.length > maxLength ? body.substring(0, maxLength) + '...' : body
    }

    // if (!mails) return <div>loading...</div>
    // if (mails.length === 0) return <div>no mails...</div>

    return (
        <div className="header-mail">
            <Link to="/mail"><img src="assets/img/gmail.png" className="gmail-img-header" alt="Gmail"></img></Link>
            <div className="search-input">
                <span class="material-symbols-outlined">
                    search
                </span>
                <form onSubmit={onFilter}>
                    <input type="text"
                        id="from"
                        name="txt"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                        placeholder="search" />
                </form>
                <button onClick={toggleSelectsVisibility}><span class="material-symbols-outlined">
                    tune
                </span></button>
            </div>
            {isSelectsVisible && (

                <React.Fragment>
                    <div className="filters">
                        <select name="isRead" value={filterByToEdit.isRead} onChange={handleChange}>
                            <option value="">Unread</option>
                            <option value="1">Read</option>
                        </select>
                        <select name="time" value={sortBy.time} onChange={handleSortChange}>
                            <option value="d">Newest</option>
                            <option value="a">Oldest</option>
                        </select>
                        <select name="title" value={sortBy.title} onChange={handleSortChange}>
                            <option value="none">none</option>
                            <option value="a">Title A-Z</option>
                            <option value="d">Title Z-A</option>
                        </select>
                    </div>

                </React.Fragment>
            )}
            <div className="nav-container">
                <img className="keep-btn"
                    src="assets/img/keep-header-btn.png"
                    title="navigation to other pages"
                    alt=""
                    onClick={toggleNavBar} />

                {isNavVisible && (
                    <nav className="nav-links">
                        <NavLink className="nav-icon fa-solid fa-house" to="/"></NavLink>
                        <NavLink className="nav-icon fa-solid fa-address-card" to="/about"></NavLink>
                        <NavLink to="/mail"><img src="assets/img/gmail.png" className="gmail-note-header" alt="Gmail"></img></NavLink>
                        <NavLink to="/note"><img src="assets/img/keep.png" className="keep-nev-btn" alt="Keep"></img></NavLink>
                    </nav>
                )}
            </div>
        </div>
    )
}