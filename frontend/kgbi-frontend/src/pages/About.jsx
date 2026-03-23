import { ShieldCheck, Target, Eye, Award, ArrowRight, BookOpen, GraduationCap, Globe } from "lucide-react";
import Leadership from "../components/Leadership";

function About() {
  return (
    <div className="bg-[#fafcfd] overflow-x-hidden">
      
      {/* 🏔️ THE "ETERNAL TRUTH" IMMERSIVE HERO */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#002855]">
        
        {/* 🎞️ CINEMATIC BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#002855]/80 z-10"></div>
          <img 
            src="/g11.jpg" 
            alt="Library of Truth" 
            className="w-full h-full object-cover scale-110 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafcfd] z-20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-30">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT: POWERFUL STATEMENT */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#87CEEB]/10 border border-[#87CEEB]/20 text-[#87CEEB] font-black text-[10px] tracking-[0.5em] uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#87CEEB] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#87CEEB]"></span>
                </span>
                The KGBI Heritage
              </div>

              <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
                Built on <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#87CEEB] to-white">
                  The Rock.
                </span>
              </h1>

              <p className="text-xl text-blue-100/70 max-w-lg leading-relaxed font-medium">
                Operating under the registration of <span className="text-white font-bold">Grace Bible Church</span>, we stand as a beacon of sound doctrine in an ever-changing world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="btn bg-[#87CEEB] hover:bg-white text-[#002855] border-none btn-lg rounded-2xl px-10 h-[70px] font-black shadow-2xl shadow-[#87CEEB]/20 transition-all">
                  Join the Legacy
                </button>
                <button className="btn btn-ghost btn-lg text-white border-white/20 hover:bg-white/5 rounded-2xl px-10 h-[70px] font-black">
                  Statement of Faith
                </button>
              </div>
            </div>

            {/* RIGHT: THE "TRUTH" VISUAL CARD (Poster Style) */}
            <div className="hidden lg:block relative group">
              <div className="absolute inset-0 bg-[#87CEEB] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[4rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                 <div className="space-y-8">
                   <div className="h-1 w-20 bg-[#87CEEB] rounded-full"></div>
                   <p className="text-4xl font-serif italic text-white leading-tight">
                     "Preach the word; be prepared in season and out of season..."
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/20"></div>
                      <span className="text-[#87CEEB] font-black tracking-widest text-sm uppercase">2 Timothy 4:2</span>
                   </div>
                 </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl animate-bounce-slow border-b-4 border-[#87CEEB]">
                 <p className="text-[#002855] font-black text-3xl leading-none">Est.</p>
                 <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">In Truth</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📖 STORY SECTION: THE "WHY" */}
      <section className="py-32 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white -rotate-3 hover:rotate-0 transition-transform duration-700">
               <img src="/class.jpg" alt="Classroom" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#87CEEB] p-10 rounded-[2.5rem] shadow-xl hidden md:block border-4 border-white">
              <p className="text-[#002855] font-black text-4xl leading-none">Diploma</p>
              <p className="text-[#002855] font-bold text-sm uppercase tracking-widest mt-2">In Pastoral Theology</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-[#002855] tracking-tighter leading-[0.95]">
              Equipping the <br /> Faithful for <span className="text-slate-300">Eternal Impact.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-500 font-medium leading-relaxed">
              <p>
                Kenya Grace Bible Institute (KGBI) is a non-denominational theological school operating under the registration of <span className="text-[#002855] font-bold">Grace Bible Church</span>. 
              </p>
              <p>
                Our mission is to train and equip people with the Word of God. We are a non-profit institution supported by ministry partners like <span className="text-[#002855] font-bold">Things to Come Mission</span> to prepare you for a lifetime of ministry.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="btn bg-[#002855] text-white rounded-2xl px-10 h-[65px] font-black group hover:bg-[#87CEEB] hover:text-[#002855] border-none transition-all">
                Download Prospectus <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <Leadership />

      {/* 🎯 CORE PILLARS: MISSION & VISION (Poster Styles) */}
      <section className="py-32 px-6 bg-[#eef7ff]">
        <div className="container mx-auto grid md:grid-cols-2 gap-12">
          
          <div className="group bg-white p-12 rounded-[3.5rem] border border-blue-100 shadow-sm hover:shadow-2xl transition-all">
            <div className="h-16 w-16 bg-[#002855] text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#87CEEB] group-hover:text-[#002855] transition-colors">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-black text-[#002855] mb-4">Our Mission</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              To be able to train and equip people with the Word of God, producing leaders who handle the Truth with precision through sound biblical doctrine.
            </p>
          </div>

          <div className="group bg-white p-12 rounded-[3.5rem] border border-blue-100 shadow-sm hover:shadow-2xl transition-all">
            <div className="h-16 w-16 bg-[#87CEEB] text-[#002855] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#002855] group-hover:text-white transition-colors">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-black text-[#002855] mb-4">Our Vision</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              "Be Trained to Transform Others..." — To see a transformed generation of disciples deployed with the armor of sound pastoral training.
            </p>
          </div>

        </div>
      </section>

      {/* 🛡️ VALUES: THE THREE CIRCLES FROM POSTER */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center mb-20">
          <p className="text-[#87CEEB] font-black tracking-[0.4em] uppercase text-xs mb-4">The KGBI Standard</p>
          <h2 className="text-5xl font-black text-[#002855] tracking-tighter">Our Core Pillars</h2>
        </div>

        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { label: "Hermeneutics", icon: <BookOpen />, desc: "Bible Interpretation" },
            { label: "Theology", icon: <Globe />, desc: "Dispensationalism" },
            { label: "Doctrines", icon: <ShieldCheck />, desc: "Bible Truths" }
          ].map((v, i) => (
            <div key={i} className="text-center group">
              <div className="h-24 w-24 mx-auto rounded-full bg-white border-4 border-[#87CEEB] text-[#002855] flex items-center justify-center mb-6 group-hover:bg-[#002855] group-hover:text-white transition-all duration-500 shadow-lg">
                {v.icon}
              </div>
              <h4 className="text-2xl font-black text-[#002855] mb-1">{v.label}</h4>
              <p className="text-sm font-bold text-[#87CEEB] uppercase tracking-widest">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✉️ CTA: JOIN THE JOURNEY */}
      <section className="py-20 px-6 container mx-auto mb-20">
        <div className="bg-[#002855] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden border-b-8 border-[#87CEEB]">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-[#87CEEB]/5 -skew-x-12 translate-x-1/2"></div>
           <h2 className="text-3xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tighter">
             Ready to Begin Your <br /> <span className="text-[#87CEEB]">Theological Training?</span>
           </h2>
           <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <button className="btn bg-[#87CEEB] hover:bg-white text-[#002855] border-none rounded-full px-12 h-[65px] font-black shadow-xl shadow-[#87CEEB]/20">Apply for 2026</button>
              <button className="btn btn-ghost text-white border-white/20 hover:bg-white/10 rounded-full px-12 h-[65px] font-black">Contact Admissions</button>
           </div>
        </div>
      </section>
    </div>
  );
}

export default About;
