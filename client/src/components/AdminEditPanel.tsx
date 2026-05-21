import { useState, useRef } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import {
  ApiProduct, ApiReview, ApiGalleryItem, ApiSettings,
  adminUpdateProduct, adminCreateProduct, adminDeleteProduct,
  adminCreateReview, adminUpdateReview, adminDeleteReview,
  adminAddGalleryItem, adminDeleteGalleryItem,
  adminSaveSettings, adminUploadImage,
} from "@/lib/api";

// ─── Re-export types for Home.tsx compatibility ───────────────────────────────
export type AdminProduct = ApiProduct;
export type AdminReview = ApiReview;
export type AdminGalleryPhoto = ApiGalleryItem;
export type AdminSettings = ApiSettings;

type PanelMode = "products" | "reviews" | "gallery" | "settings";

interface AdminEditPanelProps {
  mode: PanelMode;
  onClose: () => void;
  products: AdminProduct[];
  reviews: AdminReview[];
  galleryPhotos: ApiGalleryItem[];
  settings: AdminSettings;
  onSaveProducts: (products: AdminProduct[]) => void;
  onSaveReviews: (reviews: AdminReview[]) => void;
  onSaveGallery: (photos: ApiGalleryItem[]) => void;
  onSaveSettings: (settings: AdminSettings) => void;
}

// ─── Main Panel ───────────────────────────────────────────────────────────────
export function AdminEditPanel({
  mode, onClose,
  products, reviews, galleryPhotos, settings,
  onSaveProducts, onSaveReviews, onSaveGallery, onSaveSettings,
}: AdminEditPanelProps) {
  const titles: Record<PanelMode, string> = {
    products: "🛍️ Edit Products",
    reviews: "⭐ Edit Reviews",
    gallery: "📸 Edit Gallery",
    settings: "⚙️ Site Settings",
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 99998,
      display: "flex",
      alignItems: "stretch",
    }}>
      {/* Backdrop */}
      <div style={{ flex: 1, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={onClose} />

      {/* Panel */}
      <div style={{
        width: "min(480px, 100vw)",
        background: "#0f0f0f",
        borderLeft: "1px solid #D4AF3730",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        boxShadow: "-24px 0 64px rgba(0,0,0,0.8)",
      }}>
        {/* Header */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid #222",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "#0f0f0f",
          zIndex: 10,
        }}>
          <h2 style={{ color: "#D4AF37", fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", fontWeight: 500, margin: 0 }}>
            {titles[mode]}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1.2rem", padding: "0.25rem" }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "1.25rem 1.5rem" }}>
          {mode === "products" && <ProductsEditor products={products} onSave={onSaveProducts} />}
          {mode === "reviews" && <ReviewsEditor reviews={reviews} onSave={onSaveReviews} />}
          {mode === "gallery" && <GalleryEditor photos={galleryPhotos} onSave={onSaveGallery} />}
          {mode === "settings" && <SettingsEditor settings={settings} onSave={onSaveSettings} />}
        </div>
      </div>
    </div>
  );
}

// ─── Products Editor ──────────────────────────────────────────────────────────
function ProductsEditor({ products, onSave }: { products: AdminProduct[]; onSave: (p: AdminProduct[]) => void }) {
  const { token } = useAdmin();
  const [items, setItems] = useState<AdminProduct[]>(products);
  const [editing, setEditing] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateItem(id: number, field: keyof AdminProduct, value: any) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  }

  async function handleSaveProduct(product: AdminProduct) {
    if (!token) return;
    setSaving(product.id);
    setError(null);
    try {
      await adminUpdateProduct(token, product.id, product);
      setSaved(product.id);
      setTimeout(() => setSaved(null), 2000);
      onSave(items);
    } catch (err) {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(null);
    }
  }

  const availOptions = ["Taking Orders", "Limited Stock", "Always Available", "Sold Out"];

  return (
    <div>
      {error && <div style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.75rem", padding: "0.5rem", background: "#ef444420", borderRadius: 6 }}>{error}</div>}
      {items.map(product => (
        <div key={product.id} style={{
          background: "#161616",
          border: editing === product.id ? "1px solid #D4AF3760" : "1px solid #222",
          borderRadius: 10,
          marginBottom: "0.75rem",
          overflow: "hidden",
        }}>
          {/* Product header - always visible */}
          <div
            style={{ padding: "0.875rem 1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            onClick={() => setEditing(editing === product.id ? null : product.id)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {product.images?.[0] && (
                <img src={product.images[0]} alt={product.name} style={{ width: 44, height: 44, borderRadius: 6, objectFit: "cover" }} />
              )}
              <div>
                <p style={{ color: "#f5f0e8", fontSize: "0.85rem", fontWeight: 500, margin: 0 }}>{product.name}</p>
                <p style={{ color: "#D4AF37", fontSize: "0.75rem", margin: "0.1rem 0 0" }}>
                  {product.actual_price ? `From $${product.actual_price} CAD` : "Custom Quote"} · {product.availability}
                </p>
              </div>
            </div>
            <span style={{ color: "#555", fontSize: "0.8rem" }}>{editing === product.id ? "▲" : "▼"}</span>
          </div>

          {/* Expanded edit form */}
          {editing === product.id && (
            <div style={{ padding: "0 1rem 1rem", borderTop: "1px solid #222" }}>
              <Field label="Product Name" value={product.name} onChange={v => updateItem(product.id, "name", v)} />
              <Field label="Subtitle" value={product.subtitle || ""} onChange={v => updateItem(product.id, "subtitle", v)} />
              <Field label="Tag / Category" value={product.tag || ""} onChange={v => updateItem(product.id, "tag", v)} />
              <Field label="Price (CAD, numbers only)" value={String(product.actual_price || "")} onChange={v => updateItem(product.id, "actual_price", parseFloat(v) || null)} />
              <Field label="Description" value={product.description || ""} onChange={v => updateItem(product.id, "description", v)} multiline />

              <div style={{ marginTop: "0.75rem" }}>
                <label style={labelStyle}>Availability</label>
                <select
                  value={product.availability}
                  onChange={e => updateItem(product.id, "availability", e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {availOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div style={{ marginTop: "0.75rem" }}>
                <label style={labelStyle}>Product Images</label>
                <ImageListEditor
                  images={product.images || []}
                  onChange={imgs => updateItem(product.id, "images", imgs)}
                />
              </div>

              <button
                onClick={() => handleSaveProduct(product)}
                disabled={saving === product.id}
                style={{
                  width: "100%",
                  background: saved === product.id ? "#166534" : "linear-gradient(135deg, #D4AF37, #A88A20)",
                  color: saved === product.id ? "#86efac" : "#0a0a0a",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.6rem",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  cursor: saving === product.id ? "wait" : "pointer",
                  marginTop: "0.75rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                {saving === product.id ? "Saving..." : saved === product.id ? "✓ Saved!" : "Save This Product"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Reviews Editor ───────────────────────────────────────────────────────────
function ReviewsEditor({ reviews, onSave }: { reviews: AdminReview[]; onSave: (r: AdminReview[]) => void }) {
  const { token } = useAdmin();
  const [items, setItems] = useState<AdminReview[]>(reviews);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newReview, setNewReview] = useState<{ customer_name: string; review: string; stars: number; product_name: string }>({
    customer_name: "", review: "", stars: 5, product_name: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleDeleteReview(id: number) {
    if (!token || !confirm("Delete this review?")) return;
    try {
      await adminDeleteReview(token, id);
      const updated = items.filter(r => r.id !== id);
      setItems(updated);
      onSave(updated);
    } catch {
      setError("Failed to delete review.");
    }
  }

  async function handleAddReview() {
    if (!token || !newReview.customer_name || !newReview.review) return;
    setSaving(true);
    setError(null);
    try {
      const result = await adminCreateReview(token, newReview);
      const newItem: AdminReview = {
        id: result.id,
        customer_name: newReview.customer_name,
        review: newReview.review,
        stars: newReview.stars,
        product_name: newReview.product_name || null,
        is_approved: 1,
        is_visible: 1,
        sort_order: 0,
        created_at: new Date().toISOString(),
      };
      const updated = [newItem, ...items];
      setItems(updated);
      onSave(updated);
      setNewReview({ customer_name: "", review: "", stars: 5, product_name: "" });
      setAdding(false);
    } catch {
      setError("Failed to add review.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateReview(review: AdminReview) {
    if (!token) return;
    try {
      await adminUpdateReview(token, review.id, review);
      onSave(items);
    } catch {
      setError("Failed to update review.");
    }
  }

  function updateItem(id: number, field: keyof AdminReview, value: any) {
    setItems(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  }

  async function handleScreenshot(file: File) {
    setOcrLoading(true);
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng");
      const url = URL.createObjectURL(file);
      const { data: { text } } = await worker.recognize(url);
      await worker.terminate();
      URL.revokeObjectURL(url);
      const cleaned = text.replace(/\s+/g, " ").trim();
      setNewReview(prev => ({ ...prev, review: cleaned }));
      setAdding(true);
    } catch {
      alert("Could not read text from image. Please type the review manually.");
    } finally {
      setOcrLoading(false);
    }
  }

  return (
    <div>
      {error && <div style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.75rem", padding: "0.5rem", background: "#ef444420", borderRadius: 6 }}>{error}</div>}

      {/* Add review buttons */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => setAdding(!adding)} style={goldBtnStyle}>
          + Add Review
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={ocrLoading}
          style={{ ...goldBtnStyle, background: "transparent", border: "1px solid #D4AF3760", color: "#D4AF37" }}
        >
          {ocrLoading ? "Reading..." : "📷 From Screenshot"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleScreenshot(f); e.target.value = ""; }}
        />
      </div>

      {/* New review form */}
      {adding && (
        <div style={{ background: "#161616", border: "1px solid #D4AF3740", borderRadius: 10, padding: "1rem", marginBottom: "1rem" }}>
          <h4 style={{ color: "#D4AF37", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 0.75rem" }}>New Review</h4>
          <Field label="Reviewer Name *" value={newReview.customer_name} onChange={v => setNewReview(p => ({ ...p, customer_name: v }))} />
          <Field label="Review Text *" value={newReview.review} onChange={v => setNewReview(p => ({ ...p, review: v }))} multiline />
          <Field label="Product (optional)" value={newReview.product_name} onChange={v => setNewReview(p => ({ ...p, product_name: v }))} />
          <div style={{ marginTop: "0.5rem" }}>
            <label style={labelStyle}>Star Rating</label>
            <select value={newReview.stars} onChange={e => setNewReview(p => ({ ...p, stars: Number(e.target.value) }))} style={inputStyle}>
              {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <button onClick={handleAddReview} disabled={saving} style={goldBtnStyle}>
              {saving ? "Saving..." : "Add Review ⭐"}
            </button>
            <button onClick={() => setAdding(false)} style={{ ...goldBtnStyle, background: "transparent", border: "1px solid #333", color: "#888" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Existing reviews */}
      {items.map(review => (
        <div key={review.id} style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, padding: "0.875rem 1rem", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <div>
              <p style={{ color: "#f5f0e8", fontSize: "0.85rem", fontWeight: 500, margin: 0 }}>{review.customer_name}</p>
              <p style={{ color: "#D4AF37", fontSize: "0.75rem", margin: "0.1rem 0 0" }}>{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</p>
            </div>
            <button onClick={() => handleDeleteReview(review.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem", padding: "0.2rem" }}>🗑</button>
          </div>
          <Field label="Review Text" value={review.review} onChange={v => updateItem(review.id, "review", v)} multiline />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Name</label>
              <input value={review.customer_name} onChange={e => updateItem(review.id, "customer_name", e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Stars</label>
              <select value={review.stars} onChange={e => updateItem(review.id, "stars", Number(e.target.value))} style={inputStyle}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={() => handleUpdateReview(review)}
            style={{ ...goldBtnStyle, marginTop: "0.5rem", width: "100%", borderRadius: 6 }}
          >
            Save Review
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Gallery Editor ───────────────────────────────────────────────────────────
function GalleryEditor({ photos, onSave }: { photos: ApiGalleryItem[]; onSave: (p: ApiGalleryItem[]) => void }) {
  const { token } = useAdmin();
  const [items, setItems] = useState<ApiGalleryItem[]>(photos);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleRemovePhoto(item: ApiGalleryItem) {
    if (!token || !confirm("Remove this photo from gallery?")) return;
    try {
      await adminDeleteGalleryItem(token, item.id);
      const updated = items.filter(i => i.id !== item.id);
      setItems(updated);
      onSave(updated);
    } catch {
      setError("Failed to remove photo.");
    }
  }

  async function handleUpload(files: FileList) {
    if (!token) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const url = await adminUploadImage(token, file);
        const result = await adminAddGalleryItem(token, url);
        const newItem: ApiGalleryItem = { id: result.id, image_url: url, caption: null, sort_order: items.length + 1, is_visible: 1 };
        setItems(prev => {
          const updated = [newItem, ...prev];
          onSave(updated);
          return updated;
        });
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {error && <div style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.75rem", padding: "0.5rem", background: "#ef444420", borderRadius: 6 }}>{error}</div>}
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        style={{ ...goldBtnStyle, marginBottom: "1rem" }}
      >
        {uploading ? "Uploading..." : "+ Upload Photos"}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={e => { if (e.target.files) handleUpload(e.target.files); e.target.value = ""; }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1rem" }}>
        {items.map((item) => (
          <div key={item.id} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "1px solid #222" }}>
            <img src={item.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button
              onClick={() => handleRemovePhoto(item)}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "rgba(0,0,0,0.8)",
                border: "none",
                color: "#ef4444",
                borderRadius: "50%",
                width: 22,
                height: 22,
                cursor: "pointer",
                fontSize: "0.65rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Editor ──────────────────────────────────────────────────────────
function SettingsEditor({ settings, onSave }: { settings: AdminSettings; onSave: (s: AdminSettings) => void }) {
  const { token } = useAdmin();
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      await adminSaveSettings(token, form);
      onSave(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {error && <div style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.75rem", padding: "0.5rem", background: "#ef444420", borderRadius: 6 }}>{error}</div>}
      <Field label="Hero Title" value={form.heroTitle || ""} onChange={v => setForm(p => ({ ...p, heroTitle: v }))} />
      <Field label="Hero Subtitle" value={form.heroSubtitle || ""} onChange={v => setForm(p => ({ ...p, heroSubtitle: v }))} />
      <Field label="WhatsApp Number (with country code)" value={form.whatsapp || ""} onChange={v => setForm(p => ({ ...p, whatsapp: v }))} />
      <Field label="Instagram URL" value={form.instagram || ""} onChange={v => setForm(p => ({ ...p, instagram: v }))} />
      <Field label="Email Address" value={form.email || ""} onChange={v => setForm(p => ({ ...p, email: v }))} />
      <SaveBtn saved={saved} saving={saving} onClick={handleSave} />
    </div>
  );
}

// ─── Image List Editor ────────────────────────────────────────────────────────
function ImageListEditor({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const { token } = useAdmin();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  function removeImg(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  async function handleUpload(files: FileList) {
    if (!token) return;
    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await adminUploadImage(token, file);
        newUrls.push(url);
      }
      onChange([...images, ...newUrls]);
    } catch {
      // Fallback to base64
      const newImgs: string[] = [];
      let loaded = 0;
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          newImgs.push(e.target?.result as string);
          loaded++;
          if (loaded === files.length) onChange([...images, ...newImgs]);
        };
        reader.readAsDataURL(file);
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
        {images.map((src, i) => (
          <div key={i} style={{ position: "relative", width: 56, height: 56, borderRadius: 6, overflow: "hidden", border: "1px solid #333" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button
              onClick={() => removeImg(i)}
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                background: "rgba(0,0,0,0.8)",
                border: "none",
                color: "#ef4444",
                borderRadius: "50%",
                width: 18,
                height: 18,
                cursor: "pointer",
                fontSize: "0.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >✕</button>
          </div>
        ))}
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            width: 56,
            height: 56,
            borderRadius: 6,
            border: "1px dashed #D4AF3760",
            background: "transparent",
            color: "#D4AF37",
            cursor: uploading ? "wait" : "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >{uploading ? "…" : "+"}</button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={e => { if (e.target.files) handleUpload(e.target.files); e.target.value = ""; }}
      />
    </div>
  );
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#888",
  fontSize: "0.65rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "0.3rem",
  marginTop: "0.6rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#111",
  border: "1px solid #2a2a2a",
  borderRadius: 6,
  padding: "0.5rem 0.625rem",
  color: "#f5f0e8",
  fontSize: "0.85rem",
  outline: "none",
  boxSizing: "border-box",
};

const goldBtnStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #D4AF37, #A88A20)",
  color: "#0a0a0a",
  border: "none",
  borderRadius: 50,
  padding: "0.45rem 1rem",
  fontSize: "0.75rem",
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      ) : (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </div>
  );
}

function SaveBtn({ saved, saving, onClick }: { saved: boolean; saving?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      style={{
        width: "100%",
        background: saved ? "#166534" : "linear-gradient(135deg, #D4AF37, #A88A20)",
        color: saved ? "#86efac" : "#0a0a0a",
        border: "none",
        borderRadius: 8,
        padding: "0.75rem",
        fontWeight: 700,
        fontSize: "0.85rem",
        cursor: saving ? "wait" : "pointer",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        marginTop: "1rem",
        transition: "all 0.3s",
      }}
    >
      {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );
}
