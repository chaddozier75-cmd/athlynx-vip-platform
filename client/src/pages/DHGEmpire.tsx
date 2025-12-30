import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Building2, Users, Cpu, Home, Utensils, Wine, Heart, TreePine, Zap, Database, 
  Coins, Globe, ChevronRight, ExternalLink, Trophy, Dumbbell, Shield, Briefcase,
  Bitcoin, Server, Leaf, Music, Film, Plane, GraduationCap, Landmark, 
  TrendingUp, Target, Crown, Star, Rocket, MapPin, Phone, Mail
} from 'lucide-react';

type Division = 'all' | 'sports' | 'technology' | 'realestate' | 'hospitality' | 'healthcare' | 'finance';

interface Subsidiary {
  name: string;
  shortName: string;
  division: Division;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'development' | 'planned';
  link?: string;
  ceo?: string;
  highlight?: string;
}

const subsidiaries: Subsidiary[] = [
  // Sports & Entertainment Division
  {
    name: 'ATHLYNX - The Athlete\'s Playbook',
    shortName: 'ATHLYNX',
    division: 'sports',
    description: 'Complete athlete ecosystem: NIL deals, training, recruiting, transfer portal, messaging - all in one platform',
    icon: <Trophy className="w-6 h-6" />,
    status: 'active',
    link: '/',
    highlight: 'FLAGSHIP PRODUCT'
  },
  {
    name: 'Diamond Grind - Baseball Platform',
    shortName: 'Diamond Grind',
    division: 'sports',
    description: 'White-label baseball platform with player rankings, tournaments, training programs, and recruiting',
    icon: <Dumbbell className="w-6 h-6" />,
    status: 'active',
    link: '/diamond-grind'
  },
  {
    name: 'NIL Portal & Marketplace',
    shortName: 'NIL Portal',
    division: 'sports',
    description: 'Name, Image, Likeness deal marketplace connecting athletes with brands for endorsements',
    icon: <Briefcase className="w-6 h-6" />,
    status: 'active',
    link: '/nil-portal'
  },
  {
    name: 'Court Kings - Basketball',
    shortName: 'Court Kings',
    division: 'sports',
    description: 'White-label basketball platform with AAU tournaments, camps, and player development',
    icon: <Trophy className="w-6 h-6" />,
    status: 'active',
    link: '/court-kings'
  },
  {
    name: 'Gridiron Nexus - Football',
    shortName: 'Gridiron Nexus',
    division: 'sports',
    description: 'White-label football platform with 7-on-7 leagues, combines, and recruiting compliance',
    icon: <Shield className="w-6 h-6" />,
    status: 'active',
    link: '/gridiron-nexus'
  },
  {
    name: 'Pitch Pulse - Soccer',
    shortName: 'Pitch Pulse',
    division: 'sports',
    description: 'White-label soccer platform with club management, tournaments, and international scouting',
    icon: <Globe className="w-6 h-6" />,
    status: 'active',
    link: '/pitch-pulse'
  },
  {
    name: 'Reel Masters - Fishing',
    shortName: 'Reel Masters',
    division: 'sports',
    description: 'Professional fishing platform with tournaments, gear marketplace, and guide services',
    icon: <Plane className="w-6 h-6" />,
    status: 'active',
    link: '/reel-masters'
  },
  {
    name: 'Hunt Pro - Hunting',
    shortName: 'Hunt Pro',
    division: 'sports',
    description: 'Hunting platform with Sitka gear integration, outfitter bookings, and conservation programs',
    icon: <TreePine className="w-6 h-6" />,
    status: 'active',
    link: '/hunt-pro'
  },
  {
    name: 'Fairway Elite - Golf',
    shortName: 'Fairway Elite',
    division: 'sports',
    description: 'Golf platform with course bookings, tournaments, instruction, and equipment marketplace',
    icon: <Target className="w-6 h-6" />,
    status: 'active',
    link: '/fairway-elite'
  },
  // Technology Division
  {
    name: 'Softmor, Inc.',
    shortName: 'Softmor',
    division: 'technology',
    description: 'Enterprise technology solutions, AI infrastructure, and software development - NVIDIA Elite Partner',
    icon: <Cpu className="w-6 h-6" />,
    status: 'active',
    link: '/softmor',
    highlight: 'NVIDIA ELITE PARTNER'
  },
  {
    name: 'VC Technologies, LLC',
    shortName: 'VC Tech',
    division: 'technology',
    description: 'R&D technologies, data center design, cryptocurrency & trading platform development',
    icon: <Server className="w-6 h-6" />,
    status: 'active'
  },
  {
    name: 'VC Data Centers, LLC',
    shortName: 'VC Data',
    division: 'technology',
    description: 'Build and operate data centers with 97% uptime, immersion cooling technology',
    icon: <Database className="w-6 h-6" />,
    status: 'active',
    link: '/bitcoin-mining'
  },
  {
    name: 'VC Energy, LLC',
    shortName: 'VC Energy',
    division: 'technology',
    description: 'Generate and supply low-cost renewable power for data centers and real estate projects',
    icon: <Zap className="w-6 h-6" />,
    status: 'development'
  },
  {
    name: 'FuelBots AI Platform',
    shortName: 'FuelBots',
    division: 'technology',
    description: 'AI-powered automation bots for customer service, sales, analytics, and operations',
    icon: <Cpu className="w-6 h-6" />,
    status: 'active',
    link: '/fuelbots'
  },
  // Finance Division
  {
    name: 'The VIRT, LLC',
    shortName: 'VIRT',
    division: 'finance',
    description: 'Proprietary cryptocurrency with tokenized mining exposure and smart contract rewards',
    icon: <Bitcoin className="w-6 h-6" />,
    status: 'active',
    link: '/bitcoin-mining',
    highlight: 'BITCOIN MINING'
  },
  {
    name: 'Bitcoin Mining Facility',
    shortName: 'BTC Mining',
    division: 'finance',
    description: '97% uptime, immersion cooling, 1,000+ kW capacity, 16.6 month ROI',
    icon: <Coins className="w-6 h-6" />,
    status: 'active',
    link: '/bitcoin-mining'
  },
  // Real Estate Division
  {
    name: 'Uma Real Estate Investment, LLC',
    shortName: 'UMA',
    division: 'realestate',
    description: 'Land acquisitions and development for DHG businesses near Livingston and Trinity River, Houston',
    icon: <Building2 className="w-6 h-6" />,
    status: 'active'
  },
  {
    name: 'Serenity Memorial Services',
    shortName: 'Serenity',
    division: 'realestate',
    description: '$13B funeral industry opportunity - First funeral home in Orange Beach, Alabama',
    icon: <Leaf className="w-6 h-6" />,
    status: 'development',
    link: '/serenity-memorial',
    ceo: 'Bailey Boyd',
    highlight: '$650K INVESTMENT'
  },
  // Hospitality Division
  {
    name: 'Pisces Resort, LLC',
    shortName: 'Pisces Resort',
    division: 'hospitality',
    description: 'Luxury resort with spa, gym, swimming, fishing, prefab cabins - Texas forest setting',
    icon: <TreePine className="w-6 h-6" />,
    status: 'planned'
  },
  {
    name: 'Venus Venue & Vineyard, LLC',
    shortName: 'Venus Venue',
    division: 'hospitality',
    description: 'Glass chapel weddings, premium wine production, Friends of Venus subscription',
    icon: <Wine className="w-6 h-6" />,
    status: 'planned'
  },
  {
    name: 'Pomodoro Restaurant, LLC',
    shortName: 'Pomodoro',
    division: 'hospitality',
    description: 'Award-winning Italian fine dining with event center and catering services',
    icon: <Utensils className="w-6 h-6" />,
    status: 'planned'
  },
  // Healthcare Division
  {
    name: 'Villa Agape, LLC',
    shortName: 'Villa Agape',
    division: 'healthcare',
    description: 'Home-away-from-home for cancer patients with IoT health monitoring and 24/7 care',
    icon: <Heart className="w-6 h-6" />,
    status: 'development'
  },
  {
    name: 'Compassionate Care, LLC',
    shortName: 'Compassionate Care',
    division: 'healthcare',
    description: 'On-site clinic at Villa Agape with licensed healthcare professionals',
    icon: <Heart className="w-6 h-6" />,
    status: 'development'
  },
  {
    name: 'Wellness & Performance Portal',
    shortName: 'Wellness Portal',
    division: 'healthcare',
    description: 'Mental health & physical wellness education for athletes, executives, military, medical professionals',
    icon: <GraduationCap className="w-6 h-6" />,
    status: 'active',
    link: '/wellness-portal'
  }
];

const leadership = [
  {
    name: 'Chad A. Dozier',
    title: 'Chairman & President',
    role: 'Founder & CEO',
    phone: '+1-601-498-5282',
    email: 'cdozier@dozierholdingsgroup.com'
  },
  {
    name: 'Glenn Tse',
    title: 'Vice President of Business Development',
    role: 'CFO & COO',
    phone: '+1-832-620-6389',
    email: 'gtse@dozierholdingsgroup.com'
  },
  {
    name: 'Jimmy Boyd',
    title: 'Vice President of Property Development',
    role: 'Real Estate',
    phone: '',
    email: ''
  },
  {
    name: 'Andrew Kustes',
    title: 'Vice President of Technology',
    role: 'CTO',
    phone: '',
    email: ''
  }
];

const divisionColors: Record<Division, string> = {
  all: 'from-cyan-500 to-blue-500',
  sports: 'from-orange-500 to-red-500',
  technology: 'from-cyan-500 to-blue-500',
  realestate: 'from-emerald-500 to-teal-500',
  hospitality: 'from-purple-500 to-pink-500',
  healthcare: 'from-rose-500 to-red-500',
  finance: 'from-amber-500 to-yellow-500'
};

const divisionLabels: Record<Division, string> = {
  all: 'All Divisions',
  sports: 'Sports & Entertainment',
  technology: 'Technology',
  realestate: 'Real Estate',
  hospitality: 'Hospitality',
  healthcare: 'Healthcare',
  finance: 'Finance & Crypto'
};

export default function DHGEmpire() {
  const [selectedDivision, setSelectedDivision] = useState<Division>('all');

  const filteredSubsidiaries = selectedDivision === 'all' 
    ? subsidiaries 
    : subsidiaries.filter(s => s.division === selectedDivision);

  const stats = [
    { value: '15+', label: 'Subsidiaries', icon: Building2 },
    { value: '6', label: 'Divisions', icon: Landmark },
    { value: '$50M+', label: 'Revenue Target', icon: TrendingUp },
    { value: '2025', label: 'Founded', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 md:px-5">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4 animate-pulse">
              <Crown className="w-3 h-3 mr-1" /> THE BUSINESS ROMAN EMPIRE
            </Badge>
            
            {/* DHG Crab Logo */}
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-full h-full bg-slate-900 rounded-full border-4 border-cyan-400 flex items-center justify-center">
                <img src="/dhg-crab-logo.png" alt="DHG" className="w-20 h-20 object-contain" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-4xl font-bold text-cyan-400">DHG</span>';
                }} />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Dozier Holdings Group
            </h1>
            <p className="text-xl text-cyan-400 mb-6">
              Building Tomorrow's Empire Today
            </p>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              A diversified conglomerate spanning sports technology, AI infrastructure, real estate, 
              hospitality, healthcare, and cryptocurrency. From athletes to data centers, 
              we're building the future.
            </p>

            <a href="https://dozierholdingsgroup.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold">
                <ExternalLink className="w-4 h-4 mr-2" /> dozierholdingsgroup.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container px-4 md:px-5 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="container px-4 md:px-5 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Executive Leadership</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {leadership.map((leader, i) => (
            <Card key={i} className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-white font-bold">{leader.name}</h3>
                <p className="text-cyan-400 text-sm mb-2">{leader.title}</p>
                {leader.phone && (
                  <p className="text-white/50 text-xs flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3" /> {leader.phone}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Division Filter */}
      <section className="container px-4 md:px-5 pb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {(Object.keys(divisionLabels) as Division[]).map((div) => (
            <Button
              key={div}
              variant={selectedDivision === div ? "default" : "outline"}
              onClick={() => setSelectedDivision(div)}
              className={selectedDivision === div 
                ? `bg-gradient-to-r ${divisionColors[div]} text-white border-0` 
                : "border-white/20 text-white/70 hover:text-white hover:bg-white/10"
              }
            >
              {divisionLabels[div]}
            </Button>
          ))}
        </div>
      </section>

      {/* Subsidiaries Grid */}
      <section className="container px-4 md:px-5 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubsidiaries.map((sub, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden">
              {sub.highlight && (
                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${divisionColors[sub.division]} rounded-bl-lg`}>
                  {sub.highlight}
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${divisionColors[sub.division]} flex items-center justify-center text-white flex-shrink-0`}>
                    {sub.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold truncate">{sub.shortName}</h3>
                      <Badge variant="outline" className={`text-xs ${
                        sub.status === 'active' ? 'border-green-500 text-green-400' :
                        sub.status === 'development' ? 'border-yellow-500 text-yellow-400' :
                        'border-gray-500 text-gray-400'
                      }`}>
                        {sub.status}
                      </Badge>
                    </div>
                    <p className="text-white/60 text-sm mb-3">{sub.description}</p>
                    {sub.ceo && (
                      <p className="text-cyan-400 text-xs mb-2">CEO: {sub.ceo}</p>
                    )}
                    {sub.link ? (
                      <Link href={sub.link}>
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto">
                          View Details <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    ) : (
                      <span className="text-white/40 text-sm">Coming Soon</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vision Statement */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
          <CardContent className="p-8 md:p-12 text-center">
            <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              "Like Amazon Started with Books, We Start with Athletes"
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto mb-6">
              Jeff Bezos built an empire from selling books. Ray Kroc built McDonald's from ice cream machines 
              into the world's largest real estate company. We're building DHG from sports technology into a 
              diversified conglomerate that touches every aspect of life - from the games you play to the 
              technology you use to the places you stay.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/investor-hub">
                <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
                  <TrendingUp className="w-4 h-4 mr-2" /> Investor Information
                </Button>
              </Link>
              <Link href="/team">
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20">
                  <Users className="w-4 h-4 mr-2" /> Meet the Team
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact */}
      <section className="container px-4 md:px-5 py-16 border-t border-white/10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Partner With Us</h2>
          <p className="text-white/60 mb-6">
            Interested in investing, partnering, or joining the DHG family?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:sales@dozierholdingsgroup.com">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold">
                <Mail className="w-4 h-4 mr-2" /> sales@dozierholdingsgroup.com
              </Button>
            </a>
            <a href="https://dozierholdingsgroup.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20">
                <Globe className="w-4 h-4 mr-2" /> dozierholdingsgroup.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
