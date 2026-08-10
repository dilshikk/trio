import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const details = [
  { id: "logistics-detail", number: "01", label: "LOGISTICS", accentHex: "#6395ff", headline: "END-TO-END\nSUPPLY CHAINS.", overview: "From the first mile to the final destination, TRIO Logistics engineers supply chains that are fast, compliant, and built to scale. We bring together technology, expertise, and a global network to give your business the movement advantage.", benefits: [ { title: "Real-Time Visibility", body: "Track every shipment from origin to destination with live status updates and predictive ETAs." }, { title: "Multi-Modal Flexibility", body: "Air, sea, road, and rail \u2014 we coordinate the optimal mix for cost efficiency and speed." }, { title: "Customs & Compliance", body: "Navigate international regulations effortlessly with our dedicated compliance team." }, { title: "Scalable Infrastructure", body: "Whether you ship 10 pallets or 10,000 containers, our network scales with your demand." } ], integration: "Our logistics network feeds directly into TRIO Accounting for automated freight billing and cost reporting, while TRIO Consulting designs the supply chain strategy that makes it all possible." },
  { id: "accounting-detail", number: "02", label: "ACCOUNTING", accentHex: "#dcb25a", headline: "CLARITY BEHIND\nEVERY NUMBER.", overview: "TRIO Accounting delivers financial intelligence that goes beyond bookkeeping. We transform raw financial data into strategic insight, giving leadership teams the clarity to make decisive, confident decisions.", benefits: [ { title: "Integrated Reporting", body: "Unified dashboards that combine operational data with financial performance in real time." }, { title: "Tax Strategy", body: "Proactive tax planning that minimises liability and maximises reinvestment opportunities." }, { title: "Audit Readiness", body: "Clean, organised financial records that make audits smooth and findings predictable." }, { title: "Business Analytics", body: "KPI tracking, variance analysis, and forecasting built around your decision-making cadence." } ], integration: "TRIO Accounting connects seamlessly with Logistics for freight cost reconciliation and with Consulting for financial modelling during strategic planning engagements." },
  { id: "consulting-detail", number: "03", label: "CONSULTING", accentHex: "#c4c4c4", headline: "STRATEGY BUILT\nTO LAST.", overview: "TRIO Consulting translates ambition into architecture. We work alongside leadership to diagnose complexity, design resilient systems, and build the roadmaps that turn vision into measurable outcomes.", benefits: [ { title: "Strategic Diagnosis", body: "Deep-dive analysis of your business model, market position, and operational bottlenecks." }, { title: "Process Architecture", body: "End-to-end process design that eliminates waste and creates compounding efficiency gains." }, { title: "Growth Planning", body: "Data-backed expansion roadmaps with clear milestones, owners, and success metrics." }, { title: "Transformation Leadership", body: "Change management support that ensures strategic shifts are adopted at every level." } ], integration: "Consulting engagements draw on TRIO Logistics data for operational benchmarking and TRIO Accounting financials for ROI modelling, creating strategies grounded in your real numbers." },
];

function DetailItem({ detail }: { detail: typeof details[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <motion.div ref={ref} id={detail.id} className="relative py-24 border-t border-white/6">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]" style={{ background: `radial-gradient(circle, ${detail.accentHex} 0%, transparent 70%)`, transform: "translate(-20%, -20%)" }} />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }} className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: detail.accentHex }}>{detail.number}</span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">{detail.label} \u2014 IN DEPTH</span>
        </div>
        <h3 className="text-[clamp(32px,4.5vw,64px)] font-bold leading-[0.92] tracking-[-0.03em] text-white whitespace-pre-line mb-6">{detail.headline}</h3>
        <p className="text-[15px] leading-relaxed text-white/50 font-light max-w-xl">{detail.overview}</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/6 mb-16">
        {detail.benefits.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const }} className="bg-[oklch(0.09_0_0)] p-8 space-y-3">
            <div className="w-6 h-[1px]" style={{ background: detail.accentHex }} />
            <h4 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-white">{b.title}</h4>
            <p className="text-[13px] text-white/40 font-light leading-relaxed">{b.body}</p>
          </motion.div>
        ))}
      </div>
      <motion.div style={{ y }} className="relative border border-white/8 p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(${detail.accentHex} 1px, transparent 1px), linear-gradient(90deg, ${detail.accentHex} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
          <div className="flex-shrink-0"><span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: detail.accentHex }}>TRIO INTEGRATION</span></div>
          <p className="text-[13px] text-white/45 font-light leading-relaxed">{detail.integration}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServiceDetailSection() {
  return (
    <section className="relative px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }} className="pt-4 pb-4 border-t border-white/6">
        <p className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-4">SERVICE DETAILS</p>
        <h2 className="text-[clamp(32px,4.5vw,60px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">EACH DIRECTION,<br /><span className="text-white/30">FULLY EXPLORED.</span></h2>
      </motion.div>
      {details.map((d) => (<DetailItem key={d.id} detail={d} />))}
    </section>
  );
}
