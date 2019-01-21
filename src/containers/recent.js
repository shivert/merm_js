import React from "react";
import { Link } from "react-router-dom";

const Recent = () => {
  return (
    <div>
      <h1>Recent</h1>

      <h2>Get Started</h2>
      <ol>
        <li>
          Review the <Link to="/fuel-savings">demo app</Link>
        </li>
        <li>Remove the demo and start coding: npm run remove-demo</li>
      </ol>
    </div>
  );
};

export default Recent;
