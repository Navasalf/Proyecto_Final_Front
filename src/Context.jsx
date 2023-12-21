import React, { createContext, useState, useEffect } from 'react';

const ShoesContext = createContext();

const ShoesProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [carrito, setCarrito] = useState([]);


  const handleLogin = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
  
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Hubo un problema al iniciar sesión.');
      }
  
      const responseData = await response.json();
  
      localStorage.setItem('loggedInUser', JSON.stringify(responseData.user));
      setLoggedInUser(responseData.user);
  
      return { success: true, data: responseData };
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setError(error.message || 'Error al procesar la solicitud.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = carrito.find(item => item.Id === product.Id);
  
    if (existingItem) {
      const updatedCart = carrito.map(item =>
        item.Id === product.Id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateLocalStorage('cart', updatedCart);
      setCarrito(updatedCart);
    } else {

      const updatedCart = [...carrito, { ...product, quantity: 1 }];
      updateLocalStorage('cart', updatedCart);
      setCarrito(updatedCart);
    }
  };
  
  const removeFromCart = (productId) => {
    const updatedCart = carrito.map(item => {
      if (item.Id === productId) {
        const updatedItem = { ...item, quantity: Math.max(0, item.quantity - 1) };
        return updatedItem;
      }
      return item;
    });
  
    const filteredCart = updatedCart.filter(item => item.quantity > 0);
  
    updateLocalStorage('cart', filteredCart);
    setCarrito(filteredCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = carrito.map(item =>
      item.Id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  
    updateLocalStorage('cart', updatedCart);
    setCarrito(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = carrito.map(item =>
      item.Id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
    );
  
    const filteredCart = updatedCart.filter(item => item.quantity > 0);
  
    updateLocalStorage('cart', filteredCart);
    setCarrito(filteredCart);
  };

  const getLocalStorageItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error al obtener el item ${key} del localStorage:`, error);
      return null;
    }
  };

  const updateLocalStorage = (key, data) => {
    try {
      console.log(`Updating ${key} in localStorage with data:`, data);
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error updating ${key} in localStorage:`, error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  const clearCart = () => {
    updateLocalStorage('cart', []);
    setCarrito([]);
  };

  const getZapatillaById = (id) => {
    return carrito.find((zapatilla) => zapatilla.Id === id);
  };


  const contextValue = {
    getZapatillaById,
    clearCart,
    carrito,
    handleLogout,
    loggedInUser,
    handleLogin,
    error,
    loading,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    authToken: loggedInUser ? loggedInUser.token : null,
  };

  useEffect(() => {
    const loggedInUserFromLocalStorage = getLocalStorageItem('loggedInUser');
    const cartFromLocalStorage = getLocalStorageItem('cart');

    if (loggedInUserFromLocalStorage) {
      setLoggedInUser(loggedInUserFromLocalStorage);
    }

    if (cartFromLocalStorage) {
      setCarrito(cartFromLocalStorage);
    }
  }, []);

  return <ShoesContext.Provider value={contextValue}>{children}</ShoesContext.Provider>;
};

export { ShoesProvider, ShoesContext };


