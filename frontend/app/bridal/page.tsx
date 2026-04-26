import React from 'react';

export default function BridalPage() {
  // Editorial bridal portfolio images reflecting the NUMRA aesthetic
  const portfolio = [
    {
      src: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?q=80&w=800&auto=format&fit=crop",
      title: "The Signature Glow",
      type: "Traditional Bridal"
    },
    {
      src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
      title: "Editorial Precision",
      type: "Nikah Look"
    },
    {
      src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
      title: "Timeless Elegance",
      type: "Reception Glam"
    },
    {
      src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
      title: "Modern Panache",
      type: "Engagement"
    },
    {
      src: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=800&auto=format&fit=crop",
      title: "The Royal Finish",
      type: "Barat Signature"
    },
    {
      src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      title: "Classic Harmony",
      type: "Walima Look"
    },
  ];

  const APPOINTMENT_LINK = "#contact";

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Editorial Header */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto border-b border-zinc-100">
        <span className="text-rose-800 text-[10px] md:text-xs tracking-[0.6em] font-medium uppercase mb-6 block">
          The Bridal Portfolio
        </span>
        <h1 className="text-5xl md:text-8xl font-serif text-zinc-900 mb-8 italic tracking-tighter">
          Exquisite Artistry
        </h1>
        <p className="text-zinc-500 font-light text-lg md:text-xl max-w-3xl mx-auto leading-relaxed italic">
          "Creating perfect harmony between color and tone to give you the individuality you desire for your most precious moments."
        </p>
      </section>

      {/* Luxury Masonry-Style Grid */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-24">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">
          {portfolio.map((item, index) => (
            <div key={index} className="break-inside-avoid group relative overflow-hidden bg-zinc-50 shadow-sm border border-zinc-100">
              <div className="relative aspect-auto overflow-hidden">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out group-hover:scale-105"
                />
                
                {/* Elegant Minimal Overlay */}
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <span className="text-rose-300 text-[9px] tracking-[0.3em] uppercase mb-2">
                    {item.type}
                  </span>
                  <h3 className="text-white text-2xl font-serif italic">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Booking Call to Action */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-serif text-zinc-900 mb-10 italic">Begin Your Transformation</h2>
          <a 
            href={APPOINTMENT_LINK}
            className="inline-block px-14 py-5 bg-zinc-950 hover:bg-rose-900 text-white text-[11px] tracking-[0.4em] uppercase font-bold transition-all duration-500 shadow-2xl hover:-translate-y-1"
          >
            Consult With Numra
          </a>
        </div>
      </section>

      {/* Credit Footer Note */}
      <div className="pb-12 text-center">
        <p className="text-[10px] tracking-widest uppercase text-zinc-400">
          Portfolio Curation by <span className="text-zinc-900 font-medium">Glacia Labs</span>
        </p>
      </div>
    </main>
  );
}