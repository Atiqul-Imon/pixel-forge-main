import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const accents = {
  blue: {
    iconWrap: 'bg-primary-50 text-primary-800 ring-primary-100/90',
    ring: 'group-hover:ring-primary-300/80',
  },
  violet: {
    iconWrap: 'bg-violet-50 text-violet-700 ring-violet-100/80',
    ring: 'group-hover:ring-violet-200/90',
  },
  emerald: {
    iconWrap: 'bg-emerald-50 text-emerald-700 ring-emerald-100/80',
    ring: 'group-hover:ring-emerald-200/90',
  },
  amber: {
    iconWrap: 'bg-amber-50 text-amber-800 ring-amber-100/80',
    ring: 'group-hover:ring-amber-200/90',
  },
  orange: {
    iconWrap: 'bg-orange-50 text-orange-800 ring-orange-100/80',
    ring: 'group-hover:ring-orange-200/90',
  },
} as const;

export type FeatureAccent = keyof typeof accents;

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  accent?: FeatureAccent;
};

export function FeatureCard({
  icon,
  title,
  description,
  features,
  accent = 'blue',
}: FeatureCardProps) {
  const a = accents[accent];

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-card p-8 md:p-9',
        'shadow-float',
        'transition-[box-shadow,border-color,transform] duration-300 ease-out',
        'hover:-translate-y-0.5 hover:border-primary-200/60 hover:shadow-elevated'
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div
          className={cn(
            'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset',
            a.iconWrap,
            a.ring,
            'transition-[box-shadow] duration-300'
          )}
        >
          <span className="[&>svg]:h-7 [&>svg]:w-7">{icon}</span>
        </div>
      </div>

      <h3 className="mb-3 text-xl font-semibold leading-snug tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mb-8 flex-1 text-[15px] leading-[1.65] text-slate-700 md:text-base">
        {description}
      </p>

      <ul className="space-y-3.5 border-t border-slate-100 pt-8">
        {features.map((feature, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
