// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Nunito', sans-serif",   // 👈 change la font des headings
    body: "'Nunito', sans-serif",      // optionnel
  },
});

export default theme;
