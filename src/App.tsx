import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminPage from "./pages/admin/page.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* Admin */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/:locale/admin" element={<AdminPage />} />
          {/* Main site — root and all locales */}
          <Route path="/" element={<Index />} />
          <Route path="/:locale" element={<Index />} />
          <Route path="/:locale/*" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
