import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Search, 
  Filter, 
  Trophy,
  Users,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Play,
  Target,
  Zap,
  Award,
  Globe,
  Clock,
  ChevronRight,
  Download,
  Share2,
  Heart,
  Eye
} from "lucide-react";

export default function PitchPulse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");

  const positions = [
    "Goalkeeper", "Center Back", "Full Back", "Wing Back", 
    "Defensive Mid", "Central Mid", "Attacking Mid", 
    "Winger", "Striker", "Forward"
  ];

  const featuredPlayers = [
    {
      name: "Marcus Rodriguez",
      position: "Striker",
      school: "UCLA",
      class: "2025",
      state: "CA",
      rating: 98,
      goals: 24,
      assists: 12,
      gamesPlayed: 22,
      commitment: null,
      image: null
    },
    {
      name: "James Okonkwo",
      position: "Central Mid",
      school: "Wake Forest",
      class: "2025",
      state: "NC",
      rating: 97,
      goals: 8,
      assists: 18,
      gamesPlayed: 21,
      commitment: "Manchester City Academy",
      image: null
    },
    {
      name: "Diego Fernandez",
      position: "Winger",
      school: "Stanford",
      class: "2026",
      state: "CA",
      rating: 96,
      goals: 15,
      assists: 14,
      gamesPlayed: 20,
      commitment: null,
      image: null
    },
    {
      name: "Tyler Washington",
      position: "Goalkeeper",
      school: "Virginia",
      class: "2025",
      state: "VA",
      rating: 95,
      goals: 0,
      assists: 2,
      gamesPlayed: 22,
      commitment: null,
      image: null
    },
    {
      name: "Kevin Müller",
      position: "Center Back",
      school: "Indiana",
      class: "2025",
      state: "IN",
      rating: 95,
      goals: 4,
      assists: 3,
      gamesPlayed: 21,
      commitment: "FC Dallas",
      image: null
    },
    {
      name: "Andre Silva",
      position: "Attacking Mid",
      school: "Georgetown",
      class: "2026",
      state: "DC",
      rating: 94,
      goals: 11,
      assists: 16,
      gamesPlayed: 20,
      commitment: null,
      image: null
    }
  ];

  const tournaments = [
    {
      name: "MLS NEXT Cup",
      date: "Jun 25-Jul 2, 2025",
      location: "Dallas, TX",
      teams: 128,
      status: "Registration Open",
      prize: "$50,000"
    },
    {
      name: "ECNL National Finals",
      date: "Jul 15-20, 2025",
      location: "San Diego, CA",
      teams: 96,
      status: "Qualifying",
      prize: "$40,000"
    },
    {
      name: "Generation adidas Cup",
      date: "Apr 10-14, 2025",
      location: "Frisco, TX",
      teams: 64,
      status: "Invitational",
      prize: "$75,000"
    },
    {
      name: "US Youth Soccer National Championship",
      date: "Jul 22-28, 2025",
      location: "Orlando, FL",
      teams: 96,
      status: "State Qualifiers",
      prize: "$35,000"
    },
    {
      name: "Disney Soccer Showcase",
      date: "Dec 28-Jan 2, 2025",
      location: "Orlando, FL",
      teams: 200,
      status: "Registration Open",
      prize: "Exposure"
    },
    {
      name: "IMG Cup",
      date: "Mar 14-17, 2025",
      location: "Bradenton, FL",
      teams: 150,
      status: "Registration Open",
      prize: "$25,000"
    }
  ];

  const trainingPrograms = [
    {
      name: "Technical Mastery",
      focus: "Ball control, first touch, dribbling",
      duration: "8 weeks",
      level: "All Levels",
      price: "$199",
      sessions: 24,
      icon: Target
    },
    {
      name: "Tactical Intelligence",
      focus: "Positioning, decision making, game reading",
      duration: "6 weeks",
      level: "Intermediate+",
      price: "$249",
      sessions: 18,
      icon: Zap
    },
    {
      name: "Speed & Agility",
      focus: "Acceleration, change of direction, endurance",
      duration: "8 weeks",
      level: "All Levels",
      price: "$179",
      sessions: 24,
      icon: TrendingUp
    },
    {
      name: "Goalkeeper Academy",
      focus: "Shot stopping, distribution, positioning",
      duration: "10 weeks",
      level: "Position Specific",
      price: "$299",
      sessions: 30,
      icon: Award
    },
    {
      name: "Striker's Finishing",
      focus: "Shooting, movement, composure",
      duration: "6 weeks",
      level: "Position Specific",
      price: "$229",
      sessions: 18,
      icon: Target
    },
    {
      name: "Mental Performance",
      focus: "Confidence, focus, pressure handling",
      duration: "8 weeks",
      level: "All Levels",
      price: "$149",
      sessions: 16,
      icon: Star
    }
  ];

  const stats = [
    { label: "Players", value: "85,000+", icon: Users },
    { label: "Scouts", value: "1,800+", icon: Eye },
    { label: "MLS Signings", value: "450+", icon: Trophy },
    { label: "Tournaments", value: "300+", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-gray-900 to-gray-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 md:px-5">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
                ⚽ POWERED BY ATHLYNX
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                PITCH
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">
                  PULSE
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 mb-6">
                The complete soccer ecosystem. Player rankings, tournaments, 
                training programs, and the pathway to professional soccer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3">
                  Create Player Profile
                </Button>
                <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20">
                  Scout Access
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              {stats.map((stat, i) => (
                <Card key={i} className="bg-white/5 border-emerald-500/30">
                  <CardContent className="p-4 text-center">
                    <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/50 text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="container px-4 md:px-5 pb-16">
        <Tabs defaultValue="rankings" className="w-full">
          <TabsList className="flex flex-wrap justify-center bg-white/5 border border-white/10 rounded-xl p-1 mb-8 gap-1">
            <TabsTrigger value="rankings" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" /> Rankings
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" /> Tournaments
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" /> Training
            </TabsTrigger>
            <TabsTrigger value="recruiting" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" /> Recruiting
            </TabsTrigger>
          </TabsList>

          {/* Rankings Tab */}
          <TabsContent value="rankings">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <Input
                  placeholder="Search players by name, school, or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos.toLowerCase()}>{pos}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-36 bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                  <SelectItem value="2028">2028</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Player Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPlayers.map((player, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        #{i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-bold group-hover:text-emerald-400 transition-colors">
                            {player.name}
                          </h3>
                          <Badge className="bg-emerald-500/20 text-emerald-400">{player.rating}</Badge>
                        </div>
                        <p className="text-white/50 text-sm">{player.position} • {player.school}</p>
                        <p className="text-white/40 text-xs">{player.state} • Class of {player.class}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <p className="text-emerald-400 font-bold">{player.goals}</p>
                        <p className="text-white/40 text-xs">Goals</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lime-400 font-bold">{player.assists}</p>
                        <p className="text-white/40 text-xs">Assists</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold">{player.gamesPlayed}</p>
                        <p className="text-white/40 text-xs">Games</p>
                      </div>
                    </div>

                    {player.commitment && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <Badge className="bg-blue-500/20 text-blue-400 w-full justify-center">
                          ✓ Committed: {player.commitment}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20">
                View Full Rankings <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </TabsContent>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tournaments.map((tournament, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-emerald-500/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-white text-lg">{tournament.name}</CardTitle>
                      <Badge className={
                        tournament.status === "Registration Open" 
                          ? "bg-green-500/20 text-green-400" 
                          : tournament.status === "Invitational"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }>
                        {tournament.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        {tournament.date}
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        {tournament.location}
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Users className="w-4 h-4 text-emerald-400" />
                        {tournament.teams} Teams
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        {tournament.prize}
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Host Your Tournament</h3>
                <p className="text-white/60 mb-4">
                  Partner with Pitch Pulse to manage registrations, schedules, and live scoring.
                </p>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
                  Tournament Director Portal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainingPrograms.map((program, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-emerald-500/50 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                        <program.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{program.name}</CardTitle>
                        <Badge className="bg-white/10 text-white/60 text-xs">{program.level}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60 text-sm mb-4">{program.focus}</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-white/50">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {program.duration}
                      </span>
                      <span className="text-white/50">{program.sessions} sessions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">{program.price}</span>
                      <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Training Bot */}
            <Card className="mt-8 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 border-purple-500/30">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="bg-purple-500/20 text-purple-400 mb-4">AI-POWERED</Badge>
                    <h3 className="text-2xl font-bold text-white mb-4">Personal Training AI</h3>
                    <p className="text-white/70 mb-4">
                      Get personalized training recommendations based on your position, 
                      playing style, and development goals. Our AI analyzes your performance 
                      data to create custom training plans.
                    </p>
                    <Button className="bg-purple-500 hover:bg-purple-400 text-white">
                      Start AI Assessment
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Zap className="w-16 h-16 text-purple-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recruiting Tab */}
          <TabsContent value="recruiting">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">College Recruiting</h2>
                <p className="text-white/70 mb-6">
                  Connect with college coaches from D1, D2, D3, NAIA, and junior colleges. 
                  Our platform helps you navigate the recruiting process and find the right fit.
                </p>

                <div className="space-y-4">
                  {[
                    { title: "Profile Optimization", desc: "Build a recruiting profile that stands out to coaches" },
                    { title: "Coach Connections", desc: "Direct messaging with verified college coaches" },
                    { title: "Highlight Reels", desc: "Create and share professional highlight videos" },
                    { title: "Camp Invitations", desc: "Receive invitations to college ID camps and showcases" },
                    { title: "Scholarship Tracker", desc: "Track offers and compare scholarship packages" },
                    { title: "Commitment Portal", desc: "Announce your commitment through our platform" }
                  ].map((item, i) => (
                    <Card key={i} className="bg-white/5 border-white/10">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{item.title}</h3>
                          <p className="text-white/50 text-sm">{item.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card className="bg-white/5 border-white/10 mb-6">
                  <CardHeader>
                    <CardTitle className="text-white">Professional Pathways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { league: "MLS", teams: 29, drafted: 156 },
                        { league: "USL Championship", teams: 24, drafted: 89 },
                        { league: "MLS NEXT Pro", teams: 27, drafted: 124 },
                        { league: "European Academies", teams: 50, drafted: 45 }
                      ].map((path, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white font-semibold">{path.league}</p>
                            <p className="text-white/50 text-sm">{path.teams} teams tracking</p>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-400">
                            {path.drafted} signed
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500/20 to-lime-500/20 border-emerald-500/30">
                  <CardContent className="p-6">
                    <Trophy className="w-10 h-10 text-yellow-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Pro Day Events</h3>
                    <p className="text-white/70 mb-4">
                      Showcase your skills in front of MLS scouts and international clubs 
                      at our exclusive Pro Day events.
                    </p>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white">
                      View Upcoming Pro Days
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* White-Label CTA */}
      <section className="container px-4 md:px-5 py-16 border-t border-white/10">
        <div className="bg-gradient-to-r from-emerald-600 to-lime-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            License Pitch Pulse for Your Club
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            White-label our complete soccer platform for your club, academy, or league.
            Custom branding, dedicated support, and full data ownership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/partner-portal">
              <Button className="bg-white text-emerald-600 font-bold px-8 py-3 hover:bg-gray-100">
                Partner With Us
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-3">
              Download Media Kit
            </Button>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
