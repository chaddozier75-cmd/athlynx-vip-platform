import { Link } from "wouter";
import UnifiedFooter from "@/components/UnifiedFooter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();
  
  const apps = [
    { name: "Portal", icon: "/nil-portal-app-icon.jpeg", href: "/nil-portal" },
    { name: "Messenger", icon: "/messenger-icon-final.jpeg", href: "/messages" },
    { name: "Diamond Grind", icon: "/diamond-grind-app-icon.png", href: "/diamond-grind" },
    { name: "Warriors Playbook", icon: "/warriors-playbook-icon.png", href: "/warriors-playbook" },
    { name: "Transfer Portal", icon: "/transfer-portal-app-icon.png", href: "/transfer-portal" },
    { name: "NIL Vault", icon: "/nil-vault-app-icon.png", href: "/nil-vault" },
    { name: "AI Sales", icon: "/ai-sales-app-icon.png", href: "/ai-sales" },
    { name: "Faith", icon: "/faith-app-icon.png", href: "/faith" },
    { name: "AI Recruiter", icon: "/ai-recruiter-app-icon.png", href: "/ai-recruiter" },
    { name: "AI Content", icon: "/ai-content-app-icon.png", href: "/ai-content" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-white font-black text-xl tracking-tight">ATHLYNX</h1>
              <p className="text-blue-200 text-xs tracking-wider">THE ATHLETE'S PLAYBOOK</p>
            </div>
          </div>
          
          {/* Center - Parent Company */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-blue-200 text-sm">👤 PARENT COMPANY:</span>
            <span className="text-white font-bold text-sm">Dozier Holdings Group</span>
          </div>
          
          {/* Right - Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/founders">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all">
                <span>👥</span> Founders
              </button>
            </Link>
            {loading ? (
              <div className="w-28 h-10 bg-blue-400/50 animate-pulse rounded-lg"></div>
            ) : user ? (
              <Link href="/dashboard">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 border-2 border-white transition-all">
                  <span>○</span> Dashboard
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 border-2 border-white transition-all">
                  <span>○</span> Portal Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Tagline */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-lg mb-2">
            10 Powerful Apps. One Platform. Unlimited Potential.
          </p>
        </div>

        {/* 10 App Grid - 5x2 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-16">
          {apps.map((app, index) => (
            <Link key={index} href={app.href}>
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center p-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-500/30">
                  <img 
                    src={app.icon} 
                    alt={app.name} 
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/athlynx-logo-icon.png";
                    }}
                  />
                </div>
                <p className="text-sm font-bold text-slate-700 text-center group-hover:text-blue-600 transition-colors">
                  {app.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center py-12 border-t border-slate-200">
          <p className="text-blue-600 font-semibold text-sm tracking-widest mb-4">
            THE FUTURE OF ATHLETE SUCCESS
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2">
            ATHLYNX
          </h2>
          <p className="text-slate-600 text-lg tracking-wider">
            THE ATHLETE'S PLAYBOOK
          </p>
        </div>
      </main>

      <UnifiedFooter />
    </div>
  );
}
