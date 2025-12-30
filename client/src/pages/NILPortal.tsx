import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Send, Users, TrendingUp, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NILPortal() {
  const { user } = useAuth();
  const [newPostContent, setNewPostContent] = useState("");
  const [activeTab, setActiveTab] = useState<"feed" | "discover" | "deals">("feed");

  // Queries
  const { data: feed, isLoading: feedLoading, refetch: refetchFeed } = trpc.social.getFeed.useQuery(
    { limit: 20, offset: 0 },
    { enabled: !!user }
  );
  const { data: publicFeed, isLoading: publicLoading } = trpc.social.getPublicFeed.useQuery(
    { limit: 20, offset: 0 },
    { enabled: !user }
  );
  const { data: myStats } = trpc.social.getMyStats.useQuery(undefined, { enabled: !!user });
  const { data: suggestedUsers } = trpc.social.getSuggestedUsers.useQuery(
    { limit: 5 },
    { enabled: !!user }
  );

  // Mutations
  const createPost = trpc.social.createPost.useMutation({
    onSuccess: () => {
      setNewPostContent("");
      refetchFeed();
    },
  });
  const likePost = trpc.social.likePost.useMutation({ onSuccess: () => refetchFeed() });
  const unlikePost = trpc.social.unlikePost.useMutation({ onSuccess: () => refetchFeed() });
  const followUser = trpc.social.followUser.useMutation();

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    createPost.mutate({
      content: newPostContent,
      postType: "status",
      sourceApp: "nil_portal",
    });
  };

  const handleLikeToggle = (postId: number, isLiked: boolean) => {
    if (isLiked) {
      unlikePost.mutate({ postId });
    } else {
      likePost.mutate({ postId });
    }
  };

  const displayFeed = user ? feed : publicFeed;
  const isLoadingFeed = user ? feedLoading : publicLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
                  <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20">
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
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-3 space-y-4">
            {user && myStats && (
              <Card className="bg-gray-800/50 border-cyan-500/30">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold text-white">Your Stats</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Posts</span>
                    <span className="text-cyan-400 font-bold">{myStats.postsCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Followers</span>
                    <span className="text-cyan-400 font-bold">{myStats.followersCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Following</span>
                    <span className="text-cyan-400 font-bold">{myStats.followingCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Level</span>
                    <span className="text-yellow-400 font-bold">Lv. {myStats.level || 1}</span>
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
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
                            🏆 Achievement
                          </Button>
                        </div>
                        <Button
                          onClick={handleCreatePost}
                          disabled={!newPostContent.trim() || createPost.isPending}
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
            {isLoadingFeed ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-gray-800/50 border-cyan-500/30 animate-pulse">
                    <CardContent className="py-6">
                      <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : displayFeed && displayFeed.length > 0 ? (
              <div className="space-y-4">
                {displayFeed.map((post: any) => (
                  <Card key={post.id} className="bg-gray-800/50 border-cyan-500/30 hover:border-cyan-500/50 transition">
                    <CardContent className="pt-4">
                      <div className="flex gap-3">
                        <Avatar className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500">
                          <AvatarFallback className="text-white">
                            {post.userName?.charAt(0) || "A"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white">{post.userName || "Athlete"}</span>
                            {post.postType !== "status" && (
                              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                                {post.postType?.replace("_", " ")}
                              </span>
                            )}
                            <span className="text-gray-500 text-sm">
                              · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-gray-200 whitespace-pre-wrap mb-3">{post.content}</p>
                          
                          {/* Post Actions */}
                          <div className="flex items-center gap-6 pt-2 border-t border-gray-700/50">
                            <button
                              onClick={() => user && handleLikeToggle(post.id, post.isLiked)}
                              className={`flex items-center gap-2 transition ${
                                post.isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                              }`}
                              disabled={!user}
                            >
                              <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                              <span>{post.likesCount || 0}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition">
                              <MessageCircle className="w-5 h-5" />
                              <span>{post.commentsCount || 0}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition">
                              <Share2 className="w-5 h-5" />
                              <span>{post.sharesCount || 0}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-800/50 border-cyan-500/30">
                <CardContent className="py-12 text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {user ? "Your feed is empty" : "Join the Community"}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {user
                      ? "Follow other athletes or create your first post to get started!"
                      : "Sign up to connect with athletes, share achievements, and discover NIL opportunities."}
                  </p>
                  {!user && (
                    <Link href="/">
                      <Button className="bg-cyan-500 hover:bg-cyan-600">
                        Get Started
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar - Suggested Users & Trending */}
          <div className="lg:col-span-3 space-y-4">
            {/* Suggested Athletes */}
            {user && suggestedUsers && suggestedUsers.length > 0 && (
              <Card className="bg-gray-800/50 border-cyan-500/30">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Athletes to Follow
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestedUsers.map((suggestedUser: any) => (
                    <div key={suggestedUser.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500">
                          <AvatarFallback className="text-white text-sm">
                            {suggestedUser.name?.charAt(0) || "A"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white text-sm">{suggestedUser.name || "Athlete"}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white text-xs"
                        onClick={() => followUser.mutate({ userId: suggestedUser.id })}
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Trending NIL Deals */}
            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Trending NIL Deals
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-700/30 rounded-lg">
                  <p className="text-white font-medium">Nike Campus Ambassador</p>
                  <p className="text-gray-400 text-sm">$5,000 - $15,000</p>
                </div>
                <div className="p-3 bg-gray-700/30 rounded-lg">
                  <p className="text-white font-medium">Gatorade Social Post</p>
                  <p className="text-gray-400 text-sm">$500 - $2,000</p>
                </div>
                <div className="p-3 bg-gray-700/30 rounded-lg">
                  <p className="text-white font-medium">Local Car Dealership</p>
                  <p className="text-gray-400 text-sm">$1,000 + Free Car Use</p>
                </div>
              </CardContent>
            </Card>

            {/* App Links */}
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
              <CardContent className="py-4 text-center">
                <p className="text-cyan-400 font-bold mb-2">Part of ATHLYNX</p>
                <p className="text-gray-400 text-sm mb-3">The Athlete's Playbook</p>
                <Link href="/">
                  <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400">
                    Explore Platform
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
