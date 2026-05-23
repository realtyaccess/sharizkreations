import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  token: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  token: null,
  login: async () => false,
  logout: () => {},
});

const STORAGE_KEY = "shariz_admin_token";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Restore JWT session from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // Validate token is not expired (basic check)
      try {
        const payload = JSON.parse(atob(saved.split(".")[1]));
        if (payload.exp * 1000 > Date.now()) {
          setToken(saved);
          setIsAdmin(true);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  async function login(password: string): Promise<boolean> {
    try {
      const resp = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!resp.ok) return false;
      const data = await resp.json();
      if (data.token) {
        setToken(data.token);
        setIsAdmin(true);
        localStorage.setItem(STORAGE_KEY, data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function logout() {
    setIsAdmin(false);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AdminContext.Provider value={{ isAdmin, token, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
