import { Users, Target, Rocket, Shield, BookOpen, ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const Leadership = () => {
  const leaders = [
    {
      name: "Rev. Titus Kivilu",
      role: "Principal & Senior Instructor",
        bio: "A visionary leader dedicated to theological excellence and spiritual mentorship.",
        image: "titus.jpg" // Replace with real photo
    },
    {
      name: "Pst. Charles Munene",
      role: "School Patron & Instructor",
      bio: "An experienced minister focused on fieldwork, chaplaincy, and student welfare.",
      image: "https://images.pexels.com" // Replace with real photo
    },
    {
      name: "Robert Heath",
      role: "Missionary & Instructor",
      bio: "Bringing global mission perspectives and technical support to the institute.",
      image: "robert.jpg" // Replace with real photo
    }
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      {/* 🏛️ HEADER SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10 bg-grid-slate"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent font-bold text-xs tracking-widest mb-6">
            <Rocket size={14} /> ADMINISTRATION & FACULTY
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6">
            Guided by <span className="text-accent italic">Wisdom.</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-medium">
            Meet the dedicated team committed to training the next generation of 
            reliable Christian workers in Kenya and beyond.
          </p>
        </div>
      </section>

      {/* 👤 LEADERSHIP PROFILES (The Faculty) */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader, i) => (
            <div key={i} className="group bg-white rounded-[var(--radius-box)] overflow-hidden shadow-xl border border-base-200 transition-all hover:-translate-y-2">
              <div className="h-72 overflow-hidden relative">
                <img src={leader.image} alt={leader.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-accent font-black text-[10px] uppercase tracking-widest">{leader.role}</p>
                  <h3 className="text-xl font-black text-white">{leader.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✉️ MESSAGE FROM THE PRINCIPAL */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-base-200 rounded-[var(--radius-box)] p-12 relative overflow-hidden">
            <Quote className="absolute top-10 right-10 text-primary/5" size={200} />
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-primary leading-tight">Word from our Principal</h2>
                <div className="h-1.5 w-20 bg-accent rounded-full"></div>
                <p className="text-lg text-slate-600 leading-relaxed italic">
                  "I thank God for the opening of KGBI which is a great opportunity for the men and women 
                  of Kenya who have a ministry call. We can testify of the teamwork existing between 
                  staff and students as we strive to transform lives through the Word."
                </p>
                <div>
                  <p className="font-black text-primary">Rev. Titus Kivilu</p>
                  <p className="text-sm font-bold text-slate-400">Principal, KGBI</p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="aspect-square rounded-[3rem] bg-primary overflow-hidden border-[10px] border-white shadow-2xl rotate-3">
                   <img src="/titus.jpg" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ CALL TO ACTION */}
      <section className="container mx-auto px-6 pb-24 text-center">
        <div className="inline-block p-1 bg-base-200 rounded-full mb-8">
           <div className="flex items-center gap-4 px-6 py-3">
              <p className="text-sm font-bold text-slate-500">Contact the Principal directly:</p>
              <a href="tel:+254721885799" className="text-primary font-black hover:text-secondary">+254 721 885 799</a>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
