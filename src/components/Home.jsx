import "../Home.css";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Logo />
      <div className="flexGapStyle">
        <Link to="/calendar">
          <button className="button">Calendar</button>
        </Link>
        <button className="button" onClick={() => {setIsLoggedIn(!isLoggedIn)}}>{isLoggedIn ? "Logout" : "Login"}</button>
      </div>
      <div className="intro-section">
        <div className="text-content">
          <h1 className="header">
            Welcome to Link<span id="highlight">U</span>p
          </h1>
          <h3 className="subheader">Where Schedules Meet.</h3>
          <p className="desc">
            <em>
              LinkUp is a shared online calendar built for friend groups and
              teams. Everyone logs in, adds their availability, and LinkUp shows
              when y’all are all free — simple.
            </em>
          </p>
        </div>
        <img
          className="hero-image"
          src="/illus.png"
          alt="LinkUp calendar illustration"
        />
      </div>
    </div>
  );
}
