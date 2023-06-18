import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./MyShares.css";
import { FiFile, FiPlus, FiSave, FiTrash2 } from "react-icons/fi";
import { mimeTypeIcons } from "src/data/mimeTypes";
import { deleteShare, getShare, updateShare } from "src/lib/api";
import Popup from "src/components/Popup/Popup";

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function MyShares() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [key, setKey] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const key = searchParams.get("key");
    setKey(key);

    async function fetchShare() {
      try {
        const response = await getShare(key);
        setData(response.data.files);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }

    if (key) fetchShare();
  }, []);

  const handleContentChange = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        return setError("The size of the content must not exceed 500MB.");
      }
      const content = await toBase64(file);
      setData((prevData) =>
        prevData.map((item, i) =>
          i === index
            ? {
                ...item,
                name: file.name,
                content,
                mime_type: file.type || "plain/text",
                updated_at: new Date().toLocaleDateString(),
              }
            : item
        )
      );
    }
  };

  const handleDelete = async (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleNameChange = async (event, index) => {
    const newName = event.target.value;
    setError("");
    if (!newName) setError("The file name must be set.");
    if (data.some((item) => item.name === newName))
      setError(`A file with the name "${newName}" already exists.`);

    if (!error) {
      setData((prevData) =>
        prevData.map((dataItem, i) =>
          i === index ? { ...dataItem, name: newName } : dataItem
        )
      );
    }
  };

  const handleCreateFile = async () => {
    setError("");
    if (data.some((item) => item.name === "New file"))
      return setError('A file with the name "New file" already exists.');

    setData((prevData) => [
      ...prevData,
      {
        name: "New file",
        content: null,
        mime_type: "",
        updated_at: new Date().toLocaleDateString(),
        created_at: new Date().toLocaleDateString(),
      },
    ]);
  };

  const handleSave = async () => {
    setError("");
    if (data.some((item) => !item.content))
      return setError("All files must have content.");
    if (new Set(data.map((item) => item.name)).size !== data.length)
      return setError("All file names must be unique.");
    if (data.some((item) => item.content.length > 500 * 1024 * 1024))
      return setError("The size of the content must not exceed 500MB.");

    try {
      const response = await updateShare(key, data);
      navigate(`/share?key=${key}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteShare = async () => {
    setShowPopup(true);
  };

  const handleConfirmDeleteShare = async () => {
    try {
      await deleteShare(key);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="MyShares-share container">
      <div className="MyShares-share__container">
        {showPopup && (
          <Popup>
            <div className="confirm-popup">
              <p>Are you sure you want to delete this share?</p>
              <div>
                <button className="button" onClick={handleConfirmDeleteShare}>
                  Yes
                </button>
                <button className="button" onClick={() => setShowPopup(false)}>
                  No
                </button>
              </div>
            </div>
          </Popup>
        )}
        <table>
          <tbody>
            {data.map(
              ({name, created_at}, index) => (
                <tr key={index}>
                  <td className="file">
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => handleNameChange(event, index)}
                    />
                    <button
                      className="delete delete-button"
                      onClick={() => handleDelete(index)}
                    >
                      <FiTrash2 size="1.5rem" />
                    </button>

                    {new Date(created_at).toLocaleDateString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}