import React from 'react';
import ReservaForm from './components/ReservaForm';
import PeticionInfinita from './components/PeticionInfinita';

function App() {
  return (
    <div className="App">
      <h1>Gestión de Reservas</h1>
      <ReservaForm />
      <PeticionInfinita/>
    </div>
  );
}

export default App;