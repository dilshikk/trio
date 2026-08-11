import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "@/components/navigation.tsx";
import Preloader from "@/components/preloader.tsx";
import HeroSlider from "./home/_components/hero-slider.tsx";
import ServicesSection from "./home/_components/services-section.tsx";
import ServiceDetailSection from "./home/_components/service-detail-section.tsx";
import AboutSection from "./home/_components/about-section.tsx";
import ProcessSection from "./home/_components/process-section.tsx";
import GlobalSection from "./home/_components/global-section.tsx";
import FinalCta from "./home/_components/final-cta.tsx";
import Footer from "./home/_components/footer.tsx";

function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      {children}
    </motion.div>
  );
}

export default function Index() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  return (
    <>
      <AnimatePresence>
        {!preloaderDone && <Preloader key="preloader" onComplete={() => setPreloaderDone(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {preloaderDone && (
          <motion.main
            key="site"
            className="bg-background text-foreground min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <Navigation />
            <HeroSlider />
            <ServicesSection />
            <ServiceDetailSection />
            <SectionReveal>
              <AboutSection />
            </SectionReveal>
            <ProcessSection />
            <SectionReveal>
              <GlobalSection />
            </SectionReveal>
            <SectionReveal>
              <FinalCta />
            </SectionReveal>
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
