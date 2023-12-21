import React, { useState, useEffect, useContext } from 'react';
import backgroundImage from '../assets/img/users.jpg';
import { ShoesContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { Col, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const DetailsUsers = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [postIdToModify, setPostIdToModify] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedPostData, setEditedPostData] = useState({
    Marca: "",
    Modelo: "",
    Año: "",
    Precio: "",
    Imagen: "",
  });
  const { loggedInUser } = useContext(ShoesContext);
  const navigate = useNavigate();

  const fetchUserPosts = async () => {
    try {
      if (!loggedInUser || typeof loggedInUser.id === 'undefined') {
        return;
      }
  
      const postsResponse = await fetch(`http://localhost:8080/publicaciones?usuarioID=${loggedInUser.id}`);
      const userPostsJson = await postsResponse.json();
  
      if (Array.isArray(userPostsJson)) {
        setUserPosts(userPostsJson);
      } else {
        console.error('Error en el formato de las publicaciones recibidas:', userPostsJson);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  

  const handleDeletePost = async (postId) => {
    console.log('Deleting post with ID:', postId);
    if (!postId) {
      console.error('Invalid post ID');
      return;
    }

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:8080/publicaciones/${postId}`, {
          method: 'DELETE',
        });
        fetchUserPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleModifyPost = (postId) => {
    const postToEdit = userPosts.find((post) => post.ID === postId);
    if (!postToEdit) {
      console.error('Invalid post data for modification');
      return;
    }
    setEditedPostData(postToEdit);
    setPostIdToModify(postId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setPostIdToModify(null);
    setEditedPostData({
      Marca: "",
      Modelo: "",
      Año: "",
      Precio: "",
      Imagen: "",
    });
  };

  const handleSaveEditedPost = async () => {
    try {
      await fetch(`http://localhost:8080/publicaciones/${postIdToModify}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPostData),
      });

      setShowEditModal(false);
      setPostIdToModify(null);
      setEditedPostData({
        Marca: "",
        Modelo: "",
        Año: "",
        Precio: "",
        Imagen: "",
      });

      Swal.fire({
        icon: 'success',
        title: '¡Publicación editada!',
        showConfirmButton: false,
        timer: 1500,
      });

      fetchUserPosts();
    } catch (error) {
      console.error('Error modifying post:', error);
    }
  };

  const handleNewPost = () => {
    navigate('/registerproduct');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchUserPosts();
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return <p>No hay un usuario autenticado.</p>;
  }

  return (
    <div className='text-center'>
      <img src={backgroundImage} alt="404" style={{ height: '200px' }} />
      <h1 className='fw-bold'>Usuario: {loggedInUser.username}</h1>
      <div className="mx-auto d-flex align-items-center">
      </div>
      <div>
        <button className="btn btn-success btn-lg btn-block m-3" onClick={handleNewPost}>
          Nueva Publicación
        </button>
        <button className="btn btn-dark btn-lg btn-block m-3" onClick={handleGoHome}>
          Ir al Home
        </button>
      </div>
      <div>
        <h2 className='mb-5 mt-3 fw-bold'>Publicaciones del Usuario</h2>
        {userPosts.map((post) => (
          <div key={post.ID}>
            <div className="d-flex justify-content-between mx-5 px-5">
              <img src={post.Imagen} alt={`Imagen de ${post.Marca} ${post.Modelo}`} style={{ height: '100px' }} />
              <p>Marca: {post.Marca}</p>
              <p>Modelo: {post.Modelo}</p>
              <p>Año: {post.Año}</p>
              <p>Precio: {post.Precio}</p>
              <div>
                <button className="btn btn-danger mx-2" onClick={() => handleDeletePost(post.ID)}>
                  Eliminar
                </button>
                <button className="btn btn-primary ml-2" onClick={() => handleModifyPost(post.ID)}>
                  Modificar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la marca"
                value={editedPostData.Marca || ''}
                onChange={(e) => setEditedPostData({ ...editedPostData, Marca: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el modelo"
                value={editedPostData.Modelo || ''}
                onChange={(e) => setEditedPostData({ ...editedPostData, Modelo: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAño">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el año"
                value={editedPostData.Año || ''}
                onChange={(e) => setEditedPostData({ ...editedPostData, Año: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el precio"
                value={editedPostData.Precio || ''}
                onChange={(e) => setEditedPostData({ ...editedPostData, Precio: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formImagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={editedPostData.Imagen || ''}
                onChange={(e) => setEditedPostData({ ...editedPostData, Imagen: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveEditedPost}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailsUsers;
