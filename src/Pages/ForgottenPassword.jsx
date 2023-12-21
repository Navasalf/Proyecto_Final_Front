import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/recuperar-contrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}`,
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Se ha enviado un correo de recuperación de contraseña. Por favor, verifica tu bandeja de entrada.',
          timer: 2000,
        });
  
        setTimeout(() => {
          navigate('/');
        }, 3000);
  
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo electrónico no está registrado',
        });
      } else {
        const responseData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: responseData.error || 'Error desconocido',
        });
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container1">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 w-25">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-center">Recuperar Contraseña</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-md btn-block"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  {loading ? 'Enviando correo...' : 'Enviar Correo'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

