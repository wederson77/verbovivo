import React, { useState, useEffect } from "react";
import './MainsContent.css';
import SearchBar from "./SearchBar";
import ErrorMessage from "./ErrorMessage";
import VersiculosList from "./VersiculosList";
import AvatarMessage from "./AvatarMessage";

const MainContent = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleFetchUser,
  errorMessage,
  isSearching,
  versiculos,
  total,
  currentPage,
  handlePreviousPage,
  handleNextPage,
  versiculosPorPagina,
  userData,
}) => {
  const frasesTexto = [
    "Quando a alma procura, a Palavra responde.",
    "Confie no Senhor e Ele guiará seus passos.",
    "A Palavra de Deus é luz para o nosso caminho.",
    "Buscai primeiro o Reino de Deus e a sua justiça.",
    "Deus tem planos de paz e não de mal para sua vida.",
  ];

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
  };

  const frasesAvatar = [
    `${getSaudacao()}! Que bom te ver por aqui! Fique à vontade e aproveite ao máximo.`,
    "Eita! Algo deu errado? Tente recarregar a página cliando na logo e volte rapidinho! 😅",
    "Olha só quem chegou! Sua presença já torna tudo mais especial.",
    "Gostando da experiência? Com sua ajuda, podemos ir ainda mais longe!",
    "Você é incrível! Se puder, apoie nosso projeto e espalhe essa mensagem.",
  ];

  const [indiceFraseTexto, setIndiceFraseTexto] = useState(0);
  const [animacaoTexto, setAnimacaoTexto] = useState("appear");

  useEffect(() => {
    const alternarFrase = () => {
      setAnimacaoTexto("disappear");
      setTimeout(() => {
        setIndiceFraseTexto((prev) => (prev + 1) % frasesTexto.length);
        setAnimacaoTexto("appear");
      }, 1000);
    };

    const intervalo = setInterval(alternarFrase, 5000);
    return () => clearInterval(intervalo);
  }, [frasesTexto.length]);

  return (
    <div className="main-content">
      <div className="search-section">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <div className="side-section">
          <h2 id="texto-de-entrada" className={`fadeIn ${animacaoTexto}`} key={indiceFraseTexto}>
            {frasesTexto[indiceFraseTexto]}
          </h2>
          {errorMessage && <ErrorMessage message={errorMessage} style={{ color: "#f76c6c" }} />}
          {isSearching ? (
            <p>Carregando...</p>
          ) : (
            <VersiculosList
              versiculos={versiculos}
              total={total}
              currentPage={currentPage}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              versiculosPorPagina={versiculosPorPagina}
            />
          )}
        </div>
      </div>

      <div id="avatar-div">
        <AvatarMessage frases={frasesAvatar} />
      </div>
    </div>
  );
};

export default MainContent;
