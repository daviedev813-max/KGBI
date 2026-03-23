import { useEffect, useState } from "react";
import {
  LogOut, Search, Download, ChevronRight, Bell,
  Inbox, FileText, Clock, CheckCircle
} from "lucide-react";
import API from "../api/axios";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("applications");
  const [loading, setLoading] = useState(true);

  // 🔥 MODAL STATE
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [appRes, msgRes] = await Promise.all([
        API.get("/applications"),
        API.get("/all/messages")
      ]);
      setApplications(appRes.data);
      setMessages(msgRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // 🔥 ESC CLOSE MODAL
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDownload = async (id) => {
    try {
      const res = await API.get(`/applications/${id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "document");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "No document available for this application"
      );
    }
  };

  // 🔥 LOADING SCREEN
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const data = tab === "applications" ? applications : messages;

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col p-6 sticky top-0 h-screen">
        
        <div className="flex items-center gap-3 mb-12 px-2">
          <img
            src="/logo.jpg"
            alt="logo"
            className="h-10 w-10 object-contain bg-white p-1 rounded-xl shadow"
          />
          <span className="font-black tracking-tighter text-xl">
            KGBI ADMIN
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setTab("applications")}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
              tab === "applications"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <FileText size={20} /> Admissions
          </button>

          <button
            onClick={() => setTab("messages")}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
              tab === "messages"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <Inbox size={20} /> Inquiries
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10 overflow-y-auto">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              {tab === "applications"
                ? "Student Admissions"
                : "General Inquiries"}
            </h1>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">
              Management Console
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="input bg-white border-slate-200 rounded-2xl pl-12 w-64" placeholder="Search..." />
            </div>
            <button className="btn btn-circle btn-ghost bg-white border-slate-200">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { label: "Total Applications", val: applications.length, color: "bg-blue-100 text-blue-700", icon: <FileText size={24}/> },
            { label: "Total Messages", val: messages.length, color: "bg-yellow-100 text-yellow-700", icon: <Clock size={24}/> },
            { label: "Total Records", val: applications.length + messages.length, color: "bg-green-100 text-green-700", icon: <CheckCircle size={24}/> },
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border shadow-sm flex justify-between">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase">{s.label}</p>
                <p className="text-4xl font-black">{s.val}</p>
              </div>
              <div className={`h-14 w-14 flex items-center justify-center rounded-2xl ${s.color}`}>
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden">
          <div className="p-8 border-b flex justify-between">
            <h3 className="text-xl font-black">Recent Activity</h3>
          </div>

          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>{tab === "applications" ? "Program" : "Subject"}</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-400">
                    No records found
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row._id}>
                    <td>
                      <div className="flex gap-3 items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {row.name ? row.name.substring(0, 2).toUpperCase() : "NA"}
                        </div>
                        {row.name}
                      </div>
                    </td>
                    <td>{row.phone || row.email}</td>
                    <td>{row.program || "General Inquiry"}</td>
                    <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                    <td className="flex gap-2">
                      {tab === "applications" && (
                        <button onClick={() => handleDownload(row._id)} className="btn btn-sm">
                          <Download size={16}/>
                        </button>
                      )}
                      <button onClick={() => openModal(row)} className="btn btn-sm">
                        <ChevronRight size={16}/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🔥 MODAL */}
        {modalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-xl">

              <h2 className="text-2xl font-bold mb-4">
                {tab === "applications" ? "Application Details" : "Message Details"}
              </h2>

              <p><b>Name:</b> {selectedItem.name}</p>
              <p><b>Contact:</b> {selectedItem.email || selectedItem.phone}</p>
              <p><b>{tab === "applications" ? "Program" : "Subject"}:</b> {selectedItem.program}</p>
              <p className="mt-3 text-slate-600">{selectedItem.message}</p>

              <div className="mt-6 flex justify-between">
                {tab === "applications" && (
                  <button onClick={() => handleDownload(selectedItem._id)} className="btn btn-primary">
                    Download
                  </button>
                )}
                <button onClick={closeModal} className="btn">
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;