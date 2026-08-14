import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/navigation.tsx";
import Footer from "@/pages/home/_components/footer.tsx";
import AboutSection from "@/pages/home/_components/about-section.tsx";
import ProcessSection from "@/pages/home/_components/process-section.tsx";
import { EditModeProvider } from "@/components/edit-mode-provider.tsx";
import AdminBar from "@/components/admin-bar.tsx";
import { changeLocale, isSupportedLocale } from "@/i18n.ts";

export default function AboutPage() {
  const { locale } = useParams<{ locale?: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (locale && isSupportedLocale(locale)) void changeLocale(locale);
  }, [locale]);

  return (
    <EditModeProvider>
      <div className="bg-[oklch(0.06_0_0)] text-foreground min-h-screen pt-24">
        <Navigation />
        <AboutSection />
        <ProcessSection />
        <Footer />
      </div>
      <AdminBar />
    </EditModeProvider>
  );
}
