import React, { useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faCopy } from "@fortawesome/free-solid-svg-icons";

import "./VersiculosList.css";

const VersiculosList = ({
  versiculos = [],
  total,
  currentPage,
  handlePreviousPage,
  handleNextPage,
  versiculosPorPagina,
  searchTerm, // Vamos receber o termo de pesquisa aqui
}) => {
  const totalPages = Math.ceil(total / versiculosPorPagina);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const nodeRefs = useRef([]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsModalVisible(true);
        setTimeout(() => setIsModalVisible(false), 2000);
      })
      .catch((err) => {
        console.error("Erro ao copiar para a área de transferência: ", err);
      });
  };

  // Função para destacar a palavra no texto
  const highlightText = (text, term) => {
    if (!term) return text; // Se não houver termo, retorna o texto original
    const regex = new RegExp(`(${term})`, 'gi'); // Cria uma regex para a palavra
    // Substitui a palavra por ela mesma envolvida por <span>
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  };

  return (
    <div id="versiculos-listagem">
      <TransitionGroup component="ul" className="versiculos-container">
        {versiculos.map((versiculo, index) => {
          if (!nodeRefs.current[index]) {
            nodeRefs.current[index] = React.createRef();
          }

          // Aplicando a função de destacar a palavra no conteúdo do versículo
          const highlightedTexto = highlightText(versiculo.texto, searchTerm);

          return (
            <CSSTransition
              key={index}
              timeout={500}
              classNames="versiculo-transition"
              nodeRef={nodeRefs.current[index]}
            >
              <li className="versiculo-card" ref={nodeRefs.current[index]}>
                <strong className="titulo-versiculo">
                  {versiculo.livro.trim()}: 
                  <span dangerouslySetInnerHTML={{ __html: highlightedTexto }} /> {/* Exibe o texto com destaque */}
                </strong>
                <FontAwesomeIcon
                  icon={faCopy}
                  className="copy-icon"
                  onClick={() => copyToClipboard(`${versiculo.livro.trim()} - ${versiculo.texto}`)}
                />
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Versículo copiado para a área de transferência!</p>
          </div>
        </div>
      )}

      {versiculos.length > 0 && (
        <div className="pagination">
          <button className="meusBotao" id="paginaAnterior" onClick={handlePreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faArrowLeft} size="sm" color="#FAF3E0" />
            Página Anterior
          </button>
          <span>{currentPage} de {totalPages || 1}</span>
          <button className="meusBotao" id="proximaPagina" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Próxima Página
            <FontAwesomeIcon icon={faArrowRight} size="sm" color="#FAF3E0" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VersiculosList;










// import React, { useState, useRef } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faArrowLeft, faCopy } from "@fortawesome/free-solid-svg-icons";

// import "./VersiculosList.css";

// const VersiculosList = ({
//   versiculos = [],
//   total,
//   currentPage,
//   handlePreviousPage,
//   handleNextPage,
//   versiculosPorPagina,
// }) => {
//   const totalPages = Math.ceil(total / versiculosPorPagina);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // Criar um array de referências, garantindo que cada item tenha um ref único
//   const nodeRefs = useRef([]);

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => {
//         setIsModalVisible(true);
//         setTimeout(() => setIsModalVisible(false), 2000); // Esconde o modal após 2 segundos
//       })
//       .catch((err) => {
//         console.error("Erro ao copiar para a área de transferência: ", err);
//       });
//   };

//   return (
//     <div id="versiculos-listagem">
//       <TransitionGroup component="ul" className="versiculos-container">
//         {versiculos.map((versiculo, index) => {
//           if (!nodeRefs.current[index]) {
//             nodeRefs.current[index] = React.createRef();
//           }

//           return (
//             <CSSTransition
//               key={index}
//               timeout={500}
//               classNames="versiculo-transition"
//               nodeRef={nodeRefs.current[index]} // Usando ref único para cada item
//             >
//               <li className="versiculo-card" ref={nodeRefs.current[index]}>
//                 <strong className="titulo-versiculo">
//                   {versiculo.livro.trim()}:{versiculo.texto}
//                 </strong>
//                 <FontAwesomeIcon
//                   icon={faCopy}
//                   className="copy-icon"
//                   onClick={() => copyToClipboard(`${versiculo.livro.trim()} - ${versiculo.texto}`)}
//                 />
//               </li>
//             </CSSTransition>
//           );
//         })}
//       </TransitionGroup>

//       {/* Modal de Confirmação */}
//       {isModalVisible && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <p>Versículo copiado para a área de transferência!</p>
//           </div>
//         </div>
//       )}

//       {versiculos.length > 0 && (
//         <div className="pagination">
//           <button className="meusBotao" id="paginaAnterior" onClick={handlePreviousPage} disabled={currentPage === 1}>
//             <FontAwesomeIcon icon={faArrowLeft} size="sm" color="#FAF3E0" />
//             Página Anterior
//           </button>
//           <span>
//             {currentPage} de {totalPages || 1}
//           </span>
//           <button
//             className="meusBotao"
//             id="proximaPagina"
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Próxima Página
//             <FontAwesomeIcon icon={faArrowRight} size="sm" color="#FAF3E0" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VersiculosList;
