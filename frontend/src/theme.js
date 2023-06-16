let orange = {
  100: "#fadbd1",
  200: "#f5b7a3",
  300: "#f09275",
  400: "#eb6e47",
  500: "#e64a19",
  600: "#b83b14",
  700: "#8a2c0f",
  800: "#5c1e0a",
  900: "#2e0f05",
};
let purple = {
  100: "#954BEF",
  200: "#7933CF",
  300: "#6923BF",
  400: "#561A9F",
  500: "#4a148c",
  600: "#381062",
  700: "#2E0F52",
  800: "#21093C",
  900: "#1e0838",
};
let pink = {
  100: "#f3d1de",
  200: "#e7a3bd",
  300: "#da749d",
  400: "#ce467c",
  500: "#c2185b",
  600: "#9b1349",
  700: "#740e37",
  800: "#4e0a24",
  900: "#270512",
};
let green = {
  100: "#d1dfd2",
  200: "#a4bfa6",
  300: "#769e79",
  400: "#497e4d",
  500: "#1b5e20",
  600: "#164b1a",
  700: "#103813",
  800: "#0b260d",
  900: "#061607",
};
let black = {
  100: "#cccccc",
  200: "#999999",
  300: "#484948",
  400: "#2b2b2b",
  500: "#151616",
  600: "#0B0C0B",
  700: "#100F0F",
  800: "#080908",
  900: "#000000",
};
let blue = {
  primary: {
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45",
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
};

// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#cfcfcf",
    300: "#c2c2c2",
    400: "#a3a3a3",
    500: "#858585",
    600: "#666666",
    700: "#525252",
    800: "#3d3d3d",
    900: "#292929",
    1000: "#141414",
  },
  primary: {
    ...black,
  },
  secondary: {
    // yellow
    50: "#f0f0f0",
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

// reverses the color palette
export const tokensLight = {
  grey: {
    0: "#000000",
    10: "#141414",
    50: "#292929",
    100: "#3d3d3d",
    200: "#525252",
    300: "#666666",
    400: "#858585",
    500: "#a3a3a3",
    600: "#c2c2c2",
    700: "#e0e0e0",
    800: "#f0f0f0",
    900: "#f6f6f6",
    1000: "#ffffff",
  },
  primary: {
    100: "#070812",
    200: "#0d1025",
    300: "#141937",
    400: "#191F45",
    500: "#21295c",
    600: "#4d547d",
    700: "#7a7f9d",
    800: "#a6a9be",
    900: "#d3d4de",
  },
  secondary: {
    50: "#332a14",
    100: "#665429",
    200: "#997d3d",
    300: "#cca752",
    400: "#ffd166",
    500: "#ffda85",
    600: "#ffe3a3",
    700: "#ffedc2",
    800: "#fff6e0",
    900: "#f0f0f0",
  },
};

// mui theme settings
export const themeSettings = ({ mode, font }) => {
  return {
    palette: {
      mode:
        mode === "dark"
          ? "dark"
          : mode === "blue"
          ? "dark"
          : mode === "purple"
          ? "dark"
          : mode === "green"
          ? "dark"
          : mode === "light"
          ? "light"
          : mode === "pink"
          ? "light"
          : "light",
      font: font,
      theme: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[900],
              alt: tokensDark.primary[800],
              alt1: tokensDark.primary[500],
            },
          }
        : mode === "blue"
        ? {
            primary: {
              ...blue.primary,
              main: blue.primary[400],
              light: blue.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: blue.primary[800],
              alt: blue.primary[600],
              alt1: blue.primary[500],
            },
          }
        : mode === "green"
        ? {
            primary: {
              ...green,
              main: green[400],
              light: green[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: green[900],
              alt: green[700],
              alt1: green[800],
            },
            alt: green[500],
          }
        : mode === "pink"
        ? {
            primary: {
              ...pink,
              main: pink[400],
              light: pink[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: pink[200],
              alt: pink[500],
              alt1: pink[400],
            },
          }
        : mode === "purple"
        ? {
            primary: {
              ...purple,
              main: purple[400],
              light: purple[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: purple[900],
              alt: purple[700],
              alt1: purple[600],
            },
          }
        : mode === "light"
        ? {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
              alt1: tokensDark.grey[100],
            },
          }
        : {
            primary: {
              ...orange,
              main: orange[400],
              light: orange[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: orange[200],
              alt: orange[600],
              alt1: orange[500],
            },
          }), //orange
      orange,
      purple,
      black,
      pink,
      green,
      blue,
      white: tokensDark.grey,
    },
    typography: {
      fontFamily: font,
      fontSize: 12,
      h1: {
        fontFamily: font,
        fontSize: 40,
      },
      h2: {
        fontFamily: font,
        fontSize: 32,
      },
      h3: {
        fontFamily: font,
        fontSize: 24,
      },
      h4: {
        fontFamily: font,
        fontSize: 20,
      },
      h5: {
        fontFamily: font,
        fontSize: 16,
      },
      h6: {
        fontFamily: font,
        fontSize: 14,
      },
    },
  };
};
