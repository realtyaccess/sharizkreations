import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

interface AdminSignInModalProps {
  onClose: () => void;
}

export function AdminSignInModal({ onClose }: AdminSignInModalProps) {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(password);
    setLoading(false);
    if (ok) {
      onClose();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(8px)",
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
        border: "1px solid #D4AF3740",
        borderRadius: 16,
        padding: "2rem",
        width: "100%",
        maxWidth: 360,
        boxShadow: "0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.1)",
      }}>
        {/* Logo area */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D4AF37, #A88A20)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 0.75rem",
            fontSize: "1.5rem",
          }}>✦</div>
          <h2 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.4rem",
            color: "#f5f0e8",
            fontWeight: 400,
            marginBottom: "0.25rem",
          }}>ShaRiz Kreations</h2>
          <p style={{ color: "#888", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Sign In</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", color: "#888", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus
                style={{
                  width: "100%",
                  background: "#111",
                  border: error ? "1px solid #ef4444" : "1px solid #333",
                  borderRadius: 8,
                  padding: "0.75rem 2.5rem 0.75rem 0.875rem",
                  color: "#f5f0e8",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => { if (!error) e.target.style.borderColor = "#D4AF37"; }}
                onBlur={e => { if (!error) e.target.style.borderColor = "#333"; }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#666",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  padding: 0,
                }}
              >{showPass ? "🙈" : "👁"}</button>
            </div>
            {error && (
              <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.4rem" }}>{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              background: loading || !password
                ? "#333"
                : "linear-gradient(135deg, #D4AF37, #A88A20)",
              color: loading || !password ? "#666" : "#0a0a0a",
              border: "none",
              borderRadius: 8,
              padding: "0.75rem",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: loading || !password ? "not-allowed" : "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Signing In..." : "Sign In ✦"}
          </button>
        </form>

        <button
          onClick={onClose}
          style={{
            display: "block",
            width: "100%",
            background: "none",
            border: "none",
            color: "#555",
            fontSize: "0.75rem",
            cursor: "pointer",
            marginTop: "1rem",
            padding: "0.4rem",
          }}
        >Cancel</button>
      </div>
    </div>
  );
}
