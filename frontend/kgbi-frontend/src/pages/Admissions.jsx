import { useState, useRef,useEffect  } from "react";
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
  const [file, setFile] = useState(null); // State for the uploaded document
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef(null); // Reference to the hidden file input

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Basic validation: Limit to 5MB and common document types
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File is too large. Please upload a file smaller than 5MB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData to handle both text and files
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("program", form.program);
    formData.append("email", form.email);
    if (file) {
      formData.append("document", file); // Key matches typical backend expectations
    }

    try {
      // NOTE: Ensure your axios instance doesn't force 'application/json'
      // for this specific call so it can handle multipart/form-data
      await API.post("/applications/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsSuccess(true);
      setForm({ name: "", phone: "", program: "", email: "" });
      setFile(null);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Submission failed. Please try again."
      );
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
    <div className="bg-[#fafcfd] min-h-screen pb-20">
      {/* 🏔️ ADMISSIONS HERO */}
      <section className="bg-[#002855] pt-40 pb-24 px-6 relative overflow-hidden border-b-8 border-[#87CEEB]">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#87CEEB]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#87CEEB]/10 border border-[#87CEEB]/20 text-[#87CEEB] font-black text-[10px] tracking-[0.4em] uppercase mb-6">
            Enrollment 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
            Apply <span className="text-[#87CEEB]">Now.</span>
          </h1>
          <p className="text-blue-100/60 font-medium max-w-xl mx-auto italic">
            "Be Trained to Transform Others..." — 2 Timothy 2:2
          </p>
        </div>
      </section>

      {/* 📝 FORM CONTAINER */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-12 bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,40,85,0.15)] overflow-hidden border border-blue-50">
          {/* Left Panel: Program Details (Institutional Navy) */}
          <div className="md:col-span-5 bg-[#002855] p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 opacity-10 translate-x-1/4 translate-y-1/4">
              <GraduationCap size={300} />
            </div>

            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl font-black tracking-tight">
                Required Documents
              </h2>
              <p className="text-blue-100/60 text-sm">
                Please have your ID or previous academic certificates ready for
                upload.
              </p>
              <div className="space-y-4">
                {[
                  "Full-Time Residential",
                  "Part-Time Training",
                  "Bi-Vocational Path",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-[#87CEEB]/20 text-[#87CEEB] flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#87CEEB] mb-2">
                Admissions Office
              </p>
              <p className="text-xl font-black">+254 721 885 799</p>
            </div>
          </div>

          {/* Right Panel: The Form */}
          <div className="md:col-span-7 p-8 md:p-16">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="h-20 w-20 bg-blue-50 text-[#0099ff] rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-[#002855]">Success!</h3>
                <p className="text-slate-500 font-medium">
                  Your application has been received.
                </p>
                <button
                   onClick={() => {
                    setIsSuccess(false);
                    setForm({
                      name: "",
                      phone: "",
                      program: "",
                      email: "",
                    });
                    setFile(null);
                  }}
                  className="text-sm font-black text-[#87CEEB] uppercase tracking-widest"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-black text-[#002855] mb-6">
                  Student Information
                </h3>

                {/* Name & Phone */}
                <div className="grid gap-5">
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                      size={18}
                    />
                    <input
                      required
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#87CEEB]/20 focus:border-[#87CEEB] outline-none font-bold text-slate-700"
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                      size={18}
                    />
                    <input
                      required
                      placeholder="Phone Number"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#87CEEB]/20 focus:border-[#87CEEB] outline-none font-bold text-slate-700"
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="relative">
                  <MailCheck
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#87CEEB]/20 focus:border-[#87CEEB] outline-none font-bold text-slate-700"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />

                </div>

                {/* Program Select */}
                <div className="relative">
                  <BookOpen
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <select
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#87CEEB]/20 focus:border-[#87CEEB] outline-none appearance-none font-bold text-slate-700"
                    onChange={(e) =>
                      setForm({ ...form, program: e.target.value })
                    }
                  >
                    <option value="">Select Study Path</option>
                    <option value="Full-time">Full-Time Residential</option>
                    <option value="Part-time">Part-Time Training</option>
                    <option value="Bi-vocational">
                      Bi-Vocational Training
                    </option>
                  </select>
                </div>

                {/* 📎 FILE UPLOAD SECTION */}
                <div className="pt-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
                    Upload ID / Certificates (Optional)
                  </p>

                  {/* Hidden Input */}
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
                      <FileUp size={20} /> Browse Documents
                    </button>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-[#87CEEB]/30 rounded-2xl">
                      <div className="flex items-center gap-3 text-[#002855]">
                        <FileText size={20} className="text-[#0099ff]" />
                        <span className="text-sm font-bold truncate max-w-[200px]">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-[#002855] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#002855]/20 flex items-center justify-center gap-3 hover:bg-[#002855]/90 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Uploading..."
                    ) : (
                      <>
                        <Send size={20} /> Submit Application
                      </>
                    )}
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
