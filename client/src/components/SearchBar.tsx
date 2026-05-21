/*
 * SearchBar — ShaRiz Kreations
 * Sticky global search bar with predictive suggestions.
 * Searches products, sections, keywords, and tags.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Searchable data ───────────────────────────────────────────────────────────
export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  keywords: string[];
  section: string; // DOM section id to scroll to
  type: "product" | "section" | "page";
}

export const SEARCH_INDEX: SearchItem[] = [
  // Products
  {
    id: "coasters",
    title: "Resin Coasters",
    subtitle: "Set of 4 — Handcrafted",
    tag: "Bestseller",
    keywords: ["coaster", "coasters", "set", "flowers", "gold leaf", "resin", "gift", "gifting", "table"],
    section: "collection",
    type: "product",
  },
  {
    id: "wall-art",
    title: "Canvas Wall Art",
    subtitle: "Statement Pieces",
    tag: "Statement Piece",
    keywords: ["canvas", "wall art", "painting", "art", "large", "ocean", "pigments", "gallery", "room", "decor"],
    section: "collection",
    type: "product",
  },
  {
    id: "trays",
    title: "Serving Trays",
    subtitle: "Luxury Home Decor",
    tag: "Luxury",
    keywords: ["tray", "trays", "serving", "luxury", "home", "decor", "kitchen", "dining"],
    section: "collection",
    type: "product",
  },
  {
    id: "calligraphy",
    title: "Islamic Calligraphy Art",
    subtitle: "Faith · Framed in Resin",
    tag: "Spiritual",
    keywords: ["islamic", "calligraphy", "arabic", "faith", "spiritual", "allah", "quran", "frame", "framed"],
    section: "collection",
    type: "product",
  },
  {
    id: "piggy-banks",
    title: "Piggy Banks & Decor",
    subtitle: "Whimsical Collection",
    tag: "Fan Favourite",
    keywords: ["piggy bank", "piggy", "bank", "decor", "whimsical", "fun", "kids", "saving", "gift"],
    section: "collection",
    type: "product",
  },
  {
    id: "custom",
    title: "Custom Orders",
    subtitle: "Your Vision, Our Craft",
    tag: "Bespoke",
    keywords: ["custom", "bespoke", "order", "personalised", "personalized", "unique", "commission", "made to order"],
    section: "custom-orders",
    type: "product",
  },
  // Sections
  {
    id: "about",
    title: "About Shaz",
    subtitle: "The Story Behind ShaRiz Kreations",
    keywords: ["about", "shaz", "story", "artist", "creator", "who", "behind"],
    section: "about",
    type: "section",
  },
  {
    id: "gallery",
    title: "Gallery",
    subtitle: "Browse All Resin Art Pieces",
    keywords: ["gallery", "photos", "pictures", "browse", "view", "portfolio"],
    section: "gallery",
    type: "section",
  },
  {
    id: "pricing",
    title: "Pricing & Packages",
    subtitle: "Essentials · Signature · Bespoke",
    keywords: ["price", "pricing", "cost", "package", "packages", "how much", "budget", "affordable"],
    section: "pricing",
    type: "section",
  },
  {
    id: "contact",
    title: "Contact & Order",
    subtitle: "Get in Touch with Shaz",
    keywords: ["contact", "order", "whatsapp", "message", "enquire", "enquiry", "reach", "get in touch"],
    section: "contact",
    type: "section",
  },
  {
    id: "care",
    title: "Care Instructions",
    subtitle: "How to Care for Your Resin Art",
    keywords: ["care", "instructions", "clean", "cleaning", "maintain", "maintenance", "how to"],
    section: "care",
    type: "page",
  },
];

// ─── Fuzzy search ──────────────────────────────────────────────────────────────
function scoreItem(item: SearchItem, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  let score = 0;
  const titleLower = item.title.toLowerCase();
  const subtitleLower = (item.subtitle || "").toLowerCase();

  // Exact title match
  if (titleLower === q) score += 100;
  // Title starts with query
  else if (titleLower.startsWith(q)) score += 80;
  // Title contains query
  else if (titleLower.includes(q)) score += 60;
  // Subtitle contains query
  if (subtitleLower.includes(q)) score += 30;
  // Keyword match
  for (const kw of item.keywords) {
    if (kw === q) score += 50;
    else if (kw.startsWith(q)) score += 35;
    else if (kw.includes(q)) score += 20;
    else if (q.includes(kw)) score += 15;
  }
  // Tag match
  if (item.tag && item.tag.toLowerCase().includes(q)) score += 25;
  return score;
}

function search(query: string): SearchItem[] {
  if (!query.trim()) return [];
  return SEARCH_INDEX
    .map((item) => ({ item, score: scoreItem(item, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ item }) => item);
}

// ─── Type icons ────────────────────────────────────────────────────────────────
const TYPE_LABELS: Record<SearchItem["type"], string> = {
  product: "Product",
  section: "Section",
  page: "Page",
};

// ─── Component ────────────────────────────────────────────────────────────────
interface SearchBarProps {
  onNavigate?: (section: string, type: SearchItem["type"]) => void;
  compact?: boolean;
}

export function SearchBar({ onNavigate, compact = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update results as user types
  useEffect(() => {
    const res = search(query);
    setResults(res);
    setActiveIdx(-1);
    setOpen(res.length > 0 && focused);
  }, [query, focused]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      setQuery("");
      setOpen(false);
      setFocused(false);
      if (onNavigate) {
        onNavigate(item.section, item.type);
      } else {
        // Default: scroll to section
        if (item.type === "page") {
          window.location.href = "/care-instructions";
          return;
        }
        const el = document.getElementById(item.section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [onNavigate]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && results[activeIdx]) {
        handleSelect(results[activeIdx]);
      } else if (results[0]) {
        handleSelect(results[0]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  };

  // Popular suggestions shown when focused with empty query
  const POPULAR: SearchItem[] = SEARCH_INDEX.slice(0, 4);

  return (
    <div ref={containerRef} className="relative" style={{ zIndex: 200 }}>
      {/* Search input */}
      <div
        className="flex items-center gap-2 transition-all duration-300"
        style={{
          background: focused
            ? "rgba(212,175,55,0.12)"
            : "rgba(212,175,55,0.07)",
          border: `1px solid ${focused ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.2)"}`,
          borderRadius: "999px",
          padding: compact ? "5px 12px" : "6px 14px",
          minWidth: compact ? "120px" : "200px",
          maxWidth: compact ? "180px" : "260px",
          boxShadow: focused ? "0 0 0 3px rgba(212,175,55,0.08)" : "none",
        }}
      >
        <Search
          size={13}
          style={{ color: focused ? "#D4AF37" : "rgba(212,175,55,0.5)", flexShrink: 0 }}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { setFocused(true); setOpen(query.length > 0 || true); }}
          onKeyDown={handleKeyDown}
          placeholder={compact ? "Search…" : "Search products…"}
          className="bg-transparent outline-none text-xs w-full"
          style={{
            color: "#FFF5E6",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.03em",
          }}
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            style={{ color: "rgba(212,175,55,0.5)", flexShrink: 0 }}
          >
            <X size={11} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && focused && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full mt-2 right-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(10,8,5,0.98)",
              border: "1px solid rgba(212,175,55,0.25)",
              backdropFilter: "blur(24px)",
              minWidth: "280px",
              maxWidth: "320px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.08)",
            }}
          >
            {/* Header */}
            <div className="px-4 pt-3 pb-2 flex items-center gap-2">
              {query ? (
                <>
                  <Search size={11} style={{ color: "rgba(212,175,55,0.5)" }} />
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.5)", fontFamily: "'Jost', sans-serif" }}>
                    {results.length > 0 ? `${results.length} result${results.length !== 1 ? "s" : ""}` : "No results"}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles size={11} style={{ color: "rgba(212,175,55,0.5)" }} />
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.5)", fontFamily: "'Jost', sans-serif" }}>
                    Popular
                  </span>
                </>
              )}
            </div>

            {/* Results or popular */}
            <div className="pb-2">
              {(query ? results : POPULAR).map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100"
                  style={{
                    background: activeIdx === idx ? "rgba(212,175,55,0.08)" : "transparent",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px]"
                    style={{
                      background: item.type === "product"
                        ? "rgba(212,175,55,0.12)"
                        : "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(212,175,55,0.15)",
                    }}
                  >
                    {item.type === "product" ? "✦" : item.type === "page" ? "📄" : "§"}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-medium truncate"
                        style={{ color: "#FFF5E6", fontFamily: "'Jost', sans-serif" }}
                      >
                        {item.title}
                      </span>
                      {item.tag && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: "rgba(212,175,55,0.15)",
                            color: "#D4AF37",
                            fontFamily: "'Jost', sans-serif",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {item.tag}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p
                        className="text-[10px] truncate mt-0.5"
                        style={{ color: "rgba(255,245,230,0.4)", fontFamily: "'Jost', sans-serif" }}
                      >
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Type label + arrow */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span
                      className="text-[9px] hidden sm:block"
                      style={{ color: "rgba(212,175,55,0.35)", fontFamily: "'Jost', sans-serif" }}
                    >
                      {TYPE_LABELS[item.type]}
                    </span>
                    <ArrowRight
                      size={11}
                      style={{
                        color: activeIdx === idx ? "#D4AF37" : "rgba(212,175,55,0.25)",
                        transition: "color 0.15s",
                      }}
                    />
                  </div>
                </button>
              ))}

              {query && results.length === 0 && (
                <div className="px-4 py-4 text-center">
                  <p className="text-xs" style={{ color: "rgba(255,245,230,0.35)", fontFamily: "'Jost', sans-serif" }}>
                    No results for "{query}"
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "rgba(212,175,55,0.4)", fontFamily: "'Jost', sans-serif" }}>
                    Try "coasters", "custom", or "gallery"
                  </p>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div
              className="px-4 py-2 flex items-center gap-3 border-t"
              style={{ borderColor: "rgba(212,175,55,0.1)" }}
            >
              <span className="text-[9px]" style={{ color: "rgba(255,245,230,0.25)", fontFamily: "'Jost', sans-serif" }}>
                ↑↓ navigate · ↵ select · esc close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
