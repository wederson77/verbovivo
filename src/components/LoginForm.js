import React, { useState } from "react";
import { loginUser, registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ closeLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

  const toggleRegisterMode = () => setIsRegisterMode((prevMode) => !prevMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (isRegisterMode) {
        const response = await registerUser(email, password);
        setSuccessMessage("Parabéns! Você está pronto para explorar a Palavra de forma profunda e transformadora.");
        setIsRegisterMode(false);
      } else {
        const response = await loginUser(email, password);
        closeLoginForm();
        navigate("/App");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-model">
      <button className="close-btn" onClick={closeLoginForm}>X</button>
      <h2>{isRegisterMode ? "Transforme sua jornada espiritual: Cadastre-se agora!" : "Acesse sabedoria divina: Entre para começar"}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="botao-login" type="submit">
          {isRegisterMode ? "Comece agora" : "Entrar"}
        </button>
      </form>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      {errorMessage && <p id="error-message" style={{ color: "red" }}>{errorMessage}</p>}
      <button className="botao-login" id="cadastro" onClick={toggleRegisterMode}>
        {isRegisterMode ? "Já é um membro? Faça login agora!" : "Novo por aqui? Junte-se à Comunidade!"}
      </button>
    </div>
  );
};

export default LoginForm;
