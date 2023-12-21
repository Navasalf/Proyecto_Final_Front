import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoesContext } from "../Context";

const CardDetalles = () => {
  const { ID } = useParams();
  const { getZapatillaById, addToCart } = useContext(ShoesContext);
  const [zapatilla, setZapatilla] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchZapatillaDetails = async () => {
      if (!ID || isNaN(ID)) {
        setError("ID no válido proporcionado en la URL");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/publicaciones/${ID}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            console.log("Detalles de la zapatilla desde el backend:", data[0]);
            setZapatilla(data[0]);
          } else {
            console.error("No se encontraron detalles para la zapatilla con ID:", ID);
            setError("No se encontraron detalles para esta zapatilla");
          }
        } else {
          console.error("Error al obtener detalles de la zapatilla:", response.status, response.statusText);
          setError(`Error del servidor: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error de red:", error);
        setError("Error de red al obtener detalles de la zapatilla");
      }
    };

    const zapatillaById = getZapatillaById(parseInt(ID));
    if (zapatillaById) {
      console.log("Detalles de la zapatilla desde el contexto:", zapatillaById);
      setZapatilla(zapatillaById);
    } else {
      fetchZapatillaDetails();
    }
  }, [ID, getZapatillaById]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!zapatilla) {
    return <div>No se encontraron detalles para esta zapatilla.</div>;
  }

  const { imagen, marca, modelo, descripcion } = zapatilla || {};

  return (
    <div className="container1">
      <div className="card m-3 p-3 mx-auto" style={{ maxWidth: "500px" }}>
        <div className="img-container text-center">
          <img
            src={imagen}
            className="card-img-top"
            alt={`Zapatillas ${modelo}`}
            style={{ width: "250px", height: "auto" }}
          />
        </div>
        <div className="card-detalles ms-3">
          <div className="card-body">
            <h5 className="card-title">{`${marca} ${modelo}`}</h5>
            <p className="card-text">{`Descripción: ${descripcion}`}</p>
          </div>
        </div>
        {zapatilla && (
          <div className="btn align-itens-center">
            <button
              className="btn btn-primary m-2"
              onClick={() => addToCart(zapatilla)}
            >
              Comprar
            </button>
            <Link to="/">
              <button className="btn btn-secondary m-2">Ir al Home</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetalles;


