import type { ReactNode } from 'react';
import { FIELDS, FITNESS, FOOT_FIELDS, signatureOf, SPORTS, TITLES, type FieldDef, type FormData } from '../lib/form';

/**
 * "Fit & Well" ariza formasi. `onChange` berilsa — to'ldiriladi (o'quvchi formasi),
 * berilmasa — faqat o'qiladi (Lenaning formasi).
 */
export function FormCard({ form, onChange }: { form: FormData; onChange?: (f: FormData) => void }) {
  const set = onChange && ((patch: Partial<FormData>) => onChange({ ...form, ...patch }));
  const toggle =
    set &&
    ((x: string) => set({ interests: form.interests.includes(x) ? form.interests.filter((i) => i !== x) : [...form.interests, x] }));
  // O'quvchi formasida faqat u to'ldiradigan maydonlar; Lenaning formasida — hammasi
  const row = (field: FieldDef) => (!set || field.input ? <Row key={field.key} field={field} form={form} set={set} /> : null);

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-form-head text-[15px] text-ink">
      <div className="bg-form-head px-4 py-3 text-form-head-ink">
        <div className="font-display text-[28px] leading-none font-extrabold">Fit &amp; Well</div>
        <div className="mt-1 text-sm tracking-wide">Sports and Leisure Centre · APPLICATION FORM</div>
      </div>
      <div className="flex flex-col gap-5 bg-form-paper px-4 py-4">
        {!set && <p className="m-0 text-sm italic">Please write BLOCK CAPITALS in BLACK ink.</p>}

        <Block title="Personal information">
          {FIELDS.slice(0, 2).map(row)}
          <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-center gap-x-3 py-1">
            <span className="leading-tight font-bold">
              Title{!set && <span className="block text-xs font-normal text-muted">Please underline.</span>}
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

const HAND = 'font-hand text-[22px] leading-tight text-pen';
const LINE = 'w-full min-w-0 border-0 border-b-2 border-dashed border-pen/50 bg-transparent px-1 py-0.5 focus:border-solid';
const CHIP = 'min-h-10 rounded-full border-[1.5px] px-3 text-sm font-bold';

/**
 * Bitta qator. O'quvchi formasida turi bo'yicha: text — yoziladi (avtomatik KATTA harf),
 * date — kalendar, choice — tugmalar (+ o'zi yozishi mumkin), sign — bitta tugma, auto — o'zi qo'yiladi
 */
function Row({ field, form, set }: { field: FieldDef; form: FormData; set?: (patch: Partial<FormData>) => void }) {
  const id = `form-${field.key}`;
  const value = form[field.key as keyof FormData] as string;
  const put = (v: string) => set?.({ [field.key]: v });
  const kind = set ? field.input : undefined;
  const label = (
    <label htmlFor={kind === 'text' || kind === 'choice' || kind === 'date' ? id : undefined} className="leading-tight font-bold">
      {field.label}
      {!set && field.key === 'dob' && <span className="block text-xs font-normal text-muted">dd/mm/yy</span>}
    </label>
  );

  let control;
  if (kind === 'text' || kind === 'choice') {
    control = (
      <input
        id={id}
        value={value}
        onChange={(e) => put(e.target.value.toUpperCase())}
        placeholder={kind === 'choice' ? 'tap or type' : 'type here'}
        autoCapitalize="characters"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="done"
        className={`${LINE} ${HAND} placeholder:font-sans placeholder:text-sm placeholder:text-muted/70`}
      />
    );
  } else if (kind === 'date') {
    control = null; // tanlovlar pastda, butun kenglikda
  } else if (kind === 'sign') {
    control = (
      <button
        type="button"
        onClick={() => put(signatureOf(form))}
        className={value ? `${LINE} min-h-11 text-left ${HAND}` : `${CHIP} border-pen text-pen`}
      >
        {value || '✍ Sign'}
      </button>
    );
  } else {
    control = <span className={`min-w-0 border-b border-muted/40 px-1 break-words ${HAND} text-[20px]`}>{value}</span>;
  }

  return (
    <div className={set ? 'py-1' : 'py-0.5'}>
      <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-end gap-x-3">
        {label}
        {control}
      </div>
      {kind === 'date' && <DatePick id={id} value={value} onChange={put} />}
      {kind === 'choice' && field.choices && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {field.choices.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={value === c}
              onClick={() => put(c)}
              className={`${CHIP} ${value === c ? 'border-pen bg-pen text-form-paper' : 'border-line bg-card text-ink'}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const pad2 = (n: number) => String(n).padStart(2, '0');
const DAYS = Array.from({ length: 31 }, (_, k) => pad2(k + 1));
const MONTHS = Array.from({ length: 12 }, (_, k) => pad2(k + 1));
const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: THIS_YEAR - 1950 - 4 }, (_, k) => THIS_YEAR - 5 - k);

/** Tug'ilgan sana — uchta tanlov dd / mm / yy (kitobdagi tartib), klaviaturasiz */
function DatePick({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  const [d = '', m = '', y = ''] = value.split('/');
  const set = (k: number, v: string) => {
    const parts = [d, m, y];
    parts[k] = v;
    onChange(parts.join('/'));
  };
  const cls = `${HAND} min-h-11 min-w-0 flex-1 appearance-none rounded-lg border-2 border-dashed border-pen/50 bg-card px-2 text-center`;
  return (
    <div className="mt-2 flex gap-2">
      <select id={id} aria-label="Day" value={d} onChange={(e) => set(0, e.target.value)} className={cls}>
        <option value="">dd</option>
        {DAYS.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
      <select aria-label="Month" value={m} onChange={(e) => set(1, e.target.value)} className={cls}>
        <option value="">mm</option>
        {MONTHS.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
      <select aria-label="Year" value={y} onChange={(e) => set(2, e.target.value)} className={cls}>
        <option value="">yy</option>
        {YEARS.map((x) => (
          <option key={x} value={String(x).slice(2)}>
            {x}
          </option>
        ))}
      </select>
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
