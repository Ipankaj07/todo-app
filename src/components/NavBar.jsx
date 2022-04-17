import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <div className="logo_text" > T̷o̷d̷o̷ ̷A̷p̷p̷  </div>
      <Link to="/create">Create Todo</Link>
    </div>
  );
}

export default NavBar;
