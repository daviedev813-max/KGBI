import { ArrowRight, Maximize2, Camera } from "lucide-react";

export function Gallery() {
  const images = [
    { 
      url: "/graduation.jpg", 
      title: "Theological Library", 
      tag: "Academic",
      span: "md:col-span-2 md:row-span-2" 
    },
    { 
      url: "/c1.jpg", 
      title: "Intensive Study", 
      tag: "Training",
      span: "md:col-span-1 md:row-span-1" 
    },
    { 
      url: "/fellowship.jpg", 
      title: "Student Fellowship", 
      tag: "Community",
      span: "md:col-span-1 md:row-span-1" 
    },
    { 
      url: "/g1.jpg", 
      title: "Mission Outreach", 
      tag: "Fieldwork",
      span: "md:col-span-2 md:row-span-1" 
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* 🎨 Background Decoration: Large Typography */}
      <div className="absolute top-20 right-[-5%] text-[15rem] font-black text-slate-50 select-none -z-0 leading-none pointer-events-none">
        KGBI
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER: Poster Style */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl animate-fade-in-up">
            <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
              <span className="text-accent">●</span> Visual Journey
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none">
              Life at <br /> <span className="text-slate-300">the Institute.</span>
            </h2>
          </div>
          <p className="text-slate-400 font-bold text-sm max-w-xs border-l-2 border-accent/30 pl-6 hidden md:block">
            Witness the transformation of hearts and minds through our vibrant Thika campus community.
          </p>
        </div>

        {/* BENTO GRID: Optimized for Performance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`relative rounded-[3rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 border-4 border-transparent hover:border-white ${img.span}`}
            >
              {/* Image with Ken Burns Effect */}
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Intelligent Overlay: Darkens on hover for text clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent opacity-40 group-hover:opacity-80 transition-all duration-500"></div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-[10px] font-black uppercase tracking-widest text-primary mb-3 shadow-lg">
                  {img.tag}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black tracking-tight drop-shadow-md">{img.title}</h3>
                  <div className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER ACTION: Strong Call to Action */}
        <div className="mt-16 flex flex-col items-center gap-6">
           <div className="flex items-center gap-3 text-primary font-black text-sm uppercase tracking-widest opacity-60">
             <Camera size={18} className="text-secondary" /> Scroll through our history
           </div>
           <button className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full font-black text-white bg-primary shadow-2xl shadow-primary/30 hover:scale-105 transition-all duration-300 overflow-hidden">
             <span className="relative z-10">View Full Archive</span>
             <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </button>
        </div>
      </div>
    </section>
  );
}
export default Gallery;