import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="w-[90%] m-auto flex items-center justify-between py-3">
        <div>
          <NavLink to="/">Logo</NavLink>
        </div>
        <div className="flex gap-5">
          <NavLink to="/login">
            <button className="border px-5 py-2 rounded-lg">Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="border px-5 py-2 rounded-lg">Regiter</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
