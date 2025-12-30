import { Link } from "wouter";

export default function Veterans() {
  const programs = [
    { id: 1, name: "Athlete to Soldier Transition", desc: "Leverage your athletic discipline for military careers", icon: "", type: "Career" },
    { id: 2, name: "Veteran Coaching Certification", desc: "Become a certified coach using your military & athletic background", icon: "", type: "Education" },
    { id: 3, name: "VA Sports Benefits", desc: "Access VA benefits for sports-related injuries and training", icon: "🏥", type: "Benefits" },
    { id: 4, name: "Veteran Athlete Network", desc: "Connect with other veteran athletes nationwide", icon: "", type: "Community" },
    { id: 5, name: "Business Ownership Program", desc: "Franchise and business opportunities for veteran athletes", icon: "", type: "Business" },
    { id: 6, name: "Mental Performance", desc: "Sports psychology and mental health resources for veterans", icon: "🧠", type: "Wellness" },
  ];

  const successStories = [
    { name: "Marcus Thompson", branch: "U.S. Army", sport: "Football", now: "NFL Scout", image: "" },
    { name: "Sarah Mitchell", branch: "U.S. Navy", sport: "Swimming", now: "Olympic Coach", image: "⚓" },
    { name: "James Rodriguez", branch: "U.S. Marines", sport: "Wrestling", now: "Gym Owner", image: "🦅" },
    { name: "David Kim", branch: "U.S. Air Force", sport: "Track & Field", now: "Sports Agent", image: "✈️" },
  ];

  const partners = [
    "U.S. Department of Veterans Affairs",
    "Wounded Warrior Project",
    "Team Red White & Blue",
    "Pat Tillman Foundation",
    "USO",
    "Hire Heroes USA",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl"></span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/home" className="text-gray-400 hover:text-white">Platform</Link>
            <Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link>
            <Link href="/veterans" className="text-red-400 font-semibold">Veterans</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="flex justify-center gap-2 mb-4">
              <span className="text-4xl"></span>
              <span className="text-4xl"></span>
              <span className="text-4xl"></span>
            </div>
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold mb-4">
              VETERAN ATHLETES
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              From Service to <span className="text-red-400">Sports Success</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Honoring those who served. Supporting veteran athletes with career transition, coaching opportunities, and community.
            </p>
          </div>

          {/* Stats Banner */}
          <div className="bg-gradient-to-r from-red-500/10 via-white/5 to-blue-500/10 rounded-2xl border border-white/10 p-8 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "50,000+", label: "Veteran Athletes", icon: "" },
                { value: "2,500+", label: "Jobs Placed", icon: "" },
                { value: "500+", label: "Partner Companies", icon: "" },
                { value: "$2M+", label: "Scholarships Given", icon: "" },
              ].map((stat, i) => (
                <div key={i}>
                  <span className="text-2xl block mb-2">{stat.icon}</span>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Veteran <span className="text-red-400">Programs</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-red-500/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{program.icon}</span>
                    <div>
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded mb-2 inline-block">
                        {program.type}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">{program.name}</h3>
                      <p className="text-gray-500 text-sm">{program.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Success <span className="text-red-400">Stories</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {successStories.map((story, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center hover:border-red-500/50 transition-all"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-500/20 to-blue-500/20 flex items-center justify-center text-3xl mb-4">
                    {story.image}
                  </div>
                  <h3 className="text-white font-bold mb-1">{story.name}</h3>
                  <p className="text-red-400 text-sm mb-1">{story.branch}</p>
                  <p className="text-gray-500 text-xs mb-2">Former: {story.sport}</p>
                  <p className="text-green-400 text-sm font-semibold">Now: {story.now}</p>
                </div>
              ))}
            </div>
          </div>

          {/* VA Benefits Section */}
          <div className="bg-gradient-to-r from-blue-500/10 to-red-500/10 rounded-2xl border border-white/10 p-8 mb-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-5xl block mb-4">🏥</span>
                <h3 className="text-2xl font-bold text-white mb-2">VA Benefits Navigator</h3>
                <p className="text-gray-400 mb-4">
                  Not sure what benefits you qualify for? Our AI-powered navigator helps veteran athletes find and apply for VA benefits related to sports injuries, education, and career transition.
                </p>
                <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-400 transition-all">
                  Check My Benefits
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "", label: "GI Bill for Coaching Certs" },
                  { icon: "🏥", label: "Sports Injury Coverage" },
                  { icon: "", label: "Career Counseling" },
                  { icon: "", label: "Home Loan Benefits" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                    <span className="text-2xl block mb-1">{item.icon}</span>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partners */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Our Partners</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              {partners.map((partner, i) => (
                <div key={i} className="text-gray-500 font-semibold hover:text-white transition-all cursor-pointer text-center">
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Thank You For Your Service </h3>
            <p className="text-white/80 mb-6">Join the ATHLYNX veteran athlete community today</p>
            <button className="px-8 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
              Join as Veteran Athlete
            </button>
          </div>

          {/* Back Link */}
          <div className="text-center mt-10">
            <Link href="/" className="text-cyan-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
