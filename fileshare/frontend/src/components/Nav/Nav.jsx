import React from "react";
import { FiPlus, FiShare2, FiStar } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";

import "./Nav.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { name: "New Share", path: "/newshare", icon: FiShare2 },
  { name: "My Shares", path: "/myshares", icon: BiLibrary },
  { name: "Recent", path: "/recent", icon: FiStar },
];

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleCreateClick(e) {
    if (location.pathname.startsWith("/newshare")) {
      // handle creation
    } else {
      navigate("/newshare");
    }
  }

  return (
    <aside>
      <nav>
        <div className="title">
          <FiShare2 className="icon" size="4rem" />
          <h1>Fileshare</h1>
        </div>
        <button
          onClick={handleCreateClick}
          className={`create-share ${
            location.pathname.startsWith("/newshare") && "active"
          }`}
        >
          <FiPlus />
          Create Share
        </button>
        <ul className="links">
          {NAV_LINKS.map((link) => (
            <li
              className={`link ${
                location.pathname.startsWith(link.path) && "active"
              }`}
            >
              <Link to={link.path}>
                <link.icon size="3rem" />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
