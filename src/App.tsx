
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import DietPlanPage from "./pages/DietPlanPage";
import VeterinaryPage from "./pages/VeterinaryPage";
import DeliveryPage from "./pages/DeliveryPage";
import ResourcesPage from "./pages/ResourcesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="diet-plans" element={<DietPlanPage />} />
              <Route path="veterinary" element={<VeterinaryPage />} />
              <Route path="delivery" element={<DeliveryPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
