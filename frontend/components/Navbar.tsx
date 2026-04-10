"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "@/lib/data";

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="text-white font-bold text-lg tracking-tight hover:text-accent transition-colors duration-200"
          >
            {PROFILE.alias}
            <span className="text-accent">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/60 hover:text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden md:flex items-center gap-2 bg-accent hover:bg-accent-dim text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Hire Me
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-navy-light border-t border-white/10 px-6 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block text-white/70 hover:text-white text-sm font-medium px-3 py-2.5 rounded-md hover:bg-white/5 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={closeMenu}
              className="block text-center bg-accent hover:bg-accent-dim text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
