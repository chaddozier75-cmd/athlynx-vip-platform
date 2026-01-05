import { Link } from "wouter";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-2">
        <div className="container text-center text-xs font-semibold tracking-wider">
          THE FUTURE OF ATHLETE SUCCESS
        </div>
      </div>

      {/* Header with ATHLYNX Logo Box, Parent Company Badge, and Buttons */}
      <header className="border-b bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container py-4 flex items-center justify-between">
          {/* LEFT: ATHLYNX Logo in Cyan Gradient Box */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              {/* Cyan Gradient Box with Logo */}
              <div className="flex items-center gap-3 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 p-3 pr-6 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                {/* Logo Container */}
                <div className="w-14 h-14 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <img 
                    alt="ATHLYNX" 
                    className="w-12 h-12 object-contain drop-shadow-2xl" 
                    src="/athlynx-logo.png" 
                  />
                </div>
                {/* Text */}
                <div className="flex flex-col">
                  <div className="text-2xl font-black text-white tracking-tight drop-shadow-lg">
                    ATHLYNX
                  </div>
                  <div className="text-[10px] font-semibold text-blue-100 tracking-wider uppercase">
                    The Athlete's Playbook
                  </div>
                </div>
                {/* Yellow Dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full shadow-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* CENTER: Parent Company Badge */}
          <div className="flex items-center gap-2">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Users className="h-3 w-3 mr-1" />
              PARENT COMPANY: Dozier Holdings Group
            </Badge>
          </div>

          {/* RIGHT: Founders and Portal Login Buttons */}
          <div className="flex items-center gap-3">
            {/* Founders Button - Cyan */}
            <Button 
              className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 text-white border-2 border-cyan-300 hover:border-cyan-200 shadow-2xl hover:shadow-cyan-400/60 transition-all duration-300 hover:scale-110 font-bold tracking-wide group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Founders
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>

            {/* Portal Login Button - Purple/Blue */}
            <Button 
              className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white border-2 border-purple-300 hover:border-purple-200 shadow-2xl hover:shadow-purple-400/60 transition-all duration-300 hover:scale-110 font-bold tracking-wide group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Portal Login
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          </div>
        </div>
      </header>

      {/* Blue Banner - LIVE PLATFORM */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white py-3 shadow-lg">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-3 text-sm font-bold tracking-wide">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span>LIVE PLATFORM • HIPAA-compliant • Protecting our precious cargo</span>
          </div>
        </div>
      </div>

      {/* Yellow Warning Banner */}
      <div className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 border-y border-yellow-300 py-3">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-yellow-900">
            <span className="text-xl">⚠️</span>
            <span>SITE UPDATING LIVE DAILY - Please be patient with us while we add future updates and apps!</span>
            <span className="text-xl">⚠️</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12 space-y-12">
        
        {/* VIP Code Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-cyan-500/30">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto">
                <img 
                  src="/athlynx-logo.png" 
                  alt="ATHLYNX" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              <h2 className="text-3xl font-black text-white">
                🔐 HAVE A VIP CODE?
              </h2>
              <p className="text-cyan-400 font-semibold">
                TAP HERE TO ENTER
              </p>
            </div>
          </div>
        </div>

        {/* Heavyweight Champion Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-12 shadow-2xl border-2 border-yellow-500/50">
            <div className="text-center space-y-8">
              {/* Champion Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-slate-900 px-8 py-4 rounded-full shadow-2xl font-black text-xl">
                <span>🏆</span>
                <span>HEAVYWEIGHT CHAMPION OF THE WORLD</span>
                <span>🏆</span>
              </div>

              {/* DHG Crab Shield */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-40 animate-pulse"></div>
                  <img 
                    src="/images/dhg-crab-shield-new.jpeg" 
                    alt="DHG Crab Shield" 
                    className="relative w-48 h-48 rounded-2xl shadow-2xl border-4 border-cyan-400/50 object-contain"
                  />
                </div>
              </div>

              {/* Parent Company Badge */}
              <div className="inline-flex items-center gap-3 bg-slate-800/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-2xl px-8 py-4 shadow-2xl">
                <div className="text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wide">PARENT COMPANY</p>
                  <p className="text-cyan-400 font-bold text-2xl">Dozier Holdings Group</p>
                </div>
              </div>

              {/* DHG Title */}
              <h3 className="text-4xl font-black text-white">
                DOZIER HOLDINGS GROUP
              </h3>
              <p className="text-2xl font-bold text-yellow-400">
                THE UNDEFEATED CHAMPION
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-6">
                  <div className="text-4xl font-black text-cyan-400">∞</div>
                  <div className="text-sm text-gray-400 mt-2">UNDEFEATED</div>
                </div>
                <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-6">
                  <div className="text-4xl font-black text-cyan-400">🥊</div>
                  <div className="text-sm text-gray-400 mt-2">KNOCKOUTS</div>
                </div>
                <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-6">
                  <div className="text-4xl font-black text-cyan-400">👑</div>
                  <div className="text-sm text-gray-400 mt-2">CHAMPION</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THE COMPLETE ATHLETE ECOSYSTEM */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
              THE FUTURE OF ATHLETE SUCCESS
            </p>
            <h2 className="text-5xl font-black text-slate-900">
              ATHLYNX
            </h2>
            <p className="text-2xl font-bold text-cyan-600 uppercase tracking-wider">
              THE ATHLETE'S PLAYBOOK
            </p>
          </div>

          {/* 10 App Icons Grid */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
            <h3 className="text-3xl font-black text-center text-slate-900 mb-8">
              THE COMPLETE ATHLETE ECOSYSTEM
            </h3>
            <p className="text-center text-blue-600 font-semibold mb-8">
              10 Powerful Apps. One Platform. Unlimited Potential.
            </p>
            
            {/* App Icons Grid - 5x2 */}
            <div className="grid grid-cols-5 gap-6">
              {/* Row 1 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">📱</span>
                </div>
                <p className="text-xs font-bold text-slate-700">Portal</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">💬</span>
                </div>
                <p className="text-xs font-bold text-slate-700">Messenger</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-cyan-500 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">💎</span>
                </div>
                <p className="text-xs font-bold text-slate-700">Diamond Grind</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">⚔️</span>
                </div>
                <p className="text-xs font-bold text-slate-700">Warriors Playbook</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">🔄</span>
                </div>
                <p className="text-xs font-bold text-slate-700">Transfer Portal</p>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">✝️</span>
                </div>
                <p className="text-xs font-bold text-slate-700">Faith</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">🏦</span>
                </div>
                <p className="text-xs font-bold text-slate-700">NIL Vault</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">🤖</span>
                </div>
                <p className="text-xs font-bold text-slate-700">AI Sales</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <p className="text-xs font-bold text-slate-700">AI Recruiter</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center">
                  <span className="text-3xl">📝</span>
                </div>
                <p className="text-xs font-bold text-slate-700">AI Content</p>
              </div>
            </div>
          </div>

          {/* VIP Early Access - 6 MONTHS FREE */}
          <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-3xl p-12 shadow-2xl text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-2xl">🎯</span>
              <span className="text-white font-bold text-lg">VIP EARLY ACCESS</span>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl px-12 py-6 inline-block">
              <p className="text-6xl font-black text-white">6 MONTHS FREE</p>
            </div>

            {/* Countdown Timer */}
            <div className="space-y-4">
              <p className="text-white font-semibold text-lg">LAUNCHING IN</p>
              <div className="flex justify-center gap-4">
                <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl px-6 py-4 min-w-[80px]">
                  <div className="text-4xl font-black text-cyan-400">26</div>
                  <div className="text-xs text-gray-300 uppercase">Days</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl px-6 py-4 min-w-[80px]">
                  <div className="text-4xl font-black text-cyan-400">19</div>
                  <div className="text-xs text-gray-300 uppercase">Hrs</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl px-6 py-4 min-w-[80px]">
                  <div className="text-4xl font-black text-cyan-400">38</div>
                  <div className="text-xs text-gray-300 uppercase">Mins</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl px-6 py-4 min-w-[80px]">
                  <div className="text-4xl font-black text-cyan-400">40</div>
                  <div className="text-xs text-gray-300 uppercase">Sec</div>
                </div>
              </div>
              <p className="text-white font-bold text-xl">FEBRUARY 1, 2026</p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 rounded-3xl p-8 shadow-2xl border-2 border-red-500/50">
            <div className="text-center space-y-6">
              <h3 className="text-3xl font-black text-white">
                FOUNDING MEMBER SPOTS
              </h3>
              <p className="text-5xl font-black text-red-400">
                LIMITED TO 10,000
              </p>
              
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-1/3"></div>
              </div>

              {/* Form */}
              <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 space-y-6">
                <div className="space-y-4">
                  <div className="text-left">
                    <label className="text-white font-semibold text-sm block mb-2">
                      FULL NAME *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Your full name"
                      className="w-full bg-slate-800/60 border-2 border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="text-left">
                    <label className="text-white font-semibold text-sm block mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full bg-slate-800/60 border-2 border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="text-left">
                    <label className="text-white font-semibold text-sm block mb-2">
                      PHONE NUMBER *
                    </label>
                    <input 
                      type="tel" 
                      placeholder="Phone Number (Required)"
                      className="w-full bg-slate-800/60 border-2 border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="text-left">
                    <label className="text-white font-semibold text-sm block mb-2">
                      I AM A...
                    </label>
                    <div className="flex gap-3">
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-6 py-2 text-white font-semibold transition-all">
                        Athlete
                      </button>
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-6 py-2 text-white font-semibold transition-all">
                        Parent
                      </button>
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-6 py-2 text-white font-semibold transition-all">
                        Coach
                      </button>
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-6 py-2 text-white font-semibold transition-all">
                        Brand
                      </button>
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="text-white font-semibold text-sm block mb-2">
                      PRIMARY SPORT
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-4 py-2 text-white font-semibold transition-all">
                        Baseball
                      </button>
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-4 py-2 text-white font-semibold transition-all">
                        Football
                      </button>
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-4 py-2 text-white font-semibold transition-all">
                        Basketball
                      </button>
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-4 py-2 text-white font-semibold transition-all">
                        Soccer
                      </button>
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-4 py-2 text-white font-semibold transition-all">
                        Track & Field
                      </button>
                      <button className="bg-slate-800/60 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg px-4 py-2 text-white font-semibold transition-all">
                        Volleyball
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-lg py-6 rounded-xl shadow-2xl shadow-cyan-500/30 transition-all">
                  ⚡ CLAIM MY VIP SPOT
                </Button>

                <p className="text-gray-400 text-xs text-center">
                  No credit card required. By signing up, you agree to receive updates about ATHLYNX.
                </p>
              </div>
            </div>
          </div>

          {/* Join Athletes Section */}
          <div className="text-center space-y-4">
            <p className="text-gray-600 font-semibold">
              Join athletes from 500+ schools already on the waitlist
            </p>
            <div className="flex justify-center gap-4 text-sm font-bold text-blue-600">
              <span>SEC</span>
              <span>•</span>
              <span>ACC</span>
              <span>•</span>
              <span>Big Ten</span>
              <span>•</span>
              <span>Big 12</span>
              <span>•</span>
              <span>Pac-12</span>
            </div>
          </div>

          {/* Already a VIP Member */}
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-cyan-500/30 text-center space-y-4">
            <h3 className="text-2xl font-black text-white">
              ALREADY A VIP MEMBER?
            </h3>
            <p className="text-gray-400">
              Enter your access code to unlock all 6 apps.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold px-8 py-4 rounded-xl shadow-2xl">
              🔐 ENTER ACCESS CODE
            </Button>
          </div>

          {/* Preview the App */}
          <div className="text-center">
            <Link href="/home">
              <a className="text-blue-600 hover:text-blue-700 font-bold underline">
                Preview the App →
              </a>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <span>✓ Social Network</span>
            <span>✓ NIL Deals</span>
            <span>✓ Messaging</span>
            <span>✓ Analytics</span>
            <span>✓ Compliance</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <h4 className="font-bold text-lg mb-4">COMPANY</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Press</div>
                <div>Contact</div>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-bold text-lg mb-4">PLATFORM</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>VIP Access</div>
                <div>Athlete Dashboard</div>
                <div>Diamond Grind</div>
                <div>Messenger</div>
              </div>
            </div>

            {/* Apps */}
            <div>
              <h4 className="font-bold text-lg mb-4">APPS</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>NIL Portal</div>
                <div>Diamond Grind</div>
                <div>All Apps</div>
                <div>Quick Links Hub</div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-4">RESOURCES</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Founder Story</div>
                <div>Pricing</div>
                <div>Investor Hub</div>
                <div>Legal & Compliance</div>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors cursor-pointer">
              <span>📷</span>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors cursor-pointer">
              <span>🐦</span>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors cursor-pointer">
              <span>📘</span>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors cursor-pointer">
              <span>💼</span>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors cursor-pointer">
              <span>🎵</span>
            </div>
          </div>

          {/* DHG Branding */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-cyan-500 rounded-full"></div>
              <span className="text-cyan-400 font-bold">Dozier Holdings Group</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 ATHLYNX / Dozier Holdings Group, LLC. All Rights Reserved.
            </p>
            <p className="text-cyan-400 font-bold text-sm">
              BUILT WITH ❤️ FOR ATHLETES, BY ATHLETES
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex justify-center gap-6 mt-8 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>HIPAA Compliance</span>
          </div>

          {/* Security & Compliance */}
          <div className="mt-12 bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <span>🔒</span>
              SECURITY & LEGAL COMPLIANCE
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-400">
              <div>
                <strong className="text-white">HIPAA Compliance:</strong> All athlete health data, medical records, and personal information are protected.
              </div>
              <div>
                <strong className="text-white">Data Collection:</strong> We aggregate publicly available information from authorized sources. All data collection, storage, and processing comply with applicable laws.
              </div>
              <div>
                <strong className="text-white">AI Transparency:</strong> Our platform utilizes AI tools and automated agents for content generation, data analysis, and personalized recommendations.
              </div>
              <div>
                <strong className="text-white">Premium Cargo Protection:</strong> Student-athletes are our most valuable asset. We employ 24/7 AI monitoring, HIPAA-compliant data handling, and zero-tolerance for exploitation.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
