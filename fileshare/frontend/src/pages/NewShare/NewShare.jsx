import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createShare } from "src/lib/api";

export default function NewShare() {
  const navigate = useNavigate();

  useEffect(() => {
    async function createNewShare() {
      try {
        const response = await createShare([]);
        navigate(`/updateshare?key=${response.data.key}`);
      } catch (error) {
        console.error(error);
      }
    }

    createNewShare();
  }, []);

  return <div></div>;
}
