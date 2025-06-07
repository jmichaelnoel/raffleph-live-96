
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import IndexWithSupabase from "./pages/IndexWithSupabase";
import RaffleDetailsPage from "./pages/RaffleDetailsPage";
import SubmitRafflePage from "./pages/SubmitRafflePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexWithSupabase />} />
            <Route path="/raffles/:raffleId" element={<RaffleDetailsPage />} />
            <Route path="/submit-raffle" element={<SubmitRafflePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
