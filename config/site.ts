export const siteConfig = {
  name: "Seedance Studio",
  description:
    "Transform your ideas into stunning AI-generated videos in seconds. Text to video, image to video, and more — powered by the most advanced AI video model.",
  url: "https://seedance-studio.com",
  email: "support@seedance-studio.com",

  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "Showcase", href: "#showcase" },
      { label: "Pricing", href: "#pricing" },
    ],
  },

  hero: {
    badge: "Powered by Seedance 2.0",
    title: "Turn Words Into",
    titleAccent: "Cinematic Video",
    subtitle:
      "Describe any scene, character, or story — and watch it come to life in seconds. Professional-quality AI video generation for creators, studios, and teams.",
    placeholder: "A golden retriever running through a sunlit meadow at sunset, slow motion, cinematic...",
    cta: "Generate",
    secondaryCta: "View Examples",
    signedInCta: "Generate",
  },

  features: {
    title: "Everything you need to create",
    subtitle: "From a single prompt to a polished production — Seedance Studio handles it all.",
    items: [
      {
        title: "Text to Video",
        description: "Describe your vision in natural language and get a stunning video in seconds.",
        icon: "Sparkles",
      },
      {
        title: "Image to Video",
        description: "Upload any image and bring it to life with fluid, realistic animation.",
        icon: "Image",
      },
      {
        title: "Native Audio Sync",
        description: "Auto-generated dialogue, sound effects, and ambient audio matched to your scene.",
        icon: "AudioLines",
      },
      {
        title: "Up to 2K Output",
        description: "Export in 1080p or 2K — ready for social, web, or broadcast.",
        icon: "Monitor",
      },
      {
        title: "Character Consistency",
        description: "Maintain identity and style across multiple shots and scenes.",
        icon: "Users",
      },
      {
        title: "Multi-Shot Stories",
        description: "Create cohesive narratives with seamless scene transitions.",
        icon: "Film",
      },
    ],
  },

  showcase: {
    title: "See what's possible",
    subtitle: "Real outputs from Seedance Studio — every video below was generated from a text prompt.",
    items: [
      {
        prompt: "A Japanese garden in autumn, koi fish swimming in a crystal pond, soft light filtering through maple trees",
        thumbnail: "/showcase/placeholder-1.svg",
      },
      {
        prompt: "Astronaut floating above Earth, golden hour light catching the visor, slow rotation, cinematic",
        thumbnail: "/showcase/placeholder-2.svg",
      },
      {
        prompt: "Street café in Paris on a rainy evening, warm lights reflecting on wet cobblestones",
        thumbnail: "/showcase/placeholder-3.svg",
      },
      {
        prompt: "Close-up of a hummingbird hovering near a flower, iridescent feathers, macro lens, 120fps",
        thumbnail: "/showcase/placeholder-4.svg",
      },
      {
        prompt: "Futuristic city skyline at dusk, flying vehicles, neon signs, cyberpunk atmosphere",
        thumbnail: "/showcase/placeholder-5.svg",
      },
      {
        prompt: "Ocean waves crashing on volcanic rocks, drone shot pulling back to reveal a coastline at sunrise",
        thumbnail: "/showcase/placeholder-6.svg",
      },
    ],
  },

  pricing: {
    title: "Simple, transparent pricing",
    subtitle: "Start free. Upgrade when you're ready.",
    tiers: [
      {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for trying things out.",
        cta: "Get Started",
        featured: false,
        features: [
          "5 video generations per month",
          "720p output",
          "Basic text-to-video",
          "Community support",
        ],
      },
      {
        name: "Pro",
        price: "$29",
        period: "per month",
        description: "For creators who need more power.",
        cta: "Start Pro Trial",
        featured: true,
        features: [
          "100 video generations per month",
          "1080p & 2K output",
          "Image-to-video & audio sync",
          "Character consistency",
          "Priority rendering",
          "Email support",
        ],
      },
      {
        name: "Unlimited",
        price: "$99",
        period: "per month",
        description: "For studios and teams shipping at scale.",
        cta: "Contact Sales",
        featured: false,
        features: [
          "Unlimited generations",
          "2K output with upscaling",
          "All Pro features",
          "Multi-shot stories",
          "API access",
          "Dedicated support",
        ],
      },
    ],
  },

  cta: {
    title: "Ready to bring your ideas to life?",
    subtitle: "Start generating AI videos today. No credit card required.",
    button: "Start Creating — Free",
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Showcase", href: "#showcase" },
          { label: "API", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "mailto:support@seedance-studio.com" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Seedance Studio. All rights reserved.`,
  },
} as const;
