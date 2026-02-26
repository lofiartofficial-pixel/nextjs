// app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Car Sale | Dealership',
  description: 'Find your perfect car quickly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <div className="container mx-auto flex items-center justify-between py-4 px-4">
            <Link href="/" className="text-xl font-bold">
              Car Sale
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/inventory">Inventory</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/admin/vehicles" className="font-semibold">
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 pb-16 pt-6">{children}</main>
        <footer className="border-t bg-white py-6 mt-10 text-sm text-center">
          © {new Date().getFullYear()} Car Sale. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
