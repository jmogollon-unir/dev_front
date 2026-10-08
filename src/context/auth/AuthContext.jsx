import React, { createContext, useState, useEffect, useRef } from "react";

export const AuthContext = createContext();

const STORAGE_USER = "rp_user";
const STORAGE_SESSION = "rp_session_token";
const STORAGE_ACCESS = "rp_access_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(STORAGE_ACCESS));
  const [sessionToken, setSessionToken] = useState(() => localStorage.getItem(STORAGE_SESSION));
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const sessionTimerRef = useRef(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_USER);
    }
  }, [user]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(STORAGE_ACCESS, accessToken);
    } else {
      localStorage.removeItem(STORAGE_ACCESS);
    }
  }, [accessToken]);

  useEffect(() => {
    if (sessionToken) {
      localStorage.setItem(STORAGE_SESSION, sessionToken);
    } else {
      localStorage.removeItem(STORAGE_SESSION);
    }
  }, [sessionToken]);

  const clearSession = () => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    setUser(null);
    setAccessToken(null);
    setSessionToken(null);
    setShowRenewalModal(false);
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_ACCESS);
    localStorage.removeItem(STORAGE_SESSION);
  };

  const startSessionTimer = () => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
    }
    sessionTimerRef.current = setTimeout(() => {
      setShowRenewalModal(true);
    }, 4 * 60 * 1000);
  };

  useEffect(() => {
    if (accessToken) {
      startSessionTimer();
    }
    return () => {
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current);
      }
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        sessionToken,
        setSessionToken,
        clearSession,
        showRenewalModal,
        setShowRenewalModal,
        startSessionTimer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
