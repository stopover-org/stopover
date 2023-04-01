import { extendTheme } from "@mui/joy";

export const theme = extendTheme({
  components: {
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: "2px",
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: "2px",
        },
      },
    },
  },
  fontFamily: {
    body: "'Roboto'",
  },
  fontWeight: {
    xs: "300",
    sm: "300",
    md: "300",
    lg: "300",
    xl: "300",
    xl2: "300",
    xl3: "300",
  },
  typography: {
    display1: {
      fontWeight: 300,
    },
    display2: {
      fontWeight: 300,
    },
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 300,
    },
    h3: {
      fontWeight: 300,
    },
    h4: {
      fontWeight: 300,
    },
    h5: {
      fontWeight: 300,
    },
    h6: {
      fontWeight: 300,
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
    body3: {
      fontWeight: 300,
    },
    body4: {
      fontWeight: 300,
    },
    body5: {
      fontWeight: 300,
    },
  },
  colorSchemes: {
    light: {
      palette: {
        success: {
          50: "#ffffff",
          100: "#d3eeb9",
          200: "#a7dd74",
          300: "#7bc931",
          400: "#518420",
          500: "#007905",
          600: "#1e320c",
          700: "#172509",
          800: "#0f1906",
          900: "#080c03",
        },
        info: {
          50: "#ffffff",
          100: "#cddef0",
          200: "#9bbde0",
          300: "#699bd1",
          400: "#3a7abe",
          500: "#2B5A8C",
          600: "#224870",
          700: "#1a3654",
          800: "#112438",
          900: "#09121c",
        },
        danger: {
          50: "#ffffff",
          100: "#fcc0c7",
          200: "#f9818f",
          300: "#f64257",
          400: "#ec0b25",
          500: "#AD081B",
          600: "#8a0616",
          700: "#680510",
          800: "#45030b",
          900: "#230205",
        },
        primary: {
          50: "#ffffff",
          100: "#fff3e5",
          200: "#ffe8cc",
          300: "#ffd099",
          400: "#ffa133",
          500: "#ff8a00",
          600: "#cc6e00",
          700: "#854600",
          800: "#663700",
          900: "#331c00",
        },
      },
    },
  },
});
