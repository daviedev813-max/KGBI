import React from "react";
import Hero from "../components/Hero";
import News from "../pages/News"; // Integrated your News component
import {
  BookOpen,
  ShieldCheck,
  Zap,
  ArrowRight,
  Users,
  CheckCircle2,
  PlayCircle,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-[#fafcfd] selection:bg-primary selection:text-white overflow-x-hidden">
      <Hero />
      {/* ⚡ SECTION 1: THE "THREE PILLARS" */}
      <section className="py-20 md:py-28 px-6 relative bg-grid-slate">
        <div className="container mx-auto">
          <div className="relative mb-16 md:mb-24 text-center lg:text-left animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>{" "}
              The KGBI Standard
            </span>
            <h2 className="text-5xl md:text-8xl font-black text-primary tracking-tighter leading-[0.9]">
              Uncompromising <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">
                Biblical Truth.
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 group relative p-8 md:p-12 rounded-[var(--radius-box)] bg-primary text-white overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.01]">
              <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000 hidden md:block">
                <BookOpen size={200} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="h-16 w-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                  <ShieldCheck className="text-accent" size={32} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                  The Dispensational Edge
                </h3>
                <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-lg font-medium">
                  We don't just teach the Bible; we teach you how to{" "}
                  <span className="text-white font-bold underline decoration-accent decoration-2 underline-offset-8">
                    Rightly Divide
                  </span>{" "}
                  it. Understand God's distinct programs for Israel and the Body
                  of Christ.
                </p>
                <Link
                  to="/about"
                  className="w-full md:w-auto bg-accent text-primary rounded-full px-10 py-5 font-black gap-3 hover:gap-5 transition-all flex items-center justify-center shadow-xl shadow-black/20"
                >
                  View Core Doctrines <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
              {[
                {
                  title: "Hermeneutics",
                  icon: <Zap />,
                  desc: "Master the Literal-Historical study method.",
                  color:
                    "bg-white border-slate-100 shadow-xl shadow-slate-200/50",
                },
                {
                  title: "Vocational Focus",
                  icon: <Users />,
                  desc: "Full-time, Part-time, or Bi-Vocational paths.",
                  color: "bg-slate-50 border-transparent",
                },
              ].map((pill, i) => (
                <div
                  key={i}
                  className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border transition-all hover:border-primary/20 ${pill.color} group cursor-default`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary text-white flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {pill.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-primary tracking-tight">
                        {pill.title}
                      </h4>
                      <p className="text-slate-500 font-bold text-sm leading-snug">
                        {pill.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 📜 SECTION 2: THE MANDATE */}
      <section className="py-32 md:py-40 bg-[#0a0f1c] relative overflow-hidden">
        <div className="absolute -top-10 md:-top-20 -left-5 md:-left-10 text-[15rem] md:text-[30rem] font-serif text-white/[0.03] leading-none select-none pointer-events-none">
          “
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-6xl font-serif italic text-slate-100 leading-tight">
              "We do not merely graduate students; we{" "}
              <span className="text-accent">deploy disciples</span> equipped
              with the armor of sound doctrine."
            </h2>
            <div className="flex flex-col items-center gap-6">
              <div className="h-px w-24 md:w-32 bg-accent/50"></div>
              <div className="space-y-2">
                <p className="text-primary font-black tracking-[0.5em] text-[10px] uppercase">
                  The Eternal Standard
                </p>
                <p className="text-4xl md:text-7xl font-black text-white tracking-tighter">
                  PREACH THE WORD.
                </p>
                <p className="text-accent font-bold tracking-[0.3em] text-sm md:text-base">
                  — 2 TIMOTHY 4:2 —
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 🏛️ SECTION 3: ABOUT & MISSION (POSTER STYLE) */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-primary tracking-tighter">
                  Our Background
                </h2>
                <div className="h-2 w-20 bg-accent rounded-full"></div>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                KGBI is a non-denominational theological school operating under
                the registration of{" "}
                <span className="text-primary font-black">
                  Grace Bible Church
                </span>
                . Our mission is to train and equip people with the Word of God,
                preparing you for a lifetime of ministry.
              </p>
              <div className="p-8 bg-slate-50 rounded-[var(--radius-box)] border-l-8 border-primary italic text-slate-600 shadow-sm relative">
                <Quote
                  className="absolute top-4 right-6 text-slate-200"
                  size={40}
                />
                <p className="text-lg leading-relaxed">
                  "Be Trained to Transform Others..."
                </p>
                <span className="font-black text-primary mt-2 block not-italic">
                  — 2 Timothy 2:2
                </span>
              </div>
            </div>

         <div className="grid grid-cols-2 gap-2 md:gap-4">
  {[
    { name: "Bible Interpretation", tag: "Exegesis" },
    { name: "Dispensationalism", tag: "Theology" },
    { name: "Bible Truths", tag: "Doctrine" },
    { name: "Leadership", tag: "Ministry" },
  ].map((item, idx) => (
    <div 
      key={idx} 
      className={`p-3 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center text-center justify-center space-y-1 md:space-y-3 transition-all hover:-translate-y-1 ${
        idx === 0 
          ? "col-span-2 bg-primary text-white shadow-2xl shadow-primary/20" 
          : "bg-slate-100 text-primary border border-slate-200"
      }`}
    >
      {/* 🚀 THE FIX: whitespace-nowrap + text-[3.2vw] ensures it shrinks to fit one line */}
      <div className="font-black uppercase tracking-tighter whitespace-nowrap text-[3.2vw] sm:text-lg md:text-2xl leading-none">
        {item.name}
      </div>
      <div className={`text-[7px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] ${
        idx === 0 ? "text-accent" : "text-slate-400"
      }`}>
        {item.tag}
      </div>
    </div>
  ))}
</div>

          </div>
        </div>
      </section>
      {/* 🖼️ SECTION 4: GALLERY BENTO */}
      <section className="py-24 md:py-32 px-6 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter">
                The Experience
              </h2>
              <p className="text-slate-400 font-bold flex items-center gap-2">
                <PlayCircle size={18} className="text-secondary" /> Witness the
                transformation at KGBI
              </p>
            </div>
            <Link
              to="/gallery"
              className="group font-black text-primary flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-sm hover:bg-primary hover:text-white transition-all"
            >
              Explore Full Archive{" "}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
            <div className="md:col-span-2 md:row-span-2 rounded-[var(--radius-box)] overflow-hidden relative group shadow-2xl">
              <img
                src="/c4.jpg"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                alt="Convocation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-70"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="px-3 py-1 rounded-full bg-accent text-primary text-[10px] font-black uppercase mb-4 inline-block">
                  Milestone
                </span>
                <p className="text-3xl font-black text-white leading-none">
                  Theological Excellence
                </p>
              </div>
            </div>
            <div className="rounded-[3rem] overflow-hidden group shadow-lg border-4 border-white">
              <img
                src="g11.jpg"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Library"
              />
            </div>
            <div className="rounded-[3rem] overflow-hidden group shadow-lg border-4 border-white">
              <img
                src="/c2.jpg"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Class"
              />
            </div>
            <div className="md:col-span-2 rounded-[3rem] overflow-hidden group shadow-lg border-4 border-white relative">
              <img
                src="/class.jpg"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Study"
              />
              <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors"></div>
            </div>
          </div>
        </div>
      </section>
      <News /> {/* Included your Intelligence Hub News component here */}
      {/* 🚀 FINAL CTA SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="bg-primary rounded-[var(--radius-box)] p-12 md:p-20 text-center relative overflow-hidden shadow-poster-glow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                Start Your Journey <br /> of{" "}
                <span className="text-accent italic">Grace.</span>
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-medium">
                Enrollment for the 2026 Intake is currently open. Take the first
                step toward a lifetime of transformed ministry.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  to="/admissions"
                  className="px-12 py-5 bg-white text-primary rounded-full font-black text-lg hover:scale-105 transition-transform flex items-center gap-3"
                >
                  Apply Now <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="px-12 py-5 border border-white/20 text-white rounded-full font-black text-lg hover:bg-white/10 transition-all"
                >
                  Contact Admissions
                </Link>
              </div>
              <div className="flex items-center justify-center gap-8 pt-10 opacity-40">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                  <CheckCircle2 size={16} /> Certified Faculty
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                  <CheckCircle2 size={16} /> TCM Partnered
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
