/**
 * ShaRiz Kreations — Home Page
 * Design: "Dark Atelier" — Obsidian bg, warm gold accents, Cormorant Garamond display
 * Updated: All original photos from Shaz, WhatsApp +14039867064
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Instagram, MapPin, Star, ChevronDown, X, Menu, ShoppingBag, Sparkles, Heart, Upload, MessageCircle, Check } from "lucide-react";
import { toast } from "sonner";

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "14039867064";
function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Logo (SRK) ───────────────────────────────────────────────────────────────
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663621968227/CM3dugtQ88PNk5FGG6DJZY/srk_logo_v2-gq3kZxkAn2WXgMvA53YFJX.webp";

// ─── All 94 real photos from Shaz (verified CDN paths) ───────────────────────
const ALL_PHOTOS = [
  "/manus-storage/WhatsAppImage2026-05-16at12.54.32AM_b6270ca4.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.33AM_6811ca24.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.34AM(1)_eb9a0745.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.34AM(2)_10b2b570.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.34AM_84a17c29.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.35AM(1)_aa9eddfc.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.35AM_e38a899e.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.36AM(1)_df3ee9d3.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.36AM(2)_4056b9de.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.36AM_c080ecc8.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.37AM(1)_88e9915b.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.37AM_e05fdf29.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.38AM_a45f9e65.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.39AM(1)_6b077ea4.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.39AM_dcc71573.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.40AM_57a678f6.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.49AM_c8e57f61.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.51AM(1)_4af334c2.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.51AM_79ec7535.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.52AM(1)_0957d2a9.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.52AM_d0b903e0.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.53AM(1)_18ef178d.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.53AM_a446a43d.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.54AM(1)_ecfea5cb.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.54AM(2)_a34e974a.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.54AM_4f219b1a.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.55AM(1)_70c51e33.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.55AM_e672ff73.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.56AM(1)_3786d8c1.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.56AM_c8100e62.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.57AM(1)_a231eff5.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.57AM_1e8d3e79.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.58AM(1)_ab8a2ebc.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.58AM(2)_5211edf7.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.58AM_abfeba7a.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.59AM(1)_f90a1bee.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.54.59AM_43a7f7d8.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.00AM(1)_5d234212.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.00AM(2)_dc80da22.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.00AM_f2ffea8e.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.01AM(1)_a9a34db7.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.01AM(2)_7f73d4e4.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.01AM_28f67893.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.02AM(1)_4776eba8.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.02AM(2)_8a93f303.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.02AM_fe5fcf92.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.03AM(1)_b3c2565f.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.03AM_62531c49.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.04AM(1)_1bae0a32.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.04AM(2)_21510925.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.04AM(3)_8a3c39b7.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.04AM_abb1f213.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.05AM(1)_91a1ede4.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.05AM(2)_ab922825.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.05AM_880aa12b.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.06AM(1)_bb257e62.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.06AM_b01d330b.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.07AM_2a0a1f85.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.09AM(1)_32b5ce95.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.09AM_505410dc.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.10AM(1)_ae6822ed.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.10AM_f2fbb10d.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.12AM_c177698f.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.13AM(1)_494fe624.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.13AM_fe3cb035.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.14AM_e4f8f9ac.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.16AM(1)_3b89f6b6.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.16AM_66ab51c1.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.19AM_d1f625d8.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.21AM(1)_87079bac.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.21AM_9232fa59.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.22AM_ac4f85b8.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.55.23AM_88e44ce5.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.43AM(1)_0c98fa72.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.43AM_dc0d4c0d.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.44AM(1)_d01d38cb.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.44AM(2)_c9c6ede7.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.44AM_2b22af62.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.45AM(1)_8103592b.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.45AM_dce4e90c.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.46AM(1)_5e268da1.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.46AM(2)_586fc73c.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.46AM_f735fea3.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.47AM(1)_ca598a2d.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.47AM(2)_f1a8ff6a.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.47AM(3)_05c4ce6c.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.47AM_d98ffad8.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.48AM(1)_a9dec16f.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.48AM(2)_97b30f0f.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.48AM_68e3a38f.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.49AM(1)_5e7f643d.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.49AM_5f1fb213.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.50AM(1)_55319363.jpeg",
  "/manus-storage/WhatsAppImage2026-05-16at12.56.50AM_1e2e903f.jpeg",
];

// Curated selections for specific sections
const HERO_IMG = ALL_PHOTOS[0];
const ABOUT_IMG = ALL_PHOTOS[16];

const PRODUCTS = [
  {
    id: 1,
    name: "Resin Coasters",
    subtitle: "Set of 4 — Handcrafted",
    description: "Pressed flowers, gold leaf, and crystal-clear resin. Each set is unique — no two are ever the same. Perfect for gifting or elevating your own space.",
    price: "From $45",
    images: [ALL_PHOTOS[1], ALL_PHOTOS[2], ALL_PHOTOS[3], ALL_PHOTOS[4]],
    tag: "Bestseller",
    waMessage: "Hi Shaz! I'm interested in your Resin Coasters. Could you share more details and availability?",
  },
  {
    id: 2,
    name: "Canvas Wall Art",
    subtitle: "Statement Pieces",
    description: "Large-scale resin canvas art with swirling pigments, gold leaf, and deep ocean colors. Each piece transforms any room into a gallery.",
    price: "From $180",
    images: [ALL_PHOTOS[5], ALL_PHOTOS[6], ALL_PHOTOS[7], ALL_PHOTOS[8]],
    tag: "Statement Piece",
    waMessage: "Hi Shaz! I'm interested in your Canvas Wall Art. Could you share more details?",
  },
  {
    id: 3,
    name: "Serving Trays",
    subtitle: "Luxury Home Decor",
    description: "Resin serving trays with marble effects, gold veining, and scalloped edges. Functional art that elevates every surface it graces.",
    price: "From $95",
    images: [ALL_PHOTOS[9], ALL_PHOTOS[10], ALL_PHOTOS[11], ALL_PHOTOS[12]],
    tag: "Luxury",
    waMessage: "Hi Shaz! I'm interested in your Resin Serving Trays. Could you share more details?",
  },
  {
    id: 4,
    name: "Islamic Calligraphy Art",
    subtitle: "Faith · Framed in Resin",
    description: "White marble resin base with gold Arabic calligraphy. A statement of faith and elegance, handcrafted with love and calm.",
    price: "From $120",
    images: [ALL_PHOTOS[13], ALL_PHOTOS[14], ALL_PHOTOS[15], ALL_PHOTOS[17]],
    tag: "Spiritual",
    waMessage: "Hi Shaz! I'm interested in your Islamic Calligraphy Art. Could you share more details?",
  },
  {
    id: 5,
    name: "Piggy Banks & Decor",
    subtitle: "Whimsical Collection",
    description: "Galaxy resin piggy banks, bookends, and desk decor with colorful swirling patterns and gold flakes. A whimsical yet luxurious addition.",
    price: "From $55",
    images: [ALL_PHOTOS[18], ALL_PHOTOS[19], ALL_PHOTOS[20], ALL_PHOTOS[21]],
    tag: "Fan Favourite",
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
    waMessage: "Hi Shaz! I'd like to discuss a custom resin art order. Can we chat?",
  },
];

const PRICING_TIERS = [
  {
    name: "Essentials",
    icon: "✦",
    description: "Perfect for gifting or adding a touch of resin magic to your home.",
    items: [
      { label: "Coaster Set (4 pieces)", price: "From $45" },
      { label: "Small Resin Tray (8\")", price: "From $55" },
      { label: "Piggy Bank / Desk Decor", price: "From $55" },
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
      { label: "Large Serving Tray (14\")", price: "From $95" },
      { label: "Islamic Calligraphy Art", price: "From $120" },
      { label: "Canvas Wall Art (18\"×18\")", price: "From $180" },
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

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={HERO_IMG} alt="ShaRiz Kreations resin art" className="w-full h-full object-cover" style={{ transform: "scale(1.1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.80) 100%)" }} />
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
              <div className="card-img aspect-square">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#D4AF37] mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>{product.tag}</p>
                    <h3 className="text-xl font-light text-cream" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{product.name}</h3>
                    <p className="text-xs text-cream/50 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{product.subtitle}</p>
                  </div>
                  <span className="text-xs text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-1 whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif" }}>{product.price}</span>
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
                  <p className="text-[#D4AF37] font-medium mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>{selected.price}</p>
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
                    <span className="text-[#D4AF37] text-xs font-medium whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif" }}>{item.price}</span>
                  </li>
                ))}
              </ul>
              <a href={getWhatsAppLink(tier.waMessage)} target="_blank" rel="noopener noreferrer" className={`w-full text-center flex items-center justify-center gap-2 ${tier.highlight ? "btn-gold" : "btn-outline-gold"}`}>
                <MessageCircle size={13} /> {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-cream/30 text-xs mt-8" style={{ fontFamily: "'Jost', sans-serif" }}>* All prices in CAD. Shipping available across Canada. International shipping on request.</p>
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
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 8) * 0.06 }} className="insta-item break-inside-avoid cursor-pointer mb-3" onClick={() => setLightbox(src)}>
              <img src={src} alt={`Gallery ${i + 1}`} className="w-full object-cover" />
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

// ─── Custom Orders Section ─────────────────────────────────────────────────────
function CustomOrdersSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "", file: null as File | null });
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Your custom order request has been sent! Shaz will be in touch soon. ✨", { style: { background: "#1a1a1a", border: "1px solid #D4AF37", color: "#EDE8DC" } });
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) setForm((f) => ({ ...f, file }));
    else toast.error("Please upload an image file.", { style: { background: "#1a1a1a", border: "1px solid #D4AF37", color: "#EDE8DC" } });
  };

  const productTypes = ["Resin Coasters (Set of 4)", "Canvas Wall Art", "Serving Tray", "Piggy Bank / Desk Decor", "Islamic Calligraphy Art", "Wedding/Event Decor", "Custom Gift Set", "Other"];

  return (
    <section id="custom-orders" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={ALL_PHOTOS[62]} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.10 0.005 60), oklch(0.10 0.005 60 / 95%))" }} />
      </div>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
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
            <a href={getWhatsAppLink("Hi Shaz! I'd like to discuss a custom resin art order.")} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle size={14} /> Chat on WhatsApp
            </a>
          </div>

          <div className="p-8 md:p-10" style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}>
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-3xl font-light text-cream mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request Received!</h3>
                <p className="text-cream/60 text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>Shaz will reach out within 24–48 hours to discuss your custom piece.</p>
                <a href={getWhatsAppLink("Hi Shaz! I just submitted a custom order request.")} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 mb-4">
                  <MessageCircle size={14} /> Follow Up on WhatsApp
                </a>
                <br />
                <button onClick={() => setSubmitted(false)} className="btn-outline-gold mt-4">Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-light text-cream mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request a Custom Piece</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Your Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors" style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors" style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Phone (Optional)</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors" style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }} placeholder="+1 (000) 000-0000" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Product Type *</label>
                  <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors" style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }}>
                    <option value="">Select a product type</option>
                    {productTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Your Vision *</label>
                  <textarea required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors resize-none" style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }} placeholder="Describe your dream piece — colors, size, occasion, special inclusions..." />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Reference Image (Optional)</label>
                  <div className={`relative border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-300 ${dragOver ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-[#D4AF37]/30 hover:border-[#D4AF37]/60"}`} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); }} onClick={() => fileInputRef.current?.click()}>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); }} />
                    {form.file ? (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 shrink-0 overflow-hidden border border-[#D4AF37]/30">
                            <img src={URL.createObjectURL(form.file)} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-left">
                            <p className="text-cream/80 text-xs font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>{form.file.name}</p>
                            <p className="text-cream/40 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>{(form.file.size / 1024).toFixed(0)} KB</p>
                          </div>
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, file: null })); }} className="text-cream/40 hover:text-[#D4AF37] transition-colors"><X size={16} /></button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={20} className="text-[#D4AF37]/60 mx-auto mb-2" />
                        <p className="text-cream/50 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Drop an image here or <span className="text-[#D4AF37]">click to browse</span></p>
                        <p className="text-cream/30 text-[10px] mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>JPG, PNG, WEBP up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn-gold w-full">Send Custom Order Request</button>
              </form>
            )}
          </div>
        </div>
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
          <p className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>© 2026 ShaRiz Kreations. All rights reserved.</p>
          <p className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Handcrafted with ♥ · sharizkreations.com</p>
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
      <InstagramSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
