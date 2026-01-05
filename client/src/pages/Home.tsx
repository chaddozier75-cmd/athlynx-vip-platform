import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { trpc } from "../lib/trpc";
import UnifiedFooter from "@/components/UnifiedFooter";
import { useAuth } from "@/_core/hooks/useAuth";
import LoginButton from "@/components/LoginButton";
import { getLoginUrl } from "@/const";

export default function EarlyAccess() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [sport, setSport] = useState("");
  
  const [authError, setAuthError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Check for OAuth error in URL and show login modal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const message = params.get('message');
    if (error) {
      setAuthError(message || 'Login failed. Please try email login.');
      // Redirect to login on auth error
      window.location.href = getLoginUrl();
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const signupMutation = trpc.vip.signup.useMutation({
    onSuccess: (data) => {
      setLocation(`/success?code=${data.accessCode}`);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  // Set page title for SEO
  useEffect(() => {
    document.title = "ATHLYNX - The Athlete's Playbook | VIP Early Access";
  }, []);

  // Countdown timer to February 1, 2026
  useEffect(() => {
    const targetDate = new Date("2026-02-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      alert("Please select your role");
      return;
    }
    if (!sport) {
      alert("Please select your sport");
      return;
    }

    signupMutation.mutate({
      email,
      phone: phone || undefined,
      role,
      sport,
    });
  };

  const roles = ["Athlete", "Parent", "Coach", "Brand"];
  const sports = ["Baseball", "Football", "Basketball", "Soccer", "Track & Field", "Volleyball"];
  


  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      {/* Dark Blue Gradient Background */}
      <div className="absolute inset-0" 
           style={{
             background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 25%, #0f2847 50%, #0a1e38 75%, #061424 100%)'
           }}>
      </div>

      {/* Subtle blue glow overlay */}
      <div className="absolute inset-0 opacity-40"
           style={{
             background: 'radial-gradient(ellipse at top center, rgba(59, 130, 246, 0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)'
           }}>
      </div>
      
      {/* FIXED NAVIGATION HEADER WITH LOGIN - MOBILE OPTIMIZED */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between">
            <span className="text-cyan-400 font-black text-lg tracking-wider">ATHLYNX</span>
            {loading ? (
              <div className="w-20 h-8 bg-slate-700 animate-pulse rounded-lg"></div>
            ) : user ? (
              <Link href="/dashboard">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-4 py-1.5 rounded-lg text-xs">
                  Dashboard
                </button>
              </Link>
            ) : (
              <LoginButton className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-4 py-1.5 rounded-lg text-xs" />
            )}
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-cyan-400 font-bold text-xs tracking-widest">THE FUTURE OF ATHLETE SUCCESS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 mr-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400 border border-cyan-500/50">DHG</div>
                <div className="text-left">
                  <p className="text-gray-400 text-[10px] uppercase">PARENT COMPANY</p>
                  <p className="text-cyan-400 font-semibold text-xs">Dozier Holdings Group</p>
                </div>
              </div>
              <div className="text-right mr-4">
                <p className="text-white font-black text-2xl">ATHLYNX</p>
                <p className="text-cyan-400 text-xs tracking-wider">THE ATHLETE'S PLAYBOOK</p>
              </div>
              {loading ? (
                <div className="w-24 h-10 bg-slate-700 animate-pulse rounded-lg"></div>
              ) : user ? (
                <Link href="/dashboard">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg shadow-green-500/30 transition-all">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <LoginButton className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative w-full max-w-[640px] mx-auto px-4 pt-16 sm:pt-20 pb-8 space-y-6 sm:space-y-8">
        
        {/* Crab Logo at Top */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-30 animate-pulse"></div>
            <img 
              src="/dhg-crab-shield-logo.jpeg" 
              alt="DHG Crab" 
              className="relative w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Dozier Holdings Group Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-full px-6 py-3 shadow-2xl">
            <div className="text-left">
              <p className="text-gray-400 text-xs uppercase tracking-wide">PARENT COMPANY</p>
              <p className="text-cyan-400 font-bold text-sm">Dozier Holdings Group</p>
            </div>
          </div>
        </div>

      </div>

      {/* THE COMPLETE ATHLETE ECOSYSTEM - White Background Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              THE COMPLETE ATHLETE ECOSYSTEM
            </h2>
            <p className="text-blue-600 font-semibold text-sm sm:text-base">
              10 Powerful Apps. One Platform. Unlimited Potential.
            </p>
          </div>

          {/* 10 App Grid - 5x2 */}
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            {/* Row 1 */}
            <Link href="/nil-portal">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/portal.jpeg" 
                    alt="Portal" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">Portal</p>
              </div>
            </Link>

            <Link href="/messages">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/messenger.jpeg" 
                    alt="Messenger" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">Messenger</p>
              </div>
            </Link>

            <Link href="/diamond-grind">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/diamond-grind.png" 
                    alt="Diamond Grind" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">Diamond Grind</p>
              </div>
            </Link>

            <Link href="/warriors-playbook">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/warriors-playbook.png" 
                    alt="Warriors Playbook" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">Warriors Playbook</p>
              </div>
            </Link>

            <Link href="/transfer-portal">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/transfer-portal.png" 
                    alt="Transfer Portal" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">Transfer Portal</p>
              </div>
            </Link>

            {/* Row 2 */}
            <Link href="/nil-vault">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/nil-vault.png" 
                    alt="NIL Vault" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">NIL Vault</p>
              </div>
            </Link>

            <Link href="/ai-sales">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/ai-sales.png" 
                    alt="AI Sales" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">AI Sales</p>
              </div>
            </Link>

            <Link href="/faith">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/faith.png" 
                    alt="Faith" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">Faith</p>
              </div>
            </Link>

            <Link href="/ai-recruiter">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/ai-recruiter.png" 
                    alt="AI Recruiter" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">AI Recruiter</p>
              </div>
            </Link>

            <Link href="/ai-content">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full aspect-square bg-slate-700 rounded-2xl flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src="/icons/ai-content.png" 
                    alt="AI Content" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">AI Content</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-[640px] mx-auto px-4 pb-8 space-y-6 sm:space-y-8">

        {/* THE FUTURE OF ATHLETE SUCCESS */}
        <div className="text-center">
          <p className="text-cyan-400 text-sm md:text-base uppercase tracking-[0.3em] font-bold drop-shadow-lg">
            THE FUTURE OF ATHLETE SUCCESS
          </p>
        </div>

        {/* ATHLYNX Branding */}
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-white drop-shadow-2xl">
            ATHLYNX
          </h1>
          <h2 className="text-lg sm:text-xl md:text-3xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-400 drop-shadow-lg px-2">
            THE ATHLETE'S PLAYBOOK
          </h2>
          <p className="sr-only">Complete athlete ecosystem for NIL deals, training, recruiting, and professional connections. Join 10,000 founding members.</p>
        </div>



        {/* Countdown Timer */}
        <div className="space-y-4">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest font-bold">LAUNCHING IN</p>
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {[
              { value: timeLeft.days, label: "DAYS" },
              { value: timeLeft.hours, label: "HRS" },
              { value: timeLeft.minutes, label: "MIN" },
              { value: timeLeft.seconds, label: "SEC" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/50 rounded-xl sm:rounded-2xl px-2 sm:px-4 py-2 sm:py-4 min-w-[60px] sm:min-w-[75px] text-center shadow-xl"
              >
                <div className="text-cyan-400 text-2xl sm:text-4xl font-black drop-shadow-lg">{String(value).padStart(2, "0")}</div>
                <div className="text-gray-500 text-[10px] sm:text-xs mt-1 font-bold tracking-wider">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-cyan-400 text-lg font-black tracking-wider drop-shadow-lg">FEBRUARY 1, 2026</p>
        </div>

        {/* Founding Member Section */}
        <div className="bg-gradient-to-r from-red-900/60 to-orange-900/60 backdrop-blur-md border-2 border-red-500/50 rounded-3xl p-6 space-y-4 shadow-2xl">
          <p className="text-white font-black text-center text-xl">FOUNDING MEMBER SPOTS</p>
          <p className="text-red-400 font-black text-3xl text-center drop-shadow-lg">LIMITED TO 10,000</p>
          <div className="w-full bg-slate-900/60 rounded-full h-4 overflow-hidden border border-red-500/50">
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-red-500 h-full w-[35%] animate-pulse shadow-lg"></div>
          </div>
        </div>

        {/* Signup Form - Blue Theme */}
        <div className="bg-slate-900/80 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-widest mb-2 font-bold">
                EMAIL ADDRESS <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={signupMutation.isPending}
                className="w-full bg-slate-800/70 border-2 border-slate-600 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition disabled:opacity-50"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-widest mb-2 font-bold">
                PHONE (OPTIONAL)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (Optional)"
                disabled={signupMutation.isPending}
                className="w-full bg-slate-800/70 border-2 border-slate-600 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition disabled:opacity-50"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-widest mb-2 font-bold">
                I AM A...
              </label>
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    disabled={signupMutation.isPending}
                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all disabled:opacity-50 ${
                      role === r
                        ? "bg-cyan-500 border-2 border-cyan-400 text-white shadow-lg scale-105"
                        : "bg-slate-800/70 border-2 border-slate-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Sport Selection */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-widest mb-2 font-bold">
                PRIMARY SPORT
              </label>
              <div className="flex flex-wrap gap-2">
                {sports.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSport(s)}
                    disabled={signupMutation.isPending}
                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all disabled:opacity-50 ${
                      sport === s
                        ? "bg-cyan-500 border-2 border-cyan-400 text-white shadow-lg scale-105"
                        : "bg-slate-800/70 border-2 border-slate-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button - Blue Theme */}
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-black text-xl uppercase tracking-wider py-5 rounded-full shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signupMutation.isPending ? "PROCESSING..." : "CLAIM MY VIP SPOT"}
            </button>

            {/* No credit card text */}
            <p className="text-center text-gray-400 text-sm">
              No credit card required. By signing up, you agree to receive updates about ATHLYNX.
            </p>
          </form>
        </div>

        {/* Social Proof */}
        <div className="text-center space-y-3">
          <p className="text-gray-400 text-sm">Join athletes from 500+ schools already on the waitlist</p>
          <p className="text-cyan-400 font-bold">
            SEC • ACC • Big Ten • Big 12 • Pac-12
          </p>
        </div>

        {/* Preview the App Link */}
        <div className="text-center">
          <button 
            onClick={() => setLocation('/home')}
            className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 transition-colors"
          >
            Preview the App →
          </button>
        </div>



        {/* Feature Checkmarks - Blue Theme */}
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {[
            "Social Network",
            "NIL Deals",
            "Messaging",
            "Analytics",
            "Compliance"
          ].map((feature) => (
            <div key={feature} className="text-white font-bold bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/40 shadow-lg flex items-center gap-2">
              <span className="text-cyan-400"></span> {feature}
            </div>
          ))}
        </div>

      </div>
      
      {/* Unified Footer */}
      <UnifiedFooter />
      
      {/* Email Login Modal - triggered by OAuth failure or manual click */}

      
      {/* Auth Error Toast */}
      {authError && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
          {authError}
          <button onClick={() => setAuthError(null)} className="ml-4 font-bold">×</button>
        </div>
      )}
    </div>
  );
}
