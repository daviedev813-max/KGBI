import { useState, useEffect } from "react";

export function Hero() {
  const [currentImg, setCurrentImg] = useState(0);

 const images = [
  "/c4.jpg", 
  "/g7.jpg", 
  "/g10.jpg", 
  "/g2.jpg",
  "/graduation.jpg"
];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* 🖼️ DYNAMIC BACKGROUND (Mobile & Desktop) */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
              currentImg === index ? "opacity-100 scale-110" : "opacity-0 scale-100"
            }`}
          />
        ))}
        {/* Mobile Gradient Overlay (Darker for readability) */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/90 lg:hidden"></div>
        {/* Desktop Gradient Overlay (Lighter/Mesh style) */}
        <div className="hidden lg:block absolute inset-0 bg-white/90 backdrop-blur-[2px]"></div>
      </div>

      {/* 🎨 Mesh Accents (Desktop only) */}
      <div className="hidden lg:block absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-40 z-10"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-20 py-20 mt-10 md:mt-0">
        
        {/* --- Left Content --- */}
        <div className="lg:col-span-7 space-y-8 animate-fade-in-up text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-primary font-bold text-sm tracking-wide mx-auto lg:mx-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            ADMISSIONS OPEN 2026
          </div>

          {/* Text colors switch to white on mobile, primary on desktop */}
          <h1 className="text-5xl md:text-8xl font-black text-white lg:text-primary tracking-tight leading-[0.95]">
            Shape the <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent via-secondary to-accent lg:from-primary lg:via-secondary lg:to-primary">
              Future of Faith.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 lg:text-slate-600 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
            Master the word through our <span className="text-accent lg:text-primary border-b-2 border-accent/30">Diploma in Theology</span>. 
            Flexible pathways designed for the modern-day disciple.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-4 items-center lg:items-start">
            <button className="btn btn-primary w-full sm:w-auto btn-lg rounded-2xl px-12 h-[65px] text-lg shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all">
              Begin Application
            </button>
            <button className="btn btn-ghost w-full sm:w-auto btn-lg rounded-2xl px-10 h-[65px] border border-white/20 lg:border-slate-200 bg-white/10 lg:bg-white text-white lg:text-primary hover:bg-white hover:text-primary transition-all">
              View Curriculum
            </button>
          </div>
        </div>

        {/* --- Right Visual (Bento Box - Hidden on small mobile) --- */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative z-20 animate-float">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white rotate-2 bg-white">
              <div className="w-full h-[550px] relative">
                {/* Secondary inner slideshow or static featured image */}
                <img 
                  src={images[currentImg]} 
                  className="w-full h-full object-cover transition-all duration-700" 
                  alt="Featured" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <p className="text-4xl font-serif italic text-accent">2 Timothy 2:2</p>
                <p className="text-lg font-light opacity-90 leading-snug">"Training to Transform Others"</p>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -left-8 top-20 bg-white p-5 rounded-[2rem] shadow-xl z-30 border border-slate-50 animate-bounce-slow">
               <div className="flex items-center gap-3">
                 <div className="bg-accent/20 p-2 rounded-xl">⚡</div>
                 <p className="font-bold text-primary text-sm">Flexible Learning</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators for Mobile Bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 lg:hidden">
        {images.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentImg === i ? "w-8 bg-accent" : "w-2 bg-white/30"}`}></div>
        ))}
      </div>
    </div>
  );
}
export default Hero;