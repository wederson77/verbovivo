import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DonationForm from "./DonationForm";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile"; // Supondo que você tenha um componente de perfil de usuário
import "./Header.css";

const Header = ({ userData }) => { // Recebendo userData como prop
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(userData); // Usando userData recebido de App.js

  // Função para alternar o estado do menu
  const toggleNavbar = () => {
    const navBar = document.getElementById("nav-bar-header");
    if (navBar.classList.contains("visible")) {
      navBar.classList.remove("visible");
      navBar.classList.add("hidden");
    } else {
      navBar.classList.remove("hidden");
      navBar.classList.add("visible");
    }
  };

  // Função para lidar com redimensionamento da janela
  const handleResize = () => {
    const navBar = document.getElementById("nav-bar-header");
    if (window.innerWidth < 768) {
      navBar.classList.remove("visible");
      navBar.classList.add("hidden");
    } else {
      navBar.classList.remove("hidden");
      navBar.classList.add("visible");
    }
  };

  // useEffect para adicionar/remover event listener de redimensionamento
  useEffect(() => {
    handleResize(); // Chamada inicial para configurar o estado
    window.addEventListener("resize", handleResize);

    // Verificar se o usuário está logado ao carregar o componente
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDonationClick = () => {
    window.location.href = "https://pix-interface.vercel.app/"; // Redireciona para a URL
  };

  const handleLoginClick = () => {
    if (user) { // Verificando se já existe um usuário
      // Se já estiver logado, mostrar o perfil
      setShowLoginForm(false); // Fecha o formulário de login
    } else {
      setShowLoginForm(!showLoginForm); // Caso contrário, exibe o login
    }
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>
          <a id="logo" href="/App">Verbo Vivo</a>
        </h1>
      </div>
      <nav id="nav-header">
        <button
          id="botao-amburger"
          className="button-hamburger"
          onClick={toggleNavbar}
        >
          <span className="menu-hamburger-span"></span>
          <span className="menu-hamburger-span"></span>
          <span className="menu-hamburger-span"></span>
        </button>
        <ul id="nav-bar-header" className="visible">
          <li id="donations">
            <button
              className="donationbutton"
              onClick={handleDonationClick}
            >
              Doe
              <FontAwesomeIcon id="donation-icon" icon={faHeart} size="sm" color="#FAF3E0" />
            </button>
          </li>
          <li id="login">
            <button id="botaoLogin" onClick={handleLoginClick}>
              <label id="labelLogin">{user ? 'Perfil' : 'Login'}</label>
              <FontAwesomeIcon id="loginIcon" icon={faUserAlt} size="sm" color="#FAF3E0" />
            </button>
          </li>
        </ul>
      </nav>

      {showDonationForm && <DonationForm />}
      {showLoginForm && <LoginForm closeLoginForm={closeLoginForm} />}
      {user && <UserProfile user={user} />} {/* Exibe o perfil se o usuário estiver logado */}
    </header>
  );
};

export default Header;