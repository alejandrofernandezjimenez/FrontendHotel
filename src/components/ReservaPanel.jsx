import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrearReservaForm from './CrearReservaForm';
import ListaReservas from './ListaReservas';
import ActualizarReservaForm from './ActualizarReservaForm';
import EliminarReservaForm from './EliminarReservaForm';

function ReservaPanel() {
    const [vista, setVista] = useState(null);
    const [reservas, setReservas] = useState([]);
    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        idCliente: '',
        idHabitacion: ''
    });
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    const handleListar = async () => {
        setCargando(true);
        setVista('listar');
        try {
            const res = await fetch('http://testaws-env.eba-6swprbqg.eu-north-1.elasticbeanstalk.com/api/reservas/listar');
            const data = await res.json();
            setReservas(data);
        } catch (err) {
            setError('Error al listar reservas.');
        } finally {
            setCargando(false);
        }
    };

    const variantes = {
        inicial: { opacity: 0, scale: 0.95 },
        animado: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        salir: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Panel de Reservas</h2>

            <div className="flex justify-center gap-4 mb-6">
                {['crear', 'listar', 'actualizar', 'borrar'].map(opcion => (
                    <button
                        key={opcion}
                        onClick={() => opcion === 'listar' ? handleListar() : setVista(opcion)}
                        className={`px-4 py-2 rounded-full font-semibold transition ${vista === opcion ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                    </button>
                ))}
            </div>

            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    {vista === 'crear' && (
                        <motion.div key="crear" variants={variantes} initial="inicial" animate="animado" exit="salir">
                            <CrearReservaForm
                                formData={formData}
                                setFormData={setFormData}
                                error={error}
                                setError={setError}
                            />
                        </motion.div>
                    )}

                    {vista === 'listar' && (
                        <motion.div key="listar" variants={variantes} initial="inicial" animate="animado" exit="salir">
                            {cargando ? (
                                <div className="text-center text-xl py-10 animate-pulse text-blue-500">
                                    <span role="img" aria-label="uwu">🛎️</span> Cargando reservas...
                                </div>
                            ) : (
                                <ListaReservas reservas={reservas} />
                            )}
                        </motion.div>
                    )}

                    {vista === 'actualizar' && (
                        <motion.div key="actualizar" variants={variantes} initial="inicial" animate="animado" exit="salir">
                            <ActualizarReservaForm />
                        </motion.div>
                    )}


                    {vista === 'borrar' && (
                        <motion.div key="borrar" variants={variantes} initial="inicial" animate="animado" exit="salir">
                            <EliminarReservaForm />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ReservaPanel;
