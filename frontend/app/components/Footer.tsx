import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-20 md:py-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
        
        {/* Brand Column */}
        <div className="md:col-span-1">
          <h3 className="text-3xl font-serif text-white italic mb-6 tracking-tighter">Numra</h3>
          <p className="text-[11px] leading-relaxed font-light tracking-wide max-w-xs">
            An exclusive, luxury bridal makeup & beauty sanctuary located in the heart of Lahore. 
            Defining individuality with great panache.
          </p>
        </div>
        
        {/* Studio Location */}
        <div>
          <h4 className="text-white text-[10px] tracking-[0.3em] uppercase mb-8 font-semibold">Studio</h4>
          <address className="not-italic text-[11px] font-light leading-loose tracking-wide">
            Gulberg III<br />
            Lahore, Pakistan
          </address>
        </div>

        {/* Contact/Enquiries */}
        <div>
          <h4 className="text-white text-[10px] tracking-[0.3em] uppercase mb-8 font-semibold">Enquiries</h4>
          <div className="flex flex-col gap-2 text-[11px] font-light tracking-wide">
            <a href="mailto:appointments@numra.pk" className="hover:text-rose-700 transition-colors">
              appointments@numra.pk
            </a>
            <a href="tel:+92420000000" className="hover:text-rose-700 transition-colors">
              +92 42 000 0000
            </a>
          </div>
        </div>

        {/* Social Connect */}
        <div>
          <h4 className="text-white text-[10px] tracking-[0.3em] uppercase mb-8 font-semibold">Connect</h4>
          <div className="flex gap-6 text-[11px] font-light tracking-wide">
            <a href="#" className="hover:text-white transition-all duration-300 underline-offset-4 hover:underline">Instagram</a>
            <a href="#" className="hover:text-white transition-all duration-300 underline-offset-4 hover:underline">Facebook</a>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-20 pt-8 border-t border-zinc-900/50 flex flex-col md:row justify-between items-center gap-4 text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
        <div className="text-zinc-500">
          © {currentYear} NUMRA MAKEUP STUDIO & SALON
        </div>
        
        <div className="flex items-center gap-1 text-zinc-500">
          <span>Crafted by</span>
          <a 
            href="https://glacialabs.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-rose-800 transition-colors font-medium"
          >
            Glacia Labs
          </a>
        </div>
      </div>
    </footer>
  );
}