'use client';
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
