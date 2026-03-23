import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  ChevronUp,
  MapPin,
  ExternalLink,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#002855] text-white pt-24 pb-10 px-6 overflow-hidden relative border-t-2 border-white/10">
      {/* 🎨 Subtle Background Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#87CEEB]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand Identity */}
          <div className="space-y-8 text-center md:text-left">
           <Link
  to="/"
  className="flex items-center justify-center md:justify-start gap-4 group"
>
  <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-6 overflow-hidden">
    
    <img
      src="/logo.jpg"
      alt="KGBI Logo"
      className="h-12 w-12 object-contain"
    />

  </div>

  <div className="flex flex-col text-left">
    <span className="text-3xl font-black tracking-tighter text-white leading-none">
      KGBI
    </span>
    <span className="text-[10px] tracking-[0.25em] uppercase font-black text-[#87CEEB] mt-1">
      Bible Institute
    </span>
  </div>
</Link>
            <p className="text-sm leading-relaxed text-white/70 font-medium max-w-xs mx-auto md:mx-0">
              Operating under the registration of{" "}
              <span className="text-white font-black underline decoration-[#87CEEB] decoration-2">
                Grace Bible Church
              </span>
              . Dedicated to the Word.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#87CEEB] hover:text-[#002855] hover:-translate-y-1 shadow-lg transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:pl-10 text-center md:text-left">
            <h4 className="text-white font-black mb-8 text-[10px] uppercase tracking-[0.3em] opacity-50">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-bold">
              {[
                { label: "Our Background", path: "/about" },
                { label: "Admissions 2026", path: "/admissions" },
                { label: "Diploma Programs", path: "/programs" },
                { label: "Campus Gallery", path: "/gallery" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-[#87CEEB] flex items-center justify-center md:justify-start group transition-colors text-white/80"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 transition-transform group-hover:translate-x-1 text-[#87CEEB]"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Live Map */}
          <div className="text-center md:text-left space-y-8 w-full overflow-hidden">
            <div className="space-y-6 w-full">
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-50 text-center md:text-left">
                Connect
              </h4>
              <ul className="space-y-6 w-full">
                {/* PHONE */}
                <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white/10 border border-white/20 text-[#87CEEB] flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div className="text-sm">
                    <p className="font-black text-white">+254 721 885 799</p>
                  </div>
                </li>

                {/* EMAIL - FIXED FOR ALL SCREENS */}
                <li className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white/10 border border-white/20 text-[#87CEEB] flex items-center justify-center">
                    <Mail size={18} />
                  </div>

                  <div className="w-full max-w-full px-2 md:px-0">
                    <p className="font-black text-white text-[11px] sm:text-sm text-center md:text-left leading-relaxed break-all whitespace-normal">
                      kenyagracebibleinstitute@gmail.com
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 🗺️ OFFICIAL GOOGLE MAP */}
            <div className="rounded-[2rem] overflow-hidden border-4 border-white shadow-lg h-64 group relative">
              <iframe
                title="KGBI Official Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.154618100382!2d37.09001607440924!3d-1.0450900989448495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4f70bceebd31%3A0x117fc8588e2e90f6!2sKenya%20Grace%20Bible%20Institute!5e0!3m2!1sen!2ske!4v1774271249625!5m2!1sen!2ske"
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a
                href="https://maps.app.goo.gl"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 bg-white p-2 rounded-xl shadow-md text-[#002855] hover:bg-[#87CEEB] transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Column 4: Admissions Card */}
          <div className="relative group">
            <div className="bg-[#87CEEB] p-8 rounded-[2.5rem] shadow-2xl shadow-black/20 space-y-6 border-4 border-white/10 transition-transform group-hover:-translate-y-2">
              <div className="flex items-center gap-3 text-[#002855]">
                <GraduationCap size={28} className="drop-shadow-md" />
                <h4 className="text-xl font-black tracking-tight italic">
                  Enroll Now!
                </h4>
              </div>
              <div className="space-y-2 text-[#002855]">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-[#002855] rounded-full animate-ping"></span>
                  <p className="text-[10px] font-black uppercase tracking-widest bg-white/40 px-2 py-1 rounded inline-block">
                    2026 Intake
                  </p>
                </div>
                <p className="text-sm font-bold leading-tight flex items-center gap-2 justify-center md:justify-start">
                  <MapPin size={14} /> Pilot-Runda, Thika
                </p>
              </div>
              <Link
                to="/admissions"
                className="w-full py-4 bg-[#002855] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl text-center block active:scale-95"
              >
                Apply Today
              </Link>
            </div>
          </div>
        </div>

        {/* 📜 Bottom Bar */}
        <div className="pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center">
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white">
                Kenya Grace Bible Institute © {currentYear}
              </p>
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                Training to Transform Others — 2 Timothy 2:2
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="flex items-center gap-2 font-black text-[9px] tracking-tight text-[#002855] bg-white px-4 py-2.5 rounded-full shadow-sm hover:scale-105 transition-transform">
                <ShieldCheck size={14} className="text-[#87CEEB]" /> GRACE BIBLE
                CHURCH
              </div>
              <div className="flex items-center gap-2 font-black text-[9px] tracking-tight text-[#002855] bg-white px-4 py-2.5 rounded-full shadow-sm hover:scale-105 transition-transform">
                THINGS TO COME MISSION
              </div>
              <button
                onClick={scrollToTop}
                className="h-10 w-10 bg-white text-[#002855] rounded-full flex items-center justify-center hover:bg-[#87CEEB] transition-all ml-4 shadow-lg active:scale-90"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
