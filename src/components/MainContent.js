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
    `${getSaudacao()}! Que bom te ver por aqui! Digite uma palavra para pesquisar versículos! 🧐`,
    "Eita! Algo deu errado? Tente recarregar a página ou clique na logo e volte rapidinho!😅",
    "Sua doação faz a diferença. Espalhe a Palavra. 🙏📖",
    "Obrigado por usar o Verbo Vivo! Sua presença aqui fortalece nossa missão e nos inspira a continuar.🌟💬",
    "Doe via PIX é rápido, fácil e seguro. Com sua ajuda, podemos continuar a levar a Palavra de Deus a mais pessoas. ❤🔐",
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

  // Função para destacar a palavra no texto
  const highlightText = (text, term) => {
    if (!term) return text; // Se não houver termo, retorna o texto original
    const regex = new RegExp(`(${term})`, 'gi'); // Cria uma regex para a palavra
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`); // Substitui a palavra por ela mesma envolvida por <span>
  };

  // Destacar as palavras nos versículos
  const highlightedVersiculos = versiculos.map((versiculo) => ({
    ...versiculo,
    texto: highlightText(versiculo.texto, searchTerm), // Destaca o texto conforme o searchTerm
  }));

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
              versiculos={highlightedVersiculos} // Passando versículos com o texto destacado
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













// import React, { useState, useEffect } from "react";
// import './MainsContent.css';
// import SearchBar from "./SearchBar";
// import ErrorMessage from "./ErrorMessage";
// import VersiculosList from "./VersiculosList";
// import AvatarMessage from "./AvatarMessage";

// const MainContent = ({
//   searchTerm,
//   setSearchTerm,
//   handleSearch,
//   handleFetchUser,
//   errorMessage,
//   isSearching,
//   versiculos,
//   total,
//   currentPage,
//   handlePreviousPage,
//   handleNextPage,
//   versiculosPorPagina,
//   userData,
// }) => {
//   const frasesTexto = [
//     "Quando a alma procura, a Palavra responde.",
//     "Confie no Senhor e Ele guiará seus passos.",
//     "A Palavra de Deus é luz para o nosso caminho.",
//     "Buscai primeiro o Reino de Deus e a sua justiça.",
//     "Deus tem planos de paz e não de mal para sua vida.",
//   ];

//   const getSaudacao = () => {
//     const hora = new Date().getHours();
//     if (hora >= 6 && hora < 12) return "Bom dia";
//     if (hora >= 12 && hora < 18) return "Boa tarde";
//     return "Boa noite";
//   };

//   const frasesAvatar = [
//     `${getSaudacao()}! Que bom te ver por aqui! Digite uma palavra para pesquisar versículos! 🧐`,
//     "Eita! Algo deu errado? Tente recarregar a página ou clique na logo e volte rapidinho!😅",
//     "Sua doação faz a diferença. Espalhe a Palavra. 🙏📖",
//     "Obrigado por usar o Verbo Vivo! Sua presença aqui fortalece nossa missão e nos inspira a continuar.🌟💬",
//     "Doe via PIX é rápido, fácil e seguro. Com sua ajuda, podemos continuar a levar a Palavra de Deus a mais pessoas. ❤🔐",
//   ];

//   const [indiceFraseTexto, setIndiceFraseTexto] = useState(0);
//   const [animacaoTexto, setAnimacaoTexto] = useState("appear");

//   useEffect(() => {
//     const alternarFrase = () => {
//       setAnimacaoTexto("disappear");
//       setTimeout(() => {
//         setIndiceFraseTexto((prev) => (prev + 1) % frasesTexto.length);
//         setAnimacaoTexto("appear");
//       }, 1000);
//     };

//     const intervalo = setInterval(alternarFrase, 5000);
//     return () => clearInterval(intervalo);
//   }, [frasesTexto.length]);

//   return (
//     <div className="main-content">
//       <div className="search-section">
//         <SearchBar
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           handleSearch={handleSearch}
//         />
//         <div className="side-section">
//           <h2 id="texto-de-entrada" className={`fadeIn ${animacaoTexto}`} key={indiceFraseTexto}>
//             {frasesTexto[indiceFraseTexto]}
//           </h2>
//           {errorMessage && <ErrorMessage message={errorMessage} style={{ color: "#f76c6c" }} />}
//           {isSearching ? (
//             <p>Carregando...</p>
//           ) : (
//             <VersiculosList
//               versiculos={versiculos}
//               total={total}
//               currentPage={currentPage}
//               handlePreviousPage={handlePreviousPage}
//               handleNextPage={handleNextPage}
//               versiculosPorPagina={versiculosPorPagina}
//             />
//           )}
//         </div>
//       </div>

//       <div id="avatar-div">
//         <AvatarMessage frases={frasesAvatar} />
//       </div>
//     </div>
//   );
// };

// export default MainContent;
