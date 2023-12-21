import React from 'react';
import Carrucel from '../Components/Carrusel';
import Card from '../Components/Card';

function Home() {
  return (
    <div>
      <Carrucel />
      <div className="text-center mb-3">
        <h1>Compra hasta en 12 cuotas sin interés</h1>
        <h3><strong>Envíos a todo Chile</strong></h3>
        <Card />
        </div>
    </div>
  );
}

export default Home;
