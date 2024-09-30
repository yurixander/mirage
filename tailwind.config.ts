import type {Config} from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/views/**/*.{ts,tsx}",
    "./src/containers/**/*.{ts,tsx}",
    "./src/styles/*.{scss,sass}",
    "./stories/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        text: "660px",
      },
      colors: {
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
        cardActionsBg: "#F7F7F7",
        profileGhost: "#ffffff00",
        statusMessageColor: "#e53e3eb2",
        borderLoading: "rgba(255, 255, 255, 0.5)",
      },
      backgroundColor: {
        statusMessageBg: "transparentize(#e53e3e, 0.9)",
        modalOverlay: "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        checkBox: "inset 0 0 5px #D9D9D9",
        contextMenu: "0 0 15px 0 #bbbbbb71",
        circleProgress: "0 2px 8px 0 #bf00ff9c",
        circleProgressError: "0 2px 8px 0 #ff00009c",
        userCard: "0 0 5px 0 #bebebe71",
        constraint: "0 0 8px 0",
        serverSelected: "0 3px 5px 2px #D9D9D9",
      },
      backgroundImage: {
        buttonPrimaryBg: "linear-gradient(to top, #C463FF, #da9eff)",
        buttonGreenBg: "linear-gradient(to top, #4CA464, #7AED9A)",
        rainbow: "linear-gradient(to top right,#ED7EFF, #7EC1FF)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      spacing: {
        serverAvatarSize: "calc(47px * sqrt(2))",
        userProfileAvatarSize: "calc(37px * sqrt(2))",
        userProfileAvatarSizeLarge: "calc(50px * sqrt(2))",
        spaceSize: "40px",
        messageMaxWidth: "450px",
      },
    },
    fontFamily: {
      iowan: ["Iowan Old Style", "serif"],
      noto: ["Noto sans", "sans-serif"],
      sans: ["Satoshi", "sans-serif"],
      unbounded: ["Unbounded", "sans-serif"],
    },
    lineHeight: {
      "160": "160%",
    },
    animation: {
      "hold": "hold 200ms",
      "fadeIn": "fadeIn 0.1s ease-out",
      "fade": "fade 0.1s",
      "spin": "rotate 0.6s infinite linear",
      "enter": "enter 200ms",
      "dot-jump": "dot-jump 400ms ease-in-out infinite alternate",
      "loading": "loading 1.5s infinite ease-in-out",
      "indicator": "indicator 300ms",
      "rotation": "rotation 1s infinite linear",
      "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    keyframes: {
      "slideIn": {
        from: {
          width: "0%",
        },
        to: {
          width: "100%",
        },
      },
      "pulse": {
        "50%": {
          opacity: ".5",
        },
      },
      "hold": {
        from: {
          transform: "scale(0.9)",
        },
        to: {
          transform: "scale(0.8)",
        },
      },
      "loading": {
        "0%": {
          transform: "translate(-75px, 0)",
          boxShadow: "0 0 40px 30px #E9EBED",
        },
        "50%": {
          boxShadow: "0 0 70px 50px #E9EBED",
        },
        "75%": {
          boxShadow: "0 0 40px 20px #E9EBED",
        },
        "100%": {
          transform: "translate(275px, 0)",
          boxShadow: "0 0 20px 15px #E9EBED",
        },
      },
      "indicator": {
        from: {
          "background-color": "#C463FF",
          "width": "8px",
          "height": "8px",
          "border-radius": "50%",
        },
        to: {
          "background-color": "#C463FF",
          "height": "25px",
          "border-radius": "10px",
        },
      },
      "enter": {
        from: {
          transform: "scale(50%)",
        },
        to: {
          transform: "scale(100%)",
        },
      },
      "show": {
        from: {
          opacity: "0",
        },
        to: {
          opacity: "1",
        },
      },
      "dot-jump": {
        to: {
          transform: "translateY(-4px)",
        },
      },
      "fadeIn": {
        from: {
          opacity: "0",
          transform: "translateY(-20px)",
        },
        to: {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      "rotation": {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
      "fade": {
        from: {
          opacity: "0",
          transform: "translateY(+20px)",
        },
        to: {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-animation-delay"),
    require("tailwind-scrollbar-hide"),
    function ({addUtilities}) {
      const newUtilities = {
        ".bg-clip-text": {
          "-webkit-background-clip": "text",
        },
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    },
  ],
} satisfies Config

export default config
