/**
 * ShaRiz Kreations — Home Page
 * Design: "Dark Atelier" — Obsidian bg, warm gold accents, Cormorant Garamond display
 * Updated: New SRK logo, WhatsApp order buttons, image upload on custom order form, pricing section
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Instagram, Mail, MapPin, Star, ChevronDown, X, Menu, ShoppingBag, Sparkles, Heart, Upload, MessageCircle, Check } from "lucide-react";
import { toast } from "sonner";

// ─── Asset URLs ────────────────────────────────────────────────────────────────
const ASSETS = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621968227/CM3dugtQ88PNk5FGG6DJZY/srk_logo_v2-gq3kZxkAn2WXgMvA53YFJX.webp",
  heroBanner: "/manus-storage/hero_banner_0f199c5e.jpg",
  aboutImage: "/manus-storage/about_image_0c61bc86.jpg",
  galleryBanner: "/manus-storage/gallery_banner_c7098d1b.jpg",
  products: {
    coasters: "/manus-storage/product_coasters_394ebbbe.jpg",
    wallArt: "/manus-storage/product_wallart_7e1971d1.jpg",
    piggyBank: "/manus-storage/product_piggybank_48952818.jpg",
    tray: "/manus-storage/product_tray_1e4dfa4d.jpg",
    islamic: "/manus-storage/product_islamic_b845eedd.jpg",
  },
};

// WhatsApp number — update with Shaz's actual number
const WHATSAPP_NUMBER = "1234567890";

function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "White & Gold Floral Coasters",
    subtitle: "Set of 4",
    description: "Pressed flowers preserved in crystal-clear resin with gold leaf flakes and scalloped gold edges. The definition of chic elegance for your coffee table.",
    price: "From $45",
    image: ASSETS.products.coasters,
    tag: "Bestseller",
    waMessage: "Hi Shaz! I'm interested in the White & Gold Floral Coasters (Set of 4). Could you share more details?",
  },
  {
    id: 2,
    name: "Resin Canvas Wall Art",
    subtitle: "34×34 inches",
    description: "Swirling abstract resin art with deep ocean blues, purples, and gold. Each piece is one-of-a-kind, poured with intention and love.",
    price: "From $180",
    image: ASSETS.products.wallArt,
    tag: "Statement Piece",
    waMessage: "Hi Shaz! I'm interested in the Resin Canvas Wall Art. Could you share more details?",
  },
  {
    id: 3,
    name: "Galaxy Resin Piggy Bank",
    subtitle: "Desk Collection",
    description: "Colorful swirling resin piggy bank with gold flakes and glitter. A whimsical yet luxurious addition to any desk or shelf.",
    price: "From $55",
    image: ASSETS.products.piggyBank,
    tag: "Fan Favourite",
    waMessage: "Hi Shaz! I'm interested in the Galaxy Resin Piggy Bank. Could you share more details?",
  },
  {
    id: 4,
    name: "Black & Gold Serving Tray",
    subtitle: "Luxury Home Decor",
    description: "Deep black marble-effect resin with gold leaf veining and scalloped gold handles. Elevate every surface it graces.",
    price: "From $95",
    image: ASSETS.products.tray,
    tag: "Luxury",
    waMessage: "Hi Shaz! I'm interested in the Black & Gold Serving Tray. Could you share more details?",
  },
  {
    id: 5,
    name: "Islamic Calligraphy Wall Art",
    subtitle: "Faith · Framed in Art",
    description: "White marble resin base with gold Arabic calligraphy. A statement of faith and elegance, handcrafted with love and calm.",
    price: "From $120",
    image: ASSETS.products.islamic,
    tag: "Spiritual",
    waMessage: "Hi Shaz! I'm interested in the Islamic Calligraphy Wall Art. Could you share more details?",
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
      { label: "Piggy Bank", price: "From $55" },
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

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Gold Particle ─────────────────────────────────────────────────────────────
function GoldParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, #F0D060, #C9A84C)",
        boxShadow: "0 0 6px rgba(201,168,76,0.8)",
        ...style,
      }}
    />
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
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <img
              src={ASSETS.logo}
              alt="ShaRiz Kreations"
              className="h-14 w-14 object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))" }}
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-[11px] tracking-widest uppercase font-medium text-cream/70 hover:text-[#D4AF37] transition-colors duration-300"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppLink("Hi Shaz! I'd like to place an order. Can you help me?")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 btn-gold text-xs"
            >
              <MessageCircle size={13} />
              Order Now
            </a>
            <button
              className="lg:hidden text-cream/80 hover:text-[#D4AF37] transition-colors"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "rgba(10,10,10,0.97)" }}
          >
            <div className="flex justify-between items-center p-6 border-b border-[#D4AF37]/20">
              <img src={ASSETS.logo} alt="ShaRiz Kreations" className="h-12 w-12 object-contain" />
              <button onClick={() => setMenuOpen(false)} className="text-cream/70 hover:text-[#D4AF37]">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link)}
                  className="text-2xl font-light tracking-widest uppercase text-cream/80 hover:text-[#D4AF37] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {link}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                href={getWhatsAppLink("Hi Shaz! I'd like to place an order. Can you help me?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-4 flex items-center gap-2"
              >
                <MessageCircle size={14} />
                Order on WhatsApp
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

  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: `${10 + i * 7.5}%`,
    top: `${20 + (i % 4) * 18}%`,
    animationDuration: `${3 + (i % 3)}s`,
    animationDelay: `${i * 0.4}s`,
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={ASSETS.heroBanner}
          alt="ShaRiz Kreations resin art"
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.1)" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.75) 100%)"
        }} />
      </motion.div>

      {particles.map((p, i) => (
        <GoldParticle
          key={i}
          style={{
            left: p.left,
            top: p.top,
            animation: `float-particle ${p.animationDuration} ease-in-out infinite`,
            animationDelay: p.animationDelay,
          }}
        />
      ))}

      <motion.div className="relative z-10 container" style={{ opacity }}>
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-label mb-6"
          >
            ✦ Handcrafted Resin Art ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl font-light leading-none mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
          >
            Creating
            <br />
            <span className="shimmer-text italic font-medium">Colorful Dreams</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl font-light mb-2 text-cream/70 max-w-xl"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Capturing imagination in resin.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="script-accent text-3xl mb-10"
          >
            Find your own piece of resin magic
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-gold"
            >
              Explore Collection
            </button>
            <a
              href={getWhatsAppLink("Hi Shaz! I'd like to place a custom order. Can you help me?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold flex items-center gap-2"
            >
              <MessageCircle size={14} />
              WhatsApp Order
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
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
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4AF37 0%, transparent 50%)"
      }} />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative">
              <img
                src={ASSETS.aboutImage}
                alt="Shaz creating resin art"
                className="w-full h-[500px] object-cover"
                style={{ filter: "brightness(0.9) contrast(1.05)" }}
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37]/30 pointer-events-none" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />
            </div>
            <div
              className="absolute -bottom-6 left-8 px-6 py-4"
              style={{ background: "linear-gradient(135deg, #C9A84C, #D4AF37)", color: "#0d0d0d" }}
            >
              <p className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>125+ Pieces</p>
              <p className="text-xs tracking-wider" style={{ fontFamily: "'Jost', sans-serif" }}>Crafted with Love</p>
            </div>
          </motion.div>

          <div ref={ref} className="reveal">
            <p className="section-label mb-4">About the Artist</p>
            <h2
              className="text-5xl md:text-6xl font-light mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
            >
              Meet <span className="italic text-[#D4AF37]">Shaz</span>
            </h2>
            <div className="gold-divider" style={{ margin: "0 0 1.5rem 0" }} />
            <p className="text-cream/70 leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Welcome to ShaRiz Kreations — a world where resin becomes magic. I'm Shaz, a passionate resin artist dedicated to capturing imagination in every pour.
            </p>
            <p className="text-cream/70 leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Each piece in my collection is handcrafted with intention — from the White & Gold Floral Coasters that grace coffee tables, to large-scale canvas wall art that transforms entire rooms. I work with pressed flowers, gold leaf, iridescent pigments, and premium epoxy resin to create pieces that are truly one-of-a-kind.
            </p>
            <p className="text-cream/70 leading-relaxed mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Custom orders are my specialty — I love bringing your vision to life.
            </p>

            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { num: "125+", label: "Unique Pieces" },
                { num: "100%", label: "Handcrafted" },
                { num: "∞", label: "Custom Options" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-light text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{stat.num}</p>
                  <p className="text-xs tracking-widest uppercase text-cream/50" style={{ fontFamily: "'Jost', sans-serif" }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/sharizkreations/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              <Instagram size={14} />
              Follow on Instagram
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

  return (
    <section id="collection" className="py-24 md:py-32 relative" style={{ background: "oklch(0.12 0.006 60)" }}>
      <div className="container">
        <div className="text-center mb-16">
          <p className="section-label mb-4">The Collection</p>
          <h2
            className="text-5xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
          >
            Resin <span className="italic text-[#D4AF37]">Masterpieces</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-cream/60 max-w-xl mx-auto mt-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Every piece is poured, cured, and finished by hand. No two are ever exactly alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className={`product-card cursor-pointer ${i === 1 ? "lg:mt-8" : ""} ${i === 3 ? "lg:mt-4" : ""}`}
              onClick={() => setSelected(product)}
            >
              <div className="card-img aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#D4AF37] mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {product.tag}
                    </p>
                    <h3 className="text-xl font-light text-cream" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-cream/50 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{product.subtitle}</p>
                  </div>
                  <span className="text-xs text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-1 whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {product.price}
                  </span>
                </div>
                <p className="text-cream/50 text-sm leading-relaxed mt-3 line-clamp-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  {product.description}
                </p>
                <button
                  className="mt-4 text-[10px] tracking-widest uppercase text-[#D4AF37] hover:text-[#F0D060] transition-colors flex items-center gap-2"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="relative max-w-2xl w-full grid md:grid-cols-2 overflow-hidden"
              style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.3)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.image} alt={selected.name} className="w-full h-64 md:h-full object-cover" />
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 text-cream/50 hover:text-[#D4AF37] transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <p className="section-label mb-3">{selected.tag}</p>
                  <h3 className="text-3xl font-light text-cream mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {selected.name}
                  </h3>
                  <p className="text-sm text-cream/50 mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>{selected.subtitle}</p>
                  <p className="text-[#D4AF37] font-medium mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>{selected.price}</p>
                  <div className="gold-divider" style={{ margin: "0 0 1rem 0" }} />
                  <p className="text-cream/70 text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    {selected.description}
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  {/* WhatsApp Order Button */}
                  <a
                    href={getWhatsAppLink(selected.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full text-center flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={14} />
                    Order via WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setSelected(null);
                      document.getElementById("custom-orders")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-outline-gold w-full text-center"
                  >
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
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(ellipse at 50% 0%, #D4AF37 0%, transparent 60%)"
      }} />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Investment</p>
          <h2
            className="text-5xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
          >
            Pricing <span className="italic text-[#D4AF37]">Guide</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-cream/60 max-w-xl mx-auto mt-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            All prices are starting points. Final pricing depends on size, complexity, and custom inclusions. Contact Shaz for an exact quote.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative p-8 flex flex-col ${tier.highlight ? "ring-1 ring-[#D4AF37]/60" : ""}`}
              style={{
                background: tier.highlight
                  ? "linear-gradient(135deg, oklch(0.16 0.010 70), oklch(0.14 0.008 65))"
                  : "oklch(0.14 0.006 60)",
                border: tier.highlight ? "none" : "1px solid rgba(212,175,55,0.2)",
              }}
            >
              {tier.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] tracking-widest uppercase"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #D4AF37)", color: "#0d0d0d", fontFamily: "'Jost', sans-serif", fontWeight: 700 }}
                >
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <p className="text-[#D4AF37] text-lg mb-2">{tier.icon}</p>
                <h3 className="text-2xl font-light text-cream mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {tier.name}
                </h3>
                <p className="text-cream/50 text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  {tier.description}
                </p>
              </div>

              <div className="gold-divider mb-6" />

              <ul className="space-y-4 flex-1 mb-8">
                {tier.items.map((item) => (
                  <li key={item.label} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Check size={12} className="text-[#D4AF37] shrink-0" />
                      <span className="text-cream/70 text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[#D4AF37] text-xs font-medium whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppLink(tier.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center flex items-center justify-center gap-2 ${tier.highlight ? "btn-gold" : "btn-outline-gold"}`}
              >
                <MessageCircle size={13} />
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-cream/30 text-xs mt-8" style={{ fontFamily: "'Jost', sans-serif" }}>
          * All prices in CAD. Shipping available across Canada. International shipping on request.
        </p>
      </div>
    </section>
  );
}

// ─── Gallery Section ───────────────────────────────────────────────────────────
function GallerySection() {
  const galleryImages = [
    { src: ASSETS.products.coasters, alt: "White Gold Coasters" },
    { src: ASSETS.products.wallArt, alt: "Resin Wall Art" },
    { src: ASSETS.aboutImage, alt: "Artist at Work" },
    { src: ASSETS.products.tray, alt: "Black Gold Tray" },
    { src: ASSETS.products.piggyBank, alt: "Galaxy Piggy Bank" },
    { src: ASSETS.products.islamic, alt: "Islamic Calligraphy Art" },
    { src: ASSETS.galleryBanner, alt: "Full Collection" },
    { src: ASSETS.heroBanner, alt: "Resin Art Collection" },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32" style={{ background: "oklch(0.12 0.006 60)" }}>
      <div className="container">
        <div className="text-center mb-16">
          <p className="section-label mb-4">The Gallery</p>
          <h2
            className="text-5xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
          >
            A World of <span className="italic text-[#D4AF37]">Resin Magic</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className={`insta-item cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2" :
                i === 6 ? "col-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "1/1" : i === 6 ? "2/1" : "1/1" }}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/sharizkreations/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2"
          >
            <Instagram size={14} />
            See More on Instagram @sharizkreations
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(ellipse at center, #D4AF37 0%, transparent 70%)"
      }} />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <p className="section-label mb-4">Kind Words</p>
          <h2
            className="text-4xl md:text-5xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
          >
            What Clients <span className="italic text-[#D4AF37]">Say</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="p-8 relative"
              style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={12} fill="#D4AF37" className="text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-cream/70 leading-relaxed mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
                "{t.text}"
              </p>
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
    toast.success("Your custom order request has been sent! Shaz will be in touch soon. ✨", {
      style: { background: "#1a1a1a", border: "1px solid #D4AF37", color: "#EDE8DC" }
    });
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setForm((f) => ({ ...f, file }));
    } else {
      toast.error("Please upload an image file (JPG, PNG, WEBP).", {
        style: { background: "#1a1a1a", border: "1px solid #D4AF37", color: "#EDE8DC" }
      });
    }
  };

  const productTypes = [
    "Resin Coasters (Set of 4)",
    "Canvas Wall Art",
    "Serving Tray",
    "Piggy Bank",
    "Islamic Calligraphy Art",
    "Wedding/Event Decor",
    "Custom Gift Set",
    "Other",
  ];

  return (
    <section id="custom-orders" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={ASSETS.galleryBanner} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.10 0.005 60), oklch(0.10 0.005 60 / 95%))" }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <p className="section-label mb-4">Bespoke Creations</p>
            <h2
              className="text-5xl md:text-6xl font-light mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
            >
              Your Vision,<br />
              <span className="italic text-[#D4AF37]">Captured in Resin</span>
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

            {/* Quick WhatsApp CTA */}
            <a
              href={getWhatsAppLink("Hi Shaz! I'd like to discuss a custom resin art order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              <MessageCircle size={14} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right: Form */}
          <div
            className="p-8 md:p-10"
            style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-3xl font-light text-cream mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Request Received!
                </h3>
                <p className="text-cream/60 text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Shaz will reach out to you within 24–48 hours to discuss your custom piece.
                </p>
                <a
                  href={getWhatsAppLink("Hi Shaz! I just submitted a custom order request. Looking forward to hearing from you!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2 mb-4"
                >
                  <MessageCircle size={14} />
                  Follow Up on WhatsApp
                </a>
                <br />
                <button onClick={() => setSubmitted(false)} className="btn-outline-gold mt-4">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-light text-cream mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Request a Custom Piece
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors"
                      style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors"
                      style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Phone (Optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors"
                    style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }}
                    placeholder="+1 (000) 000-0000"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Product Type *</label>
                  <select
                    required
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors"
                    style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }}
                  >
                    <option value="">Select a product type</option>
                    {productTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>Your Vision *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-cream/80 outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    style={{ background: "oklch(0.10 0.005 60)", border: "1px solid rgba(212,175,55,0.2)", fontFamily: "'Jost', sans-serif" }}
                    placeholder="Describe your dream piece — colors, size, occasion, special inclusions..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-cream/50 block mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Reference Image (Optional)
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-none p-6 text-center cursor-pointer transition-all duration-300 ${
                      dragOver ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-[#D4AF37]/30 hover:border-[#D4AF37]/60"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer.files[0];
                      if (file) handleFile(file);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                      }}
                    />
                    {form.file ? (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 shrink-0 overflow-hidden border border-[#D4AF37]/30">
                            <img
                              src={URL.createObjectURL(form.file)}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <p className="text-cream/80 text-xs font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>{form.file.name}</p>
                            <p className="text-cream/40 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>{(form.file.size / 1024).toFixed(0)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, file: null })); }}
                          className="text-cream/40 hover:text-[#D4AF37] transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={20} className="text-[#D4AF37]/60 mx-auto mb-2" />
                        <p className="text-cream/50 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                          Drop an image here or <span className="text-[#D4AF37]">click to browse</span>
                        </p>
                        <p className="text-cream/30 text-[10px] mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                          JPG, PNG, WEBP up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn-gold w-full">
                  Send Custom Order Request
                </button>
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
  const instaImages = [
    ASSETS.products.coasters,
    ASSETS.products.wallArt,
    ASSETS.products.piggyBank,
    ASSETS.products.tray,
    ASSETS.products.islamic,
    ASSETS.galleryBanner,
  ];

  return (
    <section className="py-20" style={{ background: "oklch(0.12 0.006 60)" }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Follow the Journey</p>
          <h2
            className="text-4xl md:text-5xl font-light mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
          >
            <span className="text-[#D4AF37]">@sharizkreations</span>
          </h2>
          <p className="script-accent text-2xl">on Instagram</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
          {instaImages.map((src, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/sharizkreations/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="insta-item aspect-square block"
            >
              <img src={src} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover" />
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.instagram.com/sharizkreations/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2"
          >
            <Instagram size={14} />
            Follow @sharizkreations
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
          <h2
            className="text-5xl md:text-6xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}
          >
            Let's Create <span className="italic text-[#D4AF37]">Together</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            {
              icon: MessageCircle,
              title: "WhatsApp",
              value: "Chat with Shaz",
              href: getWhatsAppLink("Hi Shaz! I'd like to inquire about your resin art."),
            },
            {
              icon: Instagram,
              title: "Instagram",
              value: "@sharizkreations",
              href: "https://www.instagram.com/sharizkreations/",
            },
            {
              icon: MapPin,
              title: "Location",
              value: "Canada",
              href: "#",
            },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") || item.href.startsWith("https") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center text-center p-8 group transition-all duration-300"
              style={{ background: "oklch(0.14 0.006 60)", border: "1px solid rgba(212,175,55,0.2)" }}
            >
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
            <img
              src={ASSETS.logo}
              alt="ShaRiz Kreations"
              className="h-14 w-14 object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.2))" }}
            />
            <div>
              <p className="text-cream/80 font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>ShaRiz Kreations</p>
              <p className="text-cream/40 text-xs tracking-widest" style={{ fontFamily: "'Jost', sans-serif" }}>Resin Artist · Creating Colorful Dreams</p>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {["Home", "About", "Collection", "Pricing", "Gallery", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                className="text-[10px] tracking-widest uppercase text-cream/40 hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/sharizkreations/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/40 hover:text-[#D4AF37] transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href={getWhatsAppLink("Hi Shaz! I'd like to inquire about your resin art.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/40 hover:text-[#D4AF37] transition-colors"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-2" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
          <p className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
            © 2026 ShaRiz Kreations. All rights reserved.
          </p>
          <p className="text-cream/30 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
            Handcrafted with ♥ · sharizkreations.com
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp Button ──────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <motion.a
      href={getWhatsAppLink("Hi Shaz! I'd like to inquire about your resin art.")}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 4px 24px rgba(37,211,102,0.4)",
      }}
      title="Chat with Shaz on WhatsApp"
    >
      <MessageCircle size={24} className="text-white" />
    </motion.a>
  );
}

// ─── Main Home Component ───────────────────────────────────────────────────────
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
