import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div >
        <Spinner className="Load"  />
        <h3 className="loading">Estamos procesando su pago...</h3>
      </div>
    );
  }

  navigate("/successful");
  return null;
};

export default Loading;

