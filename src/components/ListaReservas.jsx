import React from 'react';

function ListaReservas({ reservas }) {
  return (
    <div>
      {reservas.length > 0 && (
        <div>
          <h3>Lista de Reservas</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Reserva</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Check-In</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Check-Out</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Cliente</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Habitación</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((item, index) => (
                <tr key={item.reserva?.idReserva || index} style={{ textAlign: 'center' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {item.reserva?.idReserva ?? 'N/A'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {item.reserva?.checkIn ?? 'N/A'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {item.reserva?.checkOut ?? 'N/A'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {item.cliente?.nombre ?? 'N/A'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {item.cliente?.email ?? 'N/A'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {item.reserva?.habitacion?.idHabitacion ?? 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListaReservas;