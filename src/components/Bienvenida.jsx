import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Bienvenida() {
  const [mostrar, setMostrar] = useState(true);

  const variantes = {
    inicial: { y: 0, opacity: 1 },
    salir: {
      y: '-100%',
      opacity: 0,
      transition: { duration: 0.8, ease: 'easeInOut' }
    }
  };

  return (
    <AnimatePresence>
      {mostrar && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 z-50 flex flex-col items-center justify-center text-white px-6"
          variants={variantes}
          initial="inicial"
          exit="salir"
        >
          {/* Poné tu logo aquí */}
          <div className="mb-6">
            <img src="/logoPlexus.svg" alt="Logo" className="w-20 h-20 animate-pulse" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
            ¡Bienvenido a la Gestión de Reservas!
          </h1>
          <p className="text-lg text-center max-w-md mb-8">
            Organiza tus reservas con estilo, fluidez y cero dramas 😎
          </p>

          <button
            onClick={() => setMostrar(false)}
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-blue-100 transition duration-300"
          >
            Entrar a la app
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Bienvenida;
