import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function EliminarReservaForm() {
  const [reservas, setReservas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('https://d1v6xxnlv6ndjg.cloudfront.net/api/reservas/listar');
        setReservas(response.data);
      } catch (err) {
        console.error('Error al cargar reservas:', err);
      }
    };

    fetchReservas();
  }, []);

  const confirmarEliminar = () => {
    if (reservaSeleccionada) {
      setMostrarModal(true);
    }
  };

  const handleDelete = async () => {
    try {
      setCargando(true);
      await axios.delete(`https://d1v6xxnlv6ndjg.cloudfront.net/api/reservas/eliminar/${reservaSeleccionada}`);
      setMensaje('✅ Reserva eliminada con éxito');
      setReservas(prev => prev.filter(r => r.reserva.idReserva !== parseInt(reservaSeleccionada)));
      setReservaSeleccionada('');
      setMostrarModal(false);
    } catch (err) {
      console.error('Error al eliminar reserva:', err);
      setMensaje('❌ Error al eliminar la reserva');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4 text-red-600">Eliminar Reserva</h2>

      <select
        className="w-full p-2 mb-4 border rounded"
        value={reservaSeleccionada}
        onChange={(e) => setReservaSeleccionada(e.target.value)}
      >
        <option value="">-- Selecciona una reserva --</option>
        {reservas.map((r) => (
          <option key={r.reserva.idReserva} value={r.reserva.idReserva}>
            #{r.reserva.idReserva} - {r.cliente.nombre} - {r.reserva.checkIn}
          </option>
        ))}
      </select>

      <button
        disabled={!reservaSeleccionada || cargando}
        onClick={confirmarEliminar}
        className={`w-full font-semibold py-2 rounded transition ${
          !reservaSeleccionada || cargando
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {cargando ? 'Eliminando...' : 'Eliminar Reserva'}
      </button>

      {mensaje && (
        <p className="text-center mt-4 text-sm font-medium text-blue-700">{mensaje}</p>
      )}

      {/* Modal de confirmación */}
      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <h3 className="text-lg font-bold text-red-600 mb-4">¿Eliminar esta reserva?</h3>
              <p className="mb-4 text-sm text-gray-700">
                Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setMostrarModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Sí, eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EliminarReservaForm;
