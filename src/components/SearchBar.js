// SearchBar.js:
// Um componente que cuida apenas do input de pesquisa e da submissão do formulário.
// Este componente será responsável apenas pelo input de pesquisa e a submissão do formulário.
import './SearcBar.css';
import React from "react";

const sanitizeInput = (input) => {
  // Permite letras, números, espaços e caracteres especiais da língua portuguesa
  return input.replace(/[^a-zA-Z0-9\sáéíóúâêîôûãõçÁÉÍÓÚÂÊÎÔÛÃÕÇ]/g, "");
};
const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => (
  <form id="form-search" onSubmit={handleSearch}>
    <input
      id="input-search"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(sanitizeInput(e.target.value))}
      placeholder="Digite uma palavra-chave, como 'amor' ou 'esperança'."
    />
    <button id="searchButton" type="submit">Buscar</button>
  </form>
);

export default SearchBar;






// // Um componente que cuida apenas do input de pesquisa e da submissão do formulário.
// // Este componente será responsável apenas pelo input de pesquisa e a submissão do formulário.
// import './SearcBar.css';
// import React from "react";

// const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => (
//   <form id="form-search" onSubmit={handleSearch}>
//     <input id='inpu-search'
//       type="text"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       placeholder="Digite uma palavra-chave, como 'amor' ou 'esperança'."
//     />
//     <button id="searchButton"  type="submit">Buscar</button>
//   </form>
// );

// export default SearchBar;
