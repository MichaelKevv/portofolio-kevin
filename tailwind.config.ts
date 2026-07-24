import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      colors: {
        background: "#030014", // Very deep space blue/black
        foreground: "#ffffff",
        card: "rgba(255, 255, 255, 0.03)", // Very faint glass
        "card-foreground": "#ffffff",
        primary: {
            DEFAULT: "#a855f7", // Purple-500
            foreground: "#ffffff",
        },
        secondary: {
            DEFAULT: "#22d3ee", // Cyan-400
            foreground: "#000000",
        },
        accent: {
            DEFAULT: "#e879f9", // Fuchsia-400
            foreground: "#000000",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  }
}
