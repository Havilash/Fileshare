import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Share.css";
import { FiCopy, FiFile, FiTrash2 } from "react-icons/fi";
import { mimeTypeIcons } from "src/data/mimeTypes";
import { getShare } from "src/lib/api";
import Popup from "src/components/Popup/Popup";
import { Link } from "react-router-dom";
import useLocalStorage from "src/hooks/useLocalStorage";

export default function UpdateShare() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [share, setShare] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [recentShares, setRecentShares] = useLocalStorage("recentShares", []);

  useEffect(() => {
    const key = searchParams.get("key");

    async function fetchShare() {
      try {
        const response = await getShare(key);
        setShare(response.data);
        setShareLink(window.location.href);
        setRecentShares((oldRecentShares) =>
          oldRecentShares.includes(key)
            ? oldRecentShares
            : [...oldRecentShares, key]
        );
      } catch (error) {
        console.error(error);
      }
    }

    if (key) {
      fetchShare();
      const intervalId = setInterval(fetchShare, 5000);
      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    if (!showPopup) return;
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showPopup]);

  const handleCopyLink = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Use the Clipboard API to copy the text
      try {
        await navigator.clipboard.writeText(shareLink);
        console.log("Share link copied to clipboard");
        setShowPopup(true);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = shareLink;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setShowPopup(true);
    }
  };

  if (!share)
    return <section className="share-page container">Share Not Found</section>;

  return (
    <section className="share-page container">
      <div className="share-page__container">
        {showPopup && <Popup>Share Link copied to clipboard!</Popup>}
        <div className="top">
          <div className="share-link">
            <input type="text" value={shareLink} readOnly />
            <button className="copy-button" onClick={handleCopyLink}>
              <FiCopy />
            </button>
          </div>
          <Link
            className="button edit-share"
            to={`/updateshare?key=${share?.key}`}
          >
            Edit
          </Link>
        </div>
        {(!share?.files || share?.files.length === 0) && (
          <div className="no-files">
            <h3>No Files</h3>
          </div>
        )}

        <div className="tiles">
          {share?.files &&
            share.files.map(
              ({ name, content, updated_at, created_at, mime_type }, index) => (
                <div className="tile" key={index} title={name}>
                  <a
                    className="link"
                    href={content}
                    download={name || "download"}
                  >
                    <div className="content">
                      {React.createElement(mimeTypeIcons[mime_type] || FiFile, {
                        size: "5rem",
                      })}
                    </div>
                    <div className="details">
                      <div className="details__name">{name}</div>
                      <div className="details__date">
                        {new Date(updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </a>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
}
