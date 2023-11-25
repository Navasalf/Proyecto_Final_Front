import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoesContext } from "../Context";

const Card = () => {
  const { shoes, carrito, setCarrito } = useContext(ShoesContext);

  const addToCart = (zapatilla) => {
    setCarrito([...carrito, zapatilla]);
  };

  return (
    <div className="card-container d-flex flex-wrap justify-content-around">
      {shoes.map((zapatilla) => (
        <div key={zapatilla.id} className="card m-3 p-3" style={{ width: "18rem" }}>
          <img
            src={zapatilla.imagen}
            className="card-img-top"
            alt={`Zapatillas ${zapatilla.modelo}`}
          />
          <div className="card-body">
            <h5 className="card-title">{`${zapatilla.marca} ${zapatilla.modelo}`}</h5>
            <p className="card-text">{`Año: ${zapatilla.año}`}</p>
            <p className="card-text">{`Precio: $${zapatilla.precio.toFixed(2)}`}</p>
            <button className="btn btn-dark" onClick={() => addToCart(zapatilla)}>
              Comprar
            </button>
            <Link to={`/detalles/${zapatilla.id}`} className="btn btn-dark">
              Detalles
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;


