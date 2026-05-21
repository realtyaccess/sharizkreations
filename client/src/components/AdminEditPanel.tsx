import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AdminProduct {
  id: number;
  name: string;
  subtitle: string;
  tag: string;
  price: string;
  description: string;
  availability: string;
  images: string[];
}

export interface AdminReview {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface AdminGalleryPhoto {
  url: string;
  caption?: string;
}

export interface AdminSettings {
  heroTitle: string;
  heroSubtitle: string;
  whatsapp: string;
  instagram: string;
}

type PanelMode = "products" | "reviews" | "gallery" | "settings";

interface AdminEditPanelProps {
  mode: PanelMode;
  onClose: () => void;
  products: AdminProduct[];
  reviews: AdminReview[];
  galleryPhotos: string[];
  settings: AdminSettings;
  onSaveProducts: (products: AdminProduct[]) => void;
  onSaveReviews: (reviews: AdminReview[]) => void;
  onSaveGallery: (photos: string[]) => void;
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
  const [items, setItems] = useState<AdminProduct[]>(products);
  const [editing, setEditing] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  function updateItem(id: number, field: keyof AdminProduct, value: any) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  }

  function handleSave() {
    onSave(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const availOptions = ["Taking Orders", "Limited Stock", "Always Available", "Sold Out"];

  return (
    <div>
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
              {product.images[0] && (
                <img src={product.images[0]} alt={product.name} style={{ width: 44, height: 44, borderRadius: 6, objectFit: "cover" }} />
              )}
              <div>
                <p style={{ color: "#f5f0e8", fontSize: "0.85rem", fontWeight: 500, margin: 0 }}>{product.name}</p>
                <p style={{ color: "#D4AF37", fontSize: "0.75rem", margin: "0.1rem 0 0" }}>{product.price}</p>
              </div>
            </div>
            <span style={{ color: "#555", fontSize: "0.8rem" }}>{editing === product.id ? "▲" : "▼"}</span>
          </div>

          {/* Expanded edit form */}
          {editing === product.id && (
            <div style={{ padding: "0 1rem 1rem", borderTop: "1px solid #222" }}>
              <Field label="Product Name" value={product.name} onChange={v => updateItem(product.id, "name", v)} />
              <Field label="Subtitle" value={product.subtitle} onChange={v => updateItem(product.id, "subtitle", v)} />
              <Field label="Tag / Category" value={product.tag} onChange={v => updateItem(product.id, "tag", v)} />
              <Field label="Price (e.g. CAD 45)" value={product.price} onChange={v => updateItem(product.id, "price", v)} />
              <Field label="Description" value={product.description} onChange={v => updateItem(product.id, "description", v)} multiline />

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
                  images={product.images}
                  onChange={imgs => updateItem(product.id, "images", imgs)}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <SaveBtn saved={saved} onClick={handleSave} />
    </div>
  );
}

// ─── Reviews Editor ───────────────────────────────────────────────────────────
function ReviewsEditor({ reviews, onSave }: { reviews: AdminReview[]; onSave: (r: AdminReview[]) => void }) {
  const [items, setItems] = useState<AdminReview[]>(reviews);
  const [adding, setAdding] = useState(false);
  const [saved, setSaved] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [newReview, setNewReview] = useState<Partial<AdminReview>>({ rating: 5, date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }) });
  const fileRef = useRef<HTMLInputElement>(null);

  function updateItem(id: number, field: keyof AdminReview, value: any) {
    setItems(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  }

  function deleteItem(id: number) {
    if (confirm("Delete this review?")) {
      setItems(prev => prev.filter(r => r.id !== id));
    }
  }

  function addReview() {
    if (!newReview.name || !newReview.text) return;
    const review: AdminReview = {
      id: Date.now(),
      name: newReview.name!,
      rating: newReview.rating || 5,
      text: newReview.text!,
      date: newReview.date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
    setItems(prev => [review, ...prev]);
    setNewReview({ rating: 5, date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }) });
    setAdding(false);
  }

  async function handleScreenshot(file: File) {
    setOcrLoading(true);
    try {
      // Use Tesseract.js in browser
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng");
      const url = URL.createObjectURL(file);
      const { data: { text } } = await worker.recognize(url);
      await worker.terminate();
      URL.revokeObjectURL(url);
      const cleaned = text.replace(/\s+/g, " ").trim();
      setNewReview(prev => ({ ...prev, text: cleaned }));
      setAdding(true);
    } catch (err) {
      alert("Could not read text from image. Please type the review manually.");
    } finally {
      setOcrLoading(false);
    }
  }

  function handleSave() {
    onSave(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      {/* Add review buttons */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => setAdding(!adding)} style={goldBtnStyle}>
          + Add Review Manually
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
          <Field label="Reviewer Name *" value={newReview.name || ""} onChange={v => setNewReview(p => ({ ...p, name: v }))} />
          <Field label="Review Text *" value={newReview.text || ""} onChange={v => setNewReview(p => ({ ...p, text: v }))} multiline />
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Star Rating</label>
              <select value={newReview.rating} onChange={e => setNewReview(p => ({ ...p, rating: Number(e.target.value) }))} style={inputStyle}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <Field label="Date" value={newReview.date || ""} onChange={v => setNewReview(p => ({ ...p, date: v }))} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <button onClick={addReview} style={goldBtnStyle}>Add Review ⭐</button>
            <button onClick={() => setAdding(false)} style={{ ...goldBtnStyle, background: "transparent", border: "1px solid #333", color: "#888" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Existing reviews */}
      {items.map(review => (
        <div key={review.id} style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, padding: "0.875rem 1rem", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <div>
              <p style={{ color: "#f5f0e8", fontSize: "0.85rem", fontWeight: 500, margin: 0 }}>{review.name}</p>
              <p style={{ color: "#D4AF37", fontSize: "0.75rem", margin: "0.1rem 0 0" }}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} · {review.date}</p>
            </div>
            <button onClick={() => deleteItem(review.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem", padding: "0.2rem" }}>🗑</button>
          </div>
          <Field label="Review Text" value={review.text} onChange={v => updateItem(review.id, "text", v)} multiline />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Name</label>
              <input value={review.name} onChange={e => updateItem(review.id, "name", e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Stars</label>
              <select value={review.rating} onChange={e => updateItem(review.id, "rating", Number(e.target.value))} style={inputStyle}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}

      <SaveBtn saved={saved} onClick={handleSave} />
    </div>
  );
}

// ─── Gallery Editor ───────────────────────────────────────────────────────────
function GalleryEditor({ photos, onSave }: { photos: string[]; onSave: (p: string[]) => void }) {
  const [items, setItems] = useState<string[]>(photos);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function removePhoto(idx: number) {
    if (confirm("Remove this photo from gallery?")) {
      setItems(prev => prev.filter((_, i) => i !== idx));
    }
  }

  function handleUpload(files: FileList) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const url = e.target?.result as string;
        setItems(prev => [url, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  }

  function handleSave() {
    onSave(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <button onClick={() => fileRef.current?.click()} style={{ ...goldBtnStyle, marginBottom: "1rem" }}>
        + Upload Photos
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
        {items.map((src, i) => (
          <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "1px solid #222" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button
              onClick={() => removePhoto(i)}
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

      <SaveBtn saved={saved} onClick={handleSave} />
    </div>
  );
}

// ─── Settings Editor ──────────────────────────────────────────────────────────
function SettingsEditor({ settings, onSave }: { settings: AdminSettings; onSave: (s: AdminSettings) => void }) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <Field label="Hero Title" value={form.heroTitle} onChange={v => setForm(p => ({ ...p, heroTitle: v }))} />
      <Field label="Hero Subtitle" value={form.heroSubtitle} onChange={v => setForm(p => ({ ...p, heroSubtitle: v }))} />
      <Field label="WhatsApp Number (with country code)" value={form.whatsapp} onChange={v => setForm(p => ({ ...p, whatsapp: v }))} />
      <Field label="Instagram Handle (without @)" value={form.instagram} onChange={v => setForm(p => ({ ...p, instagram: v }))} />
      <SaveBtn saved={saved} onClick={handleSave} />
    </div>
  );
}

// ─── Image List Editor ────────────────────────────────────────────────────────
function ImageListEditor({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  function removeImg(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  function handleUpload(files: FileList) {
    const newImgs: string[] = [];
    let loaded = 0;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        newImgs.push(e.target?.result as string);
        loaded++;
        if (loaded === files.length) {
          onChange([...images, ...newImgs]);
        }
      };
      reader.readAsDataURL(file);
    });
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
          style={{
            width: 56,
            height: 56,
            borderRadius: 6,
            border: "1px dashed #D4AF3760",
            background: "transparent",
            color: "#D4AF37",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >+</button>
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

function SaveBtn({ saved, onClick }: { saved: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: saved ? "#166534" : "linear-gradient(135deg, #D4AF37, #A88A20)",
        color: saved ? "#86efac" : "#0a0a0a",
        border: "none",
        borderRadius: 8,
        padding: "0.75rem",
        fontWeight: 700,
        fontSize: "0.85rem",
        cursor: "pointer",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        marginTop: "1rem",
        transition: "all 0.3s",
      }}
    >
      {saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );
}
