import { useState, useRef, useEffect } from "react";
import {
  GraduationCap,
  Phone,
  User,
  MailCheck,
  BookOpen,
  Send,
  CheckCircle2,
  FileUp,
  X,
  FileText,
} from "lucide-react";
import API from "../api/axios";

function Admissions() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    program: "",
    email: "",
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Fixed: indexing the file object
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File is too large. Max size is 5MB.");
        e.target.value = null; // Clear the input
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.program) {
      alert("Please select a study path.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("program", form.program);
    formData.append("email", form.email);
    
    if (file) {
      formData.append("document", file);
    }

    try {
      await API.post("/applications/create", formData);
      
      setIsSuccess(true);
      // Reset Form State
      setForm({ name: "", phone: "", program: "", email: "" });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.response?.data?.message || "Submission failed. Please check all fields.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSuccess]);

  return (
    <div className="bg-[#fafcfd] min-h-screen pb-20 font-sans">
      {/* 🏔️ HERO SECTION */}
      <section className="bg-[#002855] pt-40 pb-24 px-6 relative overflow-hidden border-b-8 border-[#87CEEB]">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#87CEEB]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#87CEEB]/10 border border-[#87CEEB]/20 text-[#87CEEB] font-black text-[10px] tracking-[0.4em] uppercase mb-6">
            Enrollment 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
            Apply <span className="text-[#87CEEB]">Now.</span>
          </h1>
          <p className="text-blue-100/60 font-medium max-w-xl mx-auto italic leading-relaxed">
            "Be Trained to Transform Others..." — 2 Timothy 2:2
          </p>
        </div>
      </section>

      {/* 📝 FORM SECTION */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-12 bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,40,85,0.15)] overflow-hidden border border-blue-50">
          
          {/* Left Sidebar */}
          <div className="md:col-span-5 bg-[#002855] p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 opacity-10 translate-x-1/4 translate-y-1/4">
              <GraduationCap size={300} />
            </div>

            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl font-black tracking-tight">Required Documents</h2>
              <p className="text-blue-100/60 text-sm leading-relaxed">
                Upload clear scans of your ID or academic certificates (PDF/JPG).
              </p>
              <div className="space-y-4">
                {["Full-Time Residential", "Part-Time Training", "Bi-Vocational Path"].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-[#87CEEB]/20 text-[#87CEEB] flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#87CEEB] mb-2">Admissions Office</p>
              <p className="text-xl font-black">+254 721 885 799</p>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="md:col-span-7 p-8 md:p-16">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="h-24 w-24 bg-blue-50 text-[#0099ff] rounded-full flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-[#002855]">Success!</h3>
                <p className="text-slate-500 font-medium">Your application has been submitted safely.</p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 rounded-xl border-2 border-[#87CEEB] text-sm font-black text-[#002855] uppercase tracking-widest hover:bg-[#87CEEB] hover:text-white transition-all"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black text-[#002855]">Student Information</h3>
                
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      required
                      value={form.name}
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#87CEEB]/10 outline-none font-bold text-slate-700 transition-all"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      required
                      value={form.phone}
                      placeholder="Phone Number"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#87CEEB]/10 outline-none font-bold text-slate-700 transition-all"
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div className="relative">
                    <MailCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      required
                      type="email"
                      value={form.email}
                      placeholder="Email Address"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#87CEEB]/10 outline-none font-bold text-slate-700 transition-all"
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <select
                      required
                      value={form.program}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#87CEEB]/10 outline-none appearance-none font-bold text-slate-700 transition-all"
                      onChange={(e) => setForm({ ...form, program: e.target.value })}
                    >
                      <option value="">Select Study Path</option>
                      <option value="Full-time">Full-Time Residential</option>
                      <option value="Part-time">Part-Time Training</option>
                      <option value="Bi-vocational">Bi-Vocational Training</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Document Upload (Max 5MB)</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {!file ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-[#87CEEB] hover:text-[#0099ff] hover:bg-blue-50/30 transition-all flex items-center justify-center gap-3"
                    >
                      <FileUp size={20} /> Browse Files
                    </button>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-[#87CEEB]/30 rounded-2xl">
                      <div className="flex items-center gap-3 text-[#002855]">
                        <FileText size={20} className="text-[#0099ff]" />
                        <span className="text-sm font-bold truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <button type="button" onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-[#002855] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#002855]/20 flex items-center justify-center gap-3 hover:bg-[#003875] transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? "Uploading..." : <><Send size={20} /> Submit Application</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admissions;
