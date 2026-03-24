import { useEffect, useState } from "react";
import {
  LogOut,
  Search,
  Download,
  ChevronRight,
  Bell,
  Menu,
  X,
  Inbox,
  FileText,
  Clock,
  CheckCircle,
  ExternalLink,
  Eye,
  Phone,
} from "lucide-react";
import API from "../api/axios";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("applications");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const [appRes, msgRes] = await Promise.all([
        API.get("/applications"),
        API.get("/messages/all"),
      ]);
      setApplications(appRes.data);
      setMessages(msgRes.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    window.location.href = "/login";
  };

  // 🚀 CLOUDINARY LOGIC: Open link in new tab
  const handleViewFile = (url) => {
    if (!url) return alert("No document attached to this application.");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg text-[#002855]"></span>
          <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">
            Loading Console...
          </p>
        </div>
      </div>
    );
  }

  // Filter logic for search
  const rawData = tab === "applications" ? applications : messages;
  const data = rawData.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc] font-sans">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-5 bg-[#0f172a] text-white shadow-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* 🏫 MOBILE LOGO CONTAINER */}
          <div className="h-9 w-9 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg shadow-[#87CEEB]/10">
            <img
              src="/logo.jpg"
              alt="KGBI Logo"
              className="h-full w-full object-contain rounded-sm"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com";
              }}
            />
          </div>

          <div className="flex flex-col">
            <span className="font-black tracking-tighter uppercase text-xs leading-none">
              KGBI <span className="text-[#87CEEB]">Registry</span>
            </span>
            <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-1">
              Admin Console
            </span>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 bg-white/5 border border-white/10 rounded-xl active:scale-95 transition-all"
        >
          {sidebarOpen ? (
            <X size={22} className="text-[#87CEEB]" />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[100] w-72 bg-[#0f172a] text-white p-8 transition-transform duration-500 ease-in-out transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky md:top-0 md:h-screen flex flex-col shadow-2xl
      `}
      >
        <div className="hidden md:flex items-center gap-4 mb-16">
          {/* 🏫 LOGO CONTAINER */}
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-[#87CEEB]/20 p-1 overflow-hidden">
            <img
              src="/logo.jpg"
              alt="KGBI Logo"
              className="h-full w-full object-contain rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com";
              }} // Fallback if image fails
            />
          </div>

          {/* 🏛️ TEXT BRANDING */}
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-xl uppercase italic leading-none text-white">
              KGBI <span className="text-[#87CEEB]">Console</span>
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-1">
              Registry Department
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          {[
            {
              id: "applications",
              label: "Admissions",
              icon: <FileText size={20} />,
            },
            { id: "messages", label: "Inquiries", icon: <Inbox size={20} /> },
          ].map((navTab) => (
            <button
              key={navTab.id}
              onClick={() => {
                setTab(navTab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                tab === navTab.id
                  ? "bg-[#87CEEB] text-[#0f172a] shadow-xl shadow-[#87CEEB]/20 scale-105"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {navTab.icon} {navTab.label}
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-colors group"
        >
          <LogOut
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
              {tab === "applications"
                ? "Student Admissions"
                : "General Inquiries"}
            </h1>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] mt-2 ml-1">
              Kenyatta Grace Bible Institute
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group flex-1 md:flex-initial">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#87CEEB] transition-colors"
                size={18}
              />
              <input
                className="w-full md:w-72 pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#87CEEB]/10 focus:border-[#87CEEB] outline-none font-bold text-slate-600 shadow-sm transition-all"
                placeholder="Filter by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "New Apps",
              val: applications.length,
              color: "bg-blue-50 text-blue-600",
              icon: <FileText size={22} />,
            },
            {
              label: "Queries",
              val: messages.length,
              color: "bg-orange-50 text-orange-600",
              icon: <Inbox size={22} />,
            },
            {
              label: "Capacity",
              val: "92%",
              color: "bg-emerald-50 text-emerald-600",
              icon: <CheckCircle size={22} />,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex justify-between items-center hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group"
            >
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {s.label}
                </p>
                <p className="text-4xl font-black text-slate-800 tracking-tight group-hover:scale-110 transition-transform origin-left">
                  {s.val}
                </p>
              </div>
              <div
                className={`h-16 w-16 flex items-center justify-center rounded-3xl ${s.color} shadow-inner`}
              >
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">
              System Records
            </h3>
            <div className="px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black uppercase text-slate-400 border">
              Live Database
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left hidden md:table">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-8 py-5">Full Name</th>
                  <th className="px-8 py-5">Contact Details</th>
                  <th className="px-8 py-5">
                    {tab === "applications" ? "PathWay" : "Topic"}
                  </th>
                  <th className="px-8 py-5">Date Logged</th>
                  <th className="px-8 py-5 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.map((row) => (
                  <tr
                    key={row._id}
                    className="group hover:bg-slate-50/80 transition-all duration-300"
                  >
                    <td className="px-8 py-6">
                      <div className="flex gap-4 items-center">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-black group-hover:bg-[#0f172a] group-hover:text-[#87CEEB] transition-all">
                          {row.name
                            ? row.name.substring(0, 1).toUpperCase()
                            : "?"}
                        </div>
                        <span className="font-black text-slate-700 tracking-tight">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-500">
                      {row.phone || row.email}
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                          tab === "applications"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {row.program || "Query"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-400">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => openModal(row)}
                        className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-[#0f172a] hover:text-white transition-all shadow-sm"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* MOBILE VIEW */}
            <div className="md:hidden divide-y divide-slate-50 px-4">
              {data.map((row) => (
                <div
                  key={row._id}
                  className="py-6 flex justify-between items-center group"
                  onClick={() => openModal(row)}
                >
                  <div className="flex gap-4 items-center">
                    <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-300">
                      {row.name ? row.name.substring(0, 1).toUpperCase() : "?"}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 tracking-tight">
                        {row.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {row.program || "General Inquiry"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL (DETAILED VIEW) */}
        {modalOpen && selectedItem && (
          <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
            {/* Container with max height and Flex layout */}
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              {/* 1. FIXED HEADER */}
              <div className="bg-[#0f172a] p-6 md:p-8 text-white flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-xl md:text-2xl font-black italic tracking-tighter">
                    {tab === "applications"
                      ? "ADMISSION FILE"
                      : "SYSTEM MESSAGE"}
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#87CEEB] mt-1">
                    Registry Record #{selectedItem._id.slice(-6)}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="h-10 w-10 md:h-12 md:w-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 2. SCROLLABLE MIDDLE CONTENT */}
              <div className="p-6 md:p-10 space-y-6 md:space-y-8 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1 block">
                      Student Name
                    </label>
                    <p className="text-base md:text-xl font-black text-slate-800">
                      {selectedItem.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1 block">
                      Date Logged
                    </label>
                    <p className="text-base md:text-xl font-black text-slate-800">
                      {new Date(selectedItem.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1 block">
                    Contact & Email
                  </label>
                  <p className="text-sm md:text-lg font-bold text-slate-600">
                    {selectedItem.email || "No Email"} •{" "}
                    {selectedItem.phone || "No Phone"}
                  </p>
                </div>

                <div>
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1 block">
                    Message / Notes
                  </label>
                  <div className="p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl text-slate-600 text-sm md:text-base font-medium leading-relaxed italic border border-slate-100">
                    "
                    {selectedItem.message ||
                      "No additional notes provided by the applicant."}
                    "
                  </div>
                </div>

                {/* CLOUDINARY FILE LINK */}
                {selectedItem.documentPath && (
                  <div className="pt-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-300 tracking-widest mb-3 block">
                      Supporting Documents
                    </label>
                    <button
                      onClick={() => handleViewFile(selectedItem.documentPath)}
                      className="w-full flex items-center justify-between p-4 md:p-5 bg-[#87CEEB]/10 border-2 border-dashed border-[#87CEEB]/30 rounded-2xl md:rounded-[2rem] group hover:bg-[#87CEEB] transition-all duration-500"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 md:h-12 md:w-12 bg-[#87CEEB] rounded-xl md:rounded-2xl flex items-center justify-center text-[#0f172a] shadow-lg group-hover:bg-[#0f172a] group-hover:text-white transition-all">
                          <FileText size={20} />
                        </div>
                        <span className="font-black text-[#0f172a] text-[10px] md:text-sm uppercase tracking-widest group-hover:text-white transition-colors">
                          View Certificate
                        </span>
                      </div>
                      <ExternalLink
                        size={18}
                        className="text-[#0f172a] group-hover:text-white transition-all"
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* 3. FIXED FOOTER BUTTONS */}
              <div className="p-6 md:p-10 pt-0 flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0 bg-white">
                <button
                  onClick={closeModal}
                  className="flex-1 py-4 md:py-5 rounded-xl md:rounded-[2rem] font-black uppercase tracking-widest text-[10px] md:text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-100"
                >
                  Dismiss
                </button>

                {selectedItem.phone && (
                  <a
                    href={`tel:${selectedItem.phone}`}
                    className="flex-1 py-4 md:py-5 rounded-xl md:rounded-[2rem] font-black uppercase tracking-widest text-[10px] md:text-xs text-white bg-[#0f172a] flex items-center justify-center gap-2 md:gap-3 hover:scale-[1.02] transition-all shadow-lg shadow-[#0f172a]/10"
                  >
                    <Phone size={14} />
                    <span>Call Student</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
