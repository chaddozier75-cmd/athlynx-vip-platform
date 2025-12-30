import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Star, 
  Search,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  Bot,
  Award,
  Target,
  Zap,
  TrendingUp,
  Video,
  Shield,
  FileText
} from "lucide-react";

export default function GridironNexus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterClass, setFilterClass] = useState("all");

  const positions = ["QB", "RB", "WR", "TE", "OL", "DL", "LB", "CB", "S", "K/P", "ATH"];
  const classes = [2025, 2026, 2027, 2028, 2029];

  const stats = [
    { value: "1.2M+", label: "Players", icon: Users },
    { value: "15K+", label: "Events", icon: Trophy },
    { value: "25K+", label: "Commitments", icon: Award },
    { value: "$500M+", label: "NIL Deals", icon: DollarSign },
  ];

  const tournaments = [
    { name: "Elite 11 Finals", location: "Los Angeles, CA", date: "Jul 1-3, 2026", prize: "Exposure", spots: "24/24", status: "Invite Only", level: "Elite" },
    { name: "The Opening", location: "Frisco, TX", date: "Jun 28-Jul 1, 2026", prize: "Rankings", spots: "166/166", status: "Invite Only", level: "Elite" },
    { name: "Under Armour All-America", location: "Orlando, FL", date: "Jan 2, 2026", prize: "All-America", spots: "100/100", status: "Invite Only", level: "All-America" },
    { name: "All-American Bowl", location: "San Antonio, TX", date: "Jan 4, 2026", prize: "All-America", spots: "100/100", status: "Invite Only", level: "All-America" },
    { name: "7v7 National Championship", location: "Las Vegas, NV", date: "Jul 15-20, 2026", prize: "$100,000", spots: "64/128", status: "Open", level: "7v7" },
  ];

  const topPlayers = [
    { rank: 1, name: "Jeremiah Smith", position: "WR", gradYear: 2024, state: "FL", commitment: "Ohio State", rating: 100, height: "6'3\"", weight: 200, fortyTime: "4.39", offers: 45 },
    { rank: 2, name: "Dylan Raiola", position: "QB", gradYear: 2024, state: "AZ", commitment: "Nebraska", rating: 99, height: "6'3\"", weight: 220, fortyTime: "4.65", offers: 42 },
    { rank: 3, name: "Nico Iamaleava", position: "QB", gradYear: 2023, state: "CA", commitment: "Tennessee", rating: 99, height: "6'6\"", weight: 205, fortyTime: "4.58", offers: 38 },
    { rank: 4, name: "Keon Keeley", position: "EDGE", gradYear: 2023, state: "FL", commitment: "Alabama", rating: 98, height: "6'5\"", weight: 242, fortyTime: "4.62", offers: 35 },
    { rank: 5, name: "Cormani McClain", position: "CB", gradYear: 2023, state: "FL", commitment: "Colorado", rating: 98, height: "6'2\"", weight: 185, fortyTime: "4.42", offers: 40 },
  ];

  const camps = [
    { name: "Elite 11 Regional", duration: "1 Day", location: "Multiple Cities", focus: "QB Skills", price: "$175", instructor: "Trent Dilfer", spots: 100, ages: "14-18" },
    { name: "Nike Football Combine", duration: "1 Day", location: "Nationwide", focus: "Testing", price: "$50", instructor: "Nike Staff", spots: 500, ages: "14-18" },
    { name: "Rivals Camp Series", duration: "1 Day", location: "Multiple Cities", focus: "All Positions", price: "$75", instructor: "College Coaches", spots: 300, ages: "14-18" },
    { name: "OL/DL Big Man Camp", duration: "3 Days", location: "Dallas, TX", focus: "Linemen", price: "$450", instructor: "NFL Veterans", spots: 60, ages: "14-18" },
  ];

  const recruitingCalendar = [
    { period: "Dead Period", dates: "Dec 23 - Jan 2", status: "No Contact", description: "No in-person contact or evaluations" },
    { period: "Contact Period", dates: "Jan 3 - Jan 25", status: "Open", description: "Full contact and official visits allowed" },
    { period: "Quiet Period", dates: "Jan 26 - Apr 14", status: "Limited", description: "On-campus visits only, no off-campus contact" },
    { period: "Spring Evaluation", dates: "Apr 15 - May 31", status: "Evaluation", description: "Coaches can evaluate at schools" },
    { period: "Summer Camp Period", dates: "Jun 1 - Aug 31", status: "Open", description: "Camps, combines, and evaluations" },
  ];

  const combineResults = [
    { event: "40-Yard Dash", elite: "4.40s", good: "4.55s", average: "4.70s" },
    { event: "Bench Press", elite: "25+ reps", good: "18-24 reps", average: "12-17 reps" },
    { event: "Vertical Jump", elite: "38\"+", good: "32-37\"", average: "26-31\"" },
    { event: "Broad Jump", elite: "10'6\"+", good: "9'6\"-10'5\"", average: "8'6\"-9'5\"" },
    { event: "3-Cone Drill", elite: "6.80s", good: "7.10s", average: "7.40s" },
    { event: "Shuttle", elite: "4.10s", good: "4.30s", average: "4.50s" },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1a0a0a 0%, #3d1515 50%, #1a0a0a 100%)' }}>
      <UnifiedNav />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMTAwLDEwMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="absolute top-20 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-yellow-500/10 rounded-full blur-3xl" />

        <div className="container relative py-8 md:py-16 px-4 md:px-5">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
              <span className="text-2xl">🏈</span>
              <span className="text-red-400 font-bold text-sm md:text-base">GRIDIRON NEXUS</span>
              <Badge className="bg-yellow-500 text-black text-xs">POWERED BY ATHLYNX</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-3 md:mb-4">
              OWN THE
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400">
                GRIDIRON
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              Elite Recruiting. Film Analysis. Combine Prep. NIL Opportunities.
              The complete football platform for ballers.
            </p>

            {/* Mobile-friendly buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
              <Button className="bg-red-500 hover:bg-red-400 text-white font-bold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                <Trophy className="w-5 h-5 mr-2" /> Find Events
              </Button>
              <Button variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                <TrendingUp className="w-5 h-5 mr-2" /> View Rankings
              </Button>
            </div>

            {/* Stats - Mobile Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto px-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
                  <stat.icon className="w-5 md:w-6 h-5 md:h-6 text-red-400 mx-auto mb-1 md:mb-2" />
                  <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-white/50 text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs - Mobile Optimized */}
      <section className="container px-4 md:px-5 py-8 md:py-12">
        <Tabs defaultValue="events" className="w-full">
          {/* Scrollable tabs on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="inline-flex md:grid md:grid-cols-6 bg-white/5 border border-white/10 rounded-xl p-1 mb-6 md:mb-8 min-w-max md:min-w-0">
              <TabsTrigger value="events" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Trophy className="w-4 h-4 mr-1 md:mr-2" /> Events
              </TabsTrigger>
              <TabsTrigger value="rankings" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <TrendingUp className="w-4 h-4 mr-1 md:mr-2" /> Rankings
              </TabsTrigger>
              <TabsTrigger value="camps" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Zap className="w-4 h-4 mr-1 md:mr-2" /> Camps
              </TabsTrigger>
              <TabsTrigger value="combine" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Target className="w-4 h-4 mr-1 md:mr-2" /> Combine
              </TabsTrigger>
              <TabsTrigger value="recruiting" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Calendar className="w-4 h-4 mr-1 md:mr-2" /> Recruiting
              </TabsTrigger>
              <TabsTrigger value="film" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Video className="w-4 h-4 mr-1 md:mr-2" /> Film
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">Elite Football Events</h2>
                <Button variant="outline" className="border-red-500/50 text-red-400 w-full sm:w-auto">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              {tournaments.map((tournament, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-red-500/50 transition-all touch-manipulation">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg md:text-xl font-bold text-white">{tournament.name}</h3>
                          <Badge className={`text-xs ${
                            tournament.level === "Elite" ? "bg-red-500/20 text-red-400" :
                            tournament.level === "All-America" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-blue-500/20 text-blue-400"
                          }`}>{tournament.level}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-4 text-white/60 text-xs md:text-sm">
                          <span className="flex items-center gap-1"><MapPin className="w-3 md:w-4 h-3 md:h-4" /> {tournament.location}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 md:w-4 h-3 md:h-4" /> {tournament.date}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 md:w-4 h-3 md:h-4" /> {tournament.spots}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-red-400">{tournament.prize}</p>
                          <p className="text-white/50 text-xs md:text-sm">Prize/Recognition</p>
                        </div>
                        <Button className={`min-h-[44px] px-4 md:px-6 ${
                          tournament.status === "Open" ? "bg-red-500 hover:bg-red-400" :
                          tournament.status === "Invite Only" ? "bg-yellow-600 hover:bg-yellow-500 text-black" :
                          "bg-gray-600"
                        }`}>
                          {tournament.status}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rankings Tab */}
          <TabsContent value="rankings">
            <div className="space-y-4">
              {/* Filters - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4 md:mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input 
                    placeholder="Search players..." 
                    className="pl-10 bg-white/5 border-white/10 text-white min-h-[44px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white min-h-[44px]"
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                >
                  <option value="all">All Positions</option>
                  {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
                <select 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white min-h-[44px]"
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                >
                  <option value="all">All Classes</option>
                  {classes.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">National Player Rankings</h2>
              
              {topPlayers.map((player, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-red-500/50 transition-all touch-manipulation">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold flex-shrink-0 ${
                          player.rank === 1 ? 'bg-yellow-500 text-black' :
                          player.rank === 2 ? 'bg-gray-400 text-black' :
                          player.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          #{player.rank}
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-white">{player.name}</h3>
                          <p className="text-white/50 text-xs md:text-sm">{player.position} • {player.height} • {player.weight} lbs • Class of {player.gradYear}</p>
                          <p className="text-red-400 text-xs md:text-sm">{player.commitment} • {player.offers} offers</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-3 md:gap-6">
                        <div className="text-center">
                          <p className="text-lg md:text-xl font-bold text-white">{player.fortyTime}</p>
                          <p className="text-white/50 text-xs">40 Time</p>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400">{player.rating}★</Badge>
                        <Button variant="outline" className="border-red-500/50 text-red-400 min-h-[44px]">
                          <Video className="w-4 h-4 mr-1" /> Film
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Camps Tab */}
          <TabsContent value="camps">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Football Camps & Combines</h2>
              
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {camps.map((camp, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-red-500/50 transition-all touch-manipulation">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3 md:mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-1">{camp.name}</h3>
                          <p className="text-white/50 text-xs md:text-sm">Staff: {camp.instructor}</p>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400">{camp.focus}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-4 text-white/60 text-xs md:text-sm mb-3 md:mb-4">
                        <span className="flex items-center gap-1"><Clock className="w-3 md:w-4 h-3 md:h-4" /> {camp.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 md:w-4 h-3 md:h-4" /> {camp.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 md:w-4 h-3 md:h-4" /> {camp.spots} spots</span>
                        <span>Ages: {camp.ages}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xl md:text-2xl font-bold text-red-400">{camp.price}</p>
                        <Button className="bg-red-500 hover:bg-red-400 min-h-[44px]">Register</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Combine Tab */}
          <TabsContent value="combine">
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Combine Testing Standards</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white font-bold">Event</th>
                      <th className="text-center py-3 px-4 text-green-400 font-bold">Elite</th>
                      <th className="text-center py-3 px-4 text-yellow-400 font-bold">Good</th>
                      <th className="text-center py-3 px-4 text-white/60 font-bold">Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combineResults.map((result, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-semibold">{result.event}</td>
                        <td className="py-3 px-4 text-center text-green-400">{result.elite}</td>
                        <td className="py-3 px-4 text-center text-yellow-400">{result.good}</td>
                        <td className="py-3 px-4 text-center text-white/60">{result.average}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Card className="bg-red-500/10 border-red-500/30">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-400" /> AI Combine Prep
                  </h3>
                  <p className="text-white/70 text-sm mb-4">Get personalized training plans to improve your combine numbers. Our AI analyzes your current metrics and creates a custom program.</p>
                  <Link href="/ai-training-bot">
                    <Button className="bg-red-500 hover:bg-red-400 min-h-[44px]">
                      <Bot className="w-4 h-4 mr-2" /> Start AI Training
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recruiting Calendar Tab */}
          <TabsContent value="recruiting">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">NCAA Football Recruiting Calendar 2025-26</h2>
              
              <div className="grid gap-3 md:gap-4">
                {recruitingCalendar.map((period, i) => (
                  <Card key={i} className="bg-white/5 border-white/10">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className={`w-10 md:w-12 h-10 md:h-12 rounded-lg flex items-center justify-center ${
                            period.status === "No Contact" ? "bg-red-500/20" :
                            period.status === "Limited" ? "bg-yellow-500/20" :
                            period.status === "Open" ? "bg-green-500/20" :
                            "bg-blue-500/20"
                          }`}>
                            <Calendar className={`w-5 md:w-6 h-5 md:h-6 ${
                              period.status === "No Contact" ? "text-red-400" :
                              period.status === "Limited" ? "text-yellow-400" :
                              period.status === "Open" ? "text-green-400" :
                              "text-blue-400"
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-white">{period.period}</h3>
                            <p className="text-white/50 text-xs md:text-sm">{period.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="text-left sm:text-right">
                            <p className="text-white font-semibold text-sm md:text-base">{period.dates}</p>
                          </div>
                          <Badge className={`${
                            period.status === "No Contact" ? "bg-red-500" :
                            period.status === "Limited" ? "bg-yellow-500 text-black" :
                            period.status === "Open" ? "bg-green-500" :
                            "bg-blue-500"
                          }`}>
                            {period.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Film Tab */}
          <TabsContent value="film">
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Film Analysis & Highlights</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center mb-4">
                      <Video className="w-16 h-16 text-white/30" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Upload Your Film</h3>
                    <p className="text-white/60 text-sm mb-4">Upload game film for AI analysis and breakdown. Get personalized feedback on technique, positioning, and areas for improvement.</p>
                    <Button className="bg-red-500 hover:bg-red-400 w-full min-h-[44px]">Upload Film</Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center mb-4">
                      <Bot className="w-16 h-16 text-white/30" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">AI Film Breakdown</h3>
                    <p className="text-white/60 text-sm mb-4">Our AI analyzes your film frame-by-frame, identifying strengths, weaknesses, and providing actionable coaching points.</p>
                    <Link href="/ai-training-bot">
                      <Button variant="outline" className="border-red-500/50 text-red-400 w-full min-h-[44px]">Start AI Analysis</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-red-500/20 to-yellow-500/20 border-red-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-red-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">NCAA Compliance</h3>
                      <p className="text-white/70 text-sm">All film sharing and recruiting communications on Gridiron Nexus are designed to comply with NCAA rules. We track dead periods, contact restrictions, and provide compliance alerts.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Compliance Section */}
      <section className="container px-4 md:px-5 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <Shield className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">NCAA Compliant</h3>
              <p className="text-white/60 text-sm">Full compliance with NCAA recruiting rules and regulations</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <FileText className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">NIL Ready</h3>
              <p className="text-white/60 text-sm">State-by-state NIL compliance and disclosure tools</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <Award className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Verified Athletes</h3>
              <p className="text-white/60 text-sm">Identity verification for all athlete profiles</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="container px-4 md:px-5 py-12 md:py-16">
        <div className="bg-gradient-to-r from-red-600 to-yellow-600 rounded-2xl p-6 md:p-8 lg:p-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            Ready to Dominate?
          </h2>
          <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Join 1.2 million football players on the ultimate gridiron platform. 
            Events, rankings, film, and AI-powered training.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button className="bg-white text-red-600 font-bold px-6 md:px-8 py-3 hover:bg-gray-100 min-h-[44px] w-full sm:w-auto">
              Create Player Profile
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 px-6 md:px-8 py-3 min-h-[44px] w-full sm:w-auto">
              Explore Platform
            </Button>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
