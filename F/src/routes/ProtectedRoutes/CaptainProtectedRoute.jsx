import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function CaptainProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [captain, setCaptain] = useState(null);

  useEffect(() => {
    const fetchCaptain = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/captain/profile",
          { withCredentials: true },
        );

        setCaptain(res.data.captain);
      } catch (error) {
        setCaptain(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCaptain();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!captain) return <Navigate to="/captain-login" />;

  return children;
}

export default CaptainProtectedRoute;
