/** Tepada doim turadi: "All parts" tugmasi, umumiy progress va ball */
export function TopBar({ done, got, total, onMenu }: { done: number; got: number; total: number; onMenu?: () => void }) {
  return (
    <div id="topbar" className="safe-top sticky z-10 -mx-4 flex items-center gap-3 border-b border-line bg-paper px-4 py-2.5">
      {onMenu && (
        <button
          type="button"
          onClick={onMenu}
          className="min-h-11 flex-none rounded-xl border-[1.5px] border-line bg-card px-3.5 text-base font-bold text-ink"
        >
          All parts
        </button>
      )}
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${(done / total) * 100}%` }} />
      </div>
      <div className="min-w-14 flex-none text-right text-base font-bold tabular-nums">
        {got} / {total}
      </div>
    </div>
  );
}
