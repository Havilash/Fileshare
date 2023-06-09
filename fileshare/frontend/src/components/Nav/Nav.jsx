import React, { useEffect, useState } from "react";
import { FiPlus, FiShare2, FiStar } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import Popup from "src/components/Popup/Popup"; // Import the Popup component
import { FiMenu, FiX } from "react-icons/fi";

import "./Nav.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { name: "My Shares", path: "/myshares", icon: BiLibrary },
  { name: "Recent", path: "/recent", icon: FiStar },
];

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  async function handleCreateClick(e) {
    if (location.pathname.startsWith("/newshare")) {
      // handle creation
      try {
        const shareLink = "https://example.com/share"; // Replace with your share link
        await navigator.clipboard.writeText(shareLink);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    } else {
      navigate("/newshare");
    }
  }

  const handleHamburgerClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <button className="hamburger button" onClick={handleHamburgerClick}>
        {isNavOpen ? <FiX size="3rem" /> : <FiMenu size="3rem" />}
      </button>
      <aside className={`${isNavOpen ? "open" : ""}`}>
        <nav>
          <div className="title">
            <FiShare2 className="icon" size="4rem" />
            <h1>Fileshare</h1>
          </div>
          <button onClick={handleCreateClick} className="button create-share">
            <FiPlus />
            Create Share
          </button>
          <ul className="links">
            {NAV_LINKS.map((link, index) => (
              <li
                key={index}
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
    </>
  );
}
