import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await API.post("/admin/login", { email, password });
      localStorage.setItem("token", data.token);
      // Use navigate instead of window.location for smoother SPA feel
      navigate("/dashboard");
    } catch (error) {
      // Better error feedback than a standard alert
      console.error(error);
      alert(error.response?.data?.message || "Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#fafcfd] overflow-hidden">
      
      {/* --- Left Side: The "Authority" Branding --- */}
      <div className="hidden lg:flex relative bg-primary items-center justify-center p-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 max-w-md text-center">
          <div className="inline-flex h-20 w-20 bg-white/10 backdrop-blur-xl rounded-[2rem] items-center justify-center border border-white/20 mb-8 shadow-2xl">
            <ShieldCheck className="text-accent" size={40} />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-6">
            KGBI <br /> <span className="text-blue-200">Management</span> Portal
          </h1>
          <p className="text-blue-100/70 text-lg font-medium leading-relaxed">
            Secured access for authorized personnel only. Please verify your credentials to continue.
          </p>
        </div>

        {/* Decorative Scripture Footer */}
        <div className="absolute bottom-12 text-white/30 font-serif italic tracking-widest text-sm">
          "Doing all things decently and in order"
        </div>
      </div>

      {/* --- Right Side: The Login Form --- */}
      <div className="flex items-center justify-center p-8 lg:p-24 bg-white relative">
        {/* Mobile Logo (Visible only on small screens) */}
      <div className="lg:hidden absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
  
  <img
    src="/logo.jpg"
    alt="KGBI Logo"
    className="h-10 w-10 object-contain"
  />

  <span className="font-black text-primary tracking-tighter text-xl">
    KGBI ADMIN
  </span>

</div>

        <div className="w-full max-w-sm space-y-10 animate-fade-in-up">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Identify Yourself</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Administrator Email"
                  className="input input-bordered w-full h-[65px] pl-12 rounded-2xl bg-slate-50 border-slate-100 focus:border-primary focus:bg-white transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  placeholder="Secret Password"
                  className="input input-bordered w-full h-[65px] pl-12 rounded-2xl bg-slate-50 border-slate-100 focus:border-primary focus:bg-white transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded-md" />
                <span className="text-sm font-bold text-slate-500 group-hover:text-primary transition-colors">Remember Me</span>
              </label>
              <Link to="/forgot-password" size="sm" className="text-sm font-bold text-primary hover:underline">Lost access?</Link>
            </div>

            <button 
              disabled={isLoading}
              className="btn btn-primary w-full h-[65px] rounded-2xl text-lg font-black tracking-wide shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Enter Dashboard <ArrowRight size={20} />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs font-bold leading-relaxed">
            Unauthorized access attempts are logged and monitored. <br />
            © {new Date().getFullYear()} KGBI Tech Team
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
