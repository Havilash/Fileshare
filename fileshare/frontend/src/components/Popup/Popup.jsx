import React, { useState, useEffect } from "react";
import "./Popup.css";

function Popup({ message }) {
  return (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
}

export default Popup;
