// components/vehicles/VehicleCard.tsx
import Link from 'next/link';
import Image from 'next/image';

export type VehicleCardType = {
  id: number;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number | null;
  fuel_type: string | null;
  transmission: string | null;
  main_image_url: string;
  status: string;
};

export default function VehicleCard({ vehicle }: { vehicle: VehicleCardType }) {
  return (
    <Link
      href={`/cars/${vehicle.slug}`}
      className="group overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <Image
          src={vehicle.main_image_url}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        {vehicle.status !== 'available' && (
          <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white">
            {vehicle.status.toUpperCase()}
          </span>
        )}
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-sm font-semibold">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-lg font-bold text-emerald-600">
          {vehicle.price.toLocaleString()} LKR
        </p>
        <p className="text-xs text-slate-500">
          {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km · ` : ''}
          {vehicle.fuel_type ?? ''} {vehicle.fuel_type && '·'}{' '}
          {vehicle.transmission ?? ''}
        </p>
      </div>
    </Link>
  );
}
