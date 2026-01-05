import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import UnifiedFooter from "@/components/UnifiedFooter";

export default function Marketplace() {
  const categories = [
    {
      name: "Music & Entertainment",
      icon: "🎵",
      apps: [
        {
          name: "Apple Music",
          price: "$10.99/mo",
          commission: "$1.50",
          logo: "/images/apple-music-logo.png",
          description: "100M+ songs, ad-free listening",
          link: "/marketplace/apple-music",
        },
        {
          name: "Spotify Premium",
          price: "$10.99/mo",
          commission: "$1.50",
          logo: "/images/spotify-logo.png",
          description: "Ad-free music, offline downloads",
          link: "/marketplace/spotify",
        },
        {
          name: "YouTube Premium",
          price: "$11.99/mo",
          commission: "$2.00",
          logo: "/images/youtube-logo.png",
          description: "Ad-free videos + YouTube Music",
          link: "/marketplace/youtube",
        },
      ],
    },
    {
      name: "Training & Analytics",
      icon: "📊",
      apps: [
        {
          name: "Hudl",
          price: "Custom",
          commission: "15%",
          logo: "/images/hudl-logo.png",
          description: "Video analysis and recruiting",
          link: "/marketplace/hudl",
        },
        {
          name: "WHOOP",
          price: "$30/mo",
          commission: "$5.00",
          logo: "/images/whoop-logo.png",
          description: "Recovery and performance tracking",
          link: "/marketplace/whoop",
        },
        {
          name: "Strava Premium",
          price: "$11.99/mo",
          commission: "$2.00",
          logo: "/images/strava-logo.png",
          description: "Advanced training analytics",
          link: "/marketplace/strava",
        },
      ],
    },
    {
      name: "Gaming & Social",
      icon: "🎮",
      apps: [
        {
          name: "Discord Nitro",
          price: "$9.99/mo",
          commission: "$1.50",
          logo: "/images/discord-logo.png",
          description: "Enhanced Discord experience",
          link: "/marketplace/discord",
        },
        {
          name: "Twitch Turbo",
          price: "$8.99/mo",
          commission: "$1.50",
          logo: "/images/twitch-logo.png",
          description: "Ad-free streaming",
          link: "/marketplace/twitch",
        },
      ],
    },
    {
      name: "Gear & Equipment",
      icon: "👟",
      apps: [
        {
          name: "Nike Training Club",
          price: "Free - Premium",
          commission: "10%",
          logo: "/images/nike-logo.png",
          description: "Workouts and training plans",
          link: "/marketplace/nike",
        },
        {
          name: "Under Armour",
          price: "Varies",
          commission: "8%",
          logo: "/images/ua-logo.png",
          description: "Gear and apparel",
          link: "/marketplace/under-armour",
        },
      ],
    },
  ];

  return (
    <PageLayout>
      {/* Header */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-8">
        <Link href="/">
          <a className="text-cyan-400 hover:text-cyan-300 text-sm font-bold">← Back to Home</a>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="inline-block mb-4">
          <span className="text-6xl">🏪</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
          ATHLYNX MARKETPLACE
        </h1>
        <p className="text-2xl md:text-3xl text-cyan-400 font-bold mb-4">
          The App Store for Athletes
        </p>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          One platform for all your subscriptions. Music, training, gear, and more.
          Get athlete-exclusive deals and manage everything in one place.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl p-4">
            <div className="text-3xl font-black text-cyan-400">50+</div>
            <div className="text-sm text-gray-400">Partner Apps</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl p-4">
            <div className="text-3xl font-black text-cyan-400">$500K+</div>
            <div className="text-sm text-gray-400">Saved by Athletes</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl p-4">
            <div className="text-3xl font-black text-cyan-400">100%</div>
            <div className="text-sm text-gray-400">Secure</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl p-4">
            <div className="text-3xl font-black text-cyan-400">24/7</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {categories.map((category, idx) => (
          <div key={idx} className="mb-16">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{category.icon}</span>
              <h2 className="text-3xl font-black text-white">{category.name}</h2>
            </div>

            {/* Apps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.apps.map((app, appIdx) => (
                <Link key={appIdx} href={app.link}>
                  <div className="group bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all">
                    {/* App Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-700/50 flex items-center justify-center text-2xl border-2 border-cyan-500/30">
                        {app.logo ? (
                          <img src={app.logo} alt={app.name} className="w-12 h-12 rounded-lg" />
                        ) : (
                          category.icon
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-sm text-gray-400">{app.description}</p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-black text-cyan-400">{app.price}</div>
                        <div className="text-xs text-gray-500">Athlete Price</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-400">
                          +{app.commission} for you
                        </div>
                        <div className="text-xs text-gray-500">Commission</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-bold py-3 rounded-lg shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all">
                      Subscribe Now →
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border-2 border-cyan-500/50 rounded-3xl p-12">
          <h2 className="text-4xl font-black text-white mb-4">
            Want Your App in the Marketplace?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Partner with ATHLYNX and reach 500,000+ college athletes
          </p>
          <Link href="/partner-portal">
            <button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-lg shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all">
              Become a Partner →
            </button>
          </Link>
        </div>
      </div>

      <UnifiedFooter />
    </PageLayout>
  );
}
