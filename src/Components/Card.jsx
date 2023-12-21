import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoesContext } from "../Context";

const Card = () => {
  const { carrito, addToCart, loggedInUser } = useContext(ShoesContext);
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch("http://localhost:8080/publicaciones");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setShoes(data);
          } else {
            console.error("Los datos del servidor no son un array:", data);
          }
        } else {
          console.error("Error al obtener datos de zapatillas");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchShoes();
  }, []);

  const handleAddToCart = (zapatilla) => {
    if (loggedInUser) {
      const existingItem = carrito.find((item) => item.Id === zapatilla?.Id);

      if (existingItem) {
        const updatedCarrito = carrito.map((item) =>
          item.Id === zapatilla?.Id ? { ...item, quantity: item.quantity + 1 } : item
        );
        console.log('Carrito antes de addToCart:', carrito);
        addToCart(updatedCarrito);
        console.log('Carrito después de addToCart:', updatedCarrito);
      } else {
        addToCart([{ ...zapatilla, quantity: 1 }]);
        console.log('Zapatilla agregada por primera vez al carrito:', zapatilla);
      }
    } else {
      console.log('Usuario no autenticado. Redirigir a la página de inicio de sesión.');
    }
  };

  return (
    <div className="row">
      <div className="card-container d-flex flex-wrap justify-content-around mb-4">
        {shoes.map((zapatilla) => (
          <div key={zapatilla?.Id} className="card m-3 p-3" style={{ width: "18rem" }}>
            <img
              src={zapatilla?.Imagen}
              className="card-img-top"
              alt={`Zapatillas ${zapatilla?.Modelo}`}
            />
            <div className="card-body">
              <h5 className="card-title">{`${zapatilla?.Marca || "Marca Desconocida"}`}</h5>
              <p className="card-text">{`Modelo: ${zapatilla?.Modelo || "Modelo Desconocido"}`}</p>
              <p className="card-text">{`Año: ${zapatilla?.Año || "Año Desconocido"}`}</p>
              <p className="card-text">{`Precio: $${zapatilla?.Precio || 0}`}</p>
              <button
                className="btn btn-success mx-2"
                onClick={() => handleAddToCart(zapatilla)}
                disabled={!loggedInUser}
              >
                Comprar
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;




