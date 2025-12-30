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
  Fish, 
  MapPin, 
  Trophy, 
  Calendar, 
  Star, 
  Search,
  Filter,
  ShoppingBag,
  Cloud,
  Waves,
  Anchor,
  Target,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  Play,
  Bot,
  TrendingUp,
  Award
} from "lucide-react";

export default function ReelMasters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const stats = [
    { value: "250K+", label: "Anglers", icon: Users },
    { value: "15K+", label: "Tournaments", icon: Trophy },
    { value: "50K+", label: "Fishing Spots", icon: MapPin },
    { value: "$5M+", label: "Prize Money", icon: DollarSign },
  ];

  const tournaments = [
    { name: "Bassmaster Classic 2026", location: "Lake Guntersville, AL", date: "Mar 15-17, 2026", prize: "$1,000,000", spots: "50/100", status: "Open" },
    { name: "FLW Pro Circuit", location: "Lake Okeechobee, FL", date: "Feb 20-22, 2026", prize: "$500,000", spots: "75/150", status: "Open" },
    { name: "Major League Fishing", location: "Sam Rayburn, TX", date: "Apr 5-7, 2026", prize: "$750,000", spots: "25/80", status: "Open" },
    { name: "Redfish Cup Championship", location: "Louisiana Coast", date: "May 10-12, 2026", prize: "$250,000", spots: "40/60", status: "Open" },
  ];

  const proAnglers = [
    { name: "Kevin VanDam", nickname: "KVD", species: "Bass", earnings: "$7.2M", wins: 25, rank: 1, rating: 4.9 },
    { name: "Bill Dance", nickname: "Legend", species: "Bass", earnings: "$5.8M", wins: 23, rank: 2, rating: 4.9 },
    { name: "Roland Martin", nickname: "Mr. Bass", species: "Bass", earnings: "$4.5M", wins: 19, rank: 3, rating: 4.8 },
    { name: "Jacob Wheeler", nickname: "The Kid", species: "Bass", earnings: "$3.2M", wins: 12, rank: 4, rating: 4.8 },
  ];

  const fishingSpots = [
    { name: "Lake Fork", state: "Texas", species: ["Largemouth Bass", "Catfish"], rating: 4.9, reviews: 2500 },
    { name: "Lake Okeechobee", state: "Florida", species: ["Largemouth Bass", "Crappie"], rating: 4.8, reviews: 1800 },
    { name: "Clear Lake", state: "California", species: ["Largemouth Bass", "Catfish"], rating: 4.7, reviews: 1200 },
    { name: "Lake Guntersville", state: "Alabama", species: ["Largemouth Bass", "Striped Bass"], rating: 4.9, reviews: 2100 },
  ];

  const gearCategories = [
    { name: "Rods & Reels", count: 450, icon: "🎣" },
    { name: "Tackle & Lures", count: 1200, icon: "🪱" },
    { name: "Electronics", count: 180, icon: "📡" },
    { name: "Boats & Kayaks", count: 95, icon: "🚤" },
    { name: "Apparel", count: 320, icon: "👕" },
    { name: "Accessories", count: 580, icon: "🎒" },
  ];

  const partners = [
    { name: "Bass Pro Shops", logo: "🏪" },
    { name: "Shimano", logo: "⚙️" },
    { name: "Abu Garcia", logo: "🎣" },
    { name: "Garmin", logo: "📡" },
    { name: "Lowrance", logo: "🔊" },
    { name: "Rapala", logo: "🐟" },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d2847 50%, #061424 100%)' }}>
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDE1MCwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container relative py-16 px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Fish className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold">REEL MASTERS</span>
              <Badge className="bg-cyan-500 text-black text-xs">POWERED BY ATHLYNX</Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              THE ULTIMATE
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
                FISHING PLATFORM
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
              Tournaments. Pro Rankings. Fishing Spots. Gear Marketplace. AI Fishing Guide.
              Everything an angler needs in one platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-6 text-lg">
                <Trophy className="w-5 h-5 mr-2" /> Join Tournament
              </Button>
              <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 px-8 py-6 text-lg">
                <MapPin className="w-5 h-5 mr-2" /> Find Fishing Spots
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="container px-5 py-12">
        <Tabs defaultValue="tournaments" className="w-full">
          <TabsList className="grid grid-cols-5 bg-white/5 border border-white/10 rounded-xl p-1 mb-8">
            <TabsTrigger value="tournaments" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" /> Tournaments
            </TabsTrigger>
            <TabsTrigger value="anglers" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" /> Pro Anglers
            </TabsTrigger>
            <TabsTrigger value="spots" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <MapPin className="w-4 h-4 mr-2" /> Fishing Spots
            </TabsTrigger>
            <TabsTrigger value="gear" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <ShoppingBag className="w-4 h-4 mr-2" /> Gear Shop
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Bot className="w-4 h-4 mr-2" /> AI Guide
            </TabsTrigger>
          </TabsList>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upcoming Tournaments</h2>
                <Button variant="outline" className="border-blue-500/50 text-blue-400">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              {tournaments.map((tournament, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
                        <div className="flex flex-wrap gap-4 text-white/60 text-sm">
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {tournament.location}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {tournament.date}</span>
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {tournament.spots} spots</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-400">{tournament.prize}</p>
                          <p className="text-white/50 text-sm">Prize Pool</p>
                        </div>
                        <Button className="bg-blue-500 hover:bg-blue-400">Register</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pro Anglers Tab */}
          <TabsContent value="anglers">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Pro Angler Rankings</h2>
              
              {proAnglers.map((angler, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                          angler.rank === 1 ? 'bg-yellow-500 text-black' :
                          angler.rank === 2 ? 'bg-gray-400 text-black' :
                          angler.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          #{angler.rank}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{angler.name}</h3>
                          <p className="text-white/50 text-sm">"{angler.nickname}" • {angler.species} Specialist</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-xl font-bold text-green-400">{angler.earnings}</p>
                          <p className="text-white/50 text-xs">Career Earnings</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-blue-400">{angler.wins}</p>
                          <p className="text-white/50 text-xs">Tournament Wins</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-bold">{angler.rating}</span>
                        </div>
                        <Button variant="outline" className="border-blue-500/50 text-blue-400">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fishing Spots Tab */}
          <TabsContent value="spots">
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input 
                    placeholder="Search fishing spots..." 
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {fishingSpots.map((spot, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-blue-500/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{spot.name}</h3>
                          <p className="text-white/50">{spot.state}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400 font-bold">{spot.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {spot.species.map((s, j) => (
                          <Badge key={j} className="bg-blue-500/20 text-blue-400">{s}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/50 text-sm">{spot.reviews.toLocaleString()} reviews</span>
                        <Button variant="outline" className="border-blue-500/50 text-blue-400">
                          <MapPin className="w-4 h-4 mr-1" /> View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Gear Shop Tab */}
          <TabsContent value="gear">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Fishing Gear Marketplace</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {gearCategories.map((cat, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-blue-500/50 transition-all cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <span className="text-4xl block mb-3">{cat.icon}</span>
                      <h3 className="text-white font-bold mb-1">{cat.name}</h3>
                      <p className="text-white/50 text-sm">{cat.count} items</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Partners */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Official Partners</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {partners.map((partner, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex items-center gap-3">
                      <span className="text-3xl">{partner.logo}</span>
                      <span className="text-white font-semibold">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <Link href="/store">
                  <Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3">
                    <ShoppingBag className="w-5 h-5 mr-2" /> Visit Full Store
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* AI Guide Tab */}
          <TabsContent value="ai">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">AI Fishing Guide</h2>
                  <p className="text-white/70 mb-6">
                    Get personalized fishing recommendations, weather analysis, best times to fish,
                    lure suggestions, and expert tips powered by AI.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-4">
                      <Cloud className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-white text-sm">Weather Analysis</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <Waves className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                      <p className="text-white text-sm">Tide Predictions</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <p className="text-white text-sm">Lure Recommendations</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <p className="text-white text-sm">Best Times to Fish</p>
                    </div>
                  </div>
                  <Link href="/ai-training-bot">
                    <Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3">
                      <Bot className="w-5 h-5 mr-2" /> Start AI Fishing Guide
                    </Button>
                  </Link>
                  <p className="text-white/50 text-sm mt-4">Uses 5 AI Credits per session</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="container px-5 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Reel in Success?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join 250,000+ anglers on the ultimate fishing platform. 
            Tournaments, gear, spots, and AI-powered guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-blue-600 font-bold px-8 py-3 hover:bg-gray-100">
              Create Free Account
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-3">
              Explore Platform
            </Button>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
