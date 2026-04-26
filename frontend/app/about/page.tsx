import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Editorial Header */}
      <section className="bg-zinc-950 text-zinc-200 py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-rose-800 text-[10px] md:text-xs tracking-[0.5em] font-bold uppercase mb-6 block">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 italic tracking-tighter">
            Defined by Panache
          </h1>
          <p className="max-w-2xl mx-auto font-light leading-relaxed text-zinc-400 text-lg md:text-xl italic">
            Discover the artistry behind Lahore's premier luxury bridal and beauty sanctuary.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* High-Reliability Editorial Image */}
          <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden shadow-2xl group bg-zinc-100">
            <img 
              src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1000" 
              alt="Luxury Beauty Artistry" 
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 border-[20px] border-white/5 m-6"></div>
          </div>

          {/* Brand Narrative */}
          <div className="flex flex-col items-start">
            <h4 className="text-rose-900 text-[11px] tracking-[0.3em] uppercase font-bold mb-4">
              The Numra Philosophy
            </h4>
            <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-8 italic leading-tight">
              Harmony, Tone & <br/> Individual Beauty
            </h2>
            
            <div className="space-y-6 text-zinc-600 font-light text-lg leading-relaxed">
              <p>
                NUMRA is an exclusive sanctuary where we focus on enhancing the most unique features of your face. We believe beauty is found in the perfect harmony between color and tone, kept relevant to your most special occasions.
              </p>
              <p>
                We pay close attention to our clients’ needs, fulfilling them with great panache. From the precision of our bridal services to the technical excellence of our hair treatments, our definitive finishing ensures you stand out from the crowd with the individuality you desire.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center">
              <Link 
                href="/bridal" 
                className="px-10 py-4 bg-zinc-900 hover:bg-rose-900 text-white text-[11px] tracking-[0.3em] uppercase font-bold transition-all duration-500 shadow-xl"
              >
                Explore Portfolio
              </Link>
              <span className="text-[9px] tracking-widest uppercase text-zinc-400">
                Digital Experience by <span className="text-zinc-900 font-bold">Glacia Labs</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Quote */}
      <section className="bg-zinc-50 py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-serif italic text-zinc-900 leading-relaxed mb-6">
            "Our definitive finishing will give you the individuality you desire and let you stand out from the crowd."
          </p>
          <span className="text-[10px] tracking-[0.4em] uppercase text-rose-900 font-bold">The Numra Promise</span>
        </div>
      </section>
    </main>
  );
}