const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3 className="main-logo"><span>Aps</span>sus</h3>
        </Link>
        <nav>
            <NavLink className="fa-solid fa-house" to="/"></NavLink>
            <NavLink className="fa-solid fa-address-card" to="/about"></NavLink>
            <NavLink className="fa-solid fa-envelope-open" to="/mail"></NavLink>
            <NavLink className="fa-solid fa-note-sticky" to="/note"></NavLink>
        </nav>
    </header>
}

