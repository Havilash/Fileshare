import React from "react";
import { FiShare2 } from "react-icons/fi";

import "./Nav.css";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { name: "New Share", path: "/newshare" },
  { name: "My Shares", path: "/myshares" },
  { name: "Recent", path: "/recent" },
];

export default function Nav() {
  return (
    <aside>
      <nav>
        <div className="title">
          <FiShare2 className="icon" size="4rem" />
          <h1>Fileshare</h1>
        </div>
        <ul className="links">
          {NAV_LINKS.map((link) => (
            <li>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
