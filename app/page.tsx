'use client';

import { useState } from 'react';

export default function HomePage() {
  const [tab, setTab] = useState('dashboard');

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="rounded-3xl bg-slate-900 p-6">
          <h1 className="text-4xl font-bold">
            Zaměstnanecké ubytování
          </h1>
          <p className="mt-2 text-slate-400">
            Interní rezervační systém
          </p>
        </header>

        <section className="rounded-3xl bg-slate-900 p-4 flex gap-3 flex-wrap">
          {['dashboard', 'rooms', 'approval', 'history'].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-2xl px-5 py-3 ${
                tab === item
                  ? 'bg-blue-600'
                  : 'bg-slate-800'
              }`}
            >
              {item}
            </button>
          ))}
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="rounded-3xl bg-slate-900 p-5">
            <p className="text-slate-400">Obsazené pokoje</p>
            <p className="text-4xl font-bold text-red-400 mt-2">3</p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-5">
            <p className="text-slate-400">Volné pokoje</p>
            <p className="text-4xl font-bold text-green-400 mt-2">2</p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-5">
            <p className="text-slate-400">Pending rezervace</p>
            <p className="text-4xl font-bold text-yellow-400 mt-2">1</p>
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 p-6">
          <h2 className="text-2xl font-bold mb-4">
            MVP aplikace připravena
          </h2>

          <p className="text-slate-300">
            Projekt je připraven pro napojení na Supabase a deploy na Vercel.
          </p>
        </section>
      </div>
    </main>
  );
}