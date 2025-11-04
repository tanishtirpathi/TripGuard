import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // ✅ Tell backend to clear HttpOnly cookies
        await api.get("/api/auth/logout", { withCredentials: true });

        // ✅ Reset local state
        setUser(null);

        // ✅ Redirect after short delay
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (err) {
        console.error("Logout failed:", err.message);
        navigate("/login");
      }
    };

    logoutUser();
  }, [navigate, setUser]);

  return null;
}

export default Logout;
