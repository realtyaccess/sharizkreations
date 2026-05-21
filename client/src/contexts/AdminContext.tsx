import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  login: async () => false,
  logout: () => {},
});

// Simple admin password stored in env or hardcoded for now
const ADMIN_PASSWORD = "shariz2026";
const STORAGE_KEY = "shariz_admin_session";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Restore session from localStorage
    const session = localStorage.getItem(STORAGE_KEY);
    if (session === "authenticated") {
      setIsAdmin(true);
    }
  }, []);

  async function login(password: string): Promise<boolean> {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEY, "authenticated");
      return true;
    }
    return false;
  }

  function logout() {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
