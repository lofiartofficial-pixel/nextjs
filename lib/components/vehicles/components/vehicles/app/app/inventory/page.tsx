// app/inventory/page.tsx
import { supabase } from '@/lib/supabaseClient';
import VehicleCard, {
  VehicleCardType,
} from '@/components/vehicles/VehicleCard';
import InventoryFilters from '@/components/vehicles/InventoryFilters';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function InventoryPage({ searchParams }: Props) {
  const make = searchParams.make as string | undefined;
  const model = searchParams.model as string | undefined;
  const minYear = searchParams.yearMin
    ? Number(searchParams.yearMin)
    : undefined;
  const maxYear = searchParams.yearMax
    ? Number(searchParams.yearMax)
    : undefined;

  let query = supabase.from('vehicles').select('*').eq('status', 'available');

  if (make) query = query.ilike('make', make);
  if (model) query = query.ilike('model', model);
  if (minYear) query = query.gte('year', minYear);
  if (maxYear) query = query.lte('year', maxYear);

  const { data } = await query;
  const vehicles = (data ?? []) as any as VehicleCardType[];

  return (
    <div className="space-y-4">
      <InventoryFilters />
      <p className="text-xs text-slate-500">
        {vehicles.length} vehicles found
      </p>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </div>
  );
}
