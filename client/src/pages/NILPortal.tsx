import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Send, Users, TrendingUp, Zap, Menu, Home, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Demo posts for display
const demoPosts = [
  {
    id: 1,
    userName: "Marcus Johnson",
    userRole: "QB | Alabama",
    content: "Just signed my first NIL deal with Nike! Dreams do come true. Stay focused, stay humble. 🏈 #NIL #RollTide",
    likes: 1247,
    comments: 89,
    timeAgo: "2 hours ago",
    isLiked: false,
  },
  {
    id: 2,
    userName: "Sarah Williams",
    userRole: "PG | UConn",
    content: "Training session complete! Working on my handles every single day. The grind never stops. 💪🏀",
    likes: 892,
    comments: 45,
    timeAgo: "4 hours ago",
    isLiked: true,
  },
  {
    id: 3,
    userName: "Tyler Rodriguez",
    userRole: "SS | Vanderbilt",
    content: "Excited to announce my partnership with Gatorade! Thank you to everyone who believed in me. This is just the beginning. ⚾️",
    likes: 2103,
    comments: 156,
    timeAgo: "6 hours ago",
    isLiked: false,
  },
];

const trendingDeals = [
  { brand: "Nike", athlete: "Marcus Johnson", value: "$50K", sport: "Football" },
  { brand: "Gatorade", athlete: "Tyler Rodriguez", value: "$35K", sport: "Baseball" },
  { brand: "Beats", athlete: "Sarah Williams", value: "$25K", sport: "Basketball" },
];

export default function NILPortal() {
  const { user } = useAuth();
  const [newPostContent, setNewPostContent] = useState("");
  const [activeTab, setActiveTab] = useState<"feed" | "discover" | "deals">("feed");
  const [posts, setPosts] = useState(demoPosts);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    const newPost = {
      id: Date.now(),
      userName: user?.name || "You",
      userRole: "Athlete",
      content: newPostContent,
      likes: 0,
      comments: 0,
      timeAgo: "Just now",
      isLiked: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLikeToggle = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Navigation items for hamburger menu
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/nil-portal", label: "NIL Portal", icon: Users },
    { href: "/messenger", label: "Messenger", icon: MessageCircle },
    { href: "/diamond-grind", label: "Diamond Grind", icon: Zap },
    { href: "/transfer-portal", label: "Transfer Portal", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <ArrowLeft className="w-6 h-6 text-cyan-400 cursor-pointer hover:text-cyan-300" />
            </Link>
            <img src="/nil-portal-n-white.jpeg" alt="NIL Portal" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="text-xl font-bold text-white">NIL PORTAL</h1>
              <p className="text-xs text-cyan-400">The Athlete's Social Network</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 hidden sm:flex">
                    Dashboard
                  </Button>
                </Link>
                <Avatar className="w-8 h-8 bg-cyan-500">
                  <AvatarFallback className="bg-cyan-500 text-white text-sm">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Link href="/">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  Join Now
                </Button>
              </Link>
            )}
            
            {/* Hamburger Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-cyan-400">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-900 border-cyan-500/30 w-72">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/dhg-crab-shield.png" alt="ATHLYNX" className="w-12 h-12" />
                    <div>
                      <h2 className="text-lg font-bold text-white">ATHLYNX</h2>
                      <p className="text-xs text-cyan-400">The Athlete's Playbook</p>
                    </div>
                  </div>
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyan-500/20 cursor-pointer transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-white font-medium">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-3 space-y-4 hidden lg:block">
            {user && (
              <Card className="bg-gray-800/50 border-cyan-500/30">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold text-white">Your Stats</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Posts</span>
                    <span className="text-cyan-400 font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Followers</span>
                    <span className="text-cyan-400 font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Following</span>
                    <span className="text-cyan-400 font-bold">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Level</span>
                    <span className="text-yellow-400 font-bold">Lv. 5</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Links */}
            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardContent className="py-4 space-y-2">
                <Link href="/diamond-grind">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-500/20 cursor-pointer transition">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">Diamond Grind</span>
                  </div>
                </Link>
                <Link href="/messenger">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-500/20 cursor-pointer transition">
                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">Messenger</span>
                  </div>
                </Link>
                <Link href="/transfer-portal">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-500/20 cursor-pointer transition">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">Transfer Portal</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-4">
            {/* Tabs */}
            <div className="flex gap-2 bg-gray-800/50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("feed")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  activeTab === "feed" ? "bg-cyan-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Feed
              </button>
              <button
                onClick={() => setActiveTab("discover")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  activeTab === "discover" ? "bg-cyan-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => setActiveTab("deals")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  activeTab === "deals" ? "bg-cyan-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                NIL Deals
              </button>
            </div>

            {/* Create Post */}
            {user && (
              <Card className="bg-gray-800/50 border-cyan-500/30">
                <CardContent className="pt-4">
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10 bg-cyan-500">
                      <AvatarFallback className="bg-cyan-500 text-white">
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Share your journey, achievements, or NIL updates..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 min-h-[80px] resize-none"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
                            📷 Photo
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
                            🎥 Video
                          </Button>
                        </div>
                        <Button
                          onClick={handleCreatePost}
                          disabled={!newPostContent.trim()}
                          className="bg-cyan-500 hover:bg-cyan-600"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Feed Posts */}
            {activeTab === "feed" && (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="bg-gray-800/50 border-cyan-500/30 hover:border-cyan-500/50 transition">
                    <CardContent className="pt-4">
                      <div className="flex gap-3">
                        <Avatar className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500">
                          <AvatarFallback className="text-white">
                            {post.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{post.userName}</span>
                            <span className="text-cyan-400 text-sm">{post.userRole}</span>
                          </div>
                          <span className="text-gray-500 text-xs">{post.timeAgo}</span>
                          <p className="mt-2 text-gray-200">{post.content}</p>
                          <div className="flex items-center gap-6 mt-4">
                            <button 
                              onClick={() => handleLikeToggle(post.id)}
                              className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition`}
                            >
                              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition">
                              <MessageCircle className="w-5 h-5" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition">
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Deals Tab */}
            {activeTab === "deals" && (
              <div className="space-y-4">
                <Card className="bg-gray-800/50 border-cyan-500/30">
                  <CardHeader>
                    <h3 className="text-lg font-bold text-white">🔥 Trending NIL Deals</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {trendingDeals.map((deal, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="font-bold text-white">{deal.athlete}</p>
                          <p className="text-sm text-cyan-400">{deal.brand} • {deal.sport}</p>
                        </div>
                        <span className="text-green-400 font-bold">{deal.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Discover Tab */}
            {activeTab === "discover" && (
              <div className="space-y-4">
                <Card className="bg-gray-800/50 border-cyan-500/30">
                  <CardHeader>
                    <h3 className="text-lg font-bold text-white">🌟 Athletes to Follow</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {["Marcus Johnson - QB | Alabama", "Sarah Williams - PG | UConn", "Tyler Rodriguez - SS | Vanderbilt"].map((athlete, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500">
                            <AvatarFallback className="text-white">{athlete.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-white">{athlete}</span>
                        </div>
                        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">Follow</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4 hidden lg:block">
            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardHeader>
                <h3 className="text-lg font-bold text-white">🔥 Trending</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-cyan-400">#NILDeals</div>
                <div className="text-cyan-400">#CollegeAthletes</div>
                <div className="text-cyan-400">#TransferPortal</div>
                <div className="text-cyan-400">#DiamondGrind</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardContent className="py-4">
                <p className="text-gray-400 text-sm text-center">
                  © 2025 ATHLYNX<br/>
                  A Dozier Holdings Group Company
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
