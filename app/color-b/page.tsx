"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";

/* ── Neon Minimal ──
   Dark gray-black bg with subtle blue tint, bright green/neon-green accents,
   high-contrast white text. Elegant terminal aesthetic.
*/
const theme = {
  "--bg":            "oklch(13% 0.01 250)",
  "--bg-surface":    "oklch(16% 0.008 250)",
  "--bg-elevated":   "oklch(19% 0.008 250)",
  "--bg-invert":     "oklch(95% 0.01 145)",

  "--text":          "oklch(95% 0.005 110)",
  "--text-2":        "oklch(80% 0.01 145)",
  "--text-3":        "oklch(60% 0.01 250)",
  "--text-muted":    "oklch(45% 0.008 250)",

  "--border":        "oklch(22% 0.008 250)",
  "--border-2":      "oklch(28% 0.012 250)",

  "--accent":        "oklch(72% 0.2 145)",
  "--accent-hover":  "oklch(65% 0.22 145)",
  "--accent-light":  "oklch(25% 0.06 145)",
  "--accent-text":   "oklch(13% 0.015 145)",

  "--space-xs":  "0.25rem",
  "--space-sm":  "0.5rem",
  "--space-md":  "1rem",
  "--space-lg":  "1.5rem",
  "--space-xl":  "2rem",
  "--space-2xl": "3rem",
  "--space-3xl": "4rem",
  "--space-4xl": "6rem",
  "--space-5xl": "8rem",

  "--ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
} as React.CSSProperties;

export default function ColorB() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen" style={{ ...theme, background: "var(--bg)", color: "var(--text)" }}>
      {/* ─── Header ─── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "color-mix(in oklch, var(--bg) 85%, transparent)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: "72rem", padding: "var(--space-md) var(--space-lg)" }}
        >
          <a
            href="/color-b"
            className="font-display"
            style={{
              fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              textDecoration: "none",
            }}
          >
            Seedance
            <span style={{ fontWeight: 400, color: "var(--text-3)", marginLeft: "0.25em" }}>
              Studio
            </span>
          </a>

          <nav className="hidden md:flex items-center" style={{ gap: "var(--space-xl)" }}>
            {siteConfig.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-3)",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center" style={{ gap: "var(--space-sm)" }}>
            {session ? (
              <div className="flex items-center" style={{ gap: "var(--space-sm)" }}>
                <img
                  src={session.user?.image || ""}
                  alt=""
                  className="rounded-full"
                  style={{ width: 32, height: 32, border: "2px solid var(--border)" }}
                />
                <span
                  className="hidden sm:inline"
                  style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-2)" }}
                >
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                style={{
                  background: "var(--bg-invert)",
                  color: "var(--accent-text)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  padding: "0.5rem 1.25rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section
        className="animate-reveal"
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "clamp(4rem, 8vw, 8rem) var(--space-lg) clamp(3rem, 6vw, 6rem)",
        }}
      >
        <div style={{ maxWidth: "52rem" }}>
          <p
            className="animate-fade"
            style={{
              "--delay": "100ms",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              color: "var(--accent)",
              marginBottom: "var(--space-lg)",
            } as React.CSSProperties}
          >
            {siteConfig.hero.badge}
          </p>

          <h1
            className="font-display animate-reveal"
            style={{
              "--delay": "150ms",
              fontSize: "clamp(2.5rem, 2rem + 4vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            } as React.CSSProperties}
          >
            {siteConfig.hero.title}
            <br />
            <span style={{ color: "var(--accent)" }}>{siteConfig.hero.titleAccent}</span>
          </h1>

          <p
            className="animate-reveal"
            style={{
              "--delay": "250ms",
              fontSize: "clamp(1.0625rem, 1rem + 0.5vw, 1.25rem)",
              lineHeight: 1.6,
              color: "var(--text-3)",
              maxWidth: "38rem",
              marginTop: "var(--space-lg)",
            } as React.CSSProperties}
          >
            {siteConfig.hero.subtitle}
          </p>

          {/* Prompt Input */}
          <div
            className="animate-reveal"
            style={{
              "--delay": "400ms",
              marginTop: "var(--space-2xl)",
              maxWidth: "40rem",
            } as React.CSSProperties}
          >
            <div
              className="flex items-center"
              style={{
                background: "var(--bg-surface)",
                borderRadius: "10px",
                border: "1px solid var(--border-2)",
                padding: "6px",
                transition: "border-color 200ms",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
            >
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={siteConfig.hero.placeholder}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  fontSize: "0.9375rem",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text)",
                }}
              />
              <button
                onClick={() => (session ? null : signIn("google"))}
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-text)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "7px",
                  border: "none",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap" as const,
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
              >
                {session ? siteConfig.hero.signedInCta : siteConfig.hero.cta}
              </button>
            </div>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                marginTop: "var(--space-sm)",
              }}
            >
              Try: &quot;A timelapse of cherry blossoms blooming in spring, macro lens, soft bokeh&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section
        id="features"
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 6rem) var(--space-lg)",
        }}
      >
        <div
          className="animate-reveal"
          style={{
            "--delay": "0ms",
            maxWidth: "32rem",
            marginBottom: "clamp(2.5rem, 4vw, 4rem)",
          } as React.CSSProperties}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 1.5rem + 2vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "var(--text)",
            }}
          >
            {siteConfig.features.title}
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--text-3)",
              marginTop: "var(--space-md)",
            }}
          >
            {siteConfig.features.subtitle}
          </p>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
            gap: "var(--space-xs)",
          }}
        >
          {siteConfig.features.items.map((feature, i) => (
            <div
              key={i}
              className="animate-reveal-scale"
              style={{
                "--delay": `${150 + i * 80}ms`,
                padding: "var(--space-xl) var(--space-lg)",
                borderBottom: "1px solid var(--border)",
                transition: "background 200ms",
              } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-elevated)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="flex items-start" style={{ gap: "var(--space-md)" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--accent)",
                    fontVariantNumeric: "tabular-nums",
                    minWidth: "1.5rem",
                    paddingTop: "2px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                      color: "var(--text-3)",
                      marginTop: "var(--space-xs)",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Showcase ─── */}
      <section
        id="showcase"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "clamp(4rem, 8vw, 7rem) 0",
          marginTop: "var(--space-2xl)",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 var(--space-lg)" }}>
          <div
            className="animate-reveal"
            style={{ maxWidth: "32rem", marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 1.5rem + 2vw, 2.75rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                color: "var(--text)",
              }}
            >
              {siteConfig.showcase.title}
            </h2>
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.6,
                color: "var(--text-3)",
                marginTop: "var(--space-md)",
              }}
            >
              {siteConfig.showcase.subtitle}
            </p>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
              gap: "var(--space-md)",
            }}
          >
            {siteConfig.showcase.items.map((item, i) => {
              const hues = [145, 155, 135, 160, 140, 150];
              const hue = hues[i % hues.length];
              return (
                <div
                  key={i}
                  className="group animate-reveal-scale"
                  style={{
                    "--delay": `${100 + i * 70}ms`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    transition: "transform 300ms var(--ease-out-quart), box-shadow 300ms",
                    cursor: "pointer",
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px oklch(13% 0.01 145 / 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      aspectRatio: i === 0 || i === 3 ? "4/3" : "16/10",
                      background: `oklch(20% 0.04 ${hue})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: `oklch(28% 0.06 ${hue})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 300ms var(--ease-out-quart)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={`oklch(72% 0.18 ${hue})`}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ padding: "var(--space-md) var(--space-md) var(--space-lg)" }}>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--text-3)" }}>
                      &ldquo;{item.prompt}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section
        id="pricing"
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "clamp(4rem, 8vw, 7rem) var(--space-lg)",
        }}
      >
        <div
          className="animate-reveal"
          style={{ maxWidth: "32rem", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 1.5rem + 2vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "var(--text)",
            }}
          >
            {siteConfig.pricing.title}
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--text-3)",
              marginTop: "var(--space-md)",
            }}
          >
            {siteConfig.pricing.subtitle}
          </p>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17rem), 1fr))",
            gap: "var(--space-md)",
            maxWidth: "56rem",
          }}
        >
          {siteConfig.pricing.tiers.map((tier, i) => {
            const isFeatured = tier.featured;
            return (
              <div
                key={i}
                className="animate-reveal-scale"
                style={{
                  "--delay": `${100 + i * 100}ms`,
                  background: isFeatured ? "var(--bg-invert)" : "var(--bg-surface)",
                  color: isFeatured ? "var(--accent-text)" : "var(--text)",
                  borderRadius: "10px",
                  padding: "var(--space-xl) var(--space-lg)",
                  border: isFeatured ? "none" : "1px solid var(--border)",
                  position: "relative" as const,
                } as React.CSSProperties}
              >
                {isFeatured && (
                  <span
                    style={{
                      position: "absolute",
                      top: "var(--space-md)",
                      right: "var(--space-md)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase" as const,
                      color: "oklch(30% 0.12 145)",
                      background: "oklch(85% 0.08 145)",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "4px",
                    }}
                  >
                    Popular
                  </span>
                )}

                <div style={{ marginBottom: "var(--space-xl)" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {tier.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: isFeatured ? "oklch(35% 0.01 145)" : "var(--text-muted)",
                      marginTop: "var(--space-xs)",
                    }}
                  >
                    {tier.description}
                  </p>
                </div>

                <div
                  style={{
                    marginBottom: "var(--space-lg)",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.25rem",
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: "clamp(2rem, 1.5rem + 1.5vw, 2.75rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: isFeatured ? "oklch(35% 0.01 145)" : "var(--text-muted)",
                    }}
                  >
                    /{tier.period}
                  </span>
                </div>

                <button
                  onClick={() => (session ? null : signIn("google"))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "7px",
                    border: isFeatured ? "none" : "1px solid var(--border-2)",
                    background: isFeatured ? "var(--accent)" : "transparent",
                    color: isFeatured ? "var(--accent-text)" : "var(--text)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 150ms, opacity 150ms",
                  }}
                  onMouseEnter={(e) => {
                    if (isFeatured) {
                      e.currentTarget.style.background = "var(--accent-hover)";
                    } else {
                      e.currentTarget.style.background = "var(--bg-elevated)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFeatured) {
                      e.currentTarget.style.background = "var(--accent)";
                    } else {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {tier.cta}
                </button>

                <ul
                  style={{
                    marginTop: "var(--space-xl)",
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "var(--space-sm)",
                  }}
                >
                  {tier.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start"
                      style={{
                        gap: "var(--space-sm)",
                        fontSize: "0.875rem",
                        color: isFeatured ? "oklch(25% 0.01 145)" : "var(--text-2)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isFeatured ? "oklch(40% 0.15 145)" : "oklch(72% 0.2 145)"}
                        strokeWidth={2.5}
                        style={{ marginTop: 3, flexShrink: 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="animate-reveal"
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 var(--space-lg) clamp(4rem, 8vw, 7rem)",
        }}
      >
        <div
          style={{
            background: "var(--bg-invert)",
            borderRadius: "12px",
            padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 4rem)",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "flex-start",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 1.5rem + 2vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--accent-text)",
              maxWidth: "28rem",
            }}
          >
            {siteConfig.cta.title}
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "oklch(35% 0.01 145)",
              marginTop: "var(--space-md)",
              maxWidth: "32rem",
            }}
          >
            {siteConfig.cta.subtitle}
          </p>
          <button
            onClick={() => (session ? null : signIn("google"))}
            style={{
              marginTop: "var(--space-xl)",
              background: "oklch(30% 0.12 145)",
              color: "oklch(95% 0.01 145)",
              padding: "0.875rem 2rem",
              borderRadius: "7px",
              border: "none",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(25% 0.14 145)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(30% 0.12 145)")}
          >
            {siteConfig.cta.button}
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ borderTop: "1px solid var(--border)", marginTop: "var(--space-3xl)" }}>
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "var(--space-3xl) var(--space-lg) var(--space-2xl)",
          }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))",
              gap: "var(--space-2xl)",
            }}
          >
            <div style={{ gridColumn: "span 1" }}>
              <a
                href="/color-b"
                className="font-display"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  textDecoration: "none",
                }}
              >
                Seedance
              </a>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                  marginTop: "var(--space-sm)",
                  maxWidth: "18rem",
                }}
              >
                Professional AI video generation for creators, studios, and teams.
              </p>
            </div>

            {siteConfig.footer.columns.map((col, i) => (
              <div key={i}>
                <h4
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    color: "var(--text-3)",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  {col.title}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "var(--space-sm)",
                  }}
                >
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-muted)",
                          textDecoration: "none",
                          transition: "color 150ms",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "var(--space-3xl)",
              paddingTop: "var(--space-lg)",
              borderTop: "1px solid var(--border)",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
            }}
          >
            {siteConfig.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
