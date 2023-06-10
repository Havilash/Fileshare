import React, { useState } from "react";
import "./NewShare.css";
import { FiFile } from "react-icons/fi";

export default function NewShare() {
  const [data, setData] = useState([
    {
      name: "",
      content: null,
      updated_at: new Date(),
      created_at: new Date(),
    },
  ]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, content: url, updated_at: new Date() } : item
        )
      );
    }
  };

  const handleDelete = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <section className="new-share container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Content</th>
            <th>Last Modified</th>
            <th>Created</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(event) =>
                    setData((prevData) =>
                      prevData.map((dataItem, i) =>
                        i === index
                          ? { ...dataItem, name: event.target.value }
                          : dataItem
                      )
                    )
                  }
                />
              </td>
              <td>
                <div className="group">
                  {item.content && (
                    <a href={item.content} target="_blank" rel="noreferrer">
                      <FiFile size="2rem" />
                    </a>
                  )}
                  <input
                    type="file"
                    onChange={(event) => handleFileChange(event, index)}
                  />
                </div>
              </td>
              <td>{item.updated_at.toLocaleDateString()}</td>
              <td>{item.created_at.toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
