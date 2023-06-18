import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./MyShares.css";
import { FiFile, FiPlus, FiSave, FiShare2, FiTrash2 } from "react-icons/fi";
import { mimeTypeIcons } from "src/data/mimeTypes";
import { deleteShare, getShare, updateShare } from "src/lib/api";
import Popup from "src/components/Popup/Popup";
import useLocalStorage from "src/hooks/useLocalStorage";

export default function MyShares() {
  const navigate = useNavigate();
  const [shares, setShares] = useState([]);
  const [keys, setKeys] = useLocalStorage("myShares", []);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedShare, setSelectedShare] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShares() {
      try {
        const newShares = await keys.reduce(async (acc, key) => {
          const shares = await acc;
          try {
            const response = await getShare(key);
            if (response.success === true) shares.push(response.data);
          } catch (error) {}
          return shares;
        }, Promise.resolve([]));
        setShares(newShares);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }

    if (keys) {
      fetchShares();
      const intervalId = setInterval(fetchShares, 5000);
      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  const handleDelete = async (share) => {
    setSelectedShare(share);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedShare) return;
    try {
      await deleteShare(selectedShare.key);
      setShares(shares.filter((share) => share !== selectedShare));
      setKeys(keys.filter((key) => key !== selectedShare.key));
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the share.");
    }
    setShowPopup(false);
  };

  return (
    <section className="my-shares container">
      {error && (
        <Popup>
          <p>{error}</p>
        </Popup>
      )}

      {showPopup && (
        <Popup>
          <div className="confirm-popup">
            <p>Are you sure you want to delete this share?</p>
            <div>
              <button className="button" onClick={handleConfirmDelete}>
                Yes
              </button>
              <button className="button" onClick={() => setShowPopup(false)}>
                No
              </button>
            </div>
          </div>
        </Popup>
      )}
      <ul className="shares">
        {shares
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .map((share, index) => (
            <li key={index} className="share">
              <Link className="link" to={`/share?key=${share.key}`}>
                <div className="details">
                  <FiShare2 className="icon" size="4rem" />
                  <div>
                    <h2 className="key">{share.key}</h2>
                    <p className="date">
                      {new Date(share.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                className="delete delete-button"
                onClick={() => handleDelete(share)}
              >
                <FiTrash2 size="2.4rem" />
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
