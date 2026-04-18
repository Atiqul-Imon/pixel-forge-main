import { cn } from '@/lib/utils';

type LogoStripProps = {
  className?: string;
};

/**
 * Trust strip: sector focus (honest placeholders until real logos exist).
 * Light enterprise layout similar to reference agency sites.
 */
export function LogoStrip({ className }: LogoStripProps) {
  const sectors = [
    { label: 'Commerce', detail: 'D2C & catalogs' },
    { label: 'Healthcare', detail: 'Trust-first UX' },
    { label: 'Nonprofit', detail: 'Content at scale' },
    { label: 'SaaS', detail: 'Product marketing' },
    { label: 'Finance', detail: 'Compliance-aware' },
    { label: 'Platforms', detail: 'Internal tools' },
  ];

  return (
    <div className={cn('border-y border-slate-200/90 bg-slate-50', className)}>
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Trusted delivery across sectors
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
          Representative verticals—ask for references during discovery.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {sectors.map(({ label, detail }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200/90 bg-white px-4 py-4 text-center shadow-sm transition-interactive hover:border-slate-300 hover:shadow-md"
            >
              <span className="block text-sm font-semibold tracking-tight text-slate-900">{label}</span>
              <span className="mt-1 block font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500">
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
