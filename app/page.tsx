"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";

const featureIcons: Record<string, React.ReactNode> = {
  Sparkles: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  Image: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Zm16.5-13.5h.008v.008h-.008V7.5Zm0 0A1.125 1.125 0 1 0 19.125 6.375 1.125 1.125 0 0 0 20.25 7.5Z" />
    </svg>
  ),
  AudioLines: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
  ),
  Monitor: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
    </svg>
  ),
  Users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  Film: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 12 6 12.504 6 13.125" />
    </svg>
  ),
};

const showcaseColors = [
  "from-violet-600/30 to-indigo-900/40",
  "from-amber-600/30 to-orange-900/40",
  "from-emerald-600/30 to-teal-900/40",
  "from-rose-600/30 to-pink-900/40",
  "from-cyan-600/30 to-blue-900/40",
  "from-fuchsia-600/30 to-purple-900/40",
];

export default function Home() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-semibold tracking-tight">
            <span className="text-violet-600">Seedance</span> Studio
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            {siteConfig.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <img
                  src={session.user?.image || ""}
                  alt=""
                  className="w-8 h-8 rounded-full ring-2 ring-violet-100"
                />
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/80 via-white to-[#fafafa]" />
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-violet-100">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
            {siteConfig.hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            {siteConfig.hero.title}{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {siteConfig.hero.titleAccent}
            </span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            {siteConfig.hero.subtitle}
          </p>

          {/* Prompt Input */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-200 p-2 transition-shadow focus-within:shadow-xl focus-within:shadow-violet-100/40 focus-within:border-violet-200">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={siteConfig.hero.placeholder}
                className="flex-1 px-4 py-3 text-sm md:text-base bg-transparent outline-none placeholder:text-gray-400 text-gray-700"
              />
              <button
                onClick={() => (session ? null : signIn("google"))}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shrink-0"
              >
                {session ? siteConfig.hero.signedInCta : siteConfig.hero.cta}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Try: &quot;A timelapse of cherry blossoms blooming in spring, macro lens, soft bokeh&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {siteConfig.features.title}
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
            {siteConfig.features.subtitle}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.features.items.map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
                {featureIcons[feature.icon]}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {siteConfig.showcase.title}
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
              {siteConfig.showcase.subtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.showcase.items.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:border-violet-200 transition-all duration-300 hover:shadow-lg hover:shadow-violet-50/50"
              >
                <div
                  className={`aspect-video bg-gradient-to-br ${showcaseColors[i % showcaseColors.length]} flex items-center justify-center`}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    &ldquo;{item.prompt}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {siteConfig.pricing.title}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            {siteConfig.pricing.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {siteConfig.pricing.tiers.map((tier, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 border transition-all duration-300 ${
                tier.featured
                  ? "bg-gray-900 text-white border-gray-800 shadow-2xl shadow-gray-900/20 scale-[1.02]"
                  : "bg-white border-gray-200 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50/50"
              }`}
            >
              <div className="mb-6">
                <h3
                  className={`text-lg font-semibold ${
                    tier.featured ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    tier.featured ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {tier.description}
                </p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span
                  className={`text-sm ml-1 ${
                    tier.featured ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  /{tier.period}
                </span>
              </div>
              <button
                onClick={() => (session ? null : signIn("google"))}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
                  tier.featured
                    ? "bg-violet-600 hover:bg-violet-500 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {tier.cta}
              </button>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        tier.featured ? "text-violet-400" : "text-violet-600"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span
                      className={
                        tier.featured ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-violet-600 to-indigo-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {siteConfig.cta.title}
          </h2>
          <p className="text-violet-100 mt-4 text-lg">
            {siteConfig.cta.subtitle}
          </p>
          <button
            onClick={() => (session ? null : signIn("google"))}
            className="mt-8 bg-white text-violet-700 hover:bg-violet-50 px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-violet-900/20"
          >
            {siteConfig.cta.button}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <a href="/" className="text-lg font-semibold tracking-tight">
                <span className="text-violet-600">Seedance</span> Studio
              </a>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">
                Professional AI video generation for creators, studios, and teams.
              </p>
            </div>
            {siteConfig.footer.columns.map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
            {siteConfig.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
