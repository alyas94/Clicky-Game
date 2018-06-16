import React from "react";
import "./Nav.css";

const Nav = props => (
  <nav>
    <ul>
      <li className="brand animated lightSpeedIn">
        <a href="#">Wizarding World of Clicks</a>
      </li>

      <li id="right-wrong" style={{ color: props.textColor }}>
        {props.rightWrong}
      </li>

      <li id="score">
        Score: {props.score} || Top Score: {props.topScore}
      </li>
    </ul>
  </nav>
);

export default Nav;
