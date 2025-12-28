import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to February 1, 2026
  useEffect(() => {
    const targetDate = new Date("2026-02-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const roles = ["Athlete", "Parent", "Coach", "Brand"];
  const sports = ["Baseball", "Football", "Basketball"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log({ email, phone, role: selectedRole, sports: selectedSports });
    alert("Thank you for signing up! We'll be in touch soon.");
  };

  const toggleSport = (sport: string) => {
    setSelectedSports(prev =>
      prev.includes(sport)
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* App Icons */}
      <div className="container pt-12 flex justify-center gap-4">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
          <span className="text-3xl font-bold text-blue-600">M</span>
        </div>
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl">
          <span className="text-3xl">⚡</span>
        </div>
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
          <span className="text-3xl font-bold text-slate-800">N</span>
        </div>
      </div>

      {/* Header */}
      <div className="container text-center py-8 space-y-2">
        <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
          The Future of Athlete Success
        </p>
        <h1 className="text-6xl font-bold tracking-tight">ATHLYNX</h1>
        <p className="text-cyan-400 text-lg tracking-wide">THE ATHLETE'S PLAYBOOK</p>
      </div>

      {/* VIP Badge */}
      <div className="container flex justify-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-full shadow-2xl">
          <p className="text-white font-bold text-lg">
            🏆 VIP EARLY ACCESS<br />
            <span className="text-sm font-normal">6 MONTHS FREE</span>
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="container text-center mb-8">
        <p className="text-cyan-400 text-sm font-medium mb-4 tracking-wider uppercase">
          Launching In
        </p>
        <div className="flex justify-center gap-4">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HRS", value: timeLeft.hours },
            { label: "MIN", value: timeLeft.minutes },
            { label: "SEC", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-slate-800/50 backdrop-blur border border-cyan-500/30 rounded-xl px-6 py-4 min-w-[100px]"
            >
              <div className="text-4xl font-bold text-cyan-400">{item.value.toString().padStart(2, "0")}</div>
              <div className="text-xs text-slate-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-slate-300 mt-4 text-lg">FEBRUARY 1, 2026</p>
      </div>

      {/* Founding Member Spots */}
      <div className="container max-w-2xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-2xl p-6 text-center">
          <p className="text-orange-400 font-bold text-lg mb-2">
            🔥 FOUNDING MEMBER SPOTS
          </p>
          <p className="text-red-400 font-bold text-2xl mb-3">LIMITED TO 10,000</p>
          <div className="bg-slate-800/50 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full w-[27%]"></div>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="container max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-cyan-400">
              EMAIL ADDRESS *
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-slate-500 h-12"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-400">
              PHONE (OPTIONAL)
            </label>
            <Input
              type="tel"
              placeholder="Phone (Optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-3 text-cyan-400">
              I AM A...
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedRole === role
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-cyan-500/50"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Sport Selection */}
          <div>
            <label className="block text-sm font-medium mb-3 text-cyan-400">
              SPORT(S)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {sports.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => toggleSport(sport)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedSports.includes(sport)
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-cyan-500/50"
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg h-14 shadow-xl shadow-cyan-500/30"
          >
            🏆 CLAIM MY VIP SPOT
          </Button>
        </form>

        {/* Preview Link */}
        <div className="text-center mt-8">
          <Link href="/home">
            <a className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2 transition-colors">
              Preview the App →
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
