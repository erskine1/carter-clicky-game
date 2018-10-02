import React from "react";
import "./Nav.css";

const Nav = props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="/">Many Carters</a>  
    <li className="nav-item">{props.message}</li>
    <li className="nav-item">
     Score: {props.score}  | High Score: {props.highScore}
    </li>
  </nav>
);

export default Nav;
