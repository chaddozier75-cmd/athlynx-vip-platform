import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [sport, setSport] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    console.log({ email, phone, role, sport });
    alert("Thank you! You're on the VIP list!");
  };

  const roles = ["Athlete", "Parent", "Coach", "Brand"];
  const sports = ["Baseball", "Football", "Basketball", "Soccer", "Track & Field", "Volleyball"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628] text-white overflow-x-hidden relative">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative w-full max-w-[640px] mx-auto px-4 py-12 space-y-12">
        
        {/* ATHLYNX Branding */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            ATHLYNX
          </h1>
          <p className="text-yellow-400 text-xl md:text-2xl font-bold uppercase tracking-widest">
            THE ATHLETE'S PLAYBOOK
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            One Platform. Total Control. Unlimited Potential.
          </p>
        </div>

        {/* Welcome Badge */}
        <div className="flex justify-center">
          <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-cyan-400 rounded-full px-6 py-2">
            <p className="text-cyan-300 text-sm uppercase tracking-wider">WELCOME TO THE FUTURE</p>
          </div>
        </div>

        {/* ONE APP. EVERYTHING BUILT IN. Section */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-2 border-gray-700 rounded-3xl p-8 space-y-6 shadow-2xl">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-6">
            ONE APP. EVERYTHING BUILT IN.
          </p>
          
          {/* 3 App Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="/dhg-crab-shield.jpeg" 
                alt="DHG Crab" 
                className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform bg-white/10 p-2"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-white blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="/nil-portal-n-white.jpeg" 
                alt="NIL Portal" 
                className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="/messenger-n-blue.jpeg" 
                alt="Messenger" 
                className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* ATHLYNX Title */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
              ATHLYNX
            </h2>
            <p className="text-cyan-400 text-lg">The Athlete's Playbook</p>
          </div>

          {/* Feature Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "📱", label: "Social Feed" },
              { icon: "💬", label: "Messaging" },
              { icon: "💰", label: "NIL Deals" },
              { icon: "📊", label: "Analytics" },
              { icon: "💪", label: "Training" },
              { icon: "🏆", label: "My Sports" },
            ].map((feature) => (
              <button
                key={feature.label}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 hover:border-cyan-400 rounded-xl p-4 text-center transition-all hover:scale-105 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <p className="text-white font-semibold text-sm">{feature.label}</p>
              </button>
            ))}
          </div>

          {/* Platform Badges */}
          <div className="flex justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
              <span className="text-2xl">🍎</span>
              <span className="text-gray-300 text-sm font-semibold">iOS</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
              <span className="text-2xl">🤖</span>
              <span className="text-gray-300 text-sm font-semibold">Android</span>
            </div>
          </div>
        </div>

        {/* THE COMPLETE ATHLETE ECOSYSTEM */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            <span className="text-white">THE COMPLETE</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-5xl md:text-6xl">ATHLETE</span><br/>
            <span className="text-white">ECOSYSTEM</span>
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
            Three powerful apps. One revolutionary platform. Manage NIL deals, training data, professional connections, and private messaging—all in one place.
          </p>
        </div>

        {/* VIP Early Access Section */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-yellow-500 rounded-3xl p-8 space-y-6 shadow-2xl">
          
          {/* VIP Badge */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-8 py-4 shadow-xl">
              <p className="text-black font-black text-xl">
                🏆 VIP EARLY ACCESS<br/>
                <span className="text-2xl">6 MONTHS FREE</span>
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="space-y-4">
            <p className="text-center text-gray-400 text-sm uppercase tracking-wide">LAUNCHING IN</p>
            <div className="flex justify-center gap-3">
              {[
                { value: timeLeft.days, label: "DAYS" },
                { value: timeLeft.hours, label: "HRS" },
                { value: timeLeft.minutes, label: "MIN" },
                { value: timeLeft.seconds, label: "SEC" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-400 rounded-xl px-4 py-3 min-w-[70px] text-center"
                >
                  <div className="text-cyan-400 text-3xl font-bold">{String(value).padStart(2, "0")}</div>
                  <div className="text-gray-500 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-cyan-400 text-base font-semibold">FEBRUARY 1, 2026</p>
          </div>

          {/* Founding Member Section */}
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-2 border-red-500 rounded-2xl p-5 space-y-3">
            <p className="text-white font-bold text-center">🔥 FOUNDING MEMBER SPOTS</p>
            <p className="text-red-400 font-black text-2xl text-center">LIMITED TO 10,000</p>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full w-[35%] animate-pulse"></div>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2">
                EMAIL ADDRESS <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2">
                PHONE (OPTIONAL)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (Optional)"
                className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2">
                I AM A
              </label>
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      role === r
                        ? "bg-cyan-400 border-2 border-cyan-400 text-black"
                        : "bg-gray-900 border-2 border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Sport Selection */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2">
                MY SPORT
              </label>
              <div className="flex flex-wrap gap-2">
                {sports.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSport(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      sport === s
                        ? "bg-cyan-400 border-2 border-cyan-400 text-black"
                        : "bg-gray-900 border-2 border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-lg uppercase tracking-wide py-4 rounded-xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all transform"
            >
              🏆 CLAIM MY VIP SPOT
            </button>
          </form>

          {/* Preview Link */}
          <div className="text-center">
            <Link href="/home">
              <a className="inline-block text-cyan-400 hover:text-cyan-300 hover:underline text-sm font-semibold">
                Preview the App →
              </a>
            </Link>
          </div>
        </div>

        {/* Feature Checkmarks */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {[
            "✅ Social Network",
            "✅ NIL Deals",
            "✅ Messaging",
            "✅ Analytics",
            "✅ Compliance"
          ].map((feature) => (
            <div key={feature} className="text-gray-400 font-medium">
              {feature}
            </div>
          ))}
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
