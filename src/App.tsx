import * as React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import QuantumLayout from "./components/layout/QuantumLayout";
import WelcomeMessage from "./components/WelcomeMessage";
import CinematicIntro from "./components/CinematicIntro";
import OnboardingTutorial from "./components/OnboardingTutorial";
import { UserRole } from "./services/assetService";
import Home from "./pages/Home";
import Compilacion from "./pages/Compilacion";
import MSRBlockchain from "./pages/MSRBlockchain";
import KnowledgeSystem from "./pages/KnowledgeSystem";
import SecurityDashboard from "./pages/SecurityDashboard";
import IsabellaAI from "./pages/IsabellaAI";
import QuantumEconomy from "./pages/QuantumEconomy";
import UTAMV from "./pages/UTAMV";
import DreamSpaces from "./pages/DreamSpaces";
import Governance from "./pages/Governance";
import Philosophy from "./pages/Philosophy";
import Architecture from "./pages/Architecture";
import UseCases from "./pages/UseCases";
import Roadmap from "./pages/Roadmap";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  const [showIntro, setShowIntro] = React.useState(true);
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [userRole, setUserRole] = React.useState<UserRole | null>(null);

  React.useEffect(() => {
    const savedRole = localStorage.getItem("tamv_user_role");
    if (savedRole) {
      setUserRole(savedRole as UserRole);
    } else if (!showIntro) {
      setShowOnboarding(true);
    }
  }, [showIntro]);

  const handleOnboardingComplete = (role: UserRole) => {
    localStorage.setItem("tamv_user_role", role);
    setUserRole(role);
    setShowOnboarding(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <AnimatePresence>
            {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}
          </AnimatePresence>
          
          <AnimatePresence>
            {showOnboarding && <OnboardingTutorial onComplete={handleOnboardingComplete} />}
          </AnimatePresence>

          <Toaster />
          <Sonner />
          <BrowserRouter>
            <QuantumLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/compilacion" element={<Compilacion />} />
                <Route path="/msr-blockchain" element={<MSRBlockchain />} />
                <Route path="/knowledge" element={<KnowledgeSystem />} />
                <Route path="/security" element={<SecurityDashboard />} />
                <Route path="/isabella" element={<IsabellaAI />} />
                <Route path="/economy" element={<QuantumEconomy />} />
                <Route path="/university" element={<UTAMV />} />
                <Route path="/dreamspaces" element={<DreamSpaces />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/philosophy" element={<Philosophy />} />
                <Route path="/architecture" element={<Architecture />} />
                <Route path="/use-cases" element={<UseCases />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/blog" element={<Blog />} />
                
                {/* Genesis Digytamv Nexus Routes */}
                <Route path="/documentation" element={<KnowledgeSystem />} />
                <Route path="/membership" element={<Home />} />
                <Route path="/register" element={<Home />} />
                <Route path="/login" element={<Home />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </QuantumLayout>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
