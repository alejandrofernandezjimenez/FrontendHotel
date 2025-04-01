import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function CrearReservaForm({ formData, setFormData, error, setError }) {
  const [clientes, setClientes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [reservaCreada, setReservaCreada] = useState(null);
  const dialogRef = useRef(null);

  const hoy = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('https://crudclientes.onrender.com/clientes');
        setClientes(response.data);
      } catch (err) {
        setError('No se pudo cargar la lista de clientes.');
      }
    };
    fetchClientes();
  }, [setError]);

  useEffect(() => {
    const fetchHabitacionesDisponibles = async () => {
      if (formData.checkIn && formData.checkOut) {
        try {
          const response = await axios.get(
            'http://testaws-env.eba-6swprbqg.eu-north-1.elasticbeanstalk.com/api/reservas/habitaciones-disponibles',
            {
              params: {
                checkIn: formData.checkIn,
                checkOut: formData.checkOut
              }
            }
          );
          setHabitaciones(response.data);
        } catch (err) {
          setError('No se pudieron cargar las habitaciones disponibles.');
        }
      } else {
        setHabitaciones([]);
      }
    };
    fetchHabitacionesDisponibles();
  }, [formData.checkIn, formData.checkOut, setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await axios.post('http://testaws-env.eba-6swprbqg.eu-north-1.elasticbeanstalk.com/api/reservas/crear', formData);
      setFormData({ checkIn: '', checkOut: '', idCliente: '', idHabitacion: '' });
      setReservaCreada(response.data);
      dialogRef.current?.showModal();
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      const parsed = msg.includes(':') ? msg.split(':').slice(1).join(':').trim() : msg;
      setError(parsed);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Crear Reserva</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="checkIn" className="block font-medium mb-1">Check-In</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
            min={hoy}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="checkOut" className="block font-medium mb-1">Check-Out</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
            min={formData.checkIn || hoy}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="idCliente" className="block font-medium mb-1">Cliente</label>
          <select
            id="idCliente"
            name="idCliente"
            value={formData.idCliente}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Selecciona un cliente --</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="idHabitacion" className="block font-medium mb-1">Habitación</label>
          <select
            id="idHabitacion"
            name="idHabitacion"
            value={formData.idHabitacion}
            onChange={handleChange}
            required
            disabled={!formData.checkIn || !formData.checkOut}
            className="w-full border rounded px-3 py-2 disabled:opacity-50"
          >
            {!formData.checkIn || !formData.checkOut ? (
              <option value="">-- Selecciona una fecha primero --</option>
            ) : habitaciones.length === 0 ? (
              <option value="">No hay habitaciones disponibles para las fechas solicitadas</option>
            ) : (
              <>
                <option value="">-- Selecciona una habitación --</option>
                {habitaciones.map((habitacion) => (
                  <option key={habitacion.id} value={habitacion.id}>
                    Nº {habitacion.numero}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={habitaciones.length === 0}
          className={`w-full py-2 px-4 rounded font-semibold transition ${
            habitaciones.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Enviar Reserva
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      <dialog ref={dialogRef} className="rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-green-600 mb-4">✅ Reserva creada con éxito</h3>
        {reservaCreada && (
          <div className="text-sm text-left space-y-1">
            <p><strong>ID Reserva:</strong> {reservaCreada.idReserva}</p>
            <p><strong>Check-In:</strong> {reservaCreada.checkIn}</p>
            <p><strong>Check-Out:</strong> {reservaCreada.checkOut}</p>
            <p><strong>ID Cliente:</strong> {reservaCreada.idCliente}</p>
            <p><strong>ID Habitación:</strong> {reservaCreada.habitacion?.idHabitacion}</p>
            <p><strong>Número:</strong> {reservaCreada.habitacion?.numero}</p>
          </div>
        )}
        <button
          onClick={() => dialogRef.current?.close()}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </dialog>
    </div>
  );
}

export default CrearReservaForm;