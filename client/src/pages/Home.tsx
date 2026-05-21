/*
 * ShaRiz Kreations — Home Page
 * Design: "Dark Atelier" — Obsidian bg, warm gold accents, Cormorant Garamond display
 * Updated: Hero video background, enhanced custom order form with WhatsApp pre-fill
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Instagram, MapPin, Star, ChevronDown, X, Menu, ShoppingBag, Sparkles, Heart, Upload, MessageCircle, Check, Calendar, DollarSign, Phone } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useCurrency, parseCadPrice } from "@/contexts/CurrencyContext";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "14039867064";
function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Logo (SRK) ───────────────────────────────────────────────────────────────
const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/ZYazBilkNRkihWBw.png";

// ─── Hero Video ───────────────────────────────────────────────────────────────
const HERO_VIDEO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/AXvCyzWVXNtXqfaI.mp4";

// ─── All 94 real photos from Shaz (verified CDN paths) ───────────────────────
const ALL_PHOTOS = [
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/ERFeIfkLvqNXPzdq.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/jIdbpQhEiRCMnLjd.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/areGqXWMJcJCOHbY.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/nOBQneVaAhbNRRBb.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/jNpuejdVzDLQoaPg.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/IdjZjYpQOKdRozym.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/OGgCqtNnqqPLIBLl.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/XgFJSNOMUBZPRcRI.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/aNoBbUDBEVXblsyX.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/NOWsIDbYmEWrHIuL.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/UFEuhpnODsKwgfhb.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/xKkEntzJljLGFDZy.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/AtbbqUHZHLKxpuYX.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/CukTUKTSIBywqWoA.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/JRsbyBGqwJeSrQNk.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/hRBtOgqiJFtuPzga.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/UeKwYcLmufNAGbYt.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/VzMrUvdCdDyChrkP.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/UOgJdeFDNWDkJBDc.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/clpIuyxNROGmmoMk.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/lcvOXxEwwJhaUFOD.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/QEDLqDZsLluendoo.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/jgvCZOIsNMfpYjMt.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/XceRbpbnhagFxSlc.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/uFyqaYlvNDkgKuSZ.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/chDMHvMOxHgRHkUp.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/ymlxZhtmmZYHFLVc.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/JzVWhyGibfDyYsEi.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/ZrNHcRBqxNxlyhoh.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/LopLoljkOWpxUwqI.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/LbZaEHPJAuXEoFqf.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/HUtHFlsTCttlBSIB.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/aGCCnSEClqGLMolv.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/rUMucBnzABnVYqaZ.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/KzesxVNceeBdqvRL.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/dzPlDUhXZNDBcamq.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/WqDQEbjMkSLRmSly.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/ltphmljSvqzATgoj.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/RRqIWmbeugEorLCt.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/vNlfxuofGrNQMIOT.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/bWlWWRynuvMfKRZR.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/SRPqRAJdjRIeiLZS.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/vTMKXPWdwCYsIXlW.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/ueXmdjxArbFLEXpM.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/nJwBKJxWNkKZoCWH.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/OiqvyfkzDaCwHdRh.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/piedMcBxEoYRADqS.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/GlOoUlewzwwFkfEu.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/WjduVgoEiOSCrLtq.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/tpgkDNcDcwRzZRkr.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/ROvkakjyXawoKcYM.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/DwNpcksYVpqmFEnX.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/rkrIEEvoipueWldT.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/tkwDAwBEAZhnipTD.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/aHvxucdmyfjclnBU.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/aKgnunfDjIWLJxuN.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/FyWGWLQBtLQfJxkU.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/vJZUuAywAIQHlSPL.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/uFTbrtEXuLaLnqNX.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/ePxMqCMxYlDIyZzX.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/pMKFlXNCUsArFhfX.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/xvkzrWfatDPqKpTk.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/XPpIrZAKvGRXHXYf.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/AfdcKoUQQVkkcYWe.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/nHytsviQDJthNGgC.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/UPyfeUDjhWIKQuQa.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/uERuWSVAvqwohntt.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/HrvjDsdNybxizoJQ.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/TjBltxbrliMxXJDb.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/rgxDWGQCsgTBUecz.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/cqaOIXQMMyoNtxoP.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/cVUPPGMCuMsSTkVC.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/azrmYctYHdNvinDx.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/EomKcHjLfrkfSwQq.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/tLZbRwZdLycsNBRa.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/lEyYaaDzctTxZjqy.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/aRjsPvYhOhJjuqKw.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/LMMQwDqraZpmDBbx.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/NNCJKsTERORktueJ.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/BcoqnqHSoFpIcCmc.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/WaGOCLvqDYwKrWhB.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/NuKOTxHaDrJRDKfI.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/UeTQpVCJaknRymes.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/olVVKUSWFdlNCayy.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/AzPioiMeoZSlTiFa.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/IidFnaQHFSIhEDIy.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/NpAnyYDZompkupvS.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/avHDpFRGxPdzQtkH.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/fbXdjQhahivhCfox.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/jiRoIYpVtTqetkMr.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/cMVgWCFdkkUnJiqR.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/jbjaLmZNhVBcQmpy.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/FetvMvBjMWGQwClY.jpeg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/aXfuoWuHZxIAGbzf.jpeg",
];

// Curated selections for specific sections
const ABOUT_IMG = ALL_PHOTOS[16];

const PRODUCTS = [
  {
    id: 1,
    name: "Resin Coasters",
    subtitle: "Set of 4 — Handcrafted",
    description: "Pressed flowers, gold leaf, and crystal-clear resin. Each set is unique — no two are ever the same. Perfect for gifting or elevating your own space.",
    price: "From $50 CAD",
    images: [ALL_PHOTOS[1], ALL_PHOTOS[2], ALL_PHOTOS[3], ALL_PHOTOS[4]],
    tag: "Bestseller",
    availability: "Taking Orders",
    waMessage: "Hi Shaz! I'm interested in your Resin Coasters. Could you share more details and availability?",
  },
  {
    id: 2,
    name: "Canvas Wall Art",
    subtitle: "Statement Pieces",
    description: "Large-scale resin canvas art with swirling pigments, gold leaf, and deep ocean colors. Each piece transforms any room into a gallery.",
    price: "From $200 CAD",
    images: [ALL_PHOTOS[5], ALL_PHOTOS[6], ALL_PHOTOS[7], ALL_PHOTOS[8]],
    tag: "Statement Piece",
    availability: "Sold Out",
    waMessage: "Hi Shaz! I'm interested in your Canvas Wall Art. Could you share more details?",
  },
  {
    id: 3,
    name: "Serving Trays",
    subtitle: "Luxury Home Decor",
    description: "Resin serving trays with marble effects, gold veining, and scalloped edges. Functional art that elevates every surface it graces.",
    price: "From $110 CAD",
    images: [ALL_PHOTOS[9], ALL_PHOTOS[10], ALL_PHOTOS[11], ALL_PHOTOS[12]],
    tag: "Luxury",
    availability: "Taking Orders",
    waMessage: "Hi Shaz! I'm interested in your Resin Serving Trays. Could you share more details?",
  },
  {
    id: 4,
    name: "Islamic Calligraphy Art",
    subtitle: "Faith · Framed in Resin",
    description: "White marble resin base with gold Arabic calligraphy. A statement of faith and elegance, handcrafted with love and calm.",
    price: "From $150 CAD",
    images: [ALL_PHOTOS[13], ALL_PHOTOS[14], ALL_PHOTOS[15], ALL_PHOTOS[17]],
    tag: "Spiritual",
    availability: "Taking Orders",
    waMessage: "Hi Shaz! I'm interested in your Islamic Calligraphy Art. Could you share more details?",
  },
  {
    id: 5,
    name: "Piggy Banks & Decor",
    subtitle: "Whimsical Collection",
    description: "Galaxy resin piggy banks, bookends, and desk decor with colorful swirling patterns and gold flakes. A whimsical yet luxurious addition.",
    price: "From $60 CAD",
    images: [ALL_PHOTOS[18], ALL_PHOTOS[19], ALL_PHOTOS[20], ALL_PHOTOS[21]],
    tag: "Fan Favourite",
    availability: "Sold Out",
    waMessage: "Hi Shaz! I'm interested in your Resin Piggy Banks & Decor. Could you share more details?",
  },
  {
    id: 6,
    name: "Custom Orders",
    subtitle: "Your Vision, Our Craft",
    description: "Fully bespoke resin pieces for weddings, events, corporate gifting, and personal spaces. Share your vision and Shaz will bring it to life.",
    price: "Custom Quote",
    images: [ALL_PHOTOS[22], ALL_PHOTOS[23], ALL_PHOTOS[24], ALL_PHOTOS[25]],
    tag: "Bespoke",
    availability: "Always Available",
    waMessage: "Hi Shaz! I'd like to discuss a custom resin art order. Can we chat?",
  },
];

const PRICING_TIERS = [
  {
    name: "Essentials",
    icon: "✦",
    description: "Perfect for gifting or adding a touch of resin magic to your home.",
    items: [
      { label: "Coaster Set (4 Pieces)", price: "From $50" },
      { label: "Small Resin Tray (8\")", price: "From $60" },
      { label: "Piggy Bank / Desk Decor", price: "From $60" },
      { label: "Keychain / Bookmark", price: "From $15" },
    ],
    highlight: false,
    cta: "Order via WhatsApp",
    waMessage: "Hi Shaz! I'm interested in an Essentials piece. Can you help me with pricing?",
  },
  {
    name: "Signature",
    icon: "✦✦",
    description: "Statement pieces that transform any room — our most popular range.",
    items: [
      { label: "Large Serving Tray (14\")", price: "From $110" },
      { label: "Islamic Calligraphy Art", price: "From $150" },
      { label: "Canvas Wall Art (18\"×18\")", price: "From $200" },
      { label: "Custom Gift Set", price: "From $150" },
    ],
    highlight: true,
    cta: "Order via WhatsApp",
    waMessage: "Hi Shaz! I'm interested in a Signature piece. Can you help me with pricing?",
  },
  {
    name: "Bespoke",
    icon: "✦✦✦",
    description: "Fully custom commissions for weddings, events, and corporate gifting.",
    items: [
      { label: "Wedding Welcome Sign", price: "From $250" },
      { label: "Large Canvas (34\"×34\")", price: "From $350" },
      { label: "Corporate Gift Sets", price: "Custom Quote" },
      { label: "Full Room Art Collection", price: "Custom Quote" },
    ],
    highlight: false,
    cta: "Get a Custom Quote",
    waMessage: "Hi Shaz! I'd like a custom quote for a Bespoke piece. Can we discuss?",
  },
];

const TESTIMONIALS = [
  {
    name: "Neha H.",
    text: "My mom made our wedding entrance sign — sharizkreations. It was absolutely stunning and everyone was asking about it!",
    stars: 5,
    source: "ATB Financial Feature",
  },
  {
    name: "Yusra S.",
    text: "We're absolutely thrilled with our resin art pieces. Your support and kind words mean everything. Truly one-of-a-kind!",
    stars: 5,
    source: "Instagram Review",
  },
  {
    name: "Ree S.",
    text: "Stop scrolling! These White & Gold Floral Resin Coasters are the definition of chic elegance. Obsessed!",
    stars: 5,
    source: "Instagram Review",
  },
];

// Gallery — use a spread of all real photos
const GALLERY_PHOTOS = ALL_PHOTOS.slice(26, 50);
// Indices of "Sold" photos (first 3) and "New" photos (indices 4–8)
const SOLD_INDICES = [0, 1, 2];
const NEW_INDICES = [3, 4, 5, 6, 7];

// Instagram feed — last batch of photos
const INSTA_PHOTOS = ALL_PHOTOS.slice(50, 62);

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Currency Price Helpers ──────────────────────────────────────────────────
function ProductPrice({ price }: { price: string }) {
  const { formatPrice, currency } = useCurrency();
  const cad = parseCadPrice(price);
  if (cad === null) return <span className="text-xs text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-1 whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif" }}>{price}</span>;
  const isFrom = price.toLowerCase().includes("from");
  return (
    <span className="text-xs text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-1 whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif" }}>
      {isFrom ? "From " : ""}{formatPrice(cad)}
      {currency.code !== "CAD" && <span className="opacity-50 ml-1 text-[0.7em]">{currency.code}</span>}
    </span>
  );
}

function ProductPriceInline({ price }: { price: string }) {
  const { formatPrice, currency } = useCurrency();
  const cad = parseCadPrice(price);
  if (cad === null) return <>{price}</>;
  const isFrom = price.toLowerCase().includes("from");
  return <>{isFrom ? "From " : ""}{formatPrice(cad)}{currency.code !== "CAD" && <span className="opacity-50 ml-1 text-[0.75em]">{currency.code}</span>}</>;
}

function TierPriceDisplay({ price }: { price: string }) {
  const { formatPrice, currency } = useCurrency();
  const cad = parseCadPrice(price);
  if (cad === null) return <span className="text-[#D4AF37] text-xs font-medium whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif" }}>{price}</span>;
  const isFrom = price.toLowerCase().includes("from");
  return (
    <span className="text-[#D4AF37] text-xs font-medium whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif" }}>
      {isFrom ? "From " : ""}{formatPrice(cad)}
      {currency.code !== "CAD" && <span className="opacity-40 ml-1 text-[0.7em]">{currency.code}</span>}
    </span>
  );
}

function PricingNote() {
  const { currency } = useCurrency();
  return (
    <p className="text-center text-cream/30 text-xs mt-8" style={{ fontFamily: "'Jost', sans-serif" }}>
      * Prices shown in {currency.name} ({currency.code}). Base prices in CAD. Shipping available across Canada. International shipping on request.
    </p>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Home", "About", "Collection", "Pricing", "Gallery", "Custom Orders", "Contact"];
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase().replace(/\s+/g, "-"))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav py-3" : "py-5 bg-transparent"}`}>
        <div className="container flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <img src={LOGO_URL} alt="ShaRiz Kreations" className="h-14 w-14 object-contain" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))" }} />
          </button>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button key={link} onClick={() => scrollTo(link)} className="text-[11px] tracking-widest uppercase font-medium text-cream/70 hover:text-[#D4AF37] transition-colors duration-300" style={{ fontFamily: "'Jost', sans-serif" }}>
                {link}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:block"><CurrencySwitcher /></div>
            <a href={getWhatsAppLink("Hi Shaz! I'd like to place an order.")} target="_blank" rel="noopener noreferrer" title="WhatsApp Shaz" className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110" style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)" }}>
              <svg viewBox="0 0 24 24" fill="#25D166" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href={getWhatsAppLink("Hi Shaz! I'd like to place an order.")} target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 btn-gold text-xs">
              <MessageCircle size={13} /> Order Now
            </a>
            <button className="lg:hidden text-cream/80 hover:text-[#D4AF37] transition-colors" onClick={() => setMenuOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }} className="fixed inset-0 z-[100] flex flex-col" style={{ background: "rgba(10,10,10,0.97)" }}>
            <div className="flex justify-between items-center p-6 border-b border-[#D4AF37]/20">
              <img src={LOGO_URL} alt="ShaRiz Kreations" className="h-12 w-12 object-contain" />
              <button onClick={() => setMenuOpen(false)} className="text-cream/70 hover:text-[#D4AF37]"><X size={24} /></button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              <div className="mb-2"><CurrencySwitcher /></div>
              {navLinks.map((link, i) => (
                <motion.button key={link} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} onClick={() => scrollTo(link)} className="text-2xl font-light tracking-widest uppercase text-cream/80 hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {link}
                </motion.button>
              ))}
              <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navLinks.length * 0.07 }} href={getWhatsAppLink("Hi Shaz! I'd like to place an order.")} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4 flex items-center gap-2">
                <MessageCircle size={14} /> Order on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section (Video Background) ──────────────────────────────────────────
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — video will show first frame as static background
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.1)" }}
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.60) 50%, rgba(10,10,10,0.85) 100%)" }} />
        {/* Gold shimmer at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, oklch(0.10 0.005 60), transparent)" }} />
      </motion.div>

      <motion.div className="relative z-10 container" style={{ opacity }}>
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="section-label mb-6">✦ Handcrafted Resin Art ✦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-6xl md:text-8xl font-light leading-none mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            Creating<br /><span className="shimmer-text italic font-medium">Colorful Dreams</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-lg md:text-xl font-light mb-2 text-cream/70 max-w-xl" style={{ fontFamily: "'Jost', sans-serif" }}>
            Capturing imagination in resin.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="script-accent text-3xl mb-10">
            Find your own piece of resin magic
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })} className="btn-gold">Explore Collection</button>
            <a href={getWhatsAppLink("Hi Shaz! I'd like to place a custom order.")} target="_blank" rel="noopener noreferrer" className="btn-outline-gold flex items-center gap-2">
              <MessageCircle size={14} /> WhatsApp Order
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-[10px] tracking-widest uppercase text-[#D4AF37]/60" style={{ fontFamily: "'Jost', sans-serif" }}>Scroll</span>
        <ChevronDown size={16} className="text-[#D4AF37]/60" />
      </motion.div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useReveal();
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%)" }} />
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }} className="relative">
            <div className="relative">
              <img src={ABOUT_IMG} alt="Shaz creating resin art" className="w-full h-[500px] object-cover" style={{ filter: "brightness(0.9) contrast(1.05)" }} />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37]/30 pointer-events-none" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 left-8 px-6 py-4" style={{ background: "linear-gradient(135deg, #C9A84C, #D4AF37)", color: "#0d0d0d" }}>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>125+ Pieces</p>
              <p className="text-xs tracking-wider" style={{ fontFamily: "'Jost', sans-serif" }}>Crafted with Love</p>
            </div>
          </motion.div>

          <div ref={ref} className="reveal">
            <p className="section-label mb-4">About the Artist</p>
            <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
              Meet <span className="italic text-[#D4AF37]">Shaz</span>
            </h2>
            <div className="gold-divider" style={{ margin: "0 0 1.5rem 0" }} />
            <p className="text-cream/70 leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Welcome to ShaRiz Kreations — a world where resin becomes magic. I'm Shaz, a passionate resin artist dedicated to capturing imagination in every pour.
            </p>
            <p className="text-cream/70 leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Each piece in my collection is handcrafted with intention — from delicate floral coasters to large-scale canvas wall art. I work with pressed flowers, gold leaf, iridescent pigments, and premium epoxy resin to create pieces that are truly one-of-a-kind.
            </p>
            <p className="text-cream/70 leading-relaxed mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Custom orders are my specialty — I love bringing your vision to life.
            </p>
            <div className="flex flex-wrap gap-8 mb-10">
              {[{ num: "125+", label: "Unique Pieces" }, { num: "100%", label: "Handcrafted" }, { num: "∞", label: "Custom Options" }].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-light text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{stat.num}</p>
                  <p className="text-xs tracking-widest uppercase text-cream/50" style={{ fontFamily: "'Jost', sans-serif" }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <a href="https://www.instagram.com/sharizkreations/" target="_blank" rel="noopener noreferrer" className="btn-outline-gold inline-flex items-center gap-2">
              <Instagram size={14} /> Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Products Section ──────────────────────────────────────────────────────────
function ProductsSection() {
  const [selected, setSelected] = useState<typeof PRODUCTS[0] | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section id="collection" className="py-24 md:py-32 relative" style={{ background: "oklch(0.12 0.006 60)" }}>
      <div className="container">
        <div className="text-center mb-16">
          <p className="section-label mb-4">The Collection</p>
          <h2 className="text-5xl md:text-6xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            Resin <span className="italic text-[#D4AF37]">Masterpieces</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-cream/60 max-w-xl mx-auto mt-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Every piece is poured, cured, and finished by hand. No two are ever exactly alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }} className="product-card cursor-pointer" onClick={() => { setSelected(product); setActiveImg(0); }}>
              <div className="card-img aspect-square relative">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                {product.availability && (
                  <span className={`absolute top-3 left-3 text-[9px] tracking-widest uppercase px-2 py-1 font-medium ${
                    product.availability === "Sold Out"
                      ? "bg-red-950/80 text-red-300 border border-red-500/40"
                      : product.availability === "Limited Stock"
                      ? "bg-amber-900/80 text-amber-300 border border-amber-500/40"
                      : product.availability === "Always Available"
                      ? "bg-emerald-900/80 text-emerald-300 border border-emerald-500/40"
                      : "bg-[#1a1a0e]/80 text-[#D4AF37] border border-[#D4AF37]/40"
                  }`} style={{ fontFamily: "'Jost', sans-serif", backdropFilter: "blur(4px)" }}>
                    {product.availability === "Sold Out" ? "✕ Sold Out" : product.availability === "Limited Stock" ? "⚡ Limited Stock" : product.availability === "Always Available" ? "✓ Always Available" : "✦ Taking Orders"}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#D4AF37] mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>{product.tag}</p>
                    <h3 className="text-xl font-light text-cream" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{product.name}</h3>
                    <p className="text-xs text-cream/50 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{product.subtitle}</p>
                  </div>
                  <ProductPrice price={product.price} />
                </div>
                <p className="text-cream/50 text-sm leading-relaxed mt-3 line-clamp-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{product.description}</p>
                <button className="mt-4 text-[10px] tracking-widest uppercase text-[#D4AF37] hover:text-[#F0D060] transition-colors flex items-center gap-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                  View Details <span>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }} onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }} className="relative max-w-2xl w-full grid md:grid-cols-2 overflow-hidden" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.3)" }} onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col">
                <img src={selected.images[activeImg]} alt={selected.name} className="w-full h-64 md:h-72 object-cover" />
                <div className="flex gap-2 p-3">
                  {selected.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className={`w-12 h-12 overflow-hidden border-2 transition-all ${activeImg === i ? "border-[#D4AF37]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-cream/50 hover:text-[#D4AF37] transition-colors"><X size={20} /></button>
                  <p className="section-label mb-3">{selected.tag}</p>
                  <h3 className="text-3xl font-light text-cream mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{selected.name}</h3>
                  <p className="text-sm text-cream/50 mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>{selected.subtitle}</p>
                  <p className="text-[#D4AF37] font-medium mb-4" style={{ fontFamily: "'Jost', sans-serif" }}><ProductPriceInline price={selected.price} /></p>
                  <div className="gold-divider" style={{ margin: "0 0 1rem 0" }} />
                  <p className="text-cream/70 text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{selected.description}</p>
                </div>
                <div className="mt-6 space-y-3">
                  <a href={getWhatsAppLink(selected.waMessage)} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center flex items-center justify-center gap-2">
                    <MessageCircle size={14} /> Order via WhatsApp
                  </a>
                  <button onClick={() => { setSelected(null); document.getElementById("custom-orders")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-outline-gold w-full text-center">
                    Request Custom Version
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Pricing Section ───────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, #D4AF37 0%, transparent 60%)" }} />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Investment</p>
          <h2 className="text-5xl md:text-6xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            Pricing <span className="italic text-[#D4AF37]">Guide</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-cream/60 max-w-xl mx-auto mt-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            All prices are starting points. Final pricing depends on size, complexity, and custom inclusions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }} className={`relative p-8 flex flex-col ${tier.highlight ? "ring-1 ring-[#D4AF37]/60" : ""}`} style={{ background: tier.highlight ? "linear-gradient(135deg, oklch(0.16 0.010 70), oklch(0.14 0.008 65))" : "oklch(0.14 0.006 60)", border: tier.highlight ? "none" : "1px solid rgba(212,175,55,0.2)" }}>
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] tracking-widest uppercase" style={{ background: "linear-gradient(135deg, #C9A84C, #D4AF37)", color: "#0d0d0d", fontFamily: "'Jost', sans-serif", fontWeight: 700 }}>Most Popular</div>
              )}
              <div className="text-center mb-6">
                <p className="text-[#D4AF37] text-lg mb-2">{tier.icon}</p>
                <h3 className="text-2xl font-light text-cream mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{tier.name}</h3>
                <p className="text-cream/50 text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{tier.description}</p>
              </div>
              <div className="gold-divider mb-6" />
              <ul className="space-y-4 flex-1 mb-8">
                {tier.items.map((item) => (
                  <li key={item.label} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Check size={12} className="text-[#D4AF37] shrink-0" />
                      <span className="text-cream/70 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.label}</span>
                    </div>
                    <TierPriceDisplay price={item.price} />
                  </li>
                ))}
              </ul>
              <a href={getWhatsAppLink(tier.waMessage)} target="_blank" rel="noopener noreferrer" className={`w-full text-center flex items-center justify-center gap-2 ${tier.highlight ? "btn-gold" : "btn-outline-gold"}`}>
                <MessageCircle size={13} /> {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
        <PricingNote />
      </div>
    </section>
  );
}

// ─── Gallery Section ───────────────────────────────────────────────────────────
function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32" style={{ background: "oklch(0.12 0.006 60)" }}>
      <div className="container">
        <div className="text-center mb-16">
          <p className="section-label mb-4">The Gallery</p>
          <h2 className="text-5xl md:text-6xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            A World of <span className="italic text-[#D4AF37]">Resin Magic</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {GALLERY_PHOTOS.map((src, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 8) * 0.06 }} className="insta-item break-inside-avoid cursor-pointer mb-3 relative" onClick={() => setLightbox(src)}>
              <img src={src} alt={`Gallery ${i + 1}`} className="w-full object-cover" />
              {SOLD_INDICES.includes(i) && (
                <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase" style={{ background: "linear-gradient(135deg, #C9A84C, #D4AF37)", color: "#0d0d0d", fontFamily: "'Jost', sans-serif" }}>✦ Sold</div>
              )}
              {NEW_INDICES.includes(i) && (
                <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase" style={{ background: "linear-gradient(135deg, #2d6a4f, #40916c)", color: "#fff", fontFamily: "'Jost', sans-serif" }}>✦ New</div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="https://www.instagram.com/sharizkreations/" target="_blank" rel="noopener noreferrer" className="btn-outline-gold inline-flex items-center gap-2">
            <Instagram size={14} /> See More on Instagram @sharizkreations
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.95)" }} onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 text-cream/60 hover:text-[#D4AF37]"><X size={28} /></button>
            <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} src={lightbox} alt="Gallery" className="max-w-full max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(ellipse at center, #D4AF37 0%, transparent 70%)" }} />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <p className="section-label mb-4">Kind Words</p>
          <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            What Clients <span className="italic text-[#D4AF37]">Say</span>
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }} className="p-8 relative" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="flex gap-1 mb-4">{Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={12} fill="#D4AF37" className="text-[#D4AF37]" />)}</div>
              <p className="text-cream/70 leading-relaxed mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C9A84C, #D4AF37)" }}>
                  <span className="text-xs font-bold text-[#0d0d0d]">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-cream/80 text-sm font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>{t.name}</p>
                  <p className="text-cream/40 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>{t.source}</p>
                </div>
              </div>
              <div className="absolute top-4 right-6 text-6xl leading-none opacity-10" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#D4AF37" }}>"</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Custom Orders Section (Enhanced) ─────────────────────────────────────────
function CustomOrdersSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    budget: "",
    timeline: "",
    message: "",
    file: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productTypes = [
    "Resin Coasters (Set of 4)",
    "Canvas Wall Art",
    "Serving Tray",
    "Piggy Bank / Desk Decor",
    "Islamic Calligraphy Art",
    "Wedding / Event Decor",
    "Custom Gift Set",
    "Corporate Gifting",
    "Other / Not Sure Yet",
  ];

  const budgetRanges = [
    "Under $50 CAD",
    "$50 – $100 CAD",
    "$100 – $200 CAD",
    "$200 – $350 CAD",
    "$350 – $500 CAD",
    "$500+ CAD",
    "Not Sure — Need a Quote",
  ];

  const timelines = [
    "ASAP (Rush Order)",
    "Within 1–2 Weeks",
    "Within 1 Month",
    "1–3 Months",
    "No Rush — Flexible",
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Your name is required.";
    if (!form.email.trim()) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email.";
    if (!form.type) newErrors.type = "Please select a product type.";
    if (!form.message.trim()) newErrors.message = "Please describe your vision.";
    else if (form.message.trim().length < 15) newErrors.message = "Please provide a bit more detail (at least 15 characters).";
    return newErrors;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `✨ *New Custom Order Inquiry — ShaRiz Kreations*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      form.phone ? `📱 *Phone:* ${form.phone}` : null,
      `🎨 *Product Type:* ${form.type}`,
      form.budget ? `💰 *Budget:* ${form.budget}` : null,
      form.timeline ? `📅 *Timeline:* ${form.timeline}` : null,
      ``,
      `💬 *Vision / Details:*`,
      form.message,
      form.file ? `\n📎 *Reference Image:* ${form.file.name} (attached separately)` : null,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(`field-${firstErrorKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Your custom order request has been sent! Shaz will be in touch soon. ✨", {
      style: { background: "#1a1a1a", border: "1px solid #D4AF37", color: "#EDE8DC" },
    });
    // Open WhatsApp with pre-filled message
    setTimeout(() => {
      window.open(getWhatsAppLink(buildWhatsAppMessage()), "_blank");
    }, 600);
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be under 10MB.", { style: { background: "#1a1a1a", border: "1px solid #D4AF37", color: "#EDE8DC" } });
        return;
      }
      setForm((f) => ({ ...f, file }));
    } else {
      toast.error("Please upload an image file (JPG, PNG, WEBP).", { style: { background: "#1a1a1a", border: "1px solid #D4AF37", color: "#EDE8DC" } });
    }
  };

  const inputClass = "w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors";
  const inputStyle = { background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" };
  const errorInputStyle = { background: "oklch(0.10 0.005 60)", border: "1px solid rgba(220,50,50,0.6)", fontFamily: "'Jost', sans-serif" };
  const labelClass = "text-[10px] tracking-widest uppercase text-cream/50 block mb-2";
  const errorClass = "text-red-400 text-xs mt-1.5";

  return (
    <section id="custom-orders" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={ALL_PHOTOS[62]} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.10 0.005 60), oklch(0.10 0.005 60 / 95%))" }} />
      </div>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div>
            <p className="section-label mb-4">Bespoke Creations</p>
            <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
              Your Vision,<br /><span className="italic text-[#D4AF37]">Captured in Resin</span>
            </h2>
            <div className="gold-divider" style={{ margin: "0 0 1.5rem 0" }} />
            <p className="text-cream/70 leading-relaxed mb-8" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Every custom order is a collaboration. Share your vision — colors, size, occasion, and inspiration — and Shaz will craft a one-of-a-kind piece that tells your story.
            </p>
            <div className="space-y-6 mb-10">
              {[
                { icon: Sparkles, title: "Fully Customizable", desc: "Colors, size, inclusions (flowers, glitter, gold leaf, calligraphy) — all tailored to you." },
                { icon: Heart, title: "Made with Love", desc: "Each piece is poured, cured, and finished by hand with care and attention to detail." },
                { icon: ShoppingBag, title: "Perfect for Gifting", desc: "Wedding decor, housewarming gifts, corporate pieces — we create for every occasion." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
                    <item.icon size={16} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-cream/90 font-medium mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>{item.title}</p>
                    <p className="text-cream/50 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* How It Works */}
            <div className="p-6 mb-8" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <p className="text-[10px] tracking-widest uppercase text-[#D4AF37] mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>How It Works</p>
              <div className="space-y-3">
                {[
                  { step: "01", text: "Fill in the form with your vision and details" },
                  { step: "02", text: "Shaz reviews and sends a custom quote within 24–48 hrs" },
                  { step: "03", text: "Approve the design and confirm your order" },
                  { step: "04", text: "Your piece is handcrafted and delivered with love" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <span className="text-[#D4AF37]/40 text-xs font-bold shrink-0 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{s.step}</span>
                    <p className="text-cream/60 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <a href={getWhatsAppLink("Hi Shaz! I'd like to discuss a custom resin art order.")} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle size={14} /> Chat on WhatsApp Instead
            </a>
          </div>

          {/* Right — Form */}
          <div className="p-8 md:p-10" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #C9A84C, #D4AF37)" }}>
                  <Check size={28} className="text-[#0d0d0d]" />
                </motion.div>
                <h3 className="text-3xl font-light text-cream mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request Received!</h3>
                <p className="text-cream/60 text-sm mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Thank you, <span className="text-[#D4AF37]">{form.name}</span>! Shaz will review your request and reach out within 24–48 hours.
                </p>
                <p className="text-cream/40 text-xs mb-8" style={{ fontFamily: "'Jost', sans-serif" }}>
                  WhatsApp has been opened with your details pre-filled for a faster response.
                </p>
                <a href={getWhatsAppLink(buildWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 mb-4">
                  <MessageCircle size={14} /> Follow Up on WhatsApp
                </a>
                <br />
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", type: "", budget: "", timeline: "", message: "", file: null }); }} className="btn-outline-gold mt-4">
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="mb-6">
                  <h3 className="text-2xl font-light text-cream mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request a Custom Piece</h3>
                  <p className="text-cream/40 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Fields marked * are required</p>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div id="field-name">
                    <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: "" }); }}
                      className={inputClass}
                      style={errors.name ? errorInputStyle : inputStyle}
                      placeholder="Your name"
                    />
                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                  </div>
                  <div id="field-email">
                    <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: "" }); }}
                      className={inputClass}
                      style={errors.email ? errorInputStyle : inputStyle}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className={errorClass}>{errors.email}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>
                    <span className="inline-flex items-center gap-1.5"><Phone size={10} /> Phone (Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="+1 (000) 000-0000"
                  />
                </div>

                {/* Product Type */}
                <div id="field-type">
                  <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Product Type *</label>
                  <select
                    required
                    value={form.type}
                    onChange={(e) => { setForm({ ...form, type: e.target.value }); if (errors.type) setErrors({ ...errors, type: "" }); }}
                    className={inputClass}
                    style={errors.type ? errorInputStyle : inputStyle}
                  >
                    <option value="">Select a product type...</option>
                    {productTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.type && <p className={errorClass}>{errors.type}</p>}
                </div>

                {/* Budget + Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>
                      <span className="inline-flex items-center gap-1.5"><DollarSign size={10} /> Budget Range</span>
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="">Select budget...</option>
                      {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>
                      <span className="inline-flex items-center gap-1.5"><Calendar size={10} /> Timeline</span>
                    </label>
                    <select
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="">Select timeline...</option>
                      {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Vision */}
                <div id="field-message">
                  <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Your Vision *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: "" }); }}
                    className={`${inputClass} resize-none`}
                    style={errors.message ? errorInputStyle : inputStyle}
                    placeholder="Describe your dream piece — colors, size, occasion, special inclusions (flowers, gold leaf, calligraphy)..."
                  />
                  {errors.message && <p className={errorClass}>{errors.message}</p>}
                  <p className="text-cream/25 text-[10px] mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>{form.message.length} characters</p>
                </div>

                {/* Reference Image Upload */}
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Reference Image (Optional)</label>
                  <div
                    className={`relative border-2 border-dashed p-5 text-center cursor-pointer transition-all duration-300 ${dragOver ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-[#D4AF37]/30 hover:border-[#D4AF37]/60"}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); }} />
                    {form.file ? (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 shrink-0 overflow-hidden border border-[#D4AF37]/30">
                            <img src={URL.createObjectURL(form.file)} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-left">
                            <p className="text-cream/80 text-xs font-medium truncate max-w-[140px]" style={{ fontFamily: "'Jost', sans-serif" }}>{form.file.name}</p>
                            <p className="text-cream/40 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>{(form.file.size / 1024).toFixed(0)} KB</p>
                            <p className="text-[#D4AF37] text-[10px] mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>✓ Image ready</p>
                          </div>
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, file: null })); }} className="text-cream/40 hover:text-red-400 transition-colors shrink-0">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={20} className="text-[#D4AF37]/60 mx-auto mb-2" />
                        <p className="text-cream/50 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Drop an image here or <span className="text-[#D4AF37]">click to browse</span></p>
                        <p className="text-cream/30 text-[10px] mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>JPG, PNG, WEBP — up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2 mt-2">
                  <MessageCircle size={14} /> Send Request &amp; Open WhatsApp
                </button>
                <p className="text-cream/25 text-[10px] text-center" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Submitting will open WhatsApp with your details pre-filled for Shaz.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "How Long Does a Custom Order Take?",
    a: "Most pieces take 7–14 business days to complete, depending on complexity and size. Rush orders (within 3–5 days) are available for an additional fee — just mention it in your request.",
  },
  {
    q: "Do You Ship Across Canada?",
    a: "Yes! We ship Canada-wide. Shipping is calculated at checkout based on your location and the size of your order. International shipping is available on request — message Shaz on WhatsApp for a quote.",
  },
  {
    q: "How Do I Care for My Resin Piece?",
    a: "Resin art is durable but should be kept away from direct sunlight for extended periods to prevent yellowing. Wipe clean with a soft, damp cloth. Avoid harsh chemicals or abrasive cleaners. Coasters should not be used with extremely hot items.",
  },
  {
    q: "Can I Request Specific Colors or Inclusions?",
    a: "Absolutely! Custom orders are fully tailored to you. You can request specific color palettes, inclusions (pressed flowers, gold leaf, glitter, shells, calligraphy), sizes, and shapes. Share your inspiration images in the order form.",
  },
  {
    q: "What Is Your Refund or Exchange Policy?",
    a: "Because every piece is handcrafted to order, we do not accept returns on custom pieces. However, if your item arrives damaged, please contact Shaz within 48 hours with photos and we will make it right.",
  },
  {
    q: "Do You Take Bulk or Corporate Orders?",
    a: "Yes! We love creating bulk gift sets for weddings, corporate events, and special occasions. Discounts are available for orders of 10+ pieces. Message Shaz on WhatsApp to discuss your requirements.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 md:py-32 relative" style={{ background: "oklch(0.12 0.006 60)" }}>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 80% 50%, #D4AF37 0%, transparent 50%)" }} />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Questions Answered</p>
          <h2 className="text-5xl md:text-6xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            Frequently Asked <span className="italic text-[#D4AF37]">Questions</span>
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} style={{ background: "oklch(0.14 0.006 60)", border: open === i ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(212,175,55,0.15)" }}>
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-cream/90 font-medium text-sm md:text-base" style={{ fontFamily: "'Jost', sans-serif" }}>{item.q}</span>
                <span className="text-[#D4AF37] shrink-0 text-lg transition-transform duration-300" style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} style={{ overflow: "hidden" }}>
                    <div className="px-6 pb-6 pt-0">
                      <div className="gold-divider mb-4" style={{ margin: "0 0 1rem 0" }} />
                      <p className="text-cream/60 text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-cream/40 text-sm mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>Still have questions? Shaz is happy to help.</p>
          <a href={getWhatsAppLink("Hi Shaz! I have a question about your resin art.")} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
            <MessageCircle size={14} /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Book a Consultation Section ─────────────────────────────────────────────
function BookConsultationSection() {
  const timeSlots = [
    "Monday – Friday, 10am – 12pm (MST)",
    "Monday – Friday, 2pm – 4pm (MST)",
    "Saturday, 11am – 1pm (MST)",
    "Saturday, 3pm – 5pm (MST)",
  ];
  const [selected, setSelected] = useState<string | null>(null);

  const handleBook = () => {
    const msg = selected
      ? `Hi Shaz! I'd like to book a free 15-minute consultation.\n\n🕐 *Preferred time:* ${selected}\n\nPlease confirm if this slot is available. Thank you!`
      : `Hi Shaz! I'd like to book a free 15-minute consultation. Please let me know your available times. Thank you!`;
    window.open(getWhatsAppLink(msg), "_blank");
  };

  return (
    <section id="consultation" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "oklch(0.11 0.006 60)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)" }} />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-4">Free Consultation</p>
            <h2 className="text-5xl md:text-6xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
              Book a <span className="italic text-[#D4AF37]">15-Minute Call</span>
            </h2>
            <p className="text-cream/50 max-w-xl mx-auto text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Not sure what to order? Chat with Shaz directly — discuss your vision, get colour suggestions, and receive a personalised quote. No commitment required.
            </p>
            <div className="gold-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: What to expect */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="p-8" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <h3 className="text-xl font-light mb-6 text-cream" style={{ fontFamily: "'Cormorant Garamond', serif" }}>What We'll Cover</h3>
              <ul className="space-y-4">
                {[
                  { icon: "✦", text: "Your vision, theme, and colour palette" },
                  { icon: "✦", text: "Product type, size, and customisation options" },
                  { icon: "✦", text: "Timeline and delivery details" },
                  { icon: "✦", text: "Personalised pricing and quote" },
                  { icon: "✦", text: "Any questions about resin art care" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#D4AF37] text-xs mt-1">{item.icon}</span>
                    <span className="text-cream/60 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}>
                <p className="text-cream/40 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Consultations are held via WhatsApp call or voice message. Available in English and Urdu.</p>
              </div>
            </motion.div>

            {/* Right: Time slot picker */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="text-xl font-light mb-4 text-cream" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Choose a Preferred Time</h3>
              <p className="text-cream/40 text-xs mb-5" style={{ fontFamily: "'Jost', sans-serif" }}>Select a slot and Shaz will confirm availability via WhatsApp.</p>
              <div className="space-y-3 mb-6">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelected(slot === selected ? null : slot)}
                    className="w-full text-left px-5 py-4 text-sm transition-all duration-200"
                    style={{
                      background: selected === slot ? "rgba(212,175,55,0.12)" : "oklch(0.14 0.006 60)",
                      border: selected === slot ? "1px solid rgba(212,175,55,0.6)" : "1px solid rgba(212,175,55,0.15)",
                      color: selected === slot ? "#D4AF37" : "rgba(237,232,220,0.6)",
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    <span className="mr-2" style={{ color: selected === slot ? "#D4AF37" : "rgba(212,175,55,0.3)" }}>{selected === slot ? "◆" : "◇"}</span>
                    {slot}
                  </button>
                ))}
              </div>
              <button
                onClick={handleBook}
                className="w-full btn-gold flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Book via WhatsApp
              </button>
              <p className="text-cream/30 text-xs text-center mt-3" style={{ fontFamily: "'Jost', sans-serif" }}>Free · No commitment · Responds within 24 hours</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial Submission Section ────────────────────────────────────────────
function TestimonialSubmitSection() {
  const [form, setForm] = useState({ name: "", review: "", stars: 5, product: "" });
  const [submitted, setSubmitted] = useState(false);

  const productOptions = [
    "Resin Coasters", "Canvas Wall Art", "Serving Tray", "Islamic Calligraphy Art",
    "Piggy Bank / Decor", "Custom Gift Set", "Wedding / Event Decor", "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) return;
    const stars = "⭐".repeat(form.stars);
    const msg = [
      `✨ *New Review for ShaRiz Kreations*`,
      ``,
      `👤 *Name:* ${form.name}`,
      form.product ? `🎨 *Product:* ${form.product}` : "",
      `${stars} *Rating:* ${form.stars}/5`,
      ``,
      `💬 *Review:*`,
      form.review,
    ].filter(Boolean).join("\n");
    window.open(getWhatsAppLink(msg), "_blank");
    setSubmitted(true);
  };

  return (
    <section className="py-20 relative" style={{ background: "oklch(0.13 0.006 60)" }}>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, #D4AF37 0%, transparent 60%)" }} />
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-4">Share Your Experience</p>
            <h2 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
              Leave a <span className="italic text-[#D4AF37]">Review</span>
            </h2>
            <p className="text-cream/40 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Loved your piece? Your kind words help other customers discover ShaRiz Kreations.</p>
            <div className="gold-divider" />
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 px-8" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.3)" }}>
              <div className="text-4xl mb-4">✦</div>
              <h3 className="text-2xl font-light text-cream mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Thank You!</h3>
              <p className="text-cream/50 text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Your review has been sent to Shaz via WhatsApp. It means the world!</p>
              <div className="gold-divider" />
              <p className="text-cream/60 text-sm mb-4 mt-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Love your piece? Share it on Instagram and tag us!</p>
              <a
                href="https://www.instagram.com/sharizkreations"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-widest uppercase transition-all hover:opacity-80"
                style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)", color: "#fff", fontFamily: "'Jost', sans-serif" }}
              >
                <Instagram size={14} /> Tag @sharizkreations
              </a>
              <button onClick={() => setSubmitted(false)} className="mt-4 block mx-auto btn-outline-gold text-xs">Submit Another Review</button>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} onSubmit={handleSubmit} className="p-8 space-y-5" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}>
              {/* Star rating */}
              <div>
                <label className="block text-cream/60 text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>Your Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((s) => (
                    <button key={s} type="button" onClick={() => setForm(f => ({ ...f, stars: s }))} className="transition-transform hover:scale-110 active:scale-95">
                      <Star size={24} fill={s <= form.stars ? "#D4AF37" : "none"} className={s <= form.stars ? "text-[#D4AF37]" : "text-cream/20"} />
                    </button>
                  ))}
                  <span className="text-cream/40 text-sm self-center ml-2" style={{ fontFamily: "'Jost', sans-serif" }}>{form.stars}/5</span>
                </div>
              </div>
              {/* Name */}
              <div>
                <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Your Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Sarah M." className="w-full px-4 py-3 text-sm text-cream bg-transparent outline-none transition-colors" style={{ border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }} onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.6)"} onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.2)"} />
              </div>
              {/* Product */}
              <div>
                <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Product Purchased (Optional)</label>
                <select value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} className="w-full px-4 py-3 text-sm text-cream/70 bg-transparent outline-none" style={{ border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif", fontWeight: 300, background: "oklch(0.14 0.006 60)" }}>
                  <option value="">Select a product...</option>
                  {productOptions.map(p => <option key={p} value={p} style={{ background: "#1a1a14" }}>{p}</option>)}
                </select>
              </div>
              {/* Review text */}
              <div>
                <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Your Review *</label>
                <textarea required value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} rows={4} placeholder="Tell others about your experience with ShaRiz Kreations..." className="w-full px-4 py-3 text-sm text-cream bg-transparent outline-none resize-none transition-colors" style={{ border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }} onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.6)"} onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.2)"} />
              </div>
              <button type="submit" className="w-full btn-gold flex items-center justify-center gap-2">
                <Heart size={13} /> Submit Review
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Refer a Friend Section ──────────────────────────────────────────────────
function ReferAFriendSection() {
  const [copied, setCopied] = useState(false);
  const referralUrl = "https://sharizkreations.com";
  const referralMsg = `I just ordered from ShaRiz Kreations and I'm obsessed! 😍 Shaz creates the most stunning handcrafted resin art — coasters, wall art, trays, and more. Check her out: ${referralUrl}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "oklch(0.11 0.006 60)" }}>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 50% 100%, #D4AF37 0%, transparent 60%)" }} />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto text-center">
          <p className="section-label mb-4">Spread the Love</p>
          <h2 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            Refer a <span className="italic text-[#D4AF37]">Friend</span>
          </h2>
          <p className="text-cream/40 text-sm mb-8" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Know someone who would love handcrafted resin art? Share the magic — send them a WhatsApp message or copy the link below.</p>
          <div className="gold-divider" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(referralMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} /> Share via WhatsApp
            </a>
            <button
              onClick={copyLink}
              className="btn-outline-gold flex items-center justify-center gap-2 transition-all"
            >
              {copied ? (
                <><span className="text-emerald-400">✓</span> Link Copied!</>
              ) : (
                <><span className="text-[#D4AF37]">⎘</span> Copy Link</>
              )}
            </button>
          </div>
          <p className="text-cream/20 text-xs mt-6" style={{ fontFamily: "'Jost', sans-serif" }}>sharizkreations.com</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Instagram Feed Section ────────────────────────────────────────────────────
function InstagramSection() {
  return (
    <section className="py-20" style={{ background: "oklch(0.12 0.006 60)" }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Follow the Journey</p>
          <h2 className="text-4xl md:text-5xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            <span className="text-[#D4AF37]">@sharizkreations</span>
          </h2>
          <p className="script-accent text-2xl">on Instagram</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
          {INSTA_PHOTOS.map((src, i) => (
            <motion.a key={i} href="https://www.instagram.com/sharizkreations/" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="insta-item aspect-square block">
              <img src={src} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover" />
            </motion.a>
          ))}
        </div>
        <div className="text-center">
          <a href="https://www.instagram.com/sharizkreations/" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
            <Instagram size={14} /> Follow @sharizkreations
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Get in Touch</p>
          <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
            Let's Create <span className="italic text-[#D4AF37]">Together</span>
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { icon: MessageCircle, title: "WhatsApp", value: "+1 (403) 986-7064", href: getWhatsAppLink("Hi Shaz! I'd like to inquire about your resin art.") },
            { icon: Instagram, title: "Instagram", value: "@sharizkreations", href: "https://www.instagram.com/sharizkreations/" },
            { icon: MapPin, title: "Location", value: "Canada", href: "#" },
          ].map((item, i) => (
            <motion.a key={i} href={item.href} target={item.href.startsWith("http") || item.href.startsWith("https://wa") ? "_blank" : undefined} rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="flex flex-col items-center text-center p-8 group transition-all duration-300" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.4)" }}>
                <item.icon size={18} className="text-[#D4AF37]" />
              </div>
              <p className="text-[10px] tracking-widest uppercase text-cream/40 mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>{item.title}</p>
              <p className="text-cream/80 text-sm group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Jost', sans-serif" }}>{item.value}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: "rgba(212,175,55,0.15)", background: "oklch(0.09 0.005 60)" }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="ShaRiz Kreations" className="h-14 w-14 object-contain" style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.2))" }} />
            <div>
              <p className="text-cream/80 font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>ShaRiz Kreations</p>
              <p className="text-cream/40 text-xs tracking-widest" style={{ fontFamily: "'Jost', sans-serif" }}>Resin Artist · Creating Colorful Dreams</p>
            </div>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {["Home", "About", "Collection", "Pricing", "Gallery", "Contact"].map((link) => (
              <button key={link} onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} className="text-[10px] tracking-widest uppercase text-cream/40 hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Jost', sans-serif" }}>{link}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/sharizkreations/" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-[#D4AF37] transition-colors"><Instagram size={18} /></a>
            <a href={getWhatsAppLink("Hi Shaz! I'd like to inquire about your resin art.")} target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-[#D4AF37] transition-colors"><MessageCircle size={18} /></a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-2" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
          <p className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>© 2026 ShaRiz Kreations. All rights reserved. Future Eye.</p>
          <div className="flex items-center gap-4">
            <Link href="/care-instructions" className="text-cream/30 text-xs hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Jost', sans-serif" }}>Care Instructions</Link>
            <span className="text-cream/20 text-xs">·</span>
            <p className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Handcrafted with ♥ · sharizkreations.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ─────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <motion.a href={getWhatsAppLink("Hi Shaz! I'd like to inquire about your resin art.")} target="_blank" rel="noopener noreferrer" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2, duration: 0.4, ease: [0.23, 1, 0.32, 1] }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 4px 24px rgba(37,211,102,0.4)" }} title="Chat with Shaz on WhatsApp">
      <MessageCircle size={24} className="text-white" />
    </motion.a>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.005 60)" }}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <PricingSection />
      <GallerySection />
      <TestimonialsSection />
      <CustomOrdersSection />
      <FAQSection />
      <BookConsultationSection />
      <TestimonialSubmitSection />
      <ReferAFriendSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
