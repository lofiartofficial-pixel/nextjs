// app/admin/login/page.tsx
'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErr(error.message);
    } else {
      router.push('/admin/vehicles');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-xl border bg-white p-6">
      <h1 className="mb-4 text-lg font-semibold">Admin Login</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="w-full rounded border px-3 py-2 text-sm"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border px-3 py-2 text-sm"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="text-xs text-red-600">{err}</p>}
        <button
          type="submit"
          className="w-full rounded bg-slate-900 py-2 text-sm font-semibold text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
