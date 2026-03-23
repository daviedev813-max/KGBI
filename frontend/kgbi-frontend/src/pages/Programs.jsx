import Curriculum from "../components/Curriculum";
import { Clock, Home, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Programs() {
  const trainingPaths = [
    {
      title: "Full-Time Residential",
      icon: <Home className="w-8 h-8" />,
      desc: "An immersive, on-campus experience designed for deep theological focus and community discipleship.",
      features: [
        "On-campus Housing",
        "Intensive Bible Study",
        "Community Life",
        "Daily Mentorship",
      ],
      accent: "from-blue-600 to-primary",
      delay: "0s",
    },
    {
      title: "Part-Time Training",
      icon: <Clock className="w-8 h-8" />,
      desc: "Perfect for local students looking to balance theological education with their daily schedules.",
      features: [
        "Flexible Hours",
        "Weekend Modules",
        "Core Curriculum",
        "Local Networking",
      ],
      accent: "from-slate-500 to-slate-700",
      delay: "0.1s",
    },
    {
      title: "Bi-Vocational Training",
      icon: <Briefcase className="w-8 h-8" />,
      desc: "Tailored for working professionals who are called to ministry while maintaining their careers.",
      features: [
        "Evening Classes",
        "Remote Options",
        "Practical Ministry",
        "Career Integration",
      ],
      accent: "from-accent to-yellow-600",
      delay: "0.2s",
    },
  ];

  return (
    <div className="bg-[#fafcfd] min-h-screen">
      {/* 🏔️ HERO HEADER (Condensed for focus) */}
      <section className="bg-primary pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"></div>
        <div className="container mx-auto text-center relative z-10">
          <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
            Our Pathways
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            Training <span className="text-blue-200">Models.</span>
          </h1>
          <p className="text-blue-100/70 max-w-xl mx-auto font-medium text-lg leading-relaxed">
            Flexible enrollment options for our{" "}
            <span className="text-white font-bold">Diploma in Theology</span>,
            designed to fit your unique calling.
          </p>
        </div>
      </section>

      {/* 📋 THE PROGRAM CARDS */}
      <section className="py-20 px-4 md:px-6 -mt-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trainingPaths.map((path, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{ animationDelay: path.delay }}
            >
              {/* Decorative Top Gradient Line */}
              <div
                className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${path.accent}`}
              ></div>

              <div className="relative z-10">
                {/* Icon Wrapper */}
                <div className="h-16 w-16 bg-slate-50 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {path.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight mb-4">
                  {path.title}
                </h3>

                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  {path.desc}
                </p>

                {/* Feature List */}
                <ul className="space-y-4 mb-10">
                  {path.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm font-bold text-slate-600"
                    >
                      <CheckCircle2 className="text-accent h-5 w-5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/admissions"
                  className="w-full btn btn-primary rounded-2xl h-[60px] font-black group-hover:shadow-xl shadow-primary/20 transition-all"
                >
                  Enroll in this Path
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>

              {/* Background Numbering (Subtle) */}
              <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-slate-50 select-none group-hover:text-slate-100 transition-colors">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Curriculum />

      {/* 🛡️ BOTTOM BANNER: THE "WHY" */}
      <section className="py-20 px-6 container mx-auto">
        <div className="bg-[#0f172a] rounded-[3.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com')]"></div>

          <div className="max-w-xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-4">
              Unsure which path is <br />{" "}
              <span className="text-accent">right for you?</span>
            </h2>
            <p className="text-blue-100/60 font-medium">
              Our admissions team is ready to guide you through the selection
              process based on your current ministry needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
            <button className="btn btn-accent rounded-full px-10 h-[65px] font-black shadow-xl shadow-accent/20">
              Speak to Admissions
            </button>
            <button className="btn btn-ghost text-white border-white/20 hover:bg-white/5 rounded-full px-10 h-[65px] font-black">
              View Full Syllabus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Programs;
