import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://99d406d08f445ffd457e5e1fb46e8c1d@o4509090073739269.ingest.de.sentry.io/4509090075705424",
});

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
