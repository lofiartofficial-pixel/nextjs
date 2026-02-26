// app/page.tsx
import { supabase } from '@/lib/supabaseClient';
import VehicleCard, {
  VehicleCardType,
} from '@/components/vehicles/VehicleCard';
import Link from 'next/link';

export default async function HomePage() {
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'available')
    .eq('is_featured', true)
    .limit(8);

  const list = (vehicles ?? []) as any as VehicleCardType[];

  return (
    <>
      <section className="relative mb-10 overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 text-white">
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            ඔබට රිසි වාහනය සොයන්න, ඉක්මනින්.
          </h1>
          <p className="text-sm md:text-base text-slate-200">
            Brand, Model, Year, Price වගේ filters use කරලා ඔබට ගැලපෙන වාහනය
            සෙවියි.
          </p>
          <Link
            href="/inventory"
            className="inline-flex rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Browse All Cars
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Vehicles</h2>
          <Link href="/inventory" className="text-sm text-emerald-600">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {list.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>
    </>
  );
}
