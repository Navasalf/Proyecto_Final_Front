import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    marca: "",
    modelo: "",
    año: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/publicaciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
        }),
      });

      if (response.ok) {
        navigate(`/detailsusers`);
      } else {
        navigate(`/detailsusers`);
        
        const responseData = await response.json();
        const errorMessage = responseData.message || "Error al registrar el producto";
        console.error("Error al registrar el producto. Detalles:", responseData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container1">
      <form
        className="w-50 bg-light p-5 mb-4 mx-auto text-center"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4">Publicar Zapatilla:</h1>
        <div className="mb-3">
          <label htmlFor="marca" className="form-label fs-5">
            Marca
          </label>
          <input
            type="text"
            className="form-control"
            id="marca"
            placeholder="Marca de la zapatilla"
            value={productData.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="modelo" className="form-label fs-5">
            Modelo
          </label>
          <input
            type="text"
            className="form-control"
            id="modelo"
            placeholder="Modelo"
            value={productData.modelo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="año" className="form-label fs-5">
            Año
          </label>
          <input
            type="text"
            className="form-control"
            id="año"
            placeholder="Año del Producto"
            value={productData.año}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label fs-5">
            Precio
          </label>
          <input
            type="text"
            className="form-control"
            id="precio"
            placeholder="Precio del Producto"
            value={productData.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label fs-5">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            placeholder="Descripción del Producto"
            value={productData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label fs-5">
            Imagen
          </label>
          <input
            type="text"
            className="form-control"
            id="imagen"
            placeholder="URL de la Imagen"
            value={productData.imagen}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Publicar Producto
        </button>
      </form>
    </div>
  );
};

export default RegisterProduct;
