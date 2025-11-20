// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Nunito', sans-serif",   // 👈 change la font des headings
    body: "'Nunito', sans-serif",      // optionnel
  },
  body: {
    backgroundColor: "#000",
    color: "white",
  },
});

export default theme;
