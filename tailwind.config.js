/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.{ts,tsx}",
    "./src/styles/*.{scss,sass}",
    "./stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        statusMessageBg: "transparentize(#e53e3e, 0.9)",
        modalOverlay: "rgba(0, 0, 0, 0.5)",
      },
      maxWidth: {
        "size-600": "600px",
        "size-300": "300px",
      },
      maxHeight: {
        "100px": "100px",
      },
      boxShadow: {
        checkBox: "inset 0 0 5px #D9D9D9",
        contextMenu: "0 0 15px 0 #D9D9D9",
        userCard: "0 0 5px #D9D9D9",
        constraint: "0 0 8px 0",
        serverSelected: "0 3px 5px 2px #D9D9D9",
      },
      backgroundImage: {
        buttonPrimaryBg: "linear-gradient(to top, #C463FF, #da9eff)",
        buttonGreenBg: "linear-gradient(to top, #4CA464, #7AED9A)",
        rainbow: "linear-gradient(to top right,#ED7EFF, #7EC1FF)",
      },
      colors: {
        textColorDefault: "#4B5563",
        red: "#FF6D6D",
        green: "#5CC679",
        greenDark: "#4CA464",
        greenDarken: "#2d723f",
        greenLight: "#7AED9A",
        yellow: "#FFE500",
        primary: "#C463FF",
        primaryLight: "#da9eff",
        primaryDarken: "#8233b3",
        white: "#FFF",
        contrast: "#F9FBFC",
        contrastDark: "#E9EBED",
        contrastDarker: "#D9D9D9",
        contrastIcon: "#DBDBDB",
        grayText: "#BABABA",
        border: "$color-contrast-dark",
        cardActionsBg: "#F7F7F7",
        outlineTab: "#56b0ff",
        profileGhost: "#ffffff00",
        keyCueBorderColor: "darken(#D9D9D9, 15%)",
        statusMessageColor: "transparentize(#e53e3e, 0.7)",
      },
      spacing: {
        "x1": "15px", // m-x1 or w-x1
        "x2": "30px",
        "10px": "10px",
        "6px": "6px",
        "5px": "5px",
        "3px": "3px",
        "2px": "2px",
        "1px": "1px",
        "icon": "18px",
        "fillIcon": "24px",
        "1ch": "1ch",
        "avatarSize": "40px",
        "avatarSizeDefault": "37px",
        "avatarSizeLarge": "50px",
        "serverSize": "47px",
        "dotSize": "6px",
        "checkBoxSize": "13px",
        "loaderSize": "1rem",
        "userCardSize": "250px",
        "statusSize": "13px",
        "popupSize": "342px",
        "constraintSize": "1.2ch",
        "serverAvatarSize": "calc(47px * sqrt(2))",
        "userProfileAvatarSize": "calc(37px * sqrt(2))",
        "userProfileAvatarSizeLarge": "calc(50px * sqrt(2))",
        "indicatorSize": "8px",
        "avatarStatusSize": "13px",
        "avatarStatusSizeLarge": "17px",
        "arrowSize": "calc(100% + 10px)",
        "bigStarSize": "calc(100% + 5px)",
        "littleStartBottom": "calc(100% + 5px)",
      },
      fontFamily: {
        iowan: ["Iowan Old Style", "serif"],
      },
      fontSize: {
        small: "10px",
        medium: "12px",
        normal: "1rem",
        large: "16px",
        constraintSize: "0.8rem",
      },
      fontWeight: {
        default: 300,
        strong: 500,
        stronger: "bold",
      },
      gradientColorStops: {
        15: "15%", // bg-gradient-to-[15]
      },
      borderRadius: {
        10: "10px", // rounded-10
        5: "5px",
        3: "3px",
        1: "1px",
        50: "50%",
      },
      borderWidth: {
        1: "1px", // border-1
        3: "3px",
      },
      lineHeight: {
        100: "100%", // leading-100
        160: "160%",
      },
    },
    animation: {
      "hold": "hold 200ms",
      "fadeIn": "fadeIn 0.3s ease-out",
      "spin": "rotate 0.6s infinite linear",
      "enter": "enter 200ms",
      "dot-jump": "dot-jump 400ms ease-in-out infinite alternate",
      "loading": "loading 1.5s infinite ease-in-out",
      "indicator": "indicator 300ms",
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
      "rotate": {
        "50%": {opacity: "0.5", filter: "blur(1px)"},
        "100%": {transform: "rotate(360deg)"},
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
}
