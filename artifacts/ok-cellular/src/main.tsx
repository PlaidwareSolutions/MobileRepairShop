import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// The SSG prerender pipeline injects <link rel="canonical"> into <head> for
// each route. When the React app boots, React 19's native metadata hoisting
// adds a second canonical from the <SEO> component — causing Lighthouse to
// report "conflicting canonical URLs". Removing the SSR-injected copy here
// (before React mounts) ensures there is always exactly one canonical tag,
// owned entirely by the client-side React tree.
document
  .querySelectorAll('link[rel="canonical"]')
  .forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
