/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        academy: ["Academy Engraved LET", "serif"],
        bodoni: ["Bodoni Moda", "Bodoni 72", "serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "450",
        semibold: "500",
      },
      fontSize: {
        xs: [
          "0.75rem",
          { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" },
        ],
        sm: [
          "0.875rem",
          { lineHeight: "1.55", letterSpacing: "0.005em", fontWeight: "400" },
        ],
        base: [
          "1rem",
          { lineHeight: "1.55", letterSpacing: "0em", fontWeight: "400" },
        ],
        lg: [
          "1.125rem",
          { lineHeight: "1.5", letterSpacing: "-0.005em", fontWeight: "400" },
        ],
        xl: [
          "1.25rem",
          { lineHeight: "1.45", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "2xl": [
          "1.5rem",
          { lineHeight: "1.35", letterSpacing: "-0.015em", fontWeight: "400" },
        ],
        "3xl": [
          "1.875rem",
          { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "4xl": [
          "2.25rem",
          { lineHeight: "1.25", letterSpacing: "-0.025em", fontWeight: "400" },
        ],
        "5xl": [
          "3rem",
          { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "400" },
        ],
        "6xl": [
          "3.75rem",
          { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "400" },
        ],
        "7xl": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.035em", fontWeight: "400" },
        ],
      },
      letterSpacing: {
        tightest: "-0.075em",
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
        "academy-hero": "-0.025em",
        "academy-subhead": "-0.02em",
        "academy-normal": "0.01em",
        "bodoni-elegant": "0.005em",
        "button-refined": "0.025em",
      },
      lineHeight: {
        none: "1",
        tight: "1.1",
        snug: "1.2",
        elegant: "1.25",
        normal: "1.35",
        relaxed: "1.45",
        loose: "1.55",
        "body-elegant": "1.55",
        "heading-elegant": "1.25",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },
      colors: {
        // Primary brand colors
        sage: {
          50: "#f6f7f7",
          100: "#e8eaea",
          200: "#d1d5d4",
          300: "#aab5b3",
          400: "#929b9a",
          500: "#929B9A", // Primary brand color
          600: "#7a8382",
          700: "#646c6b",
          800: "#535958",
          900: "#474b4a",
        },

        // Secondary brand colors
        cocoa: {
          50: "#f9f7f5",
          100: "#f0ebe6",
          200: "#e0d5cb",
          300: "#c9b8a6",
          400: "#b09680",
          500: "#372813", // Secondary brand color
          600: "#2f220f",
          700: "#271d0c",
          800: "#1f180a",
          900: "#191408",
        },

        // Background and neutral colors
        cream: {
          50: "#fefefe",
          100: "#fdfcfb",
          200: "#faf8f5", // Primary background
          300: "#f7f4f0",
          400: "#f2ede7",
          500: "#FAF8F5", // Background brand color
          600: "#e6dfd6",
          700: "#d1c7bc",
          800: "#b8aa9d",
          900: "#9c8c7e",
        },

        // Supporting colors for UI elements
        neutral: {
          50: "#f9f9f9",
          100: "#f3f3f3",
          200: "#e7e7e7",
          300: "#d1d1d1",
          400: "#b4b4b4",
          500: "#8a8a8a",
          600: "#6a6a6a",
          700: "#4a4a4a",
          800: "#2a2a2a",
          900: "#1a1a1a",
        },
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(55, 40, 19, 0.05)",
        sm: "0 1px 3px 0 rgba(55, 40, 19, 0.1), 0 1px 2px 0 rgba(55, 40, 19, 0.06)",
        DEFAULT:
          "0 1px 3px 0 rgba(55, 40, 19, 0.1), 0 1px 2px 0 rgba(55, 40, 19, 0.06)",
        md: "0 4px 6px -1px rgba(55, 40, 19, 0.1), 0 2px 4px -1px rgba(55, 40, 19, 0.06)",
        lg: "0 10px 15px -3px rgba(55, 40, 19, 0.1), 0 4px 6px -2px rgba(55, 40, 19, 0.05)",
        xl: "0 20px 25px -5px rgba(55, 40, 19, 0.1), 0 10px 10px -5px rgba(55, 40, 19, 0.04)",
        "2xl": "0 25px 50px -12px rgba(55, 40, 19, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(55, 40, 19, 0.06)",
        gentle:
          "0 2px 8px rgba(146, 155, 154, 0.15), 0 1px 3px rgba(55, 40, 19, 0.1)",
        warm: "0 4px 12px rgba(146, 155, 154, 0.2), 0 2px 6px rgba(55, 40, 19, 0.1)",
        soft: "0 8px 25px rgba(146, 155, 154, 0.15), 0 3px 10px rgba(55, 40, 19, 0.1)",
        elegant:
          "0 4px 20px rgba(146, 155, 154, 0.15), 0 1px 3px rgba(55, 40, 19, 0.1)",
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
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "texture-subtle":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23929B9A' fill-opacity='0.02' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
