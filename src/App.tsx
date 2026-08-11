import { Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import LocaleWrapper from "./components/providers/locale-wrapper.tsx";
import { SAVED_OR_DEFAULT_LOCALE, setLocaleInPath } from "./i18n";
import "./i18n";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CustomCursor from "./components/custom-cursor.tsx";
import SmoothScroll from "./components/smooth-scroll.tsx";

function RootRedirect() {
  const location = useLocation();
  return (
    <Navigate
      to={setLocaleInPath(SAVED_OR_DEFAULT_LOCALE, "/", location.search, location.hash)}
      replace
    />
  );
}

export default function App() {
  return (
    <DefaultProviders>
      <SmoothScroll>
        <BrowserRouter>
          <CustomCursor />
          <Suspense fallback={<div />}>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route
                path="/:lng"
                element={
                  <LocaleWrapper>
                    <Outlet />
                  </LocaleWrapper>
                }
              >
                <Route index element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SmoothScroll>
    </DefaultProviders>
  );
}
