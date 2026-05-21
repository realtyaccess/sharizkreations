import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

interface AdminToolbarProps {
  onEditProducts: () => void;
  onEditReviews: () => void;
  onEditGallery: () => void;
  onEditSettings: () => void;
}

export function AdminToolbar({ onEditProducts, onEditReviews, onEditGallery, onEditSettings }: AdminToolbarProps) {
  const { logout } = useAdmin();
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(10, 10, 10, 0.95)",
        border: "1px solid #D4AF37",
        borderRadius: "50px",
        padding: "0.5rem 0.75rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.2)",
        backdropFilter: "blur(20px)",
        transition: "all 0.3s ease",
        maxWidth: "calc(100vw - 2rem)",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* Admin badge */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        paddingRight: "0.5rem",
        borderRight: "1px solid #333",
        marginRight: "0.25rem",
      }}>
        <span style={{ fontSize: "0.65rem", color: "#D4AF37", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          ✦ Admin Mode
        </span>
      </div>

      {/* Edit buttons */}
      <ToolbarBtn icon="🛍️" label="Products" onClick={onEditProducts} />
      <ToolbarBtn icon="⭐" label="Reviews" onClick={onEditReviews} />
      <ToolbarBtn icon="📸" label="Gallery" onClick={onEditGallery} />
      <ToolbarBtn icon="⚙️" label="Settings" onClick={onEditSettings} />

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: "#333", margin: "0 0.25rem" }} />

      {/* Sign Out */}
      <button
        onClick={logout}
        style={{
          background: "transparent",
          border: "1px solid #ef444440",
          color: "#ef4444",
          borderRadius: "50px",
          padding: "0.3rem 0.75rem",
          fontSize: "0.7rem",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#ef444420")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        Sign Out
      </button>
    </div>
  );
}

function ToolbarBtn({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(212,175,55,0.15)" : "transparent",
        border: hover ? "1px solid #D4AF3760" : "1px solid transparent",
        color: hover ? "#D4AF37" : "#c8bfa8",
        borderRadius: "50px",
        padding: "0.3rem 0.7rem",
        fontSize: "0.7rem",
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: "0.3rem",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
