import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Fonts are bundled with the app (no Google Fonts request), all under the SIL Open Font License.
import "@fontsource-variable/inter/opsz.css";
import "@fontsource/audiowide/latin-400.css";
import "@fontsource-variable/tektur/wght.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource-variable/noto-sans-georgian";
import "@fontsource-variable/noto-sans-armenian";
import "./index.css";
import "./watch.css";

// Browsers only download a font file once text on the page needs it, so switching to Greek
// briefly showed the title in the fallback font while Tektur's Greek file loaded. Fetch it
// (and Inter's Greek file for the body text) up front so the switch is instant.
if ("fonts" in document) {
  for (const face of ['600 1em "Tektur Variable"', '400 1em "Inter Variable"'])
    document.fonts.load(face, "Ελληνικά").catch(() => { /* fallback font is fine */ });
}

// Refuse to run inside another site's frame, where a visitor could be tricked into clicking
// through the install. GitHub Pages can't send frame-ancestors, so this is checked here.
const framed = (() => { try { return window.top !== window.self; } catch { return true; } })();

if (framed) {
  const a = document.createElement("a");
  a.href = location.href;
  a.target = "_top";
  a.rel = "noopener";
  a.textContent = "Open Watch Languages in its own tab";
  document.getElementById("root")!.replaceChildren(a);
} else createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
