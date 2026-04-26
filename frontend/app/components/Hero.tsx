"use client";

import React from 'react';

export default function Hero() {
  const APPOINTMENT_LINK = "/contact";
  // Updated to a high-fashion, high-contrast image for better text visibility
  const HERO_IMAGE = "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=2000";

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      
      {/* 1. Optimized Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE} 
          alt="NUMRA Luxury Artistry" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        {/* Dual-Layer Overlay for Text Clarity */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60"></div>
      </div>

      {/* 2. Main Content - Scaled for Mobile Perfection */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 pt-10">
        
        {/* Floating Brand Name */}
        <h1 className="text-[22vw] md:text-[16rem] font-serif text-zinc-900 leading-none tracking-tighter mb-2 md:mb-4 animate-fade-in drop-shadow-sm">
          Numra
        </h1>
        
        {/* Elegant Minimalist Divider */}
        <div className="h-px w-10 md:w-16 bg-zinc-900 mb-6 md:mb-10 opacity-40"></div>

        {/* Studio Subtitle */}
        <div className="flex flex-col items-center gap-4 mb-10 md:mb-14">
          <p className="text-[10px] md:text-sm tracking-[0.6em] uppercase text-zinc-800 font-medium">
            Makeup Studio <span className="text-zinc-400 mx-2">&</span> Salon
          </p>
          <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-400">Lahore</span>
        </div>

        {/* High-End Refined Button */}
        <a 
          href={APPOINTMENT_LINK}
          className="group relative px-10 py-4 md:px-14 md:py-5 border border-zinc-900 text-zinc-900 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold overflow-hidden transition-all duration-700 hover:text-white"
        >
          <span className="relative z-10">Book Appointment</span>
          <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
        </a>
      </div>

      {/* 3. Global Accreditation Footer */}
      <div className="absolute bottom-10 w-full px-8 md:px-12 flex justify-between items-end text-[8px] md:text-[9px] tracking-[0.3em] uppercase">
        <div className="flex flex-col gap-2 text-zinc-400">
          <span>Bridal Artistry</span>
          <span>Editorial Finish</span>
        </div>
      
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        .animate-fade-in {
          animation: fadeIn 2.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); filter: blur(15px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
}