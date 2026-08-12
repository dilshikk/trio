import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable-text.tsx";

const nodes = [
  { x: 50, y: 30, label: "EUROPE", size: 6 }, { x: 22, y: 38, label: "AMERICAS", size: 5 },
  { x: 72, y: 42, label: "ASIA PAC", size: 6 }, { x: 48, y: 58, label: "AFRICA", size: 4 },
  { x: 60, y: 25, label: "RUSSIA", size: 3 }, { x: 35, y: 50, label: "S. AMERICA", size: 4 },
  { x: 82, y: 55, label: "OCEANIA", size: 3 }, { x: 55, y: 35, label: "MIDDLE EAST", size: 3 },
];
const routes = [[0,1],[0,2],[0,7],[2,3],[2,6],[1,5],[0,4],[7,2]];

const STAT_KEYS = [
  { labelKey: "global.stat1.label", subKey: "global.stat1.sub" },
  { labelKey: "global.stat2.label", subKey: "global.stat2.sub" },
  { labelKey: "global.stat3.label", subKey: "global.stat3.sub" },
] as const;

export default function GlobalSection() {
  const { t } = useTranslation("common");
  void t;

  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden border-t border-white/6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mb-16">
          <p className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-4"><EditableText tKey="global.eyebrow" /></p>
          <h2 className="text-[clamp(32px,4.5vw,64px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
            <EditableText tKey="global.title" /><br />
            <span className="text-white/25"><EditableText tKey="global.titleFaded" /></span>
          </h2>
        </motion.div>
        <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto">
          <svg viewBox="0 0 100 55" className="w-full h-full" style={{ filter: "drop-shadow(0 0 20px rgba(99,149,255,0.08))" }}>
            {Array.from({ length: 5 }).map((_, i) => (<line key={`h${i}`} x1="0" y1={i * 14} x2="100" y2={i * 14} stroke="white" strokeWidth="0.08" strokeOpacity="0.1" />))}
            {Array.from({ length: 8 }).map((_, i) => (<line key={`v${i}`} x1={i * 15} y1="0" x2={i * 15} y2="55" stroke="white" strokeWidth="0.08" strokeOpacity="0.1" />))}
            {routes.map(([a, b], i) => { const na = nodes[a]; const nb = nodes[b]; return (<motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#6395ff" strokeWidth="0.2" strokeOpacity="0" animate={{ strokeOpacity: [0, 0.35, 0] }} transition={{ duration: 3 + i * 0.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" as const }} />); })}
            {nodes.map((node, i) => (
              <g key={i}>
                <motion.circle
                  cx={node.x} cy={node.y}
                  r={node.size * 0.5}
                  fill="none" stroke="#6395ff" strokeWidth="0.15"
                  animate={{ r: [node.size * 0.5, node.size * 1.2], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: "easeOut" as const }}
                />
                <circle cx={node.x} cy={node.y} r={node.size * 0.25} fill="#6395ff" fillOpacity="0.7" />
                <text
                  x={node.x} y={node.y - node.size * 0.5 - 0.5}
                  textAnchor="middle" fontSize="1.2"
                  fill="white" fillOpacity="0.3"
                  fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="0.3"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px border border-white/8 bg-white/8">
          {STAT_KEYS.map((stat) => (
            <motion.div key={stat.labelKey} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="bg-background px-8 py-8">
              <div className="text-[13px] font-semibold tracking-[0.2em] text-white uppercase"><EditableText tKey={stat.labelKey} /></div>
              <div className="text-[12px] text-white/35 mt-1"><EditableText tKey={stat.subKey} /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
