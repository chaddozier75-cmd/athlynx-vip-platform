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
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 via-teal-400 to-blue-600 text-white overflow-x-hidden">
      <div className="w-full max-w-[640px] mx-auto px-4 py-12 space-y-12">
        
        {/* Parent Company Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-sm border-2 border-yellow-400 rounded-full px-6 py-3">
            <img src="/dhg-crab-shield.jpeg" alt="DHG" className="w-8 h-8 rounded-full" />
            <div className="text-left">
              <p className="text-gray-300 text-xs uppercase tracking-wide">PARENT COMPANY</p>
              <p className="text-yellow-400 font-bold text-sm">Dozier Holdings Group</p>
            </div>
          </div>
        </div>

        {/* DHG Crab Logo - Large at Top */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-50 animate-pulse"></div>
            <img 
              src="/dhg-crab-shield.jpeg" 
              alt="Dozier Holdings Group" 
              className="relative w-40 h-40 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* 3 App Icons Row */}
        <div className="flex justify-center gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <img 
              src="/nil-portal-n-white.jpeg" 
              alt="NIL Portal" 
              className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <img 
              src="/messenger-n-blue.jpeg" 
              alt="Messenger" 
              className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <img 
              src="/diamond-grind-geometric.png" 
              alt="Diamond Grind" 
              className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
            />
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <div className="inline-block bg-black/30 backdrop-blur-sm border border-cyan-400 rounded-full px-6 py-2">
            <p className="text-cyan-300 text-sm uppercase tracking-wider">WELCOME TO THE FUTURE</p>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            <span className="text-white">THE</span><br/>
            <span className="text-white">COMPLETE</span><br/>
            <span className="text-cyan-300 text-6xl md:text-8xl">ATHLETE</span><br/>
            <span className="text-white">ECOSYSTEM</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-md mx-auto">
            Three powerful apps. One revolutionary platform. Social, messaging, NIL deals, training, analytics - all unified.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "📱", label: "Social Feed", color: "from-pink-500 to-red-500" },
            { icon: "💬", label: "Messaging", color: "from-blue-500 to-cyan-500" },
            { icon: "💰", label: "NIL Deals", color: "from-green-500 to-emerald-500" },
            { icon: "💪", label: "Training", color: "from-orange-500 to-yellow-500" },
            { icon: "📊", label: "Analytics", color: "from-purple-500 to-pink-500" },
            { icon: "🏆", label: "15+ Sports", color: "from-yellow-500 to-orange-500" },
          ].map((feature) => (
            <div
              key={feature.label}
              className={`bg-gradient-to-br ${feature.color} bg-opacity-20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-center hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-4xl mb-2">{feature.icon}</div>
              <p className="text-white font-bold text-sm">{feature.label}</p>
            </div>
          ))}
        </div>

        {/* VIP Early Access Section */}
        <div className="bg-black/40 backdrop-blur-md border-2 border-yellow-400 rounded-3xl p-8 space-y-6 shadow-2xl">
          
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
            <p className="text-center text-gray-300 text-sm uppercase tracking-wide">LAUNCHING IN</p>
            <div className="flex justify-center gap-3">
              {[
                { value: timeLeft.days, label: "DAYS" },
                { value: timeLeft.hours, label: "HRS" },
                { value: timeLeft.minutes, label: "MIN" },
                { value: timeLeft.seconds, label: "SEC" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-black/60 border-2 border-yellow-400 rounded-xl px-4 py-3 min-w-[70px] text-center"
                >
                  <div className="text-yellow-400 text-3xl font-bold">{String(value).padStart(2, "0")}</div>
                  <div className="text-gray-400 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-cyan-300 text-base font-semibold">FEBRUARY 1, 2026</p>
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
              <label className="block text-gray-300 text-xs uppercase tracking-wide mb-2">
                EMAIL ADDRESS <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-black/60 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-wide mb-2">
                PHONE (OPTIONAL)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (Optional)"
                className="w-full bg-black/60 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-wide mb-2">
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
                        : "bg-black/60 border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Sport Selection */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-wide mb-2">
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
                        : "bg-black/60 border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
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
              <a className="inline-block text-cyan-300 hover:text-cyan-100 hover:underline text-sm font-semibold">
                Preview the App →
              </a>
            </Link>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
