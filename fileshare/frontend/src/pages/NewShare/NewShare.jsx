import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "src/hooks/useLocalStorage";
import { createShare } from "src/lib/api";

export default function NewShare() {
  const navigate = useNavigate();
  const created = useRef(false);
  const [myShares, setMyShares] = useLocalStorage("myShares", []);

  async function createNewShare() {
    try {
      const response = await createShare([]);
      setMyShares((oldMyShares) => [...oldMyShares, response.data.key]);
      navigate(`/updateshare?key=${response.data.key}`);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (created.current) return;
    createNewShare();
    created.current = true;
  }, []);

  return <div></div>;
}
