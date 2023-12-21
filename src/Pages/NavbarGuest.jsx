import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import Bot from "./Bot";
import "bootstrap/dist/css/bootstrap.min.css";

function NavbarGuest() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/publicaciones/search?search_query=${searchValue}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error(
          "Error en la respuesta del servidor:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue !== "") {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  const handleOpenChatModal = () => {
    setShowChatModal(true);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
  };

  return (
    <>
      <Navbar className="navbar navbar-dark bg-dark p-3">
        <Form inline className="ml-auto">
          <Row className="align-items-left">
            <Col>
              <Form.Control
                type="text"
                placeholder="Buscar Zapatillas"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue !== "" && searchResults.length > 0 && (
                <ul className="search-results text-white d-flex">
                  {searchResults.map((result) => (
                    <li
                      className="search"
                      key={result.ID}
                      onClick={() => handleResultClick(result)}
                    >
                      <div>
                        <img
                          src={result.Imagen}
                          alt={`Imagen de ${result.Marca}`}
                          style={{
                            width: "50%",
                            borderRadius: "10px",
                          }}
                          className="rounded-image mt-3"
                        />
                        <p>{result.Marca}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Col>
          </Row>
        </Form>
        <NavLink to="/" className="navbar-logo">
          <img
            src="src/assets/img/logo.png"
            className="d-inline-block align-top mx-4"
            alt="Logo de la empresa"
          />
        </NavLink>
        <Row className="align-items-center">
          <Col xs="auto">
            <NavLink
              to="/loginusers"
              className="text-decoration-none mx-5"
              style={{ color: "white" }}
            >
              Iniciar Sesión
            </NavLink>
          </Col>
          <Col xs="auto">
            <NavLink
              to="/register"
              className="text-decoration-none"
              style={{ color: "white" }}
            >
              Registrarse
            </NavLink>
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-light"
              className="ml-3"
              onClick={handleOpenChatModal}
            >
              Conversemos
            </Button>
          </Col>
        </Row>
      </Navbar>
      <Modal show={showChatModal} onHide={handleCloseChatModal}>
        <Modal.Body>
          <Bot />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChatModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarGuest;
