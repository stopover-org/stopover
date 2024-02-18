import { extendTheme as extendJoyTheme } from "@mui/joy";
import { colors } from "@mui/material";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

const { unstable_sxConfig: joySxConfig, ...joyTheme } = extendJoyTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1280,
      lg: 1600,
      xl: 1980,
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          zIndex: "unset",
          margin: "10px",
        },
      },
    },
    JoyFormControl: {
      styleOverrides: {
        root: {
          padding: "5px",
        },
      },
    },
    JoyAutocomplete: {
      styleOverrides: {
        root: {
          margin: "0px",
        },
      },
    },
    JoyDialogTitle: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    JoyDialogContent: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    JoyDrawer: {
      styleOverrides: {
        root: {
          maxWidth: "250px",
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

const { unstable_sxConfig: muiSxConfig, ...muiTheme } = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using
  // `CssVarsProvider` from Joy UI.
  cssVarPrefix: "joy",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: joyTheme.colorSchemes.light.palette.primary[500],
        },
        grey: joyTheme.colorSchemes.light.palette.neutral,
        error: {
          main: joyTheme.colorSchemes.light.palette.danger[500],
        },
        success: {
          main: joyTheme.colorSchemes.light.palette.success[500],
        },
        warning: {
          main: joyTheme.colorSchemes.light.palette.warning[200],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

export const theme = {
  ...muiTheme,
  ...joyTheme,
  colorSchemes: deepmerge(muiTheme.colorSchemes, joyTheme.colorSchemes),
  typography: {
    ...muiTheme.typography,
    ...joyTheme.typography,
  },
} as unknown as ReturnType<typeof extendJoyTheme>;

theme.generateCssVars = (colorScheme) => ({
  css: {
    ...muiTheme.generateCssVars(colorScheme).css,
    ...joyTheme.generateCssVars(colorScheme).css,
  },
  // @ts-ignore
  vars: deepmerge(
    muiTheme.generateCssVars(colorScheme).vars,
    joyTheme.generateCssVars(colorScheme).vars
  ),
});

theme.unstable_sxConfig = {
  ...muiSxConfig,
  ...joySxConfig,
};
