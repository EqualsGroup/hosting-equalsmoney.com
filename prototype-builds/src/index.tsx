import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { OnboardingFlow } from "./screens/OnboardingFlow";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <OnboardingFlow />
  </StrictMode>,
);