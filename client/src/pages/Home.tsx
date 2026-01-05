import { Link } from "wouter";
import UnifiedFooter from "@/components/UnifiedFooter";
import { useAuth } from "@/_core/hooks/useAuth";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { user, loading } = useAuth();
  const apps = [
    {
      name: "NIL Portal",
      icon: "/images/nil-portal-icon.jpeg",
      description: "Manage deals, training data, and professional connections",
      link: "/nil-portal",
    },
    {
      name: "Diamond Grind",
      icon: "/images/diamond-grind-icon.png",
      description: "Training programs, analytics, and performance tracking",
      link: "/diamond-grind",
    },
    {
      name: "NIL Messenger",
      icon: "/images/nil-messenger-icon.jpeg",
      description: "Real-time communication with coaches, scouts, and teammates",
      link: "/messenger",
    },
  ];

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
      {/* Dark Blue Gradient Background - Same as VIP page */}
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

      {/* CYAN BANNER - LIVE PLATFORM */}
      <div className="fixed top-[104px] left-0 right-0 z-40 bg-cyan-500 text-center py-2">
        <span className="text-white font-semibold text-sm">○ LIVE PLATFORM • HIPAA-compliant • Protecting our precious cargo</span>
      </div>

      {/* YELLOW NOTICE BAR */}
      <div className="fixed top-[136px] left-0 right-0 z-40 bg-yellow-100 text-center py-2 border-b border-yellow-200">
        <span className="text-yellow-800 text-sm">⚠️ SITE UPDATING LIVE DAILY - Please be patient with us while we add future updates and apps!</span>
      </div>

      <div className="relative w-full max-w-[900px] mx-auto px-4 pt-48 pb-12 space-y-8">
        
        {/* LARGE ATHLYNX BRANDING BOX */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-2xl px-12 py-6 flex items-center gap-4 shadow-2xl relative">
            <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-16 h-16" />
            <div>
              <p className="text-white font-black text-3xl leading-none">ATHLYNX</p>
              <p className="text-cyan-200 text-sm tracking-wider">THE ATHLETE'S PLAYBOOK</p>
            </div>
            {/* Yellow dot indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* VIP CODE BOX */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 text-center max-w-md w-full shadow-2xl border border-slate-600">
            <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-white font-black text-xl mb-2">HAVE A VIP CODE?</h3>
            <Link href="/vip-access">
              <button className="text-gray-400 hover:text-cyan-400 text-sm underline">TAP HERE TO ENTER</button>
            </Link>
          </div>
        </div>

        {/* HEAVYWEIGHT CHAMPION BUTTON */}
        <div className="flex justify-center">
          <Link href="/founders">
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-black px-8 py-3 rounded-full shadow-lg text-sm">
              🏆 HEAVYWEIGHT CHAMPION OF THE WORLD 🏆
            </button>
          </Link>
        </div>

        {/* DHG Crab Shield Logo - Large */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-30 animate-pulse"></div>
              <img 
                src="/images/dhg-crab-shield-new.jpeg" 
                alt="DHG Crab Shield" 
                className="relative w-48 h-48 object-contain"
              />
            </div>
          </div>

          {/* Parent Company Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-full px-6 py-3 shadow-2xl">
              <div className="text-left">
                <p className="text-gray-400 text-xs uppercase tracking-wide">PARENT COMPANY</p>
                <p className="text-cyan-400 font-bold text-sm">Dozier Holdings Group</p>
              </div>
            </div>
          </div>
        </div>

        {/* ATHLYNX MASTERMIND SECTION */}
        <div className="bg-slate-800/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <div className="flex justify-center items-center gap-3">
            <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
            <div>
              <p className="text-white font-black text-2xl">ATHLYNX</p>
              <p className="text-cyan-400 text-xs tracking-wider">THE ATHLETE'S PLAYBOOK</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            The mastermind behind the champion. <span className="text-cyan-400 font-bold">Building champions</span>, <span className="text-cyan-400 font-bold">training winners</span>, and <span className="text-cyan-400 font-bold">creating empires</span>.
          </p>
          
          {/* THE EMPIRE */}
          <div className="flex justify-center">
            <div className="bg-slate-900 rounded-xl px-6 py-3 border border-slate-700">
              <p className="text-cyan-400 text-xs font-bold mb-2">THE EMPIRE</p>
              <div className="flex items-center gap-3 text-xl">
                <span>🏆</span>
                <span>💰</span>
                <span>⏰</span>
                <span>📊</span>
                <span>📈</span>
              </div>
              <p className="text-gray-400 text-[10px] mt-1">PASSIVE INCOME EMPIRE</p>
            </div>
          </div>
        </div>

        {/* Flagship Product Section */}
        <div className="bg-slate-900/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex justify-center">
            <div className="bg-cyan-500 text-white px-6 py-2 rounded-full font-bold uppercase text-sm">
              FLAGSHIP PRODUCT
            </div>
          </div>

          {/* App Icons */}
          <div className="flex justify-center gap-4">
            {apps.map((app) => (
              <div key={app.name} className="relative group">
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src={app.icon} 
                  alt={app.name} 
                  className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-center text-white">
            ATHLYNX
          </h2>
          <p className="text-2xl text-center text-cyan-400 font-bold uppercase tracking-wider">
            The Athlete's Playbook
          </p>

          {/* App Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {apps.map((app) => (
              <Link key={app.name} href={app.link}>
                <a className="block bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-all cursor-pointer">
                  <div className="flex items-center gap-4 mb-3">
                    <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-xl" />
                    <h3 className="text-lg font-bold text-white">{app.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{app.description}</p>
                </a>
              </Link>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm max-w-2xl mx-auto">
            Three powerful apps. One revolutionary platform. Social, messaging, NIL deals, training, analytics - all unified.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/nil-portal">
              <a className="bg-slate-800/60 border-2 border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-white transition">
                Social Feed
              </a>
            </Link>
            <Link href="/messenger">
              <a className="bg-slate-800/60 border-2 border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-white transition">
                Messenger
              </a>
            </Link>
            <Link href="/diamond-grind">
              <a className="bg-slate-800/60 border-2 border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-white transition">
                Diamond Grind
              </a>
            </Link>
          </div>
        </div>

      </div>

      {/* THE COMPLETE ATHLETE ECOSYSTEM - White Background Section */}
      <div className="bg-gray-200 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              THE COMPLETE ATHLETE ECOSYSTEM
            </h2>
            <p className="text-blue-500 font-bold text-base sm:text-lg">
              10 Powerful Apps. One Platform. Unlimited Potential.
            </p>
          </div>

          {/* 10 App Grid - 5x2 */}
          <div className="grid grid-cols-5 gap-4 sm:gap-6">
            {/* Row 1 */}
            <Link href="/nil-portal">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
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
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <img 
                    src="/messenger-icon-final.jpeg" 
                    alt="Messenger" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 text-center">Messenger</p>
              </div>
            </Link>

            <Link href="/diamond-grind">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
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
        </div>
      </div>

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
              <p className="text-gray-400 text-sm">Learn about Chad A. Dozier and the DHG mission</p>
            </a>
          </Link>

          <Link href="/store">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold">S</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Store</h3>
              <p className="text-gray-400 text-sm">Gear, apparel, equipment for all sports</p>
            </a>
          </Link>

          <Link href="/recruiting">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold">R</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Recruiting</h3>
              <p className="text-gray-400 text-sm">College connections and commitments</p>
            </a>
          </Link>

          <Link href="/faith">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold text-xl">✟</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Faith & Athletes</h3>
              <p className="text-gray-400 text-sm">Daily devotionals, prayer wall & community</p>
            </a>
          </Link>

          <Link href="/transfer-portal-intelligence">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold">TP</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Transfer Portal</h3>
              <p className="text-gray-400 text-sm">Intelligence platform for schools & athletes</p>
            </a>
          </Link>

          <Link href="/military-division">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold">MIL</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Military Division</h3>
              <p className="text-gray-400 text-sm">Operation Warrior Pipeline</p>
            </a>
          </Link>
        </div>

        {/* Corporate & Investor Links */}
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/dhg">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 hover:scale-105 transition-transform text-center">
              <img src="/images/dhg-logo.png" alt="DHG" className="w-10 h-10 rounded-lg mx-auto mb-2" />
              <h3 className="text-white font-bold">DHG Corporate</h3>
            </a>
          </Link>
          <Link href="/softmor">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 hover:scale-105 transition-transform text-center">
              <img src="/images/hub-logo.png" alt="Softmor" className="w-10 h-10 rounded-lg mx-auto mb-2" />
              <h3 className="text-white font-bold">Softmor Inc</h3>
            </a>
          </Link>
          <Link href="/investor-hub">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 hover:scale-105 transition-transform text-center">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center mx-auto mb-2">
                <span className="text-amber-400 font-bold">$</span>
              </div>
              <h3 className="text-white font-bold">Investor Hub</h3>
            </a>
          </Link>
          <Link href="/hub">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 hover:scale-105 transition-transform text-center">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center mx-auto mb-2">
                <span className="text-amber-400 font-bold">14</span>
              </div>
              <h3 className="text-white font-bold">Quick Links Hub</h3>
            </a>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-3xl p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            JOIN THE REVOLUTION
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            10,000 founding member spots. 6 months free VIP access. Launch February 1, 2026.
          </p>
          <Link href="/">
            <a className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-black text-lg uppercase hover:scale-105 transition-transform shadow-xl">
              Get VIP Access
            </a>
          </Link>
        </div>

      </div>
      
      {/* Unified Footer */}
      <UnifiedFooter />
    </div>
  );
}
