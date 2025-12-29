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
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-teal-400 via-cyan-400 to-blue-600 text-white overflow-x-hidden relative">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative w-full max-w-[640px] mx-auto px-4 py-8 space-y-8">
        
        {/* Party Popper at Top */}
        <div className="flex justify-center animate-bounce">
          <div className="text-8xl">🎉</div>
        </div>

        {/* Parent Company Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-sm border-2 border-orange-400 rounded-full px-6 py-3 shadow-xl">
            <img src="/dhg-crab-shield.jpeg" alt="DHG" className="w-8 h-8 rounded-full" />
            <div className="text-left">
              <p className="text-gray-300 text-xs uppercase tracking-wide">PARENT COMPANY</p>
              <p className="text-orange-400 font-bold text-sm">Dozier Holdings Group</p>
            </div>
          </div>
        </div>

        {/* New ATHLYNX Logo */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-50 animate-pulse"></div>
            <img 
              src="/athlynx-logo-icon.png" 
              alt="ATHLYNX" 
              className="relative w-48 h-48 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* THE FUTURE OF ATHLETE SUCCESS */}
        <div className="text-center">
          <p className="text-cyan-300 text-sm md:text-base uppercase tracking-widest font-semibold">
            THE FUTURE OF ATHLETE SUCCESS
          </p>
        </div>

        {/* ATHLYNX Branding */}
        <div className="text-center space-y-2">
          <h1 className="text-6xl md:text-7xl font-black tracking-wider text-white drop-shadow-lg">
            ATHLYNX
          </h1>
          <p className="text-orange-400 text-xl md:text-2xl font-bold uppercase tracking-widest">
            THE ATHLETE'S PLAYBOOK
          </p>
        </div>

        {/* ONE APP. EVERYTHING BUILT IN. Section */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-cyan-400 rounded-3xl p-8 space-y-6 shadow-2xl">
          <p className="text-center text-cyan-300 text-sm uppercase tracking-widest mb-6 font-bold">
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

          {/* ATHLYNX Title with new logo */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
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
                className="bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border-2 border-cyan-400/50 hover:border-cyan-400 rounded-xl p-4 text-center transition-all hover:scale-105 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <p className="text-white font-semibold text-sm">{feature.label}</p>
              </button>
            ))}
          </div>

          {/* Platform Badges */}
          <div className="flex justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 bg-gray-800/80 border border-cyan-400 rounded-lg px-4 py-2">
              <span className="text-2xl">🍎</span>
              <span className="text-cyan-300 text-sm font-semibold">iOS</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/80 border border-cyan-400 rounded-lg px-4 py-2">
              <span className="text-2xl">🤖</span>
              <span className="text-cyan-300 text-sm font-semibold">Android</span>
            </div>
          </div>
        </div>

        {/* VIP Early Access Section */}
        <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-2 border-orange-500 rounded-3xl p-8 space-y-6 shadow-2xl">
          
          {/* VIP Badge */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 rounded-full px-8 py-4 shadow-xl">
              <p className="text-white font-black text-xl">
                🏆 VIP EARLY ACCESS<br/>
                <span className="text-2xl">6 MONTHS FREE</span>
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="space-y-4">
            <p className="text-center text-gray-400 text-sm uppercase tracking-wide font-semibold">LAUNCHING IN</p>
            <div className="flex justify-center gap-2">
              {[
                { value: timeLeft.days, label: "DAYS" },
                { value: timeLeft.hours, label: "HRS" },
                { value: timeLeft.minutes, label: "MIN" },
                { value: timeLeft.seconds, label: "SEC" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-gradient-to-br from-gray-800 to-black border-2 border-orange-500 rounded-2xl px-3 py-3 min-w-[70px] text-center shadow-lg"
                >
                  <div className="text-orange-400 text-3xl font-black">{String(value).padStart(2, "0")}</div>
                  <div className="text-gray-500 text-xs mt-1 font-semibold">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-cyan-400 text-base font-bold">FEBRUARY 1, 2026</p>
          </div>

          {/* Founding Member Section */}
          <div className="bg-gradient-to-r from-red-900/60 to-orange-900/60 border-2 border-orange-500 rounded-2xl p-5 space-y-3">
            <p className="text-white font-bold text-center">🔥 FOUNDING MEMBER SPOTS</p>
            <p className="text-orange-400 font-black text-2xl text-center">LIMITED TO 10,000</p>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full w-[35%] animate-pulse"></div>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2 font-semibold">
                EMAIL ADDRESS <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-gray-900/80 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2 font-semibold">
                PHONE (OPTIONAL)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (Optional)"
                className="w-full bg-gray-900/80 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2 font-semibold">
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
                        : "bg-gray-900/80 border-2 border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Sport Selection */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2 font-semibold">
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
                        : "bg-gray-900/80 border-2 border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400"
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
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg uppercase tracking-wide py-4 rounded-xl shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all transform"
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
            <div key={feature} className="text-white font-semibold bg-black/30 px-3 py-1 rounded-full">
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
