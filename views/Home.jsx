const { Link } = ReactRouterDOM;

export function Home() {
  return (
    <section className="home  ">
      <div>
        <h1 className="home-title">
          <span>Welcome</span> to <span> Apssus</span> App
        </h1>
        <h2 className="sub-title-home">Let's start the journey...</h2>
      </div>
      <div>
      <Link to="/mail">
          <img
            className="gmail-img animate__animated animate__bounce"
            src="assets\img\gmail.png"
          ></img>
          </Link>

          <Link to="/note">
          <img
            className="keep-img animate__animated animate__bounce"
            src="assets\img\keep.png"
          ></img>
      </Link>
      </div>
    </section>
  );
}
