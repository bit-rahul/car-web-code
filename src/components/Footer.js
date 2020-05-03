import React from 'react';
import '../App.css';

function Footer() {
  return (
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">Rent Vroom</h1>

          <h2 className="foot">Rent Vroom Pvt. Ltd.</h2>

          <address className="add">
            No. 296, 3rd Cross Rd, Jakkasandra, 1st Block, Koramangla
            <br />
            Bengaluru, Karnataka 560034
          </address>
        </div>
        <div style={{ marginBottom: "25px" }}>
          <i className="fab fa-twitter">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
          <i className="fab fa-instagram">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
          <i className="fab fa-linkedin"></i>
        </div>
        <br />
        <div></div>
        <div className="legal">
          <span>Home &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <span>Contact &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <span>About</span>

          <div className="legal__links">
            <span>Privacy Policy &emsp; &ensp;
              </span>
            <span />
            <span className="legal_links">
              Terms Of Services
            </span>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
