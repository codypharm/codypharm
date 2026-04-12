"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, PROFILE } from "@/lib/data";

// Spring config per taste-skill spec
const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-diffuse"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="text-white font-bold text-lg tracking-tighter hover:text-accent transition-fluid flex items-center gap-1 press"
          >
            <span className="text-accent">&lt;/&gt;</span>
            {PROFILE.alias}
            <span className="text-accent">&gt;</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-white/60 hover:text-white text-sm font-medium px-3 py-1.5 transition-fluid group"
              >
                {item.label}
                {/* Directional underline fill */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA — tactile press */}
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden md:flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-navy text-sm font-medium px-4 py-2 rounded-lg transition-fluid press"
          >
            Hire Me
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-fluid press"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer with stagger-fade */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="glass-strong border-t border-white/8 px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...SPRING, delay: i * 0.05 }}
                  className="block text-white/70 hover:text-accent text-sm font-medium px-3 py-2.5 rounded-md transition-fluid"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: NAV_ITEMS.length * 0.05 }}
                className="pt-3"
              >
                <a
                  href={`mailto:${PROFILE.email}`}
                  onClick={closeMenu}
                  className="block text-center border border-accent text-accent hover:bg-accent hover:text-navy text-sm font-medium px-4 py-2.5 rounded-lg transition-fluid press"
                >
                  Hire Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
