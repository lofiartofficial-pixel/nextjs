// app/cars/[slug]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

type Props = { params: { slug: string } };

export default async function CarDetailPage({ params }: Props) {
  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!vehicle) {
    return <p>Vehicle not found.</p>;
  }

  const message = encodeURIComponent(
    `I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (ID ${vehicle.id})`
  );
  const waLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}?text=${message}`;

  return (
    <div className="pb-20 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={vehicle.main_image_url}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-2xl font-bold text-emerald-600">
            {vehicle.price.toLocaleString()} LKR
          </p>
          <p className="text-sm text-slate-600">
            {vehicle.mileage
              ? `${vehicle.mileage.toLocaleString()} km · `
              : ''}
            {vehicle.fuel_type} · {vehicle.transmission}
          </p>

          <div className="flex gap-3 pt-3">
            <Link
              href={waLink}
              className="rounded bg-green-600 px-5 py-2 text-sm font-semibold text-white"
            >
              WhatsApp Inquiry
            </Link>
            <a
              href={`tel:${process.env.NEXT_PUBLIC_DEALERSHIP_PHONE}`}
              className="rounded border border-slate-300 px-5 py-2 text-sm font-semibold"
            >
              Call Now
            </a>
          </div>

          {/* පසුව මෙතන Specs / Features grid එකක් add කරන්න */}
        </div>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-3 md:hidden flex gap-3">
        <Link
          href={waLink}
          className="flex-1 rounded bg-green-600 py-2 text-center text-sm font-semibold text-white"
        >
          WhatsApp
        </Link>
        <a
          href={`tel:${process.env.NEXT_PUBLIC_DEALERSHIP_PHONE}`}
          className="w-24 rounded border border-slate-300 py-2 text-center text-sm font-semibold"
        >
          Call
        </a>
      </div>
    </div>
  );
}
