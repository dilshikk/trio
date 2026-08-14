import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Eye, EyeOff, Shield, Zap } from "lucide-react";

function PremiumButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  return (
    <motion.button
      ref={btnRef}
      type="submit"
      disabled={loading}
      onClick={addRipple}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full overflow-hidden py-3.5 text-sm font-bold tracking-[0.15em] uppercase rounded-lg disabled:opacity-60 cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #6395ff 0%, #a78bfa 50%, #f472b6 100%)",
        boxShadow: "0 0 30px rgba(99,149,255,0.35), 0 0 60px rgba(167,139,250,0.15)",
      }}
    >
      <motion.span
        className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" as const }}
      />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ left: r.x, top: r.y, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 28, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2 text-white">
        {loading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" as const }}
              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full block"
            />
            Проверяем…
          </>
        ) : (
          <><Zap className="w-4 h-4" />{children}</>
        )}
      </span>
    </motion.button>
  );
}

function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, bottom: "-10px", width: size, height: size, background: "linear-gradient(135deg, #6395ff40, #a78bfa40)" }}
      animate={{ y: ["-0vh", "-100vh"], opacity: [0, 0.6, 0] }}
      transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: "easeOut" as const }}
    />
  );
}

type Props = {
  onLogin: (email: string, password: string) => Promise<void>;
};

export default function AdminLogin({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const springX2 = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY2 = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа. Попробуйте ещё раз.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  const particles = [2, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 78, 85, 92];

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative" style={{ background: "oklch(0.06 0 0)" }}>
      <motion.div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,149,255,0.12) 0%, transparent 70%)", top: "-10%", left: "-10%", x: springX, y: springY }} />
      <motion.div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)", bottom: "-10%", right: "-5%", x: springX2, y: springY2 }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((x, i) => <FloatingParticle key={x} x={x} delay={i * 0.4} size={3 + (i % 4) * 2} />)}
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(99,149,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,149,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }} className="relative z-10 w-full max-w-md mx-4">
        <motion.div animate={shake ? { x: [-10, 10, -8, 8, -5, 5, 0] } : { x: 0 }} transition={{ duration: 0.5, ease: "easeOut" as const }}>
          <div className="absolute -inset-[1px] rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(99,149,255,0.5), rgba(167,139,250,0.3), rgba(244,114,182,0.3))" }} />
          <div className="relative rounded-2xl p-8 space-y-7" style={{ background: "oklch(0.09 0 0 / 0.95)", backdropFilter: "blur(20px)" }}>
            <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              <div className="relative">
                <motion.div className="absolute inset-0 rounded-full blur-xl" style={{ background: "linear-gradient(135deg, #6395ff, #a78bfa)" }} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }} />
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
                  <img src="https://hercules-cdn.com/file_w4ZtbBGahZ97utUXzF4gFXcB" alt="TRIO GROUPS" className="w-9 h-9 object-contain" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[11px] tracking-[0.35em] uppercase font-semibold" style={{ color: "#6395ff" }}>TRIO GROUPS</p>
                <h1 className="text-white text-xl font-bold tracking-tight mt-0.5">Админ панель</h1>
                <p className="text-white/30 text-xs mt-1 flex items-center justify-center gap-1"><Shield className="w-3 h-3" /> Защищенный доступ</p>
              </div>
            </motion.div>

            <form onSubmit={(e) => { void handleSubmit(e); }} className="space-y-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="space-y-1.5">
                <label className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-medium">Email</label>
                <div className="relative group">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@triogroups.uz" required autoComplete="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#6395ff]/60" />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "0 0 0 1px rgba(99,149,255,0.4), 0 0 15px rgba(99,149,255,0.1)" }} />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="space-y-1.5">
                <label className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-medium">Пароль</label>
                <div className="relative group">
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" required autoComplete="current-password" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-11 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#a78bfa]/60" />
                  <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors cursor-pointer">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "0 0 0 1px rgba(167,139,250,0.4), 0 0 15px rgba(167,139,250,0.1)" }} />
                </div>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -8, height: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 animate-pulse" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}>
                <PremiumButton loading={loading}>Войти</PremiumButton>
              </motion.div>
            </form>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-center text-[10px] text-white/20 mt-6 tracking-wider">
          MADE IN{" "}
          <a href="https://dscreative.uz" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#6395ff] transition-colors duration-300 font-semibold tracking-[0.1em]">DS CREATIVE</a>
        </motion.p>
      </motion.div>
    </div>
  );
}
