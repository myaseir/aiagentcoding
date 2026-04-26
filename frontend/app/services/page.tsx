import React from 'react';

export default function ServicesPage() {
  const APPOINTMENT_LINK = "#contact";

  // Categorized services based on NUMRA's exclusive offerings
  const serviceCategories = [
    {
      category: "Makeup Artistry",
      tagline: "Enhancing unique features with perfect harmony.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
      services: [
        { name: "Bridal Signature", detail: "Luxury bridal transformation with great panache." },
        { name: "Party & Occasion", detail: "Relevant to the occasion, from soft glam to bold." },
        { name: "Editorial & Head-shots", detail: "Precision makeup for high-definition photography." },
        { name: "Private Lessons", detail: "One-on-one masterclasses for individual styling." }
      ]
    },
    {
      category: "Hair Design",
      tagline: "Defining individuality through technical excellence.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200",
      services: [
        { name: "Cuts & Styling", detail: "Bespoke cuts and professional blow-drys." },
        { name: "Couture Colour", detail: "Expert colorists creating perfect tones." },
        { name: "Luxury Treatments", detail: "Deep conditioning and restorative hair health." },
        { name: "Special Styling", detail: "Up-dos and elegant styling for events." }
      ]
    },
    {
      category: "Skin & Beauty",
      tagline: "Meticulous care for a radiant glow.",
      image: "https://images.unsplash.com/photo-1698681296890-a772cdec87f8?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      services: [
        { name: "Signature Facials", detail: "Customized treatments for radiant, healthy skin." },
        { name: "Manicure & Pedicure", detail: "Luxury nail care with expert finishing." },
        { name: "Threading & Waxing", detail: "Precision grooming for facial and body aesthetics." },
        { name: "Nail Paint Art", detail: "Premium lacquers and artistic application." }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* Editorial Header */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center border-b border-zinc-100">
        <div className="max-w-4xl mx-auto">
          <span className="text-rose-800 text-[10px] md:text-xs tracking-[0.5em] font-medium uppercase mb-6 block">
            The Numra Experience
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-zinc-900 mb-8 italic tracking-tighter">
            Our Services
          </h1>
          <p className="text-zinc-500 font-light leading-relaxed text-lg md:text-xl max-w-2xl mx-auto italic">
            "Focusing on the most unique features of your face, creating perfect harmony between colour and tone."
          </p>
        </div>
      </section>

      {/* Services Listing - Alternating Editorial Layout */}
      <section className="py-20 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-32 md:gap-48">
          
          {serviceCategories.map((cat, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-start`}
            >
              
              {/* Category Visual */}
              <div className="w-full lg:w-5/12">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 shadow-2xl">
                  <img 
                    src={cat.image} 
                    alt={cat.category} 
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-0 border-[15px] border-white/10 m-4"></div>
                </div>
              </div>

              {/* Category Details */}
              <div className="w-full lg:w-7/12 flex flex-col pt-4">
                <h2 className="text-4xl md:text-6xl font-serif text-zinc-900 mb-4 italic">
                  {cat.category}
                </h2>
                <p className="text-rose-900 text-[11px] tracking-[0.3em] uppercase font-semibold mb-12">
                  {cat.tagline}
                </p>
                
                {/* Individual Service Menu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {cat.services.map((item, idx) => (
                    <div key={idx} className="group border-b border-zinc-100 pb-6">
                      <h3 className="text-lg font-serif text-zinc-900 mb-2 group-hover:text-rose-800 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-zinc-500 font-light text-sm leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-16">
                  <a 
                    href={APPOINTMENT_LINK}
                    className="inline-flex items-center text-zinc-900 text-[10px] tracking-[0.4em] uppercase font-bold group"
                  >
                    Request Consultation
                    <span className="ml-4 h-[1px] w-12 bg-zinc-900 group-hover:w-20 transition-all duration-500"></span>
                  </a>
                </div>
              </div>
              
            </div>
          ))}

        </div>
      </section>

      {/* Luxury Call to Action */}
      <section className="bg-zinc-950 py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 italic">
            Ready for your bespoke makeover?
          </h2>
          <p className="text-zinc-400 font-light mb-12 text-sm md:text-base tracking-wide">
            Our definitive finishing will give you the individuality you desire and let you stand out from the crowd.
          </p>
          <a 
            href={APPOINTMENT_LINK}
            className="px-12 py-5 bg-white text-zinc-950 text-[11px] tracking-[0.4em] uppercase font-bold hover:bg-rose-900 hover:text-white transition-all duration-500"
          >
            Book Appointment
          </a>
        </div>
      </section>
      
    </main>
  );
}