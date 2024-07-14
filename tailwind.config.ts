import {Config} from "tailwindcss"

module.exports = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/views/**/*.{ts,tsx}",
    "./src/containers/**/*.{ts,tsx}",
    "./src/styles/*.{scss,sass}",
    "./stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        text: "630px",
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
      colors: {
        cardActionsBg: "#F7F7F7",
        profileGhost: "#ffffff00",
        statusMessageColor: "#e53e3eb2",
        borderLoading: "rgba(255, 255, 255, 0.5)",
      },
      spacing: {
        serverAvatarSize: "calc(47px * sqrt(2))",
        userProfileAvatarSize: "calc(37px * sqrt(2))",
        userProfileAvatarSizeLarge: "calc(50px * sqrt(2))",
        spaceSize: "40px",
        messageMaxWidth: "450px",
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
    },
    keyframes: {
      // Usage: animate-[keyframe-name]
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
      "rotate": {
        "50%": {opacity: "0.5", filter: "blur(1px)"},
        "100%": {transform: "rotate(360deg)"},
      },
      "rotation": {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  plugins: [
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
