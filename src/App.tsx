import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PreloaderDemo from "./pages/preloader-demo.tsx";
import CustomCursor from "./components/custom-cursor.tsx";
import SmoothScroll from "./components/smooth-scroll.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <SmoothScroll>
        <BrowserRouter>
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/preloader-demo" element={<PreloaderDemo />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </DefaultProviders>
  );
}
