import { useState } from "react";
import { Link } from "wouter";

export default function DiamondGrind() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: "🏠" },
    { id: "players", name: "Players", icon: "⚾" },
    { id: "rankings", name: "Rankings", icon: "📊" },
    { id: "tournaments", name: "Tournaments", icon: "🏆" },
    { id: "training", name: "Training", icon: "💪" },
    { id: "recruiting", name: "Recruiting", icon: "🎓" },
  ];

  const topPlayers = [
    { rank: 1, name: "Marcus Johnson", position: "RHP", gradYear: 2026, state: "TX", commitment: "Texas", rating: 98, velocity: "97 mph" },
    { rank: 2, name: "Jake Williams", position: "SS", gradYear: 2026, state: "CA", commitment: "UCLA", rating: 97, velocity: "—" },
    { rank: 3, name: "Tyler Smith", position: "OF", gradYear: 2026, state: "FL", commitment: "Florida", rating: 96, velocity: "—" },
    { rank: 4, name: "Chris Davis", position: "C", gradYear: 2026, state: "GA", commitment: "Georgia", rating: 95, velocity: "—" },
    { rank: 5, name: "Ryan Martinez", position: "RHP", gradYear: 2027, state: "AZ", commitment: "Uncommitted", rating: 95, velocity: "94 mph" },
  ];

  const tournaments = [
    { name: "Diamond Grind World Series", dates: "July 15-22, 2026", location: "Jupiter, FL", teams: 64, prize: "$50,000", status: "Registration Open" },
    { name: "Elite Showcase Championship", dates: "June 1-5, 2026", location: "Phoenix, AZ", teams: 32, prize: "$25,000", status: "Registration Open" },
    { name: "National Invitational", dates: "May 20-25, 2026", location: "Dallas, TX", teams: 48, prize: "$30,000", status: "Coming Soon" },
    { name: "Prospect Combine", dates: "April 10-12, 2026", location: "Atlanta, GA", teams: 200, prize: "Exposure", status: "Registration Open" },
  ];

  const trainingPrograms = [
    { name: "Velocity Program", duration: "12 weeks", focus: "Pitching", level: "Advanced", price: "Elite" },
    { name: "Hitting Mechanics", duration: "8 weeks", focus: "Batting", level: "All Levels", price: "Pro" },
    { name: "Defensive Excellence", duration: "6 weeks", focus: "Fielding", level: "Intermediate", price: "Pro" },
    { name: "Speed & Agility", duration: "8 weeks", focus: "Athletic", level: "All Levels", price: "Free" },
  ];

  const stats = [
    { label: "Players", value: "125,000+", icon: "⚾" },
    { label: "Scouts", value: "2,500+", icon: "👀" },
    { label: "Commitments", value: "8,500+", icon: "🎓" },
    { label: "Tournaments", value: "500+", icon: "🏆" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0a1628]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-xl border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white text-xl">💎</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-white">DIAMOND GRIND</h1>
              <p className="text-[10px] text-blue-400 -mt-1">POWERED BY ATHLYNX</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            ← ATHLYNX
          </Link>
        </div>
      </header>

      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10 pt-6">
            <div className="inline-block mb-4">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-5xl">💎</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-2">
              <span className="text-blue-400">DIAMOND</span> <span className="text-white">GRIND</span>
            </h1>
            <p className="text-blue-400 text-lg tracking-widest mb-4">ELITE BASEBALL PLATFORM</p>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              The #1 baseball platform for rankings, recruiting, tournaments, and AI-powered training
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-blue-500/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-4 text-center">
                <span className="text-3xl block mb-2">{stat.icon}</span>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-blue-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* AI Bot Banner */}
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30 p-6 mb-10">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-5xl">🤖</span>
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-xl font-bold text-white mb-1">Your Personal AI Baseball Coach</h3>
                <p className="text-gray-400">Get custom training plans, video analysis, recruiting emails, and real-time coaching insights</p>
              </div>
              <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all">
                Activate AI Coach
              </button>
            </div>
          </div>

          {/* Top Rankings */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Top <span className="text-blue-400">Rankings</span>
              </h2>
              <button className="text-blue-400 text-sm hover:underline">View All Rankings →</button>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Rank</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Player</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold hidden md:table-cell">Position</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold hidden md:table-cell">Class</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold hidden lg:table-cell">State</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Commitment</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player) => (
                    <tr key={player.rank} className="border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                      <td className="p-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          player.rank === 1 ? 'bg-yellow-500 text-black' :
                          player.rank === 2 ? 'bg-gray-400 text-black' :
                          player.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-white/10 text-white'
                        }`}>
                          {player.rank}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-white font-semibold">{player.name}</p>
                        {player.velocity !== "—" && (
                          <p className="text-blue-400 text-xs">{player.velocity}</p>
                        )}
                      </td>
                      <td className="p-4 text-gray-400 hidden md:table-cell">{player.position}</td>
                      <td className="p-4 text-gray-400 hidden md:table-cell">{player.gradYear}</td>
                      <td className="p-4 text-gray-400 hidden lg:table-cell">{player.state}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          player.commitment === "Uncommitted" 
                            ? "bg-gray-500/20 text-gray-400" 
                            : "bg-green-500/20 text-green-400"
                        }`}>
                          {player.commitment}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-blue-400 font-bold">{player.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tournaments */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Upcoming <span className="text-blue-400">Tournaments</span>
              </h2>
              <button className="text-blue-400 text-sm hover:underline">View All Events →</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tournaments.map((tournament, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{tournament.name}</h3>
                      <p className="text-gray-500 text-sm">{tournament.location}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      tournament.status === "Registration Open" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {tournament.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <span>📅 {tournament.dates}</span>
                    <span>👥 {tournament.teams} teams</span>
                    <span>💰 {tournament.prize}</span>
                  </div>
                  <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all text-sm">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Training Programs */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Training <span className="text-blue-400">Programs</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainingPrograms.map((program, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-blue-500/50 transition-all"
                >
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    program.price === "Free" ? "bg-green-500/20 text-green-400" :
                    program.price === "Pro" ? "bg-blue-500/20 text-blue-400" :
                    "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {program.price}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-1">{program.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{program.focus} • {program.level}</p>
                  <p className="text-blue-400 text-sm mb-4">⏱️ {program.duration}</p>
                  <button className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm">
                    Start Program
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: "📊", title: "Live Stats", desc: "Real-time pitch-by-pitch tracking" },
              { icon: "🎥", title: "Video Analysis", desc: "AI-powered swing & pitching analysis" },
              { icon: "🎓", title: "Recruiting", desc: "Connect with 2,500+ college scouts" },
              { icon: "💰", title: "NIL Deals", desc: "Baseball-specific brand partnerships" },
              { icon: "🤖", title: "AI Coach", desc: "Personal AI training assistant" },
              { icon: "📱", title: "Mobile App", desc: "iOS & Android apps coming soon" },
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center">
                <span className="text-4xl block mb-3">{feature.icon}</span>
                <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Grind? 💎</h3>
            <p className="text-white/80 mb-6">Join 125,000+ baseball players on Diamond Grind</p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
                Create Profile
              </button>
              <Link href="/pricing" className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a1628] border-t border-blue-500/10 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2025 Diamond Grind. A Dozier Holdings Group Company.</p>
          <p className="text-blue-400 text-xs mt-1">Powered by ATHLYNX</p>
        </div>
      </footer>
    </div>
  );
}
