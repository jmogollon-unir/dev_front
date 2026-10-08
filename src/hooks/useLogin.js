import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { buildApiUrl } from "../apiConfig";
import CryptoJS from "crypto-js";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    user,
    setUser,
    setAccessToken,
    setSessionToken,
    clearSession,
    startSessionTimer
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true);
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("CIF de empresa y contraseña son obligatorios");
      setIsLoading(false);
      return { success: false };
    }

    try {
      const hashedPassword = CryptoJS.MD5(password).toString();
      const loginData = { username, password: hashedPassword };

      const tokenUrl = buildApiUrl("USERS", "/api/v1/tokens");
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Credenciales incorrectas");
        } else {
          setError(`Error ${response.status}`);
        }
        setIsLoading(false);
        return { success: false };
      }

      const tokenData = await response.json();
      const jwt = tokenData.accessToken;
      const opaque = tokenData.sessionToken;

      if (!jwt || !opaque) {
        setError("Respuesta de autenticación inválida");
        setIsLoading(false);
        return { success: false };
      }

      const userInfoUrl = buildApiUrl("USERS", `/api/v1/users/${username}`);
      const userResponse = await fetch(userInfoUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${opaque}`
        }
      });

      if (!userResponse.ok) {
        throw new Error(`Perfil: ${userResponse.status}`);
      }

      const userData = await userResponse.json();

      // Disponible de inmediato para fetch() (p. ej. checkout) antes del commit de React.
      localStorage.setItem("rp_session_token", opaque);
      localStorage.setItem("rp_access_token", jwt);

      setSessionToken(opaque);
      setAccessToken(jwt);
      setUser({
        ...userData,
        accessToken: jwt,
        sessionToken: opaque
      });
      startSessionTimer();

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error en el servidor. Inténtalo de nuevo.");
      setIsLoading(false);
      return { success: false };
    }
  };

  const renewSession = async () => {
    const opaque = localStorage.getItem("rp_session_token");
    if (!opaque) {
      clearSession();
      navigate("/");
      return { success: false };
    }

    try {
      const renewalUrl = buildApiUrl("USERS", `/api/v1/tokens/${opaque}/renewals`);
      const response = await fetch(renewalUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(String(response.status));
      }

      const tokenData = await response.json();
      localStorage.setItem("rp_access_token", tokenData.accessToken);
      localStorage.setItem("rp_session_token", tokenData.sessionToken);
      setAccessToken(tokenData.accessToken);
      setSessionToken(tokenData.sessionToken);
      if (user) {
        setUser({
          ...user,
          accessToken: tokenData.accessToken,
          sessionToken: tokenData.sessionToken
        });
      }
      startSessionTimer();
      return { success: true };
    } catch (err) {
      console.error("Error renovando token:", err);
      clearSession();
      navigate("/");
      return { success: false };
    }
  };

  const logout = () => {
    clearSession();
    navigate("/");
  };

  return {
    login,
    logout,
    renewSession,
    isLoading,
    error,
    clearError: () => setError("")
  };
}
