import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Auth is not used in this project — redirect straight to home
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}
