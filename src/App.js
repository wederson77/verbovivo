import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVersiculos } from "./api/api";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";

import ErrorMessage from "./components/ErrorMessage";
import UserProfile from "./components/UserProfile"; // Importe o componente de perfil

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [versiculos, setVersiculos] = useState([]);
  const [userData, setUserData] = useState(null); // Dados do usuário
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const navigate = useNavigate();

  const versiculosPorPagina = 5;

  useEffect(() => {
    const handleResize = () => {
      setIsNavVisible(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleSearch = async (e) => {
    e?.preventDefault();
    setIsSearching(true);
    setErrorMessage(""); // Reseta o erro ao iniciar a busca

    try {
      const { versiculos, total, error } = await fetchVersiculos(searchTerm);
      setVersiculos(versiculos || []);
      setTotal(total || 0);

      if (error) {
        setErrorMessage(error); // Define a mensagem de erro retornada pela API
      } else if (versiculos.length === 0) {
        setErrorMessage("Nenhum resultado encontrado.");
      }
    } catch (error) {
      setErrorMessage("Erro ao buscar versículos: " + error.message);
      setVersiculos([]);
      setTotal(0);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogin = (user) => {
    setUserData(user);
    setErrorMessage("");
    setIsLoginVisible(false); // Fecha o formulário de login
    navigate("/App"); // Redireciona para a página principal após fechar o formulário
  };

  const handleLogout = () => {
    setUserData(null); // Limpa os dados do usuário
  };

    const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = async () => {
    const totalPages = Math.ceil(total / versiculosPorPagina);
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      const response = await fetchVersiculos(searchTerm, nextPage, versiculosPorPagina);
      if (response.versiculos && response.versiculos.length > 0) {
        setVersiculos((prevVersiculos) => [...prevVersiculos, ...response.versiculos]);
      } else {
        setVersiculos([]);
      }
    }
  };
  

  return (
    <div className="App">
      <Header
        isNavVisible={isNavVisible}
        toggleNavbar={toggleNavbar}
        handleLogout={handleLogout}
        setIsLoginVisible={setIsLoginVisible}
        userData={userData}  // Passando userData aqui
      />

      {/* Renderiza o formulário de login apenas quando isLoginVisible for true */}
      {isLoginVisible && (
        <LoginForm
          handleLogin={handleLogin}
          setIsLoginVisible={setIsLoginVisible}
        />
      )}

      {/* Renderiza o perfil do usuário se estiver logado */}
      {userData && <UserProfile user={userData} />} {/* Componente de perfil */}

      <MainContent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        errorMessage={errorMessage}
        isSearching={isSearching}
        versiculos={versiculos.slice(
          (currentPage - 1) * versiculosPorPagina,
          currentPage * versiculosPorPagina
        )}
        total={total}
        currentPage={currentPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        versiculosPorPagina={versiculosPorPagina}
        userData={userData}
      />

      {versiculos.length === 0 && !isSearching && <Carousel />}
      <Footer />
    </div>
  );
}

export default App;











// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchVersiculos } from "./api/api";
// import Header from "./components/Header";
// import MainContent from "./components/MainContent";
// import Carousel from "./components/Carousel";
// import Footer from "./components/Footer";
// import LoginForm from "./components/LoginForm";
// import ErrorMessage from "./components/ErrorMessage";

// function App() {
//   const [isNavVisible, setIsNavVisible] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [versiculos, setVersiculos] = useState([]);
//   const [userData, setUserData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [isSearching, setIsSearching] = useState(false);
//   const [isLoginVisible, setIsLoginVisible] = useState(false);
//   const navigate = useNavigate();

//   const versiculosPorPagina = 5;

//   useEffect(() => {
//     const handleResize = () => {
//       setIsNavVisible(window.innerWidth >= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const toggleNavbar = () => {
//     const navBar = document.getElementById("nav-bar-header");
//     if (navBar.classList.contains("visible")) {
//       navBar.classList.remove("visible");
//       navBar.classList.add("hidden");
//     } else {
//       navBar.classList.remove("hidden");
//       navBar.classList.add("visible");
//     }
//   };
  
  
//   const handleSearch = async (e) => {
//     e?.preventDefault();
//     setIsSearching(true);
//     setErrorMessage(""); // Reseta o erro ao iniciar a busca
  
//     try {
//       const { versiculos, total, error } = await fetchVersiculos(searchTerm);
//       setVersiculos(versiculos || []);
//       setTotal(total || 0);
  
//       if (error) {
//         setErrorMessage(error); // Define a mensagem de erro retornada pela API
//       } else if (versiculos.length === 0) {
//         setErrorMessage("Nenhum resultado encontrado.");
//       }
//     } catch (error) {
//       setErrorMessage("Erro ao buscar versículos: " + error.message);
//       setVersiculos([]);
//       setTotal(0);
//     } finally {
//       setIsSearching(false);
//     }
//   };
  
//   const handleLogin = (user) => {
//     setUserData(user); // Dados do usuário
//     setErrorMessage("");
//     setIsLoginVisible(false); // Fecha o formulário de login
//     navigate("/App"); // Redireciona para a página principal após fechar o formulário
//   };
  

//   const handleLogout = () => {
//     setUserData(null);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const handleNextPage = async () => {
//     const totalPages = Math.ceil(total / versiculosPorPagina);
//     if (currentPage < totalPages) {
//       const nextPage = currentPage + 1;
//       setCurrentPage(nextPage);
//       const response = await fetchVersiculos(searchTerm, nextPage, versiculosPorPagina);
//       if (response.versiculos && response.versiculos.length > 0) {
//         setVersiculos((prevVersiculos) => [...prevVersiculos, ...response.versiculos]);
//       } else {
//         setVersiculos([]);
//       }
//     }
//   };

//   return (
//     <div className="App">
//     <Header
//       isNavVisible={isNavVisible}
//       toggleNavbar={toggleNavbar}
//       handleLogout={handleLogout}
//       setIsLoginVisible={setIsLoginVisible}
//       userData={userData}  // Passe o estado do usuário logado
//     />


//       {/* Renderiza o formulário de login apenas quando isLoginVisible for true */}
//       {isLoginVisible && (
//         <LoginForm
//           handleLogin={handleLogin}
//           setIsLoginVisible={setIsLoginVisible} // Passando setIsLoginVisible corretamente
//         />
//       )}

//       <MainContent
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         handleSearch={handleSearch}
//         errorMessage={errorMessage} // Passa o erro para MainContent
//         isSearching={isSearching}
//         versiculos={versiculos.slice(
//           (currentPage - 1) * versiculosPorPagina,
//           currentPage * versiculosPorPagina
//         )}
//         total={total}
//         currentPage={currentPage}
//         handlePreviousPage={handlePreviousPage}
//         handleNextPage={handleNextPage}
//         versiculosPorPagina={versiculosPorPagina}
//         userData={userData}
//       />



//       {versiculos.length === 0 && !isSearching && <Carousel />}
//       <Footer />
//     </div>
//   );
// }

// export default App;
