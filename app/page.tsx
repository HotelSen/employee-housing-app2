'use client';

import { useState } from 'react';

type Status = 'pending' | 'approved' | 'rejected';

type Reservation = {
  id: number;
  employee: string;
  room: number;
  from: string;
  to: string;
  status: Status;
};

export default function HomePage() {
  const [tab, setTab] = useState('dashboard');

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      employee: 'Jan Novák',
      room: 1,
      from: '2026-05-20',
      to: '2026-05-24',
      status: 'approved',
    },
    {
      id: 2,
      employee: 'Petr Svoboda',
      room: 2,
      from: '2026-05-21',
      to: '2026-05-25',
      status: 'pending',
    },
  ]);

  const [employee, setEmployee] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const occupied = reservations.filter(
    (r) => r.status === 'approved'
  ).length;

  const pending = reservations.filter(
    (r) => r.status === 'pending'
  ).length;

  const free = 6 - occupied - pending;

  function createReservation() {
    if (!employee || !from || !to) {
      alert('Vyplňte všechna pole');
      return;
    }

    const usedRooms = reservations
      .filter(
        (r) =>
          r.status === 'approved' || r.status === 'pending'
      )
      .map((r) => r.room);

    const room = [1, 2, 3, 4, 5, 6].find(
      (r) => !usedRooms.includes(r)
    );

    if (!room) {
      alert('Není volný pokoj');
      return;
    }

    setReservations([
      {
        id: Date.now(),
        employee,
        room,
        from,
        to,
        status: 'pending',
      },
      ...reservations,
    ]);

    setEmployee('');
    setFrom('');
    setTo('');
  }

  function approve(id: number) {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'approved',
            }
          : r
      )
    );
  }

  function reject(id: number) {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'rejected',
            }
          : r
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-slate-900 rounded-3xl p-6">
          <h1 className="text-5xl font-bold">
            Zaměstnanecké ubytování
          </h1>

          <p className="text-slate-400 mt-3">
            Interní rezervační systém
          </p>
        </header>

        <div className="flex gap-3 flex-wrap">
          {[
            ['dashboard', 'Dashboard'],
            ['rooms', 'Pokoje'],
            ['approval', 'Schvalování'],
            ['history', 'Historie'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-3 rounded-2xl transition ${
                tab === key
                  ? 'bg-blue-600'
                  : 'bg-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900 rounded-3xl p-5">
                <p className="text-slate-400">
                  Obsazené pokoje
                </p>

                <p className="text-5xl font-bold text-red-400 mt-3">
                  {occupied}
                </p>
              </div>

              <div className="bg-slate-900 rounded-3xl p-5">
                <p className="text-slate-400">
                  Volné pokoje
                </p>

                <p className="text-5xl font-bold text-green-400 mt-3">
                  {free}
                </p>
              </div>

              <div className="bg-slate-900 rounded-3xl p-5">
                <p className="text-slate-400">
                  Pending rezervace
                </p>

                <p className="text-5xl font-bold text-yellow-400 mt-3">
                  {pending}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-3xl p-6">
                <h2 className="text-2xl font-bold mb-5">
                  Přehled pokojů
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((room) => {
                    const reservation = reservations.find(
                      (r) =>
                        r.room === room &&
                        (r.status === 'approved' ||
                          r.status === 'pending')
                    );

                    return (
                      <div
                        key={room}
                        className="bg-slate-950 border border-slate-800 rounded-3xl p-5"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">
                            Pokoj {room}
                          </h3>

                          {!reservation && (
                            <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                              Volný
                            </div>
                          )}

                          {reservation?.status === 'pending' && (
                            <div className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                              Pending
                            </div>
                          )}

                          {reservation?.status === 'approved' && (
                            <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                              Obsazený
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6">
                <h2 className="text-2xl font-bold mb-5">
                  Nová rezervace
                </h2>

                <div className="space-y-4">
                  <input
                    value={employee}
                    onChange={(e) =>
                      setEmployee(e.target.value)
                    }
                    placeholder="Jméno zaměstnance"
                    className="w-full bg-slate-800 rounded-2xl px-4 py-3"
                  />

                  <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-slate-800 rounded-2xl px-4 py-3"
                  />

                  <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-slate-800 rounded-2xl px-4 py-3"
                  />

                  <button
                    onClick={createReservation}
                    className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl py-4 font-semibold"
                  >
                    Vytvořit rezervaci
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'rooms' && (
          <div className="bg-slate-900 rounded-3xl p-6">
            <h2 className="text-3xl font-bold mb-6">
              Pokoje
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((room) => {
                const reservation = reservations.find(
                  (r) => r.room === room
                );

                return (
                  <div
                    key={room}
                    className="bg-slate-950 border border-slate-800 rounded-3xl p-5"
                  >
                    <h3 className="text-xl font-bold">
                      Pokoj {room}
                    </h3>

                    <div className="mt-4">
                      {reservation ? (
                        <div className="text-slate-300">
                          Rezervován
                        </div>
                      ) : (
                        <div className="text-green-400">
                          Volný
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'approval' && (
          <div className="bg-slate-900 rounded-3xl p-6">
            <h2 className="text-3xl font-bold mb-6">
              Schvalování rezervací
            </h2>

            <div className="space-y-4">
              {reservations
                .filter((r) => r.status === 'pending')
                .map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-slate-950 border border-slate-800 rounded-3xl p-5 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-bold">
                        {reservation.employee}
                      </h3>

                      <p className="text-slate-400 mt-2">
                        Pokoj {reservation.room}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          approve(reservation.id)
                        }
                        className="bg-green-600 px-5 py-3 rounded-2xl"
                      >
                        Schválit
                      </button>

                      <button
                        onClick={() =>
                          reject(reservation.id)
                        }
                        className="bg-gray-700 px-5 py-3 rounded-2xl"
                      >
                        Zamítnout
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="bg-slate-900 rounded-3xl p-6">
            <h2 className="text-3xl font-bold mb-6">
              Historie rezervací
            </h2>

            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-slate-950 border border-slate-800 rounded-3xl p-5 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {reservation.employee}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Pokoj {reservation.room}
                    </p>
                  </div>

                  <div>
                    {reservation.status === 'approved' && (
                      <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full">
                        Schváleno
                      </div>
                    )}

                    {reservation.status === 'pending' && (
                      <div className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full">
                        Pending
                      </div>
                    )}

                    {reservation.status === 'rejected' && (
                      <div className="bg-gray-500/20 text-gray-300 px-4 py-2 rounded-full">
                        Zamítnuto
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
