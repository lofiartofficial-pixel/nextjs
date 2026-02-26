// app/admin/vehicles/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

type Vehicle = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  status: string;
};

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('vehicles')
        .select('id, make, model, year, price, status')
        .order('created_at', { ascending: false });
      setVehicles((data ?? []) as any);
    };
    load();
  }, []);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Vehicles</h2>
        {/* පසුව /admin/vehicles/new form එකක් add කරන්න */}
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Title</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-b">
              <td className="py-2">
                {v.year} {v.make} {v.model}
              </td>
              <td>{v.price.toLocaleString()} LKR</td>
              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        href="/"
        className="inline-block text-xs text-slate-500 underline mt-2"
      >
        Back to site
      </Link>
    </div>
  );
}
