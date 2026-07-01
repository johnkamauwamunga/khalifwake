// config/theme.ts
import { createTheme } from "@gluestack-ui/themed";

export const theme = createTheme({
  tokens: {
    colors: {
      primary50: "#FFF8F0",
      primary100: "#FFEAD5",
      primary200: "#FDD6A8",
      primary300: "#FCBF7A",
      primary400: "#FAA84D",
      primary500: "#F89220", // warm orange
      primary600: "#D97A18",
      primary700: "#B56210",
      primary800: "#914A0A",
      primary900: "#6E3305",
      // Additional warm colors
      warmGray50: "#FAF8F5",
      warmGray100: "#F2EFEB",
      warmGray200: "#E5E0DA",
      warmGray300: "#D1CAC2",
      warmGray400: "#BDB3A9",
      warmGray500: "#A89D91",
      // ... you can extend
    },
    // You can also define custom fonts, spacing, etc.
  },
  // Override component styles if needed
});
