import { Link } from "wouter";
import UnifiedFooter from "@/components/UnifiedFooter";
import { useAuth } from "@/_core/hooks/useAuth";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { user, loading } = useAuth();

  const features = [
    { title: "Social Feed", desc: "Share highlights, connect with fans" },
    { title: "Messaging", desc: "Direct communication platform" },
    { title: "NIL Deals", desc: "Brand partnerships & sponsorships" },
    { title: "Training", desc: "Personalized workout programs" },
    { title: "Analytics", desc: "Performance tracking & insights" },
    { title: "15+ Sports", desc: "Multi-sport support" },
    { title: "Recruiting", desc: "College connections & commitments" },
    { title: "Store", desc: "Gear, apparel & equipment" },
  ];

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      {/* Dark Blue Gradient Background */}
      <div className="absolute inset-0" 
           style={{
             background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 25%, #0f2847 50%, #0a1e38 75%, #061424 100%)'
           }}>
      </div>

      {/* TOP BAR - THE FUTURE OF ATHLETE SUCCESS */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628] text-center py-2">
        <span className="text-cyan-400 font-bold text-xs tracking-widest">THE FUTURE OF ATHLETE SUCCESS</span>
      </div>

      {/* MAIN HEADER - Light blue gradient */}
      <nav className="fixed top-8 left-0 right-0 z-50 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-b border-blue-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left - ATHLYNX Logo Box */}
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
              <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-8 h-8" />
              <div>
                <p className="text-white font-black text-lg leading-none">ATHLYNX</p>
                <p className="text-blue-200 text-[10px] tracking-wider">THE ATHLETE'S PLAYBOOK</p>
              </div>
            </div>
          </div>

          {/* Center - Parent Company Badge */}
          <div className="hidden md:flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 border border-gray-200">
            <span className="text-gray-500 text-xs">👤</span>
            <span className="text-gray-600 text-xs">PARENT COMPANY:</span>
            <span className="text-blue-600 font-bold text-xs">Dozier Holdings Group</span>
          </div>

          {/* Right - Buttons */}
          <div className="flex items-center gap-2">
            <Link href="/founders">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-1">
                <span>👥</span> Founders
              </button>
            </Link>
            {loading ? (
              <div className="w-24 h-10 bg-slate-200 animate-pulse rounded-lg"></div>
            ) : user ? (
              <Link href="/dashboard">
                <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-4 py-2 rounded-lg text-sm">
                  ○ Dashboard
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-4 py-2 rounded-lg text-sm">
                  ○ Portal Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* YELLOW NOTICE BAR */}
      <div className="fixed top-[104px] left-0 right-0 z-40 bg-yellow-100 text-center py-2 border-b border-yellow-200">
        <span className="text-yellow-800 text-sm">⚠️ SITE UPDATING LIVE DAILY - Please be patient with us while we add future updates and apps!</span>
      </div>

      {/* THE COMPLETE ATHLETE ECOSYSTEM - Light Background Section - MAIN HERO */}
      <div className="bg-gray-200 pt-40 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-blue-500 font-bold text-base sm:text-lg mb-4">
              10 Powerful Apps. One Platform. Unlimited Potential.
            </p>
          </div>

          {/* 10 App Grid - 5x2 */}
          <div className="grid grid-cols-5 gap-4 sm:gap-6 mb-12">
            {/* Row 1 - Flagship Apps */}
            <Link href="/nil-portal">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-blue-500">
                  <img 
                    src="/nil-portal-icon-final.jpeg" 
                    alt="Portal" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">Portal</p>
              </div>
            </Link>

            <Link href="/messages">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-blue-500">
                  <img 
                    src="/messenger-icon-final.jpeg" 
                    alt="Messenger" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-blue-600 text-center">Messenger</p>
              </div>
            </Link>

            <Link href="/diamond-grind">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-blue-500">
                  <img 
                    src="/diamond-grind-app-icon.png" 
                    alt="Diamond Grind" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">Diamond Grind</p>
              </div>
            </Link>

            <Link href="/warriors-playbook">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <img 
                    src="/warriors-playbook-icon.png" 
                    alt="Warriors Playbook" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">Warriors Playbook</p>
              </div>
            </Link>

            <Link href="/transfer-portal">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <img 
                    src="/transfer-portal-app-icon.png" 
                    alt="Transfer Portal" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">Transfer Portal</p>
              </div>
            </Link>

            {/* Row 2 */}
            <Link href="/nil-vault">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <img 
                    src="/nil-vault-app-icon.png" 
                    alt="NIL Vault" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">NIL Vault</p>
              </div>
            </Link>

            <Link href="/ai-sales">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <img 
                    src="/ai-sales-app-icon.png" 
                    alt="AI Sales" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">AI Sales</p>
              </div>
            </Link>

            <Link href="/faith">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <img 
                    src="/faith-app-icon.png" 
                    alt="Faith" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">Faith</p>
              </div>
            </Link>

            <Link href="/ai-recruiter">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <img 
                    src="/ai-recruiter-app-icon.png" 
                    alt="AI Recruiter" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">AI Recruiter</p>
              </div>
            </Link>

            <Link href="/ai-content">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <img 
                    src="/ai-content-app-icon.png" 
                    alt="AI Content" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">AI Content</p>
              </div>
            </Link>
          </div>

          {/* ATHLYNX Branding */}
          <div className="text-center">
            <p className="text-blue-500 font-bold text-sm mb-2">THE FUTURE OF ATHLETE SUCCESS</p>
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mb-2">ATHLYNX</h1>
            <p className="text-slate-600 font-bold text-lg">THE ATHLETE'S PLAYBOOK</p>
          </div>
        </div>
      </div>

      {/* Dark Section - Features */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* All Features Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white">
            ONE APP. EVERYTHING BUILT IN.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-6 text-center hover:scale-105 hover:border-cyan-400 transition-all cursor-pointer"
              >
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/founder-story">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <img src="/images/dhg-crab-shield-new.jpeg" alt="DHG" className="w-12 h-12 rounded-lg mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Founder's Story</h3>
              <p className="text-gray-400 text-sm">The journey from Laurel, Mississippi to building an empire</p>
            </a>
          </Link>

          <Link href="/vip-access">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-2xl">🔑</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">VIP Access</h3>
              <p className="text-gray-400 text-sm">Enter your exclusive VIP code for premium features</p>
            </a>
          </Link>

          <Link href="/founders">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Meet the Founders</h3>
              <p className="text-gray-400 text-sm">The team building the future of athlete success</p>
            </a>
          </Link>
        </div>
      </div>

      <UnifiedFooter />
    </div>
  );
}
