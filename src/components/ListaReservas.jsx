import React, { useState } from 'react';

function ListaReservas({ reservas }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const reservasPorPagina = 10;

  if (!reservas.length) return null;

  const totalPaginas = Math.ceil(reservas.length / reservasPorPagina);
  const inicio = (paginaActual - 1) * reservasPorPagina;
  const fin = inicio + reservasPorPagina;
  const reservasPaginadas = reservas.slice(inicio, fin);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6 border border-gray-200 max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-blue-600">Lista de Reservas</h3>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-blue-100 text-blue-900 uppercase text-xs font-semibold tracking-wide">
            <tr>
              <th className="py-3 px-6 border min-w-[120px]">ID Reserva</th>
              <th className="py-3 px-6 border min-w-[130px]">Check-In</th>
              <th className="py-3 px-6 border min-w-[130px]">Check-Out</th>
              <th className="py-3 px-6 border min-w-[160px]">Cliente</th>
              <th className="py-3 px-6 border min-w-[220px]">Email</th>
              <th className="py-3 px-6 border min-w-[140px]">ID Habitación</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800">
            {reservasPaginadas.map((item, index) => (
              <tr key={item.reserva?.idReserva || index} className="hover:bg-blue-50 transition">
                <td className="py-4 px-6 border">{item.reserva?.idReserva ?? 'N/A'}</td>
                <td className="py-4 px-6 border">{item.reserva?.checkIn ?? 'N/A'}</td>
                <td className="py-4 px-6 border">{item.reserva?.checkOut ?? 'N/A'}</td>
                <td className="py-4 px-6 border">{item.cliente?.nombre ?? 'N/A'}</td>
                <td className="py-4 px-6 border">{item.cliente?.email ?? 'N/A'}</td>
                <td className="py-4 px-6 border">{item.reserva?.habitacion?.idHabitacion ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            ← Anterior
          </button>

          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              onClick={() => cambiarPagina(i + 1)}
              className={`px-3 py-2 text-sm rounded-full ${
                i + 1 === paginaActual
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}

export default ListaReservas;
