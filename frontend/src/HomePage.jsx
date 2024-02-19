import React from "react";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div>
      <div className="main-wrapper">
        <header id="header">
          <div className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              title="Web development logo"
              fill="none"
              stroke="#0E1A27"
              strokeWidth="8"
              width="50"
              height="50"
            >
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="22" />
              <circle cx="50" cy="50" r="4" />
            </svg>{" "}
            Web Development
          </div>

          <nav id="nav-bar">
            <ul>
              <li>
                <a className="nav-link" href="#features">
                  Heading1
                </a>
              </li>
              <li>
                <a className="nav-link" href="#how-it-works">
                  Heading2
                </a>
              </li>
              <li>
                <a className="nav-link" href="#pricing">
                  Heading3
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <section id="hero">
          <h1>Home Page</h1>
          <form id="form" action="">
            <input
              id="submit"
              type="submit"
              value="Get Started"
              className="btn"
            />
          </form>
        </section>

        <div className="container">
          <section id="features">
            <h2>Learning Section</h2>
          </section>
        </div>

        <footer>
          <ul>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <span>Copyright 2024, Web Development</span>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
