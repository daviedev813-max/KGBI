import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  GraduationCap,
  Users,
  Shield,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Church,
  X,
  Phone,
  Mail,
} from "lucide-react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // 🔥 Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Lock body scroll (CLEAN WAY)
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  // 🔥 Close menu when route changes (REAL FIX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);
  // 🔥 Toggle menu (SAFE)
  const toggleMobileMenu = (e) => {
    if (e) {
      e.stopPropagation(); // prevent instant close
    }
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500">
      {/* 🏛️ TOP BAR */}
      <div
        className={`bg-primary text-white transition-all duration-700 overflow-hidden ${
          isScrolled ? "h-0 opacity-0" : "h-10 md:h-12 opacity-100 py-2"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6 text-[11px] md:text-xs font-bold">
            <a
              href="tel:+254721885799"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone size={14} />{" "}
              <span className="hidden sm:inline">Call us:</span> +254 721 885
              799
            </a>
            <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
            <a
              href="mailto:kbgi@email.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail size={14} /> kenyagracebibleinstitute@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block font-black animate-pulse text-yellow-400 text-[10px] uppercase tracking-widest">
              📍 2026 Intake Ongoing
            </div>
            <div className="flex gap-3 text-white/80">
              <Facebook size={15} className="hover:text-white cursor-pointer" />
              <Instagram
                size={15}
                className="hover:text-white cursor-pointer"
              />
              <Youtube size={15} className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 MAIN NAV */}
      <div
        className={`container mx-auto px-4 md:px-8 transition-all duration-500 ${isScrolled ? "mt-2" : "mt-4"}`}
      >
        <div
          className={`flex items-center justify-between border border-white/20 transition-all duration-500 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md rounded-full shadow-xl py-2 px-6"
              : "bg-white rounded-[3rem] shadow-2xl py-4 px-8"
          }`}
        >
          {/* LOGO */}
          {/* 🏛️ OFFICIAL LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group py-1">
            <div className="h-12 md:h-14 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.jpg" // Ensure this matches your filename in the 'public' folder
                alt="Kenya Grace Bible Institute Logo"
                className="h-full w-auto object-contain"
              />
            </div>

            {/* 🏛️ PREMIUM BRANDING SECTION */}
            <div className=" sm:flex flex-col border-l-[1.5px] border-slate-200 pl-4 py-1 justify-center">
              {/* The Main Name: Using Tracking-tighter and a subtle gradient */}
              <h1 className="font-black text-primary text-xl leading-none tracking-tighter flex items-center gap-1">
                KGBI
                {/* A small decorative dot in your secondary blue to show the site is "Live" */}
                <span className="h-1 w-1 rounded-full bg-secondary animate-pulse"></span>
              </h1>

              {/* The Campus Name: Styled like a high-end stamp or seal */}
              <div className="flex items-center gap-2 mt-1.5">
                {/* A tiny gold divider line */}
                <div className="h-[2px] w-3 bg-accent rounded-full"></div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none">
                  Thika <span className="text-accent">Campus</span>
                </p>
              </div>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-full">
              <NavLink to="/" active={isActive("/")}>
                Home
              </NavLink>
              <NavLink to="/about" active={isActive("/about")}>
                About
              </NavLink>

              {/* PROGRAMS DROPDOWN */}
              <li className="group relative">
                <button className="px-5 py-2 rounded-full font-bold text-sm flex items-center gap-1 hover:bg-white transition-all">
                  Programs{" "}
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="w-[750px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] p-8 grid grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                        <Church size={14} /> Theology
                      </div>
                      <div className="grid gap-1">
                        <MegaLink
                          to="/programs/diploma"
                          title="Diploma in Theology"
                          desc="Deep biblical foundation"
                        />
                        <MegaLink
                          to="/programs/cert"
                          title="Certificate in Theology"
                          desc="1-year foundational course"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                        <Users size={14} /> Leadership
                      </div>
                      <div className="grid gap-1">
                        <MegaLink
                          to="/programs/leadership"
                          title="Christian Leadership"
                          desc="Equipping future pastors"
                        />
                        <MegaLink
                          to="/programs/missions"
                          title="Missions & Outreach"
                          desc="Spreading the Gospel"
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100">
                      <p className="text-[10px] font-black uppercase text-secondary mb-3">
                        Highlights
                      </p>
                      <Link
                        to="/programs"
                        className="block p-4 bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-primary transition-all group/card"
                      >
                        <p className="font-bold text-sm text-primary">
                          Short Courses
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1">
                          3-month intensive spiritual growth programs.
                        </p>
                        <div className="mt-3 text-primary text-[10px] font-black flex items-center gap-1">
                          VIEW ALL <ArrowRight size={10} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              <NavLink to="/gallery" active={isActive("/gallery")}>
                Gallery
              </NavLink>
              <NavLink to="/news" active={isActive("/news")}>
                News
              </NavLink>
              <NavLink to="/contact" active={isActive("/contact")}>
                Contact
              </NavLink>
              <NavLink
                to="/admissions"
                active={isActive("/admissions")}
                isApply
              >
                Apply Now
              </NavLink>
            </ul>
          </div>

          {/* PORTALS & MOBILE TOGGLE */}
          <div className="flex items-center gap-2">
            <div className="group relative hidden xl:block">
              <button className="flex items-center gap-1 font-bold text-sm px-5 py-2 hover:bg-gray-100 rounded-full transition-colors">
                Portals{" "}
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
              </button>
              <div className="absolute right-0 top-full pt-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300">
                <div className="w-64 bg-white border border-gray-100 shadow-2xl rounded-[2rem] p-3 flex flex-col gap-1">
                  <PortalItem
                    to="/portal/student"
                    icon={<GraduationCap size={18} />}
                    title="Student Portal"
                    desc="Academic Resources"
                    color="bg-blue-50 text-blue-600"
                  />
                  <PortalItem
                    to="/portal/staff"
                    icon={<Users size={18} />}
                    title="Staff Portal"
                    desc="Faculty Management"
                    color="bg-primary/10 text-primary"
                  />
                  <PortalItem
                    to="/admin"
                    icon={<Shield size={18} />}
                    title="Admin Center"
                    desc="System Control"
                    color="bg-red-50 text-red-600"
                  />
                </div>
              </div>
            </div>

            <button
              className="lg:hidden h-11 w-11 flex items-center justify-center rounded-full bg-gray-100 text-primary hover:bg-primary hover:text-white transition-all"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeMenu();
              }
            }}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl p-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) {
                  closeMenu(); // 👉 swipe right to close
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.jpg"
                    alt="KGBI Logo"
                    className="h-8 w-8 object-contain bg-white p-[2px] rounded-lg shadow-sm"
                  />

                  <div className="font-black text-xl text-primary tracking-tighter">
                    KGBI
                  </div>
                </div>

                <button
                  onClick={closeMenu}
                  className="p-2 bg-gray-50 text-slate-400 hover:text-primary rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* NAV LINKS */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2">
                  <MobileNavLink
                    to="/"
                    onClick={closeMenu}
                    active={isActive("/")}
                  >
                    Home
                  </MobileNavLink>
                  <MobileNavLink
                    to="/about"
                    onClick={closeMenu}
                    active={isActive("/about")}
                  >
                    About
                  </MobileNavLink>
                  <MobileNavLink
                    to="/programs"
                    onClick={closeMenu}
                    active={isActive("/programs")}
                  >
                    Programs
                  </MobileNavLink>
                  <MobileNavLink
                    to="/gallery"
                    onClick={closeMenu}
                    active={isActive("/gallery")}
                  >
                    Gallery
                  </MobileNavLink>
                  <MobileNavLink
                    to="/contact"
                    onClick={closeMenu}
                    active={isActive("/contact")}
                  >
                    Contact
                  </MobileNavLink>
                  <MobileNavLink
                    to="/news"
                    onClick={closeMenu}
                    active={isActive("/news")}
                  >
                    News
                  </MobileNavLink>
                </div>

                <div className="h-px bg-slate-100 my-4 mx-4"></div>

                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-2">
                  Portals
                </p>

                <MobileNavLink
                  to="/portal/student"
                  onClick={closeMenu}
                  active={isActive("/portal/student")}
                >
                  🎓 Student Access
                </MobileNavLink>

                <MobileNavLink
                  to="/portal/staff"
                  onClick={closeMenu}
                  active={isActive("/portal/staff")}
                >
                  👨‍🏫 Staff Access
                </MobileNavLink>

                <MobileNavLink
                  to="/admin"
                  onClick={closeMenu}
                  active={isActive("/admin")}
                >
                  🔐 Admin Control
                </MobileNavLink>

                {/* CTA */}
                <Link
                  to="/admissions"
                  onClick={closeMenu}
                  className="mt-8 w-full py-4 rounded-2xl bg-primary text-white text-center font-black shadow-xl hover:bg-secondary transition active:scale-95"
                >
                  APPLY FOR 2026
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// 🧩 SUB-COMPONENTS
const NavLink = ({ to, active, children, isApply }) => (
  <li>
    <Link
      to={to}
      className={`px-5 py-2 rounded-full font-bold text-sm transition-all flex items-center ${
        isApply
          ? "bg-primary text-white hover:bg-primary/90 hover:scale-105 ml-2"
          : active
            ? "bg-white text-primary shadow-sm"
            : "text-gray-600 hover:text-primary hover:bg-white/50"
      }`}
    >
      {children}
    </Link>
  </li>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="w-full px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group"
  >
    <span>{children}</span>
    <ArrowRight
      size={16}
      className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
    />
  </Link>
);

const MegaLink = ({ to, title, desc }) => (
  <Link
    to={to}
    className="p-3 rounded-2xl hover:bg-gray-50 transition-all group block"
  >
    <p className="font-bold text-sm text-gray-800 group-hover:text-primary">
      {title}
    </p>
    <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{desc}</p>
  </Link>
);

const PortalItem = ({ to, icon, title, desc, color }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
  >
    <div
      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="font-bold text-[13px] text-gray-800 leading-none">
        {title}
      </p>
      <p className="text-[10px] text-gray-400 mt-1">{desc}</p>
    </div>
  </Link>
);

export default Navbar;
