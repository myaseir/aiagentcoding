"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transition background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu handler for mobile links
  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-700 ${
        scrolled || isOpen
          ? "bg-white/95 backdrop-blur-md py-4 border-b border-zinc-100 shadow-sm" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-10">
          
          {/* 1. Desktop Left Navigation */}
          <div className="hidden md:flex gap-10 items-center flex-1">
            <Link href="/services" className="text-[10px] tracking-[0.3em] uppercase font-semibold text-zinc-900 hover:text-rose-800 transition-colors">
              Services
            </Link>
            <Link href="/bridal" className="text-[10px] tracking-[0.3em] uppercase font-semibold text-zinc-900 hover:text-rose-800 transition-colors">
              Bridal
            </Link>
          </div>

          {/* 2. Central Logo (Always Home) */}
          <div className="flex-shrink-0 z-50">
            <Link 
              href="/" 
              onClick={closeMenu}
              className="text-3xl md:text-4xl font-serif tracking-tighter text-zinc-900 transition-opacity hover:opacity-80"
            >
              NUMRA
            </Link>
          </div>

          {/* 3. Desktop Right Navigation */}
          <div className="hidden md:flex gap-10 items-center justify-end flex-1">
            <Link href="/about" className="text-[10px] tracking-[0.3em] uppercase font-semibold text-zinc-900 hover:text-rose-800 transition-colors">
              Story
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-2.5 border border-zinc-900 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-zinc-900 hover:text-white transition-all duration-500"
            >
              Book Now
            </Link>
          </div>

          {/* 4. Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-900 focus:outline-none p-2 relative z-[110]"
              aria-label="Toggle Menu"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                <span className={`h-[1px] bg-zinc-900 transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`}></span>
                <span className={`h-[1px] bg-zinc-900 transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`}></span>
                <span className={`h-[1px] bg-zinc-900 transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Fullscreen Mobile Menu Overlay */}
     {/* 5. Fullscreen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[105] transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Subtle Background Accent */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div>

        <nav className="relative z-10 flex flex-col items-center gap-10 text-center">
          {/* Staggered Link Animation using CSS Transitions */}
          <div className={`transition-all duration-700 delay-100 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/" onClick={closeMenu} className="text-[10px] tracking-[0.5em] uppercase font-bold text-zinc-400 hover:text-rose-800">
              Home
            </Link>
          </div>

          <div className={`transition-all duration-700 delay-200 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/services" onClick={closeMenu} className="text-3xl tracking-tighter font-serif italic text-zinc-900 hover:text-rose-900 transition-colors">
              Services
            </Link>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/bridal" onClick={closeMenu} className="text-3xl tracking-tighter font-serif italic text-zinc-900 hover:text-rose-900 transition-colors">
              Bridal Portfolio
            </Link>
          </div>

          <div className={`transition-all duration-700 delay-400 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/about" onClick={closeMenu} className="text-3xl tracking-tighter font-serif italic text-zinc-900 hover:text-rose-900 transition-colors">
              Our Story
            </Link>
          </div>

          <div className={`transition-all duration-700 delay-500 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
            <Link 
              href="/contact" 
              onClick={closeMenu}
              className="mt-6 px-12 py-5 bg-zinc-900 text-white text-[11px] tracking-[0.4em] uppercase font-bold hover:bg-rose-900 transition-all shadow-xl active:scale-95"
            >
              Book Appointment
            </Link>
          </div>
        </nav>
        
        {/* Software House Credit - Positioned more elegantly */}
        <div className={`absolute bottom-12 flex flex-col items-center gap-2 transition-opacity duration-1000 ${isOpen ? "opacity-100" : "opacity-0"}`}>
          <div className="h-[1px] w-8 bg-zinc-200"></div>
          <span className="text-[9px] tracking-[0.3em] text-zinc-400 uppercase">
           
          </span>
        </div>
      </div>
    </nav>
  );
}