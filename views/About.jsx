import { AppHeader } from "../cmps/AppHeader.jsx"
const { Link, NavLink, Outlet } = ReactRouterDOM;

export function About() {
    return (<React.Fragment>
        <AppHeader />
        <section className="about">
      <nav className="about-nav">
        <NavLink to="/about/team"> Our Team</NavLink> |
        <NavLink to="/about/vision"> Our Vision</NavLink>
      </nav>
      <div>
        <h2 className="Goal-title">Our GOAL</h2>
       <p>Apssus simplifies your digital life by merging your favorite apps into one seamless interface. <br />
        Our goal is to enhance productivity and minimize digital clutter, making your online activities more efficient and focused.</p>
      </div>
     
      <Outlet />
    </section>
    </React.Fragment>
    )
}

