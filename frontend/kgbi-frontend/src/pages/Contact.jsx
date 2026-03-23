import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import API from "../api/axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/create/messages", form ,
        {headers: { "Content-Type": "multipart/form-data" },
       }
      );
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sent) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [sent]);

  return (
    <div className="bg-[#fafcfd] min-h-screen pb-20">
      {/* 🏔️ CONTACT HERO */}
      <section className="bg-[#002855] pt-40 pb-24 px-6 relative overflow-hidden border-b-8 border-[#87CEEB]">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#87CEEB]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 animate-fade-in-up">
            Get In <span className="text-[#87CEEB]">Touch.</span>
          </h1>
          <p className="text-blue-100/60 font-medium max-w-xl mx-auto italic">
            "Training to Transform Others..." — 2 Timothy 2:2
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          
          {/* 📞 LEFT: BRANDED CONTACT INFO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl border border-blue-50 space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-[#002855] flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#87CEEB] rounded-full"></span> Direct Lines
                </h3>
                <div className="space-y-4">
                  <a href="tel:+254721885799" className="flex items-center gap-4 group">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#0099ff] flex items-center justify-center group-hover:bg-[#002855] group-hover:text-white transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile</p>
                      <p className="font-bold text-[#002855]">+254 721 885 799</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 group">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#0099ff] flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                      <p className="font-bold text-[#002855] truncate text-xs md:text-sm">kenyagracebibleinstitute@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-6">
                <h3 className="text-2xl font-black text-[#002855] flex items-center gap-3">
                   <span className="h-2 w-2 bg-[#87CEEB] rounded-full"></span> Our Campus
                </h3>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#0099ff] flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div className="text-sm font-bold text-slate-500 leading-relaxed">
                    Pilot-Runda Estate, Thika <br />
                    Near General Kago Rd.
                  </div>
                </div>
                
                {/* 📍 MINI LIVE MAP CARD */}
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
            </div>
          </div>

          {/* ✉️ RIGHT: MODERN MESSAGE FORM */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-blue-50 h-full relative overflow-hidden">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="h-20 w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-[#002855]">Message Sent!</h2>
                  <p className="text-slate-500 font-medium">Thank you for reaching out. We will get back to you shortly.</p>
                  <button onClick={() => setSent(false)} className="btn btn-ghost text-[#0099ff] font-black uppercase tracking-widest">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-1 w-12 bg-[#87CEEB] rounded-full"></div>
                    <h2 className="text-3xl font-black text-[#002855]">Send a Message</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Your Name</label>
                      <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#87CEEB] outline-none font-bold text-[#002855] transition-all" placeholder="Full Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                      <input required type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#87CEEB] outline-none font-bold text-[#002855] transition-all" placeholder="example@mail.com" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                    <input required type="tel" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#87CEEB] outline-none font-bold text-[#002855] transition-all" placeholder="+254..." onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
                    <textarea required rows="5" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#87CEEB] outline-none font-bold text-[#002855] transition-all resize-none" placeholder="How can we help you today?" onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>

                  <button disabled={loading} className="w-full bg-[#002855] hover:bg-[#0099ff] text-white py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95">
                    {loading ? "Sending..." : <><Send size={20} /> Send Inquiry</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
