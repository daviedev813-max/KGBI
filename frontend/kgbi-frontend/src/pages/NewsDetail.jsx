import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Calendar, Clock, Tag, ArrowLeft, Share2, 
  Facebook, Twitter, Copy, CheckCircle2 
} from "lucide-react";
import { useEffect } from "react";

// In a real app, you would fetch this from an API or a shared data file
const newsData = [
  {
    id: 1,
    title: "KGBI Residential Campus Officially Opens in Thika",
    fullContent: `The opening of the Kenya Grace Bible Institute (KGBI) residential campus marks a pivotal moment in our mission to 'Train to Transform Others.' Located in the Pilot-Runda Estate of Thika, the new facility features dedicated administration and classroom blocks. 

    The ceremony was attended by leadership from Grace Bible Church and partner organizations. Rev. Titus Kivilu emphasized that having a permanent residential site allows for more intensive training of pastors and leaders, grounded in the 2 Timothy 2:2 vision. 

    Students will now benefit from a full-time learning environment, fostering deeper fellowship and more rigorous theological study. We thank all our partners, including TCM and the Good Soldier Fund, for making this milestone possible.`,
    date: "Jan 08, 2020",
    category: "Milestone",
    image: "/g6.jpg",
    author: "KGBI Admin"
  },
  // Add other articles here...




];

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the specific article based on the URL ID
  const article = newsData.find(item => item.id === parseInt(id));

  // Scroll to top when the article loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-black text-primary">Article Not Found</h2>
        <button onClick={() => navigate('/news')} className="btn btn-primary rounded-full">Back to News</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 🏛️ ARTICLE HEADER */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <img 
          src={article.image} 
          className="w-full h-full object-cover" 
          alt={article.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
        
        <div className="absolute bottom-12 left-0 w-full">
          <div className="container mx-auto px-6">
            <button 
              onClick={() => navigate(-1)} 
              className="mb-8 flex items-center gap-2 text-white/80 font-bold hover:text-white transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" /> Back to Updates
            </button>
            
            <div className="space-y-4 max-w-4xl">
              <span className="px-4 py-1.5 rounded-full bg-accent text-primary font-black text-[10px] uppercase tracking-widest">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/70 font-bold text-sm">
                <div className="flex items-center gap-2"><Calendar size={16} /> {article.date}</div>
                <div className="flex items-center gap-2"><Clock size={16} /> 4 min read</div>
                <div className="flex items-center gap-2 text-accent"><CheckCircle2 size={16} /> Verified News</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📖 ARTICLE CONTENT */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Main Content Body */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none prose-slate prose-headings:text-primary prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-primary">
                {/* We map paragraphs to handle line breaks from our data */}
                {article.fullContent.split('\n').map((para, i) => (
                  <p key={i} className="mb-6">{para.trim()}</p>
                ))}
              </div>

              {/* Tag Cloud */}
              <div className="mt-12 pt-12 border-t border-slate-100 flex flex-wrap gap-3">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">Tags:</span>
                {["Ministry", "Training", "Grace"].map(tag => (
                  <span key={tag} className="px-4 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Tools */}
            <div className="lg:col-span-4 space-y-10">
              {/* Share Card */}
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                <h4 className="font-black text-primary uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                   <Share2 size={16} /> Share this Story
                </h4>
                <div className="flex gap-4">
                  <button className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm hover:scale-110 transition-transform">
                    <Facebook size={20} />
                  </button>
                  <button className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-sky-400 shadow-sm hover:scale-110 transition-transform">
                    <Twitter size={20} />
                  </button>
                  <button className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 shadow-sm hover:scale-110 transition-transform">
                    <Copy size={20} />
                  </button>
                </div>
              </div>

              {/* Admissions Mini-CTA */}
              <div className="bg-secondary p-8 rounded-[2.5rem] text-white shadow-xl shadow-secondary/20">
                <h4 className="text-xl font-black italic mb-4">Inspired by our mission?</h4>
                <p className="text-sm font-medium text-white/80 mb-6 leading-relaxed">
                  Enroll in the 2026 Residential Intake and become part of our next big milestone.
                </p>
                <Link to="/admissions" className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest text-center block hover:bg-black transition-colors">
                  Apply Today
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsDetail;
