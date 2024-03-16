
export function Team() {
  return (
    <section>
      <h2 className="title-our-team">Meet the team</h2>
        <div className="team-section">
          <div className="team-member">
            <h3 className="member-name">Israel Litvak</h3> 
              <img className="member-img" src="assets/img/israel.jpg" alt="Israel Litvak" />

          <div className="btn-social"> 
          <a className="git-btn" href="https://github.com/lisrael1989" target="_blank"
          ><i className="fa-brands fa-github"></i></a>

         <a
          className="linkedin-btn"
          href="https://www.linkedin.com/in/israel-litvak-28baa682/" target="_blank">
            <i className="fa-brands fa-linkedin"></i></a>


          </div>
      </div>
      
        <div className="team-member">
         <h3 className="member-name">Ben Goldberger</h3> 
          <img className="member-img" src="assets/img/ben.jpeg" alt="Ben Goldberger" />

          <div className="btn-social"> 
          <a className="git-btn" href="https://github.com/bengold1999" target="_blank">
            <i className="fa-brands fa-github"></i></a>

         <a
          className="linkedin-btn"
          href="https://www.linkedin.com/in/ben-goldberger-290b8b23a/" target="_blank" >
            <i className="fa-brands fa-linkedin"></i></a>


          </div>

      </div>
    </div>
    </section>
  );
}

