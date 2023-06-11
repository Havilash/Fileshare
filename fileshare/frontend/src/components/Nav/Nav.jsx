import React, { useEffect, useState } from "react";
import { FiPlus, FiShare2, FiStar } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import Popup from "src/components/Popup/Popup"; // Import the Popup component

import "./Nav.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { name: "My Shares", path: "/myshares", icon: BiLibrary },
  { name: "Recent", path: "/recent", icon: FiStar },
];

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  async function handleCreateClick(e) {
    if (location.pathname.startsWith("/newshare")) {
      // handle creation
      try {
        const shareLink = "https://example.com/share"; // Replace with your share link
        await navigator.clipboard.writeText(shareLink);
        setShowPopup(false);
        setShowPopup(true);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    } else {
      navigate("/newshare");
    }
  }

  useEffect(() => {
    if (!showPopup) return;
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showPopup]);

  return (
    <aside>
      <nav>
        <div className="title">
          <FiShare2 className="icon" size="4rem" />
          <h1>Fileshare</h1>
        </div>
        {showPopup && <Popup message="Share Link copied to clipboard!" />}
        <button
          onClick={handleCreateClick}
          className={`button create-share ${
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
