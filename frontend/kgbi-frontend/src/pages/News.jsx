import { Calendar, ArrowUpRight, Bell, Tag, Clock, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export function News() {
  const updates =[
    {
      id: 1,
      title: "KGBI Residential Campus Officially Opens in Thika",
      excerpt: "A historic milestone for the Grace Bible Church as we launch the full-time residential training center to equip the next generation of reliable ministers.",
      date: "Jan 08, 2020",
      category: "Milestone",
      image: "/g6.jpg",
      isLive: false
    },
    {
      id: 2,
      title: "Coast Evangelistic Mission: 60 Souls Saved",
      excerpt: "Our students and faculty recently returned from a powerful mission in the Aldina area. We praise God for the 200+ people reached with the Gospel of Grace.",
      date: "Aug 13, 2021",
      category: "Outreach",
      image: "/g1.jpg",
      isLive: true
    },
    {
      id: 3,
      title: "2026 Intake: Diploma in Theology Applications",
      excerpt: "Applications are now officially open for our 2-year intensive program. Join a community dedicated to 2 Timothy 2:2.",
      date: "Ongoing",
      category: "Admissions",
      image: "/c3.jpg",
      isLive: false
    }
  ];


  const featured = updates[0];
  const secondary = updates.slice(1);

  return (
    <section className="py-28 bg-[#fafcfd] relative overflow-hidden">
      {/* 🎨 Decorative Background Text */}
      <div className="absolute top-20 left-[-5%] text-[18rem] font-black text-slate-50 select-none -z-0 leading-none pointer-events-none tracking-tighter">
        VOICE
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-6 shadow-sm">
              <Bell size={12} className="animate-[bounce_2s_infinite]" /> Intelligence Hub
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-[0.95]">
              News & <br /> <span className="text-slate-300 underline decoration-accent/30 decoration-8 underline-offset-8">Updates.</span>
            </h2>
          </div>
          <Link to="/news" className="btn btn-ghost hover:bg-slate-100 rounded-full px-8 font-black gap-2 group transition-all border border-slate-200">
            Browse Archive <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* NEWS FEED BENTO GRID */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* 🌟 Main Featured News (Large Card) */}
          <Link to={`/news/${featured.id}`} className="lg:col-span-7 group block">
            <div className="relative h-[500px] md:h-[700px] rounded-[4rem] overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white transition-all duration-500 group-hover:shadow-primary/20">
              <img src={featured.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Featured" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent"></div>
              
              <div className="absolute top-10 left-10 flex flex-wrap gap-3">
                <span className="px-5 py-2 rounded-full bg-white text-primary font-black text-[10px] uppercase tracking-widest shadow-xl">
                  {featured.category}
                </span>
              </div>

              <div className="absolute bottom-12 left-8 right-8 md:left-12 md:right-12 text-white space-y-4">
                <div className="flex items-center gap-4 opacity-70 font-bold text-sm">
                  <Calendar size={16} className="text-accent" /> {featured.date}
                </div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-[1] group-hover:text-accent transition-colors duration-500">
                  {featured.title}
                </h3>
                <p className="text-lg text-blue-50/80 max-w-xl font-medium leading-relaxed hidden md:block">
                  {featured.excerpt}
                </p>
                <div className="pt-4">
                  <span className="inline-flex items-center gap-2 text-accent font-black text-xs uppercase tracking-[0.2em]">
                    Read Full Story <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* 📰 Secondary Stack (With Images) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondary.map((news) => (
              <Link 
                to={`/news/${news.id}`} 
                key={news.id} 
                className="flex-1 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group overflow-hidden flex flex-col sm:flex-row h-full"
              >
                {/* Small Image Side */}
                <div className="sm:w-2/5 h-48 sm:h-full overflow-hidden relative">
                  <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.title} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary font-black text-[8px] uppercase tracking-widest shadow-sm">
                      {news.category}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-3">
                    <Calendar size={12} className="text-secondary" /> {news.date}
                  </div>
                  <h4 className="text-xl font-black text-primary tracking-tight mb-3 group-hover:text-secondary transition-colors leading-tight">
                    {news.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mb-4">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all">
                      Read <ArrowUpRight size={14} className="text-accent" />
                    </span>
                    <button className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                      <Share2 size={12} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default News;
