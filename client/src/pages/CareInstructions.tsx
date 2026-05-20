/**
 * Care Instructions Page — ShaRiz Kreations
 * Design: Dark luxury aesthetic, Cormorant Garamond + Jost, gold accents (#D4AF37)
 * Explains how to maintain and care for resin art pieces
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, MessageCircle, Sun, Droplets, Wind, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

const WHATSAPP = "+14039867064";
const getWhatsAppLink = (msg: string) =>
  `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

// ─── Care categories ──────────────────────────────────────────────────────────
const CARE_SECTIONS = [
  {
    icon: Sun,
    title: "Sunlight & Heat",
    color: "#D4AF37",
    intro: "Resin is sensitive to prolonged UV exposure and high temperatures.",
    dos: [
      "Display in indirect or ambient light for best longevity",
      "Keep pieces away from south-facing windows with direct afternoon sun",
      "Store in a cool, shaded area when not on display",
    ],
    donts: [
      "Do not leave in direct sunlight for extended periods — resin may yellow over time",
      "Do not place near radiators, fireplaces, or heating vents",
      "Do not use coasters under extremely hot mugs or pots (above 60°C / 140°F)",
    ],
  },
  {
    icon: Droplets,
    title: "Cleaning & Moisture",
    color: "#7EC8E3",
    intro: "Resin is water-resistant but not waterproof. Gentle cleaning keeps pieces looking pristine.",
    dos: [
      "Wipe with a soft, slightly damp microfibre cloth",
      "Dry immediately after cleaning with a dry soft cloth",
      "For coasters, wipe spills promptly to prevent water rings on the base",
    ],
    donts: [
      "Do not submerge in water or put in the dishwasher",
      "Do not use abrasive sponges, steel wool, or rough cloths",
      "Do not use bleach, acetone, or alcohol-based cleaners — they cloud the surface",
    ],
  },
  {
    icon: Sparkles,
    title: "Polishing & Shine",
    color: "#C9A84C",
    intro: "Maintain the glass-like finish of your resin piece with occasional polishing.",
    dos: [
      "Use a small amount of car wax or resin polish on a soft cloth for a mirror finish",
      "Buff gently in circular motions to restore shine",
      "A drop of mineral oil on coasters keeps them looking rich and new",
    ],
    donts: [
      "Do not use furniture polish sprays that contain silicone — they leave a hazy film",
      "Do not use paper towels — they can cause micro-scratches on the surface",
      "Do not apply polish to painted or gilded areas (gold leaf, calligraphy)",
    ],
  },
  {
    icon: Wind,
    title: "Storage & Handling",
    color: "#A8D5A2",
    intro: "Proper storage protects your piece between uses or during moves.",
    dos: [
      "Wrap in soft tissue paper or a microfibre cloth before storing",
      "Store flat or upright in a padded box — never stack heavy items on top",
      "Keep in a cool, dry place away from humidity",
    ],
    donts: [
      "Do not stack resin pieces directly on top of each other without padding",
      "Do not store in damp basements or humid environments",
      "Do not drop or knock — resin can chip at edges if impacted",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Special Care: Inclusions",
    color: "#E8A87C",
    intro: "Pieces with pressed flowers, gold leaf, shells, or calligraphy need extra attention.",
    dos: [
      "Dust gently with a soft dry brush (like a makeup brush) for intricate pieces",
      "Display calligraphy and floral pieces behind glass or away from direct handling",
      "Gold leaf pieces can be gently buffed with a dry soft cloth to restore lustre",
    ],
    donts: [
      "Do not wet-clean pieces with exposed dried flowers or botanicals",
      "Do not use any chemicals near calligraphy — ink may bleed",
      "Do not scratch or pick at inclusions embedded in the resin",
    ],
  },
];

// ─── Quick Reference Card ─────────────────────────────────────────────────────
const QUICK_TIPS = [
  { emoji: "✓", text: "Soft damp cloth to clean", good: true },
  { emoji: "✓", text: "Indirect light display", good: true },
  { emoji: "✓", text: "Resin polish for shine", good: true },
  { emoji: "✓", text: "Padded storage", good: true },
  { emoji: "✗", text: "No direct prolonged sunlight", good: false },
  { emoji: "✗", text: "No dishwasher or soaking", good: false },
  { emoji: "✗", text: "No bleach or acetone", good: false },
  { emoji: "✗", text: "No extreme heat", good: false },
];

export default function CareInstructions() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.005 60)" }}>
      {/* ─── Top bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b" style={{ background: "oklch(0.10 0.005 60)", borderColor: "rgba(212,175,55,0.15)" }}>
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-cream/60 hover:text-[#D4AF37] transition-colors text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
            <ArrowLeft size={16} />
            Back to ShaRiz Kreations
          </Link>
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Care Guide</span>
          <a href={getWhatsAppLink("Hi Shaz! I have a question about caring for my resin piece.")} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-cream/50 hover:text-[#D4AF37] transition-colors text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
            <MessageCircle size={14} /> Ask Shaz
          </a>
        </div>
      </div>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>✦ Preserve Your Piece ✦</p>
            <h1 className="text-5xl md:text-7xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#EDE8DC" }}>
              Resin Art <span className="italic text-[#D4AF37]">Care Guide</span>
            </h1>
            <p className="text-cream/50 max-w-2xl mx-auto text-base leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Every ShaRiz Kreations piece is handcrafted with premium epoxy resin and love. With the right care, your piece will remain vibrant and beautiful for years to come.
            </p>
            <div className="w-16 h-px mx-auto mt-8" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
          </motion.div>
        </div>
      </section>

      {/* ─── Quick Reference ─────────────────────────────────────────────── */}
      <section className="py-16 relative" style={{ background: "oklch(0.12 0.006 60)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-light text-cream" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Quick Reference</h2>
            <p className="text-cream/40 text-sm mt-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>At a glance — the essential do's and don'ts</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {QUICK_TIPS.map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-start gap-3 p-4" style={{ background: "oklch(0.14 0.006 60)", border: `1px solid ${tip.good ? "rgba(168,213,162,0.2)" : "rgba(232,168,124,0.2)"}` }}>
                <span className="text-sm font-bold shrink-0 mt-0.5" style={{ color: tip.good ? "#A8D5A2" : "#E8A87C" }}>{tip.emoji}</span>
                <span className="text-cream/60 text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{tip.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Detailed Care Sections ───────────────────────────────────────── */}
      <section className="py-24">
        <div className="container">
          <div className="space-y-12 max-w-4xl mx-auto">
            {CARE_SECTIONS.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="grid md:grid-cols-[auto_1fr] gap-0 overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>
                  {/* Icon column */}
                  <div className="flex items-start justify-center p-8 md:p-10" style={{ background: "oklch(0.13 0.006 60)", borderRight: "1px solid rgba(212,175,55,0.1)" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${section.color}18`, border: `1px solid ${section.color}40` }}>
                      <Icon size={22} style={{ color: section.color }} />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-8 md:p-10" style={{ background: "oklch(0.14 0.006 60)" }}>
                    <h3 className="text-2xl font-light mb-2 text-cream" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{section.title}</h3>
                    <p className="text-cream/50 text-sm mb-6 leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{section.intro}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Do's */}
                      <div>
                        <p className="text-xs tracking-widest uppercase mb-3 flex items-center gap-2" style={{ fontFamily: "'Jost', sans-serif", color: "#A8D5A2" }}>
                          <CheckCircle size={12} /> Do's
                        </p>
                        <ul className="space-y-2">
                          {section.dos.map((d, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-cream/60" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                              <span className="text-[#A8D5A2] mt-1 shrink-0 text-xs">✓</span> {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Don'ts */}
                      <div>
                        <p className="text-xs tracking-widest uppercase mb-3 flex items-center gap-2" style={{ fontFamily: "'Jost', sans-serif", color: "#E8A87C" }}>
                          <AlertTriangle size={12} /> Don'ts
                        </p>
                        <ul className="space-y-2">
                          {section.donts.map((d, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-cream/60" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                              <span className="text-[#E8A87C] mt-1 shrink-0 text-xs">✗</span> {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-20 relative" style={{ background: "oklch(0.12 0.006 60)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
        <div className="container relative z-10 text-center">
          <div className="w-8 h-8 mx-auto mb-6 flex items-center justify-center rounded-full" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
            <span className="text-[#D4AF37] text-sm">✦</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-cream" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Still Have <span className="italic text-[#D4AF37]">Questions?</span>
          </h2>
          <p className="text-cream/40 text-sm mb-8 max-w-md mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Shaz is always happy to help with any care questions about your specific piece.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={getWhatsAppLink("Hi Shaz! I have a question about caring for my resin piece.")} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle size={14} /> Ask Shaz on WhatsApp
            </a>
            <Link href="/" className="btn-outline-gold inline-flex items-center gap-2">
              <ArrowLeft size={14} /> Back to Shop
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t text-center" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <p className="text-cream/20 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>© 2026 ShaRiz Kreations · Handcrafted with ♥ · sharizkreations.com</p>
      </footer>
    </div>
  );
}
