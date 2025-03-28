import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CrearReservaForm({ formData, setFormData, error, setError }) {
  const [clientes, setClientes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);

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
      alert('Reserva creada con éxito: ' + response.data);
      setFormData({ checkIn: '', checkOut: '', idCliente: '', idHabitacion: '' });
    } catch (error) {
      const errorMessage = error.response
        ? `Error ${error.response.status}: ${error.response.data}`
        : error.message;
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
    </div>
  );
}

export default CrearReservaForm;