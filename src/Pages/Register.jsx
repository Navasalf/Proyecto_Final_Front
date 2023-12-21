import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterUsers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "¡Gracias por registrarte!",
          text: "Revisa tu correo para confirmar tu cuenta",
          icon: "success",
        });

        navigate("/");
      } else {
        console.error("Error al registrar:", response.statusText);

        Swal.fire({
          title: "Error al registrarse",
          text: "Por favor, verifica tus datos e inténtalo de nuevo.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);

      Swal.fire({
        title: "Error al registrarse",
        text: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container container1">
      <form className="w-50 bg-light mb-4 mx-auto text-center" onSubmit={handleSubmit}>
        <div className="card" id="form">
          <div className="card-body">
          <h4 className="card-title text-center mb-2">Registro de Usuarios</h4>
            <div className="mt-3">
              <label htmlFor="email" className="form-label fs-5">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fs-5">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fs-5">
                Ingrese su nombre de usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Nombre de Usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterUsers;
