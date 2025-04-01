import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ActualizarReservaForm() {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    idCliente: '',
    idHabitacion: ''
  });
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, cli, hab] = await Promise.all([
          axios.get('http://testaws-env.eba-6swprbqg.eu-north-1.elasticbeanstalk.com/api/reservas/listar'),
          axios.get('https://crudclientes.onrender.com/clientes'),
          axios.get('http://testaws-env.eba-6swprbqg.eu-north-1.elasticbeanstalk.com/api/reservas/habitaciones')
        ]);
        setReservas(res.data);
        setClientes(cli.data);
        setHabitaciones(hab.data);
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };
    fetchData();
  }, []);

  const handleSelectReserva = (e) => {
    const id = parseInt(e.target.value);
    const reserva = reservas.find(r => r.reserva?.idReserva === id);
    if (reserva) {
      setReservaSeleccionada(reserva.reserva.idReserva);
      setFormData({
        checkIn: reserva.reserva.checkIn,
        checkOut: reserva.reserva.checkOut,
        idCliente: reserva.cliente.id,
        idHabitacion: reserva.reserva.habitacion.idHabitacion
      });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `http://testaws-env.eba-6swprbqg.eu-north-1.elasticbeanstalk.com/api/reservas/actualizar/${reservaSeleccionada}`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMensaje('Reserva actualizada correctamente.');
      console.log('Respuesta:', res.data);
    } catch (err) {
      console.error('Error al actualizar reserva:', err);
      setMensaje('Error al actualizar la reserva.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Actualizar Reserva</h2>

      <select
        onChange={handleSelectReserva}
        className="w-full mb-4 p-2 border rounded"
        defaultValue=""
      >
        <option value="" disabled>-- Selecciona una reserva --</option>
        {reservas.map((r) => (
          <option key={r.reserva.idReserva} value={r.reserva.idReserva}>
            #{r.reserva.idReserva} - {r.cliente.nombre}
          </option>
        ))}
      </select>

      {reservaSeleccionada && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Check-In</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Check-Out</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Cliente</label>
            <select
              name="idCliente"
              value={formData.idCliente}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Habitación</label>
            <select
              name="idHabitacion"
              value={formData.idHabitacion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              {habitaciones.map(h => (
                <option key={h.id} value={h.id}>Nº {h.numero}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Actualizar Reserva
          </button>

          {mensaje && (
            <p className="text-center mt-4 text-sm text-green-600 font-medium">{mensaje}</p>
          )}
        </>
      )}
    </div>
  );
}

export default ActualizarReservaForm;
