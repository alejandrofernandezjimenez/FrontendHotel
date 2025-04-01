import React from 'react';
import { motion } from 'framer-motion';
import ReservaPanel from './components/ReservaPanel';
import Bienvenida from './components/Bienvenida';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-8">
    <Bienvenida />
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-600 drop-shadow-lg mb-10"
        initial={{ opacity: 0, y: -30, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          type: 'spring',
          stiffness: 100
        }}
      >
        💼 Gestión de Reservas ✨
      </motion.h1>

      <div className="max-w-6xl mx-auto">
        <ReservaPanel />
        
      </div>
    </div>
  );
}

export default App;
