import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShare } from "src/lib/api";

export default function NewShare() {
  const navigate = useNavigate();
  const created = useRef(false);

  async function createNewShare() {
    try {
      const response = await createShare([]);
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
