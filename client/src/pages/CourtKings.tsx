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
  Filter,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  Bot,
  Award,
  Target,
  Zap,
  TrendingUp
} from "lucide-react";

export default function CourtKings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterClass, setFilterClass] = useState("all");

  const positions = ["PG", "SG", "SF", "PF", "C"];
  const classes = [2025, 2026, 2027, 2028, 2029];

  const stats = [
    { value: "850K+", label: "Players", icon: Users },
    { value: "8,000+", label: "Tournaments", icon: Trophy },
    { value: "15K+", label: "Commitments", icon: Award },
    { value: "$75M+", label: "Scholarships", icon: DollarSign },
  ];

  const tournaments = [
    { name: "Court Kings National Championship", location: "Las Vegas, NV", date: "Jul 20-27, 2026", prize: "$500,000", teams: "64/64", status: "Waitlist", level: "Elite" },
    { name: "AAU Super Showcase", location: "Orlando, FL", date: "Jul 10-15, 2026", prize: "$250,000", teams: "128/200", status: "Open", level: "AAU" },
    { name: "Nike EYBL Finals", location: "Atlanta, GA", date: "May 25-28, 2026", prize: "Exposure", teams: "40/40", status: "Invite Only", level: "Elite" },
    { name: "Pangos All-American Camp", location: "Los Angeles, CA", date: "Jun 1-5, 2026", prize: "Rankings", teams: "150/200", status: "Open", level: "Camp" },
    { name: "Under Armour Association", location: "Chicago, IL", date: "Jul 5-9, 2026", prize: "$150,000", teams: "32/32", status: "Invite Only", level: "Elite" },
  ];

  const topPlayers = [
    { rank: 1, name: "AJ Dybantsa", position: "SF", gradYear: 2025, state: "UT", commitment: "Alabama", rating: 100, height: "6'9\"", ppg: 28.5, rpg: 8.2, apg: 4.1 },
    { rank: 2, name: "Darryn Peterson", position: "PG", gradYear: 2025, state: "CA", commitment: "Kansas", rating: 99, height: "6'4\"", ppg: 24.2, rpg: 5.8, apg: 7.3 },
    { rank: 3, name: "Dylan Harper", position: "SG", gradYear: 2025, state: "NJ", commitment: "Rutgers", rating: 98, height: "6'6\"", ppg: 26.1, rpg: 6.4, apg: 5.2 },
    { rank: 4, name: "Tre Johnson", position: "SG", gradYear: 2025, state: "TX", commitment: "Texas", rating: 98, height: "6'6\"", ppg: 25.8, rpg: 5.1, apg: 3.9 },
    { rank: 5, name: "Jalen Haralson", position: "SF", gradYear: 2026, state: "IN", commitment: "Uncommitted", rating: 97, height: "6'8\"", ppg: 22.4, rpg: 7.6, apg: 4.5 },
  ];

  const camps = [
    { name: "Elite Point Guard Camp", duration: "5 Days", location: "Los Angeles, CA", focus: "Ball Handling", price: "$1,500", instructor: "Chris Paul", spots: 50, ages: "13-18" },
    { name: "Big Man Academy", duration: "4 Days", location: "Houston, TX", focus: "Post Play", price: "$1,200", instructor: "Hakeem Olajuwon", spots: 30, ages: "14-18" },
    { name: "Shooting Lab", duration: "3 Days", location: "Miami, FL", focus: "Shooting", price: "$900", instructor: "Ray Allen", spots: 40, ages: "12-18" },
    { name: "College Prep Showcase", duration: "4 Days", location: "Atlanta, GA", focus: "Recruiting", price: "$1,800", instructor: "Multiple", spots: 100, ages: "15-18" },
  ];

  const recruitingCalendar = [
    { period: "Dead Period", dates: "Dec 23 - Jan 2", status: "No Contact", description: "No in-person contact allowed" },
    { period: "Quiet Period", dates: "Jan 3 - Jan 15", status: "Limited", description: "On-campus visits only" },
    { period: "Contact Period", dates: "Jan 16 - Apr 15", status: "Open", description: "Full contact allowed" },
    { period: "Evaluation Period", dates: "Apr 16 - Jul 31", status: "Evaluation", description: "Coaches can watch games" },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1a0a2e 0%, #2d1052 50%, #1a0a2e 100%)' }}>
      <UnifiedNav />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNTAsMTAwLDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="absolute top-20 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="container relative py-8 md:py-16 px-4 md:px-5">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
              <span className="text-2xl"></span>
              <span className="text-purple-400 font-bold text-sm md:text-base">COURT KINGS</span>
              <Badge className="bg-orange-500 text-black text-xs">POWERED BY ATHLYNX</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-3 md:mb-4">
              DOMINATE
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-orange-400 to-purple-400">
                THE COURT
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              AAU Tournaments. Elite Showcases. Camps. Rankings. Recruiting Calendar.
              The complete basketball platform for hoopers.
            </p>

            {/* Mobile-friendly buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
              <Button className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                <Trophy className="w-5 h-5 mr-2" /> Find Tournaments
              </Button>
              <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/20 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                <TrendingUp className="w-5 h-5 mr-2" /> View Rankings
              </Button>
            </div>

            {/* Stats - Mobile Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto px-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
                  <stat.icon className="w-5 md:w-6 h-5 md:h-6 text-purple-400 mx-auto mb-1 md:mb-2" />
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
        <Tabs defaultValue="tournaments" className="w-full">
          {/* Scrollable tabs on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="inline-flex md:grid md:grid-cols-5 bg-white/5 border border-white/10 rounded-xl p-1 mb-6 md:mb-8 min-w-max md:min-w-0">
              <TabsTrigger value="tournaments" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Trophy className="w-4 h-4 mr-1 md:mr-2" /> Tournaments
              </TabsTrigger>
              <TabsTrigger value="rankings" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <TrendingUp className="w-4 h-4 mr-1 md:mr-2" /> Rankings
              </TabsTrigger>
              <TabsTrigger value="camps" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Zap className="w-4 h-4 mr-1 md:mr-2" /> Camps
              </TabsTrigger>
              <TabsTrigger value="recruiting" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Calendar className="w-4 h-4 mr-1 md:mr-2" /> Recruiting
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Bot className="w-4 h-4 mr-1 md:mr-2" /> AI Coach
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments">
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">Elite Basketball Events</h2>
                <Button variant="outline" className="border-purple-500/50 text-purple-400 w-full sm:w-auto">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              {tournaments.map((tournament, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-all touch-manipulation">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg md:text-xl font-bold text-white">{tournament.name}</h3>
                          <Badge className={`text-xs ${
                            tournament.level === "Elite" ? "bg-purple-500/20 text-purple-400" :
                            tournament.level === "AAU" ? "bg-orange-500/20 text-orange-400" :
                            "bg-blue-500/20 text-blue-400"
                          }`}>{tournament.level}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-4 text-white/60 text-xs md:text-sm">
                          <span className="flex items-center gap-1"><MapPin className="w-3 md:w-4 h-3 md:h-4" /> {tournament.location}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 md:w-4 h-3 md:h-4" /> {tournament.date}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 md:w-4 h-3 md:h-4" /> {tournament.teams} teams</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-purple-400">{tournament.prize}</p>
                          <p className="text-white/50 text-xs md:text-sm">Prize/Exposure</p>
                        </div>
                        <Button className={`min-h-[44px] px-4 md:px-6 ${
                          tournament.status === "Open" ? "bg-purple-500 hover:bg-purple-400" :
                          tournament.status === "Waitlist" ? "bg-yellow-600 hover:bg-yellow-500" :
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
                <Card key={i} className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-all touch-manipulation">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold flex-shrink-0 ${
                          player.rank === 1 ? 'bg-yellow-500 text-black' :
                          player.rank === 2 ? 'bg-gray-400 text-black' :
                          player.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          #{player.rank}
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-white">{player.name}</h3>
                          <p className="text-white/50 text-xs md:text-sm">{player.position} • {player.height} • Class of {player.gradYear} • {player.state}</p>
                          <p className="text-purple-400 text-xs md:text-sm">{player.commitment}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-3 md:gap-6">
                        <div className="text-center">
                          <p className="text-lg md:text-xl font-bold text-white">{player.ppg}</p>
                          <p className="text-white/50 text-xs">PPG</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg md:text-xl font-bold text-white">{player.rpg}</p>
                          <p className="text-white/50 text-xs">RPG</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg md:text-xl font-bold text-white">{player.apg}</p>
                          <p className="text-white/50 text-xs">APG</p>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-400">{player.rating}★</Badge>
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
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Elite Basketball Camps</h2>
              
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {camps.map((camp, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-all touch-manipulation">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3 md:mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-1">{camp.name}</h3>
                          <p className="text-white/50 text-xs md:text-sm">Led by: {camp.instructor}</p>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-400">{camp.focus}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-4 text-white/60 text-xs md:text-sm mb-3 md:mb-4">
                        <span className="flex items-center gap-1"><Clock className="w-3 md:w-4 h-3 md:h-4" /> {camp.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 md:w-4 h-3 md:h-4" /> {camp.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 md:w-4 h-3 md:h-4" /> {camp.spots} spots</span>
                        <span>Ages: {camp.ages}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xl md:text-2xl font-bold text-purple-400">{camp.price}</p>
                        <Button className="bg-purple-500 hover:bg-purple-400 min-h-[44px]">Register</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Recruiting Calendar Tab */}
          <TabsContent value="recruiting">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">NCAA Recruiting Calendar 2025-26</h2>
              
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

              <Card className="bg-purple-500/10 border-purple-500/30 mt-6">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Get Recruiting Alerts</h3>
                  <p className="text-white/70 text-sm mb-4">Never miss a recruiting period change. Get push notifications for dead periods, contact periods, and evaluation windows.</p>
                  <Button className="bg-purple-500 hover:bg-purple-400 min-h-[44px] w-full sm:w-auto">Enable Notifications</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Coach Tab */}
          <TabsContent value="ai">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-purple-500/20 to-orange-500/20 border-purple-500/30">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Bot className="w-8 md:w-10 h-8 md:h-10 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">AI Basketball Coach</h2>
                  <p className="text-white/70 mb-4 md:mb-6 text-sm md:text-base">
                    Get personalized training plans, game film analysis, skill development drills,
                    and recruiting guidance powered by AI.
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <Target className="w-5 md:w-6 h-5 md:h-6 text-purple-400 mx-auto mb-1 md:mb-2" />
                      <p className="text-white text-xs md:text-sm">Skill Training</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <TrendingUp className="w-5 md:w-6 h-5 md:h-6 text-orange-400 mx-auto mb-1 md:mb-2" />
                      <p className="text-white text-xs md:text-sm">Game Analysis</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <Award className="w-5 md:w-6 h-5 md:h-6 text-purple-400 mx-auto mb-1 md:mb-2" />
                      <p className="text-white text-xs md:text-sm">Recruiting Help</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <Zap className="w-5 md:w-6 h-5 md:h-6 text-yellow-400 mx-auto mb-1 md:mb-2" />
                      <p className="text-white text-xs md:text-sm">Workout Plans</p>
                    </div>
                  </div>
                  <Link href="/ai-training-bot">
                    <Button className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 md:px-8 py-3 min-h-[44px] w-full sm:w-auto">
                      <Bot className="w-5 h-5 mr-2" /> Start AI Basketball Coach
                    </Button>
                  </Link>
                  <p className="text-white/50 text-xs md:text-sm mt-3 md:mt-4">Uses 5 AI Credits per session</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="container px-4 md:px-5 py-12 md:py-16">
        <div className="bg-gradient-to-r from-purple-600 to-orange-600 rounded-2xl p-6 md:p-8 lg:p-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            Ready to Ball Out?
          </h2>
          <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Join 850,000+ hoopers on the ultimate basketball platform. 
            Tournaments, rankings, camps, and AI-powered training.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button className="bg-white text-purple-600 font-bold px-6 md:px-8 py-3 hover:bg-gray-100 min-h-[44px] w-full sm:w-auto">
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
