import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Paymentgateway = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mastercard");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e, setter) => {
    let inputValue = e.target.value;
    if (setter === setCardNumber || setter === setSecurityCode) {
      if (!/^\d+|\s*$/.test(inputValue)) {
        return;
      }

      const formattedValue = inputValue.replace(/\D/g, "").slice(0, 16);
      const spacedValue = formattedValue.replace(/(\d{4})(?=.)/g, "$1 ");
      setter(spacedValue);
    } else if (setter === setExpiryDate) {
      if (inputValue.length === 2 && inputValue.charAt(2) !== "/") {
        inputValue += "/";
      }
      setter(inputValue);
    } else {
      setter(inputValue);
    }

    const allFieldsFilled =
      cardNumber !== "" &&
      cardName !== "" &&
      expiryDate !== "" &&
      securityCode !== "";
    setIsButtonEnabled(allFieldsFilled);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isButtonEnabled) {
      return;
    }

  };
  return (
    <div className="container container1">
      <form className="w-50 bg-light mb-4 mx-auto" onSubmit={handleSubmit}>
        <div className="card" id="form">
          <div className="card-header text-center">
            <strong className="fs-4">Formulario de Pago</strong>
          </div>
          <div className="card-body">
            <div className="mt-3 mb-3">
              <label htmlFor="Numeros" className="form-label fs-6">
                Número de tarjeta
              </label>
              <input
                type="text"
                className="form-control"
                id="Numeros"s
                placeholder="Número de tarjeta"
                value={cardNumber}
                onChange={(e) => handleInputChange(e, setCardNumber)}
                maxLength={19}
                required
              />
            </div>
            <div className="mt-3 mb-3">
              <label htmlFor="text" className="form-label fs-6">
                <span style={{ float: "left" }}>Nombre y apellido</span>
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Nombre y apellido"
                pattern="[a-zA-Z\s]+"
                title="Ingrese solo letras"
                required
                onKeyDown={(event) => {
                  if (!event.key.match(/[a-zA-Záéíóúñ\s]/g)) {
                    event.preventDefault();
                  }
                }}
                value={cardName}
                onChange={(e) => handleInputChange(e, setCardName)}
              />
            </div>
            <div className="col-12 mb-5 mt-4">
              <div style={{ display: "flex", gap: "35px" }}>
                <div>
                  <label htmlFor="username" className="form-label fs-6">
                    Fecha de vencimiento
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="MM/AAAA"
                    pattern="\d{2}/\d{4}"
                    maxLength="7"
                    value={expiryDate}
                    onChange={(e) => handleInputChange(e, setExpiryDate)}
                    required
                  />
                </div>
                <div>
                  <div>
                    <label htmlFor="username" className="form-label fs-6">
                      Código de seguridad
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="CVV"
                      maxLength="3"
                      pattern="[0-9]{3}"
                      required
                      style={{ width: "100px" }}
                      value={securityCode}
                      onChange={(e) => handleInputChange(e, setSecurityCode)}
                    />
                  </div>
                </div>
                <div className="d-inline-block p-2 rounded mt-2 ml-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethods"
                      id="mastercard"
                      value="mastercard"
                      onChange={() => setPaymentMethod("mastercard")}
                      checked={paymentMethod === "mastercard"}
                    />
                    <label className="form-check-label" htmlFor="mastercard">
                      Tarjeta de Debito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethods"
                      id="visa"
                      value="visa"
                      onChange={() => setPaymentMethod("visa")}
                      checked={paymentMethod === "visa"}
                    />
                    <label className="form-check-label" htmlFor="visa">
                      Tarjeta de Crédito
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card-footer" style={{ display: "flex", justifyContent: "end" }}
          >
            <NavLink to="/" className="Text-decoration-none">
              <button type="submit" className="btn btn-secondary m-2">
                Cancelar
              </button>
            </NavLink>
            <NavLink to="/Loading" className="Text-decoration-none">
              <button type="submit" className="btn btn-primary m-2" disabled={!isButtonEnabled}>
                Realizar Pago
              </button>
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Paymentgateway;

