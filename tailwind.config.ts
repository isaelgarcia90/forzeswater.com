import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        // Breakpoints del rediseño: móvil < 760px, header compacto < 1024px
        md: "760px",
        nav: "1024px",
      },
      fontFamily: {
        sans: ["Barlow", "system-ui", "sans-serif"],
        display: ['"Barlow Condensed"', "sans-serif"],
      },
      colors: {
        whatsapp: "hsl(var(--whatsapp))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Paleta "Industry" en modo oscuro
        fw: {
          bg: "#111a22",
          alt: "#0e161d",
          foot: "#0c1319",
          card: "#17232e",
          modal: "#131e27",
          panel: "#121c25",
          input: "#0f171f",
          bubble: "#1a2833",
          text: "#f3efe6",
          sec: "#a9b9c7",
          ter: "#93a6b8",
          label: "#7f94a7",
          dim: "#6f8396",
          dim2: "#61768a",
          nav: "#b7c6d3",
          spec: "#d6e1ea",
          ink: "#0b141b",
          deep: "hsl(199 89% 32%)",
          cyan: "hsl(188 94% 43%)",
          aqua: "hsl(174 72% 56%)",
          aquatext: "hsl(174 72% 70%)",
          online: "hsl(150 70% 50%)",
          error: "hsl(0 80% 70%)",
          mark: "#22c5dd",
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-brand": "linear-gradient(135deg, hsl(199 89% 32%), hsl(188 94% 43%) 60%, hsl(174 72% 56%))",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        large: "var(--shadow-large)",
        "card-hover": "0 0 0 1px hsl(188 94% 43% / .2), 0 22px 56px -22px hsl(188 94% 43% / .55)",
        "cta-hover": "0 0 0 1px hsl(174 72% 56% / .4), 0 14px 40px -10px hsl(174 72% 56% / .7)",
        modal: "0 40px 100px -30px rgba(0,0,0,.7), 0 0 60px -30px hsl(188 94% 43% / .6)",
      },
      transitionProperty: {
        smooth: "var(--transition-smooth)",
      },
      transitionTimingFunction: {
        story: "cubic-bezier(.2,.7,.2,1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
