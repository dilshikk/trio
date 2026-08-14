import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminPage from "./pages/admin/page.tsx";
import LogisticsPage from "./pages/logistics/page.tsx";
import AccountingPage from "./pages/accounting/page.tsx";
import ConsultingPage from "./pages/consulting/page.tsx";
import AboutPage from "./pages/about/page.tsx";
import ContactPage from "./pages/contact/page.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* Admin */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/:locale/admin" element={<AdminPage />} />
          {/* Service pages */}
          <Route path="/logistics" element={<LogisticsPage />} />
          <Route path="/:locale/logistics" element={<LogisticsPage />} />
          <Route path="/accounting" element={<AccountingPage />} />
          <Route path="/:locale/accounting" element={<AccountingPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
          <Route path="/:locale/consulting" element={<ConsultingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/:locale/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/:locale/contact" element={<ContactPage />} />
          {/* Home */}
          <Route path="/" element={<Index />} />
          <Route path="/:locale" element={<Index />} />
          <Route path="/:locale/*" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
