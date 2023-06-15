import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Share.css";
import { FiFile, FiTrash2 } from "react-icons/fi";
import { mimeTypeIcons } from "src/data/mimeTypes";
import { getShare } from "src/lib/api";
import Popup from "src/components/Popup/Popup";

const colors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"];

export default function UpdateShare() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [share, setShare] = useState();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const key = searchParams.get("key");

    async function fetchShare() {
      try {
        const response = await getShare(key);
        setShare(response.data);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }

    if (key) fetchShare();
  }, []);

  useEffect(() => {
    if (!showPopup) return;
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showPopup]);

  const handleEditShare = (e) => {};

  return (
    <section className="share-page container">
      <div className="share-page__container">
        {showPopup && <Popup>Share Link copied to clipboard!</Popup>}
        <button className="button edit-share" onClick={handleEditShare}>
          Edit
        </button>
        <div className="tiles">
          {share &&
            share.files.map(
              ({ name, content, updated_at, created_at, mime_type }, index) => (
                <div
                  className="tile"
                  key={index}
                  style={{
                    backgroundColor:
                      colors[Math.floor(Math.random() * colors.length)],
                  }}
                >
                  <div className="preview">
                    {React.createElement(mimeTypeIcons[mime_type] || FiFile, {
                      size: "3em",
                    })}
                  </div>
                  <div className="details">
                    <div className="details__name">{name}</div>
                    <div className="details__date">
                      {new Date(updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
}
