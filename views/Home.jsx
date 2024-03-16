const { Link } = ReactRouterDOM;
import { AppHeader } from "../cmps/AppHeader.jsx"

export function Home() {
  return (
    <React.Fragment>
    <AppHeader/>
    <section className="home  ">
      <div>
        <h1 className="home-title">
          <span>Welcome</span> to <span> Apssus</span>
        </h1>
        <h2 className="sub-title-home">Let's start the journey...</h2>
      </div>
      <div className="gmail-note-icons">
      <Link to="/mail">
          <img
            className="gmail-img "
            src="./assets/img/gmail.png"
          ></img>
          </Link>

          <Link to="/note">
          <img
            className="keep-img"
            src="./assets/img/keep.png"
          ></img>
      </Link>
      </div>
    </section>
    </React.Fragment>

  );
}
