import { GoogleLogin } from "@react-oauth/google";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      // 1️⃣ Send Google token to backend (sets cookie)
      await api.post(
        "/api/auth/google",
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      // 2️⃣ Re-check auth (updates context properly)
      await checkAuth();

      // 3️⃣ Navigate AFTER auth state updates
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Google Login Failed")}
    />
  );
};

export default GoogleLoginButton;
