import React from 'react';

function ListaReservas({ reservas }) {
  if (!reservas.length) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">Lista de Reservas</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 border">ID Reserva</th>
              <th className="py-2 px-3 border">Check-In</th>
              <th className="py-2 px-3 border">Check-Out</th>
              <th className="py-2 px-3 border">Cliente</th>
              <th className="py-2 px-3 border">Email</th>
              <th className="py-2 px-3 border">ID Habitación</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((item, index) => (
              <tr key={item.reserva?.idReserva || index} className="hover:bg-gray-50">
                <td className="py-2 px-3 border">{item.reserva?.idReserva ?? 'N/A'}</td>
                <td className="py-2 px-3 border">{item.reserva?.checkIn ?? 'N/A'}</td>
                <td className="py-2 px-3 border">{item.reserva?.checkOut ?? 'N/A'}</td>
                <td className="py-2 px-3 border">{item.cliente?.nombre ?? 'N/A'}</td>
                <td className="py-2 px-3 border">{item.cliente?.email ?? 'N/A'}</td>
                <td className="py-2 px-3 border">{item.reserva?.habitacion?.idHabitacion ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaReservas;