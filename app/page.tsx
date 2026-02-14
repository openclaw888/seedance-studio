"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [clickResult, setClickResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/click", { method: "POST" });
      const data = await res.json();
      setClickResult(data);
    } catch (e: any) {
      setClickResult({ success: false, error: e.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-400">Seedance</span> Studio
        </h1>
        <nav className="flex gap-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          {session ? (
            <div className="flex items-center gap-3">
              <img src={session.user?.image || ""} alt="" className="w-8 h-8 rounded-full" />
              <span className="text-white text-sm">{session.user?.name}</span>
              <button onClick={() => signOut()} className="text-gray-400 hover:text-white text-sm transition">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={() => signIn("google")} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition">
              Sign in with Google
            </button>
          )}
        </nav>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-32">
        <div className="inline-block bg-purple-600/20 text-purple-300 text-sm px-4 py-1 rounded-full mb-6">
          ✨ Powered by Seedance 2.0
        </div>
        <h2 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Create Stunning AI Videos
          <span className="text-purple-400"> in Seconds</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          Transform your ideas into professional-quality videos with the most advanced 
          AI video generation model. Text to video, image to video, and more.
        </p>
        <div className="flex gap-4 mt-10">
          <button onClick={() => session ? null : signIn("google")} className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition">
            {session ? `Welcome, ${session.user?.name?.split(" ")[0]}! 🎬` : "Start Creating — Free"}
          </button>
          <button className="border border-gray-600 hover:border-gray-400 text-gray-300 px-8 py-3 rounded-lg text-lg transition">
            View Examples
          </button>
        </div>

        {/* DB Test Section */}
        <div className="mt-16 bg-gray-800/50 border border-gray-700 rounded-xl p-8 max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">🧪 Database Test</h3>
          <button
            onClick={handleClick}
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition w-full"
          >
            {loading ? "Recording..." : "Click Me!"}
          </button>
          {clickResult && (
            <div className="mt-4 text-left text-sm">
              {clickResult.success ? (
                <>
                  <p className="text-green-400">✅ Record #{clickResult.id} created</p>
                  <p className="text-gray-400">Time: {new Date(clickResult.created_at).toLocaleString()}</p>
                  <p className="text-gray-400">Total clicks: {clickResult.total}</p>
                </>
              ) : (
                <p className="text-red-400">❌ Error: {clickResult.error}</p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Features */}
      <section id="features" className="px-8 py-24 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-16">Why Seedance Studio?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Text to Video", desc: "Describe your vision in words, get a stunning video in seconds.", icon: "✍️" },
            { title: "Image to Video", desc: "Bring your images to life with AI-powered animation.", icon: "🖼️" },
            { title: "Native Audio Sync", desc: "Auto-generated dialogue, sound effects, and ambient audio.", icon: "🎵" },
            { title: "1080p / 2K Output", desc: "Professional quality output ready for any platform.", icon: "📺" },
            { title: "Character Consistency", desc: "Maintain character identity across multiple shots.", icon: "🎭" },
            { title: "Multi-Shot Stories", desc: "Create cohesive narratives with seamless scene transitions.", icon: "🎬" },
          ].map((f, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Create?</h3>
        <p className="text-gray-400 mb-8">Start generating AI videos today. No credit card required.</p>
        <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition">
          Get Started for Free
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-8 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 Seedance Studio. All rights reserved.</p>
        <p className="mt-2">
          <a href="mailto:support@seedance-studio.com" className="hover:text-gray-300 transition">
            support@seedance-studio.com
          </a>
        </p>
      </footer>
    </div>
  );
}
