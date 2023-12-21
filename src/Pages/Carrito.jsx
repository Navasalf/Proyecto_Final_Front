import React, { useContext } from 'react';
import { ShoesContext } from '../Context';
import { formatNumber } from '../Price';
import { NavLink } from 'react-router-dom';

const Carrito = () => {
  const {
    carrito,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    loggedInUser,
    clearCart,
  } = useContext(ShoesContext);

  if (!carrito) {
    return <div>Loading...</div>;
  }

  const handleIrAPagar = () => {
    console.log('Handling Ir a Pagar');
    if (loggedInUser) {
      console.log('Finalizando compra...');
      clearCart();
    } else {
      console.log('Usuario no autenticado. Redirigir a la página de inicio de sesión.');
    }
  };

  const getTotal = () => {
    return carrito.reduce((acc, cartItem) => {
      const product = cartItem[0];

      if (product && typeof product.Precio === 'number' && typeof cartItem.quantity === 'number') {
        return acc + product.Precio * cartItem.quantity;
      }

      return acc;
    }, 0);
  };

  return (
    <div className="container1">
      <div className="card detalles w-50 m-auto mt-5 p-5">
        <h5>Detalles del pedido:</h5>
        <div className="p-3 bg-white">

          {carrito.map((cartItem, index) => {
            const product = cartItem[0];
            return product ? (
              <div key={index} className="d-flex justify-content-between py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <img src={product.Imagen} width="50" alt="" />
                  <h6 className="mb-0 text-capitalize p-2">{`${product.Año} ${product.Marca} ${product.Modelo}`}</h6>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <h6 className="mb-0 p-2 text-success">
                    ${formatNumber(product.Precio * cartItem.quantity)}
                  </h6>
                  <button
                    className="btn btn-secondary"
                    onClick={() => decrementQuantity(product.Id)}
                  >
                    -
                  </button>
                  <b className="mx-2">{cartItem.quantity}</b>
                  <button
                    className="btn btn-dark"
                    onClick={() => incrementQuantity(product.Id)}
                  >
                    +
                  </button>
                </div>

          {carrito.map((producto) => (
            // Added the missing closing tag for the `div` element here
            <div key={producto.id} className="d-flex justify-content-between py-2">
              <div className="d-flex justify-content-between align-items-center">
                <img src={producto.imagen} width="50" alt="" />
                <h6 className="mb-0 text-capitalize p-2">{`${producto.marca} ${producto.modelo}`}</h6>

              </div>
            ) : null;
          })}
          <h2 className="my-4">Total: ${formatNumber(getTotal())}</h2>

          {carrito.length > 0 && (
            <>
              <NavLink to="/tarjeta" className="text-decoration-none">
                <button className="btn btn-success" onClick={handleIrAPagar}>
                  Finalizar Compra
                </button>
              </NavLink>
              <NavLink to="/" className="text-decoration-none">
                <button className="btn btn-primary mx-5">
                  Seguir Comprando
                </button>

              </NavLink>
            </>
          )}

              </div>
            </div>
          ))}
          <h2 className="my-4">Total: ${formatNumber(total)}</h2>
          <NavLink to="/successful" className="text-decoration-none">
            <button className="btn btn-success" onClick={handleIrAPagar}>
              {loggedInUser ? 'Finalizar Compra' : 'Iniciar Sesión para Pagar'}
            </button>
          </NavLink>
          <NavLink to="/tarjeta" className="text-decoration-none">
            <button className="btn btn-primary mx-5">
              Seguir Comprando
            </button>
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default Carrito;

