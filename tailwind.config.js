/** @type {import('tailwindcss').Config} */
// Updated color scheme - trigger rebuild
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        "source-serif": ["Source Serif Pro", "serif"],
        dancing: ["Dancing Script", "cursive"],
        cormorant: ["Cormorant Garamond", "serif"],
        karla: ["Karla", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.025em" }],
        sm: ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.01em" }],
        base: ["1rem", { lineHeight: "1.7", letterSpacing: "0.005em" }],
        lg: ["1.125rem", { lineHeight: "1.7", letterSpacing: "0" }],
        xl: ["1.25rem", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.5", letterSpacing: "-0.015em" }],
        "3xl": ["1.875rem", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.025em" }],
        "5xl": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.035em" }],
        "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },
      colors: {
        // Enhanced primary brand colors
        "dusty-rose": {
          50: "#fdf4f4",
          100: "#fbe9e9",
          200: "#f6d3d3",
          300: "#eeb3b3",
          400: "#e18a8a",
          500: "#c78787",
          600: "#b56d6d",
          700: "#9a5757",
          800: "#824848",
          900: "#6e3e3e",
        },
        "warm-blush": {
          50: "#fef7f7",
          100: "#fdf0f0",
          200: "#fbe5e5",
          300: "#f7d1d1",
          400: "#f0b0b0",
          500: "#E8C4C4",
          600: "#d9a8a8",
          700: "#c48888",
          800: "#a36e6e",
          900: "#885b5b",
        },

        // Refined neutral base colors
        cream: {
          50: "#fefefe",
          100: "#fdfdfc",
          200: "#fbfaf8",
          300: "#f8f6f3",
          400: "#f4f1ec",
          500: "#F6F4F2",
          600: "#e8e4df",
          700: "#d4cfc8",
          800: "#b8b1a8",
          900: "#9a9189",
        },

        // Rich accent colors with variations
        mocha: {
          50: "#f7f5f3",
          100: "#efebe7",
          200: "#ddd5ce",
          300: "#c7bbaf",
          400: "#ad9b8a",
          500: "#836A5D",
          600: "#755f53",
          700: "#624f45",
          800: "#52433b",
          900: "#453832",
        },

        // Supporting colors
        sage: {
          50: "#f6f8f7",
          100: "#e8f0eb",
          200: "#d1e1d6",
          300: "#aecab7",
          400: "#85ad92",
          500: "#B4C3BC",
          600: "#9fb0a8",
          700: "#7d8e85",
          800: "#67756d",
          900: "#556159",
        },
        clay: {
          50: "#faf8f5",
          100: "#f3efea",
          200: "#e6ddd3",
          300: "#d5c6b5",
          400: "#c0a890",
          500: "#C8A882",
          600: "#b59670",
          700: "#977c5c",
          800: "#7c664d",
          900: "#665541",
        },
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        gentle:
          "0 2px 8px rgba(212, 165, 165, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
        warm: "0 4px 12px rgba(212, 165, 165, 0.2), 0 2px 6px rgba(0, 0, 0, 0.1)",
        soft: "0 8px 25px rgba(212, 165, 165, 0.15), 0 3px 10px rgba(0, 0, 0, 0.1)",
        glow: "0 0 20px rgba(212, 165, 165, 0.3), 0 0 40px rgba(212, 165, 165, 0.1)",
        elegant:
          "0 4px 20px rgba(131, 106, 93, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-up": "slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        float: "float 6s ease-in-out infinite",
        "gentle-bounce": "gentleBounce 3s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "scale-hover": "scaleHover 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "rotate-slow": "rotateSlow 20s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        typewriter: "typewriter 3s steps(40, end)",
        "bounce-gentle": "bounceGentle 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gentleBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.02)" },
        },
        scaleHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        bounceGentle: {
          "0%, 20%, 53%, 80%, 100%": { transform: "translateY(0)" },
          "40%, 43%": { transform: "translateY(-15px)" },
          "70%": { transform: "translateY(-7px)" },
          "90%": { transform: "translateY(-3px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "texture-subtle":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000' fill-opacity='0.02' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
