import type { ReactNode } from 'react';
import { FIELDS, FITNESS, FOOT_FIELDS, SPORTS, TITLES, type FieldDef, type FormData } from '../lib/form';

/**
 * "Fit & Well" ariza formasi. `onChange` berilsa — to'ldiriladi (o'quvchi formasi),
 * berilmasa — faqat o'qiladi (Lenaning formasi).
 */
export function FormCard({ form, onChange }: { form: FormData; onChange?: (f: FormData) => void }) {
  const set = onChange && ((patch: Partial<FormData>) => onChange({ ...form, ...patch }));
  const toggle =
    set &&
    ((x: string) => set({ interests: form.interests.includes(x) ? form.interests.filter((i) => i !== x) : [...form.interests, x] }));
  const row = (field: FieldDef) => (
    <Row key={field.key} field={field} value={form[field.key as keyof FormData] as string} onChange={set && ((v) => set({ [field.key]: v }))} />
  );

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-form-head text-[15px] text-ink">
      <div className="bg-form-head px-4 py-3 text-form-head-ink">
        <div className="font-display text-[28px] leading-none font-extrabold">Fit &amp; Well</div>
        <div className="mt-1 text-sm tracking-wide">Sports and Leisure Centre · APPLICATION FORM</div>
      </div>
      <div className="flex flex-col gap-5 bg-form-paper px-4 py-4">
        <p className="m-0 text-sm italic">Please write BLOCK CAPITALS in BLACK ink.</p>

        <Block title="Personal information">
          {FIELDS.slice(0, 2).map(row)}
          <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-center gap-x-3 py-1">
            <span className="leading-tight font-bold">
              Title<span className="block text-xs font-normal text-muted">Please underline.</span>
            </span>
            <div className="flex flex-wrap" role={set ? 'radiogroup' : undefined} aria-label="Title">
              {TITLES.map((t, k) => {
                const on = form.title === t;
                const look = on ? 'font-bold text-pen underline decoration-2 underline-offset-4' : '';
                return (
                  <span key={t} className="flex items-center">
                    {set ? (
                      <button type="button" role="radio" aria-checked={on} onClick={() => set({ title: t })} className={`min-h-11 px-1.5 ${look}`}>
                        {t}
                      </button>
                    ) : (
                      <span className={`px-0.5 ${look}`}>{t}</span>
                    )}
                    {k < TITLES.length - 1 && <span className="text-muted">/</span>}
                  </span>
                );
              })}
            </div>
          </div>
          {FIELDS.slice(2).map(row)}
        </Block>

        <Block title="Sports" note="Please tick (✓) interests." columns={!set}>
          {SPORTS.map((x) => (
            <Tick key={x} label={x} on={form.interests.includes(x)} onToggle={toggle && (() => toggle(x))} />
          ))}
        </Block>
        <Block title="Health & fitness" note="Please tick (✓) interests." columns={!set}>
          {FITNESS.map((x) => (
            <Tick key={x} label={x} on={form.interests.includes(x)} onToggle={toggle && (() => toggle(x))} />
          ))}
        </Block>

        <Block>{FOOT_FIELDS.map(row)}</Block>
      </div>
    </div>
  );
}

/** `columns` — Lenaning formasida belgilar ikki ustunda, telefonda joy tejaladi */
function Block({ title, note, columns, children }: { title?: string; note?: string; columns?: boolean; children: ReactNode }) {
  return (
    <section>
      {title && <h4 className="m-0 text-sm font-bold tracking-[0.06em] text-form-head uppercase">{title}</h4>}
      {note && <p className="m-0 mb-1 text-sm italic">{note}</p>}
      <div className={columns ? 'grid grid-cols-2 gap-x-5' : 'flex flex-col'}>{children}</div>
    </section>
  );
}

function Row({ field, value, onChange }: { field: FieldDef; value: string; onChange?: (v: string) => void }) {
  const id = `form-${field.key}`;
  // "optional" faqat o'quvchi to'ldiradigan formada kerak
  const hint = field.date ? 'dd/mm/yy' : field.ask || !onChange ? '' : 'optional';
  return (
    <div className={`grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-end gap-x-3 ${onChange ? 'py-1' : 'py-0.5'}`}>
      <label htmlFor={onChange ? id : undefined} className="leading-tight font-bold">
        {field.label}
        {hint && <span className="block text-xs font-normal text-muted">{hint}</span>}
      </label>
      {onChange ? (
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.date ? 'dd/mm/yy' : undefined}
          inputMode={field.inputMode}
          autoCapitalize={field.caps ? 'characters' : 'words'}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="w-full min-w-0 border-0 border-b-2 border-dashed border-pen/50 bg-transparent px-1 py-0.5 font-hand text-[22px] leading-tight text-pen placeholder:text-muted/60 focus:border-solid"
        />
      ) : (
        <span className="min-w-0 border-b border-muted/40 px-1 font-hand text-[20px] leading-tight break-words text-pen">{value}</span>
      )}
    </div>
  );
}

function Tick({ label, on, onToggle }: { label: string; on: boolean; onToggle?: () => void }) {
  const box = (
    <span
      className={`grid size-7 flex-none place-items-center rounded-md border-2 bg-card font-hand text-[22px] leading-none font-bold text-pen ${
        on ? 'border-pen' : 'border-muted/60'
      }`}
      aria-hidden="true"
    >
      {on ? '✓' : ''}
    </span>
  );
  const cls = `flex w-full max-w-72 items-center justify-between gap-3 text-left ${onToggle ? 'min-h-11' : 'min-h-9'}`;
  return onToggle ? (
    <button type="button" role="checkbox" aria-checked={on} onClick={onToggle} className={cls}>
      <span>{label}</span>
      {box}
    </button>
  ) : (
    <div className={cls} aria-label={`${label}: ${on ? 'ticked' : 'not ticked'}`}>
      <span>{label}</span>
      {box}
    </div>
  );
}
