import React from "react";
import { NavLink } from "react-router";

function NavBar() {
  const menus = [
    { id: 1, menu: "Home", path: "/" },
    { id: 2, menu: "Register", path: "/register" },
  ];

  return (
    <nav className="h-14 bg-pink-500 flex items-center gap-6 px-8">
      {menus.map((item) => (
        <NavLink
          className="text-white cursor-pointer hover:underline hover:text-pink-300"
          key={item.id}
          to={item.path}
        >
          {item.menu}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBar;
