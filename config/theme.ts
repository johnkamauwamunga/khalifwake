// config/theme.ts
import { createTheme } from "@gluestack-ui/themed";

export const theme = createTheme({
  tokens: {
    colors: {
      // Warm primary palette
      primary50: "#FFF8F0",
      primary100: "#FFEAD5",
      primary200: "#FDD6A8",
      primary300: "#FCBF7A",
      primary400: "#FAA84D",
      primary500: "#F89220",
      primary600: "#D97A18",
      primary700: "#B56210",
      primary800: "#914A0A",
      primary900: "#6E3305",

      // Warm grays
      warmGray50: "#FAF8F5",
      warmGray100: "#F2EFEB",
      warmGray200: "#E5E0DA",
      warmGray300: "#D1CAC2",
      warmGray400: "#BDB3A9",
      warmGray500: "#A89D91",

      // Semantic
      backgroundLight: "#FAF8F5",
      backgroundDark: "#2D2A27",
      textLight: "#4A4036",
      textDark: "#1C1917",
    },
    // Optional: custom fonts, spacing, etc.
  },
  components: {
    Button: {
      defaultProps: {
        bg: "$primary500",
        _text: { color: "$white", fontWeight: "600" },
      },
      variants: {
        outline: {
          borderColor: "$primary500",
          bg: "transparent",
          _text: { color: "$primary500" },
        },
      },
    },
    Heading: {
      defaultProps: {
        color: "$textDark",
      },
    },
    Text: {
      defaultProps: {
        color: "$textLight",
      },
    },
  },
});
