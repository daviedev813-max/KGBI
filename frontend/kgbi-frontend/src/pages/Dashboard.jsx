import { useEffect, useState } from "react";
import {
  LogOut, Search, Download, ChevronRight, Bell, Menu, X,
  Inbox, FileText, Clock, CheckCircle
} from "lucide-react";
import API from "../api/axios";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("applications");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 🔥 Mobile Sidebar State

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [appRes, msgRes] = await Promise.all([
        API.get("/applications"),
        API.get("/messages/all")
      ]);
      setApplications(appRes.data);
      setMessages(msgRes.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openModal = (item) => { setSelectedItem(item); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setSelectedItem(null); };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDownload = async (id) => {
    try {
      const res = await API.get(`/applications/${id}/download`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `doc_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("No document available");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const data = tab === "applications" ? applications : messages;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0f172a] text-white">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="logo" className="h-8 w-8 rounded-lg bg-white" />
          <span className="font-bold">KGBI ADMIN</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] text-white p-6 transition-transform duration-300 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky md:top-0 md:h-screen flex flex-col
      `}>
        <div className="hidden md:flex items-center gap-3 mb-12 px-2">
          <img src="/logo.jpg" alt="logo" className="h-10 w-10 object-contain bg-white p-1 rounded-xl shadow" />
          <span className="font-black tracking-tighter text-xl">KGBI ADMIN</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: "applications", label: "Admissions", icon: <FileText size={20} /> },
            { id: "messages", label: "Inquiries", icon: <Inbox size={20} /> }
          ].map((navTab) => (
            <button
              key={navTab.id}
              onClick={() => { setTab(navTab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                tab === navTab.id ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:bg-white/5"
              }`}
            >
              {navTab.icon} {navTab.label}
            </button>
          ))}
        </nav>

        <button onClick={logout} className="mt-auto flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10">
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 md:mb-12">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">
              {tab === "applications" ? "Student Admissions" : "General Inquiries"}
            </h1>
            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-widest mt-1">Management Console</p>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="input bg-white border-slate-200 rounded-2xl pl-12 w-full md:w-64" placeholder="Search..." />
            </div>
            <button className="btn btn-circle btn-ghost bg-white border-slate-200"><Bell size={20} /></button>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {[
            { label: "Admissions", val: applications.length, color: "bg-blue-100 text-blue-700", icon: <FileText size={24}/> },
            { label: "Messages", val: messages.length, color: "bg-yellow-100 text-yellow-700", icon: <Clock size={24}/> },
            { label: "Total Records", val: applications.length + messages.length, color: "bg-green-100 text-green-700", icon: <CheckCircle size={24}/> },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-3xl border shadow-sm flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">{s.label}</p>
                <p className="text-2xl md:text-4xl font-black">{s.val}</p>
              </div>
              <div className={`h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-2xl ${s.color}`}>
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        {/* DATA CONTAINER */}
        <div className="bg-white rounded-3xl md:rounded-[3rem] border shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b">
            <h3 className="text-xl font-black">Recent Activity</h3>
          </div>

          {/* TABLE (Desktop) / CARDS (Mobile) */}
          <div className="overflow-x-auto">
            <table className="table w-full hidden md:table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>{tab === "applications" ? "Program" : "Subject"}</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row._id} className="hover:bg-slate-50 transition-colors">
                    <td>
                      <div className="flex gap-3 items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {row.name ? row.name.substring(0, 2).toUpperCase() : "NA"}
                        </div>
                        <span className="font-semibold">{row.name}</span>
                      </div>
                    </td>
                    <td>{row.phone || row.email}</td>
                    <td>{row.program || "General Inquiry"}</td>
                    <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                    <td className="flex gap-2">
                      {tab === "applications" && (
                        <button onClick={() => handleDownload(row._id)} className="btn btn-sm btn-ghost"><Download size={16}/></button>
                      )}
                      <button onClick={() => openModal(row)} className="btn btn-sm btn-square"><ChevronRight size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* MOBILE LIST VIEW */}
            <div className="md:hidden divide-y">
              {data.map((row) => (
                <div key={row._id} className="p-4 flex justify-between items-center" onClick={() => openModal(row)}>
                  <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-xs text-slate-500">{row.program || "General Inquiry"}</p>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL */}
        {modalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-[100] p-4">
            <div className="bg-white p-6 md:p-8 rounded-t-3xl md:rounded-2xl w-full max-w-xl shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-black">{tab === "applications" ? "Application" : "Message"}</h2>
                <button onClick={closeModal} className="btn btn-sm btn-circle"><X size={20}/></button>
              </div>
              
              <div className="space-y-4">
                <div><label className="text-[10px] font-bold uppercase text-slate-400">Name</label><p className="font-semibold">{selectedItem.name}</p></div>
                <div><label className="text-[10px] font-bold uppercase text-slate-400">Contact</label><p className="font-semibold">{selectedItem.email || selectedItem.phone}</p></div>
                <div><label className="text-[10px] font-bold uppercase text-slate-400">Details</label><p className="text-slate-600 leading-relaxed">{selectedItem.message || "No additional message"}</p></div>
              </div>

              <div className="mt-8 flex gap-3">
                {tab === "applications" && (
                  <button onClick={() => handleDownload(selectedItem._id)} className="btn btn-primary flex-1 gap-2">
                    <Download size={18} /> Download
                  </button>
                )}
                <button onClick={closeModal} className="btn flex-1">Close</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
