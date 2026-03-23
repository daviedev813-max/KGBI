import { useState } from "react";
import { BookOpen, ShieldCheck, Clock, ChevronDown, Sparkles, GraduationCap, Microscope } from "lucide-react";
import { SyllabusModal } from "./SyllabusModal"; // Assuming this is your modal file path

function Curriculum() {
  const [activeUnit, setActiveUnit] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const units = [
    {
      title: "Biblical Hermeneutics",
      tag: "Bible Interpretation",
      icon: <BookOpen />,
      desc: "The cornerstone of sound doctrine. Transition from subjective reading to objective discovery using the Literal-Grammatical-Historical method.",
      modules: [
        "The Science of Exegesis",
        "Historical-Cultural Context",
        "Syntactical Analysis",
        "Authorial Intent vs. Reader Response"
      ],
      outcome: "Ability to 'Rightly Divide' the Word with clinical precision."
    },
    {
      title: "Systematic Dispensationalism",
      tag: "Theology",
      icon: <Clock />,
      desc: "Master the architecture of God’s redemptive timeline. Distinguish between God’s program for Israel and the mystery of the Body of Christ.",
      modules: [
        "The Seven Dispensations",
        "Covenantal vs. Dispensational Views",
        "The Mystery Revealed to Paul",
        "Prophetic vs. Apostolic Mandates"
      ],
      outcome: "A cohesive understanding of God’s progressive revelation."
    },
    {
      title: "Pillars of Orthodoxy",
      tag: "Bible Truths",
      icon: <ShieldCheck />,
      desc: "An intensive dive into the unshakeable doctrines of the Christian faith. Forge a defense for the hope that is within you.",
      modules: [
        "Bibliology: Inerrancy of Scripture",
        "Soteriology: The Finished Work",
        "Pneumatology: Ministry of the Spirit",
        "Hamartiology: Doctrine of Sin & Grace"
      ],
      outcome: "An unassailable theological framework for ministry."
    }
  ];

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      {/* 🎨 Subtle Background "Ghost" Text */}
      <div className="absolute top-40 right-[-10%] text-[20rem] font-black text-slate-50 select-none -z-0 leading-none">
        TRUTH
      </div>

      <div className="container mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Academic Excellence</span>
            <h2 className="text-5xl md:text-7xl font-black text-primary leading-[0.95] tracking-tighter">
              The <span className="text-slate-300">Diploma</span> <br /> Curriculum.
            </h2>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
             <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
               <GraduationCap size={24} />
             </div>
             <div>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Accreditation</p>
               <p className="text-sm font-bold text-primary italic">Kenya Grace Bible Institute</p>
             </div>
          </div>
        </div>

        {/* 📚 ACCORDION EXPLORER */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: The Selection List */}
          <div className="lg:col-span-5 space-y-4">
            {units.map((unit, i) => (
              <button
                key={i}
                onClick={() => setActiveUnit(i)}
                className={`w-full text-left p-8 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden ${
                  activeUnit === i 
                    ? "bg-primary border-primary shadow-2xl shadow-primary/20 scale-[1.02]" 
                    : "bg-white border-slate-100 hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                    activeUnit === i ? "bg-white text-primary" : "bg-slate-50 text-slate-400 group-hover:text-primary"
                  }`}>
                    {unit.icon}
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${activeUnit === i ? "text-blue-200" : "text-slate-400"}`}>
                      {unit.tag}
                    </p>
                    <h3 className={`text-xl font-black transition-colors ${activeUnit === i ? "text-white" : "text-primary"}`}>
                      {unit.title}
                    </h3>
                  </div>
                </div>
                {activeUnit === i && (
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20">
                    <ChevronDown className="-rotate-90" size={32} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Right Side: The Detail View */}
          <div className="lg:col-span-7">
            <div className="bg-[#fafcfd] p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] min-h-[600px] flex flex-col justify-between animate-fade-in-up">
              
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                   <div className="h-2 w-12 bg-accent rounded-full"></div>
                   <span className="text-primary font-black tracking-widest text-xs uppercase">Module Overview</span>
                </div>

                <h4 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-none">
                  {units[activeUnit].title}
                </h4>

                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                  {units[activeUnit].desc}
                </p>

                {/* Sub-Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {units[activeUnit].modules.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm font-bold text-slate-600 text-sm">
                      <Sparkles className="text-accent" size={16} />
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcome Footer */}
              <div className="mt-16 pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-xl text-accent">
                      <Microscope size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Focus Outcome</p>
                      <p className="font-bold text-primary">{units[activeUnit].outcome}</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                 >
                   Get Detailed Syllabus
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component Integration */}
      <SyllabusModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        unitTitle={units[activeUnit].title} 
      />
    </section>
  );
}

export default Curriculum;
