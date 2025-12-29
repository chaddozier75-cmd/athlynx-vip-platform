import { useState } from "react";
import { Link } from "wouter";

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([]);

  const categories = [
    { id: "all", name: "All Products", icon: "🛒" },
    { id: "baseball", name: "Baseball", icon: "⚾" },
    { id: "football", name: "Football", icon: "🏈" },
    { id: "basketball", name: "Basketball", icon: "🏀" },
    { id: "fishing", name: "Fishing", icon: "🎣" },
    { id: "golf", name: "Golf", icon: "⛳" },
    { id: "hunting", name: "Hunting", icon: "🦌" },
    { id: "fitness", name: "Fitness", icon: "💪" },
    { id: "apparel", name: "Apparel", icon: "👕" },
    { id: "training", name: "Training", icon: "🏋️" },
  ];

  const products = [
    { id: 1, name: "Pro Baseball Bat", category: "baseball", price: 299.99, image: "⚾", rating: 4.8, reviews: 124 },
    { id: 2, name: "Leather Baseball Glove", category: "baseball", price: 189.99, image: "🧤", rating: 4.9, reviews: 89 },
    { id: 3, name: "Training Baseballs (12pk)", category: "baseball", price: 49.99, image: "⚾", rating: 4.7, reviews: 256 },
    { id: 4, name: "Elite Football", category: "football", price: 129.99, image: "🏈", rating: 4.8, reviews: 178 },
    { id: 5, name: "Football Gloves", category: "football", price: 79.99, image: "🧤", rating: 4.6, reviews: 92 },
    { id: 6, name: "Pro Basketball", category: "basketball", price: 149.99, image: "🏀", rating: 4.9, reviews: 312 },
    { id: 7, name: "Basketball Shoes", category: "basketball", price: 179.99, image: "👟", rating: 4.7, reviews: 445 },
    { id: 8, name: "Fishing Rod Pro", category: "fishing", price: 249.99, image: "🎣", rating: 4.8, reviews: 67 },
    { id: 9, name: "Tackle Box Complete", category: "fishing", price: 89.99, image: "🧰", rating: 4.5, reviews: 134 },
    { id: 10, name: "Golf Club Set", category: "golf", price: 899.99, image: "⛳", rating: 4.9, reviews: 56 },
    { id: 11, name: "Golf Balls (24pk)", category: "golf", price: 39.99, image: "🏌️", rating: 4.6, reviews: 289 },
    { id: 12, name: "Hunting Rifle Scope", category: "hunting", price: 349.99, image: "🔭", rating: 4.8, reviews: 78 },
    { id: 13, name: "Camo Jacket", category: "hunting", price: 149.99, image: "🧥", rating: 4.7, reviews: 112 },
    { id: 14, name: "Adjustable Dumbbells", category: "fitness", price: 399.99, image: "🏋️", rating: 4.9, reviews: 567 },
    { id: 15, name: "Resistance Bands Set", category: "fitness", price: 29.99, image: "💪", rating: 4.5, reviews: 892 },
    { id: 16, name: "ATHLYNX Performance Tee", category: "apparel", price: 34.99, image: "👕", rating: 4.8, reviews: 234 },
    { id: 17, name: "ATHLYNX Hoodie", category: "apparel", price: 69.99, image: "🧥", rating: 4.9, reviews: 189 },
    { id: 18, name: "Speed Ladder", category: "training", price: 24.99, image: "🪜", rating: 4.6, reviews: 345 },
    { id: 19, name: "Agility Cones (20pk)", category: "training", price: 19.99, image: "🔶", rating: 4.7, reviews: 456 },
    { id: 20, name: "Pitching Machine", category: "baseball", price: 1299.99, image: "⚾", rating: 4.9, reviews: 34 },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

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
            <Link href="/store" className="text-yellow-400 font-semibold">Store</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          </nav>
          <div className="relative">
            <button className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
              <span>🛒</span>
              <span>${cartTotal.toFixed(2)}</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold mb-4">
              🛒 OFFICIAL STORE
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              ATHLYNX <span className="text-yellow-400">Store</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Premium sports equipment for every athlete
            </p>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-yellow-500 text-black font-semibold"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all group"
              >
                <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <p className="text-white font-semibold text-sm mb-1 line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-gray-400 text-xs">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-all"
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Brands */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Featured Brands</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              {["Nike", "Adidas", "Under Armour", "Rawlings", "Wilson", "Easton"].map((brand) => (
                <div key={brand} className="text-gray-500 font-semibold text-lg hover:text-white transition-all cursor-pointer">
                  {brand}
                </div>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link href="/" className="text-cyan-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
