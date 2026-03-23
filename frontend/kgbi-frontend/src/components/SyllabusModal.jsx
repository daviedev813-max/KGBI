import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail, User, FileText } from "lucide-react";
import API from "../api/axios";

export function SyllabusModal({ isOpen, onClose, unitTitle }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      // 🔗 Send to backend (you can store leads)
      await API.post("/syllabus-request", {
        name: form.name,
        email: form.email,
        unit: unitTitle,
      });

      // 📥 Trigger download (replace with real file later)
      const link = document.createElement("a");
      link.href = "/sample-syllabus.pdf"; // place file in public folder
      link.setAttribute("download", `${unitTitle}-syllabus.pdf`);
      document.body.appendChild(link);
      link.click();

      setForm({ name: "", email: "" });
      onClose();

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl"
        >

          {/* HEADER */}
          <div className="bg-primary p-8 text-white relative">
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white">
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <FileText className="text-accent" size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                Academic Resource
              </span>
            </div>

            <h2 className="text-3xl font-black">Detailed Syllabus</h2>
            <p className="text-blue-100/70">Unit: {unitTitle}</p>
          </div>

          {/* BODY */}
          <div className="p-10 space-y-6">
            <p className="text-slate-500 text-center">
              Enter your details to download the syllabus.
            </p>

            <div className="space-y-4">

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input input-bordered w-full h-[60px] pl-12 rounded-2xl bg-slate-50"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input input-bordered w-full h-[60px] pl-12 rounded-2xl bg-slate-50"
                />
              </div>

            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`btn btn-primary w-full h-[65px] rounded-2xl font-black text-lg flex items-center justify-center gap-3 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : <>Download PDF <Download size={20} /></>}
            </button>

            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
              By downloading, you agree to receive updates.
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default SyllabusModal;