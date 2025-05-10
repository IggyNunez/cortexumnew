import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome script for icons
const script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/a076d05399.js';
script.crossOrigin = 'anonymous';
document.head.appendChild(script);

createRoot(document.getElementById("root")!).render(<App />);
