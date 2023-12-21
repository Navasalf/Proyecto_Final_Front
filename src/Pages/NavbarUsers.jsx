import React, { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col';  
import { BiSearch } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoesContext } from '../Context';

function NavbarUsers() {
  const { carrito, loggedInUser, handleLogout } = useContext(ShoesContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogoutClick = () => {
    handleLogout(); 
    navigate('/'); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Navbar className="navbar navbar-dark bg-dark p-3">
      <div className="mr-auto d-flex align-items-center">
        <div className="col">
            <NavLink to="/" className="navbar-logo">
              <img
                src="src/assets/img/logo.png"
                className="d-inline-block align-top"
                alt="Logo de la empresa"
              />
            </NavLink>
          </div>
          <Col xs="auto">
              <FormControl
                type="text"
                placeholder="Buscar zapatillas"
                className="mr-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
        <span className='mx-5 text-white'>Bienvenido,
            <span className= 'mx-3 fw-bold text-white'>{loggedInUser.username}</span>
        </span>
        <NavLink to="/carrito" className="text-decoration-none text-white">
          🛒 ({carrito ? carrito.length : 0})
        </NavLink>
        <Form inline className="ml-auto" onSubmit={handleSearch}>
          <Row className="align-items-center">
          </Row>
        </Form>
        <Button variant="link" className="text-decoration-none text-white" onClick={handleLogoutClick}>
          Cerrar Sesión
        </Button>
      </div>
    </Navbar>
  );
}

export default NavbarUsers;




