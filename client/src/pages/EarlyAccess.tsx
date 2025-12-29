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
    // TODO: Connect to database
    console.log({ email, phone, role, sport });
    alert("Thank you! You're on the VIP list!");
  };

  const roles = ["Athlete", "Parent", "Coach", "Brand"];
  const sports = ["Baseball", "Football", "Basketball", "Soccer", "Track & Field", "Volleyball"];

  return (
    <div className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-[640px] mx-auto text-center space-y-8">
        
        {/* App Icons */}
        <div className="flex justify-center gap-4 pt-8">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg overflow-hidden">
            <img src="/messenger-icon-2.png" alt="Messenger" className="w-full h-full object-cover" />
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl shadow-lg flex items-center justify-center">
            <img src="/diamond-grind-icon-3.png" alt="Diamond Grind" className="w-full h-full object-cover" />
          </div>
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg overflow-hidden">
            <img src="/nil-portal-icon.png" alt="NIL Portal" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <p className="text-[#00D9FF] text-sm font-medium tracking-[0.2em] uppercase">
            THE FUTURE OF ATHLETE SUCCESS
          </p>
          <h1 className="text-7xl md:text-8xl font-bold tracking-wide">
            ATHLYNX
          </h1>
          <p className="text-[#00D9FF] text-xl font-medium">
            THE ATHLETE'S PLAYBOOK
          </p>
        </div>

        {/* VIP Badge */}
        <div className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full px-12 py-5 shadow-lg">
          <p className="text-white font-bold text-lg">
            🏆 VIP EARLY ACCESS<br />
            <span className="text-2xl">6 MONTHS FREE</span>
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="space-y-4">
          <p className="text-gray-400 text-sm uppercase tracking-wide">LAUNCHING IN</p>
          <div className="flex justify-center gap-3">
            {[
              { value: timeLeft.days, label: "DAYS" },
              { value: timeLeft.hours, label: "HRS" },
              { value: timeLeft.minutes, label: "MIN" },
              { value: timeLeft.seconds, label: "SEC" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-[rgba(30,58,138,0.5)] border border-[#3B82F6] rounded-xl px-6 py-4 min-w-[80px]"
              >
                <div className="text-[#00D9FF] text-4xl font-bold">{String(value).padStart(2, "0")}</div>
                <div className="text-gray-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-300 text-base mt-4">FEBRUARY 1, 2026</p>
        </div>

        {/* Founding Member Section */}
        <div className="bg-[rgba(15,23,42,0.6)] border border-[#334155] rounded-2xl p-6 space-y-3">
          <p className="text-white font-semibold">🔥 FOUNDING MEMBER SPOTS</p>
          <p className="text-[#FF6B6B] font-bold text-xl">LIMITED TO 10,000</p>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] h-full w-[35%]"></div>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Email */}
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2">
              EMAIL ADDRESS <span className="text-[#FF6B6B]">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[rgba(15,23,42,0.8)] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/20 outline-none transition"
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
              className="w-full bg-[rgba(15,23,42,0.8)] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/20 outline-none transition"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2">
              I AM A
            </label>
            <div className="flex flex-wrap gap-3">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                    role === r
                      ? "bg-[#00D9FF] border-2 border-[#00D9FF] text-[#0A1628]"
                      : "bg-transparent border-2 border-[#334155] text-gray-400 hover:border-[#00D9FF] hover:text-[#00D9FF]"
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
            <div className="flex flex-wrap gap-3">
              {sports.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSport(s)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                    sport === s
                      ? "bg-[#00D9FF] border-2 border-[#00D9FF] text-[#0A1628]"
                      : "bg-transparent border-2 border-[#334155] text-gray-400 hover:border-[#00D9FF] hover:text-[#00D9FF]"
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
            id="submitBtn"
            className="w-full bg-gradient-to-r from-[#FCD34D] to-[#F59E0B] text-black font-bold text-lg uppercase tracking-wide py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition transform"
          >
            🏆 CLAIM MY VIP SPOT
          </button>
        </form>

        {/* Preview Link */}
        <Link href="/home">
          <a className="inline-block text-[#00D9FF] hover:underline text-sm">
            Preview the App →
          </a>
        </Link>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
