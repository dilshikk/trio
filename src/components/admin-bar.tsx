import { useEditMode } from "@/hooks/use-edit-mode.ts";
import { Pencil, PencilOff, LayoutDashboard, LogOut } from "lucide-react";

export default function AdminBar() {
  const { isAdmin, isEditMode, toggleEditMode } = useEditMode();
  if (!isAdmin) return null;

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1 bg-black/90 border border-white/15 backdrop-blur-lg rounded-full px-3 py-2 shadow-2xl select-none">
      <span className="text-[10px] text-white/30 tracking-widest uppercase px-2 border-r border-white/10 mr-1">Admin</span>
      <button
        onClick={toggleEditMode}
        className={`flex items-center gap-1.5 text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
          isEditMode
            ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(99,149,255,0.4)]"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        {isEditMode ? <Pencil className="w-3 h-3" /> : <PencilOff className="w-3 h-3" />}
        {isEditMode ? "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435: \u0412\u041a\u041b" : "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"}
      </button>
      <a
        href="/admin"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
      >
        <LayoutDashboard className="w-3 h-3" />
        \u041f\u0430\u043d\u0435\u043b\u044c
      </a>
      <button
        onClick={handleLogout}
        className="flex items-center text-[11px] text-white/30 hover:text-red-400 px-2 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
        title="\u0412\u044b\u0439\u0442\u0438"
      >
        <LogOut className="w-3 h-3" />
      </button>
    </div>
  );
}
