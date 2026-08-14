export default function DemoFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6 px-6 md:px-16 lg:px-24 py-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="TRIO GROUPS" className="h-6 w-6 object-contain" />
          <span className="text-[12px] font-semibold tracking-[0.22em] text-white/50 uppercase">TRIO GROUPS</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/20 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6395ff]/60" />ЛОГИСТИКА
          <span className="mx-2 text-white/10">·</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dcb25a]/60" />БУХГАЛТЕРИЯ
          <span className="mx-2 text-white/10">·</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4c4c4]/60" />КОНСАЛТИНГ
        </div>
        <p className="text-[11px] text-white/20 tracking-[0.1em]">© {year} TRIO GROUPS. Все права защищены.</p>
      </div>
    </footer>
  );
}
