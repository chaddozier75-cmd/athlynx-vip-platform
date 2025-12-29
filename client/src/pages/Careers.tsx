import { useState } from "react";
import { Link } from "wouter";

export default function Careers() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Jobs", icon: "💼" },
    { id: "coaching", name: "Coaching", icon: "🏆" },
    { id: "broadcasting", name: "Broadcasting", icon: "🎙️" },
    { id: "corporate", name: "Corporate", icon: "🏢" },
    { id: "fitness", name: "Fitness Industry", icon: "💪" },
    { id: "sales", name: "Sales", icon: "📈" },
    { id: "medical", name: "Sports Medicine", icon: "🏥" },
    { id: "education", name: "Education", icon: "📚" },
    { id: "business", name: "Business Owner", icon: "🚀" },
    { id: "military", name: "Military/Gov", icon: "🎖️" },
  ];

  const jobs = [
    { id: 1, title: "Assistant Football Coach", company: "University of Texas", location: "Austin, TX", salary: "$85,000 - $120,000", category: "coaching", type: "Full-time", posted: "2 days ago", logo: "🏈", athletePreferred: true },
    { id: 2, title: "Sports Analyst", company: "ESPN", location: "Bristol, CT", salary: "$95,000 - $150,000", category: "broadcasting", type: "Full-time", posted: "1 day ago", logo: "🎙️", athletePreferred: true },
    { id: 3, title: "Sales Executive", company: "Nike", location: "Portland, OR", salary: "$75,000 - $120,000", category: "sales", type: "Full-time", posted: "3 days ago", logo: "👟", athletePreferred: true },
    { id: 4, title: "Personal Trainer", company: "Equinox", location: "New York, NY", salary: "$60,000 - $90,000", category: "fitness", type: "Full-time", posted: "1 day ago", logo: "💪", athletePreferred: true },
    { id: 5, title: "Physical Therapist", company: "Sports Medicine Clinic", location: "Los Angeles, CA", salary: "$80,000 - $110,000", category: "medical", type: "Full-time", posted: "5 days ago", logo: "🏥", athletePreferred: false },
    { id: 6, title: "Corporate Trainer", company: "Goldman Sachs", location: "New York, NY", salary: "$100,000 - $150,000", category: "corporate", type: "Full-time", posted: "2 days ago", logo: "🏢", athletePreferred: true },
    { id: 7, title: "Baseball Academy Director", company: "Diamond Elite Training", location: "Phoenix, AZ", salary: "$70,000 - $95,000", category: "coaching", type: "Full-time", posted: "4 days ago", logo: "⚾", athletePreferred: true },
    { id: 8, title: "Franchise Owner - Fitness", company: "Orange Theory", location: "Multiple Locations", salary: "$150,000 - $300,000+", category: "business", type: "Franchise", posted: "1 week ago", logo: "🚀", athletePreferred: true },
    { id: 9, title: "Athletic Director", company: "High School District", location: "Dallas, TX", salary: "$90,000 - $130,000", category: "education", type: "Full-time", posted: "3 days ago", logo: "📚", athletePreferred: true },
    { id: 10, title: "Military Recruiter", company: "U.S. Army", location: "Nationwide", salary: "$55,000 - $85,000", category: "military", type: "Full-time", posted: "1 day ago", logo: "🎖️", athletePreferred: true },
    { id: 11, title: "Color Commentator", company: "Fox Sports", location: "Los Angeles, CA", salary: "$120,000 - $250,000", category: "broadcasting", type: "Contract", posted: "6 days ago", logo: "📺", athletePreferred: true },
    { id: 12, title: "Strength & Conditioning Coach", company: "NFL Team", location: "Various", salary: "$100,000 - $200,000", category: "coaching", type: "Full-time", posted: "2 days ago", logo: "🏋️", athletePreferred: true },
    { id: 13, title: "Sports Agent", company: "CAA Sports", location: "Los Angeles, CA", salary: "$80,000 - $500,000+", category: "corporate", type: "Full-time", posted: "1 week ago", logo: "📝", athletePreferred: true },
    { id: 14, title: "Gym Manager", company: "LA Fitness", location: "Multiple Locations", salary: "$50,000 - $75,000", category: "fitness", type: "Full-time", posted: "4 days ago", logo: "🏢", athletePreferred: false },
    { id: 15, title: "Sports Psychologist", company: "Pro Sports Team", location: "Various", salary: "$90,000 - $150,000", category: "medical", type: "Full-time", posted: "5 days ago", logo: "🧠", athletePreferred: false },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: "Active Jobs", value: "2,500+", icon: "💼" },
    { label: "Partner Companies", value: "500+", icon: "🏢" },
    { label: "Athletes Placed", value: "10,000+", icon: "🏆" },
    { label: "Avg Salary Increase", value: "35%", icon: "📈" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/home" className="text-gray-400 hover:text-white">Platform</Link>
            <Link href="/store" className="text-gray-400 hover:text-white">Store</Link>
            <Link href="/careers" className="text-yellow-400 font-semibold">Careers</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          </nav>
          <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">
            Post a Job
          </button>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
              💼 CAREER PORTAL
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Your Athletic Career <span className="text-green-400">Continues Here</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
              Companies want athletes. Your discipline, teamwork, and competitive drive are exactly what employers need. Find your next chapter.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto flex gap-2">
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
              />
              <button className="px-6 py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-all">
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
                <span className="text-3xl block mb-2">{stat.icon}</span>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Why Athletes Section */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/20 p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Why Companies <span className="text-green-400">WANT</span> Athletes
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: "🎯", title: "Goal-Oriented", desc: "Athletes know how to set and achieve goals" },
                { icon: "👥", title: "Team Players", desc: "Years of teamwork experience" },
                { icon: "💪", title: "Discipline", desc: "Unmatched work ethic and dedication" },
                { icon: "🏆", title: "Competitive", desc: "Drive to win in any environment" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <span className="text-4xl block mb-2">{item.icon}</span>
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-green-500 text-black font-semibold"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-4 mb-10">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-green-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl">
                    {job.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{job.title}</h3>
                        <p className="text-gray-400">{job.company}</p>
                      </div>
                      {job.athletePreferred && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          🏆 Athletes Preferred
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        📍 {job.location}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        💰 {job.salary}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        ⏰ {job.type}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Posted {job.posted}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-all">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Companies */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Companies Hiring Athletes</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              {["Nike", "ESPN", "Goldman Sachs", "Google", "Microsoft", "Amazon", "NFL", "NBA"].map((company) => (
                <div key={company} className="text-gray-500 font-semibold text-lg hover:text-white transition-all cursor-pointer">
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Your Next Chapter?</h3>
            <p className="text-white/80 mb-6">Create your athlete profile and let companies find you</p>
            <button className="px-8 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
              Create Profile
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
