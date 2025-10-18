const React = require("react");
const { useEffect } = React;
const { useNavigate } = require("react-router-dom");

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Sab jagah se clear karo
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.clear();

    // Agar cookie based token use kar rahe ho toh
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Thoda delay dekar navigate
    setTimeout(() => {
      navigate("/login");
    }, 100);
  }, [navigate]);

  return null;
}

module.exports = Logout;
