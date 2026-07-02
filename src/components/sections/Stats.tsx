import { profile } from "@/data/profile";

export function Stats() {
  return (
    <dl className="mt-10 grid grid-cols-2 gap-4 border-y border-hacker-border py-6 sm:grid-cols-4">
      {profile.stats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="text-2xl font-bold text-neon text-glow sm:text-3xl">
            {stat.value}
          </dd>
          <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
        </div>
      ))}
    </dl>
  );
}
