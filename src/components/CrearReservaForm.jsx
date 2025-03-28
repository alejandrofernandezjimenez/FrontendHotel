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
        console.error('Error al obtener clientes:', err);
        setError('No se pudo cargar la lista de clientes.');
      }
    };

    const fetchHabitaciones = async () => {
      try {
        const response = await axios.get('https://crudreservas.onrender.com/api/reservas/habitaciones');
        setHabitaciones(response.data);
      } catch (err) {
        console.error('Error al obtener habitaciones:', err);
        setError('No se pudo cargar la lista de habitaciones.');
      }
    };

    fetchClientes();
    fetchHabitaciones();
  }, [setError]);

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
      const response = await axios.post('https://crudreservas.onrender.com/api/reservas/crear', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Respuesta del backend (crear):', response.data);
      setFormData({ checkIn: '', checkOut: '', idCliente: '', idHabitacion: '' });
      setReservaCreada(response.data);

      if (dialogRef.current) {
        dialogRef.current.showModal();
      }

    } catch (error) {
      let errorMessage = 'Ocurrió un error inesperado.';

      if (error.response) {
        const data = error.response.data;

        if (data && data.message) {
          const partes = data.message.split(':');
          errorMessage = partes.length > 1 ? partes.slice(1).join(':').trim() : data.message;
        } else {
          errorMessage = error.response.statusText;
        }
      } else {
        errorMessage = error.message;
      }

      console.error('Error al crear la reserva:', errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>Crear Reserva</h2>
      <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="checkIn">Check-In: </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
            min={hoy}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="checkOut">Check-Out: </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
            min={hoy}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="idCliente">Cliente: </label>
          <select
            id="idCliente"
            name="idCliente"
            value={formData.idCliente}
            onChange={handleChange}
            required
            style={{ padding: '5px', width: '210px' }}
          >
            <option value="">-- Selecciona un cliente --</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="idHabitacion">Habitación: </label>
          <select
            id="idHabitacion"
            name="idHabitacion"
            value={formData.idHabitacion}
            onChange={handleChange}
            required
            style={{ padding: '5px', width: '210px' }}
          >
            <option value="">-- Selecciona una habitación --</option>
            {habitaciones.map((habitacion) => (
              <option key={habitacion.id} value={habitacion.id}>
                Nº {habitacion.numero}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          Enviar Reserva
        </button>
      </form>

      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

      {/* Modal de confirmación */}
      <dialog ref={dialogRef} style={{ borderRadius: '12px', padding: '20px', textAlign: 'center', minWidth: '300px' }}>
        <h3 style={{ marginBottom: '15px' }}>✅ Reserva creada con éxito</h3>

        {reservaCreada && (
          <div style={{ marginBottom: '15px', fontSize: '14px', textAlign: 'left' }}>
            <p><strong>ID Reserva:</strong> {reservaCreada.idReserva}</p>
            <p><strong>Check-In:</strong> {reservaCreada.checkIn}</p>
            <p><strong>Check-Out:</strong> {reservaCreada.checkOut}</p>
            <p><strong>ID Cliente:</strong> {reservaCreada.idCliente}</p>
            <p><strong>ID Habitación:</strong> {reservaCreada.habitacion?.idHabitacion}</p>
            <p><strong>Número Habitación:</strong> {reservaCreada.habitacion?.numero}</p>
          </div>
        )}

        <button
          onClick={() => dialogRef.current.close()}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Cerrar
        </button>
      </dialog>
    </div>
  );
}

export default CrearReservaForm;