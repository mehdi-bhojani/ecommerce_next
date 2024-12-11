import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    screens: {
      'sm': '640px',   // Small screens and up
      'md': '800px',   // Medium screens and up (adjusted as per your request)
      'lg': '1024px',  // Large screens and up
      'xl': '1280px',  // Extra large screens and up
      '2xl': '1400px', // 2xl screens and up (adjusted as per your request)
    },
    container: {
      center: true,
      padding: "2rem",
    
    },
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'Arial', 'sans-serif'], // Add custom font family
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #8DB2A7, #6C9286)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
       
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      flexBasis:{
        '1/9': 'calc(100% / 9)',
      },
      height: {
        '1/9': 'calc(100% / 9)',
      },
      
    },
    variants: {
      extend: {
        backgroundImage: ['hover'],
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
    

  ],
} satisfies Config

export default config



