import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faMeh, faFrown, faFaceLaugh } from "@fortawesome/free-solid-svg-icons";
import "./AvatarMessage.css";

const AvatarMessage = ({ frases }) => {
  const [indiceFrase, setIndiceFrase] = useState(0);
  const [animacao, setAnimacao] = useState("appear");
  const [mostrandoVersiculo, setMostrandoVersiculo] = useState(false);
  const [indiceVersiculo, setIndiceVersiculo] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  const versiculos = [
    "O Senhor é meu pastor, nada me faltará. (Salmos 23:1)",
    "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito... (João 3:16)",
    "Tudo posso naquele que me fortalece. (Filipenses 4:13)",
    "Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos. (Filipenses 4:4)",
    "Entregue o seu caminho ao Senhor; confie nele, e ele agirá. (Salmos 37:5)",
    "Não temas, porque eu sou contigo. (Isaías 41:10)",
    "O temor do Senhor é o princípio da sabedoria. (Provérbios 9:10)",
    "Buscai primeiro o Reino de Deus e a sua justiça. (Mateus 6:33)",
    "O choro pode durar uma noite, mas a alegria vem pela manhã. (Salmos 30:5)",
    "Sede fortes e corajosos; não temais. (Deuteronômio 31:6)"
  ];

  useEffect(() => {
    const alternarFrase = () => {
      if (!mostrandoVersiculo) {
        setAnimacao("disappear");
        setTimeout(() => {
          setIndiceFrase((prev) => (prev + 1) % frases.length);
          setAnimacao("appear");
        }, 1000);
      }
    };

    const intervalo = setInterval(alternarFrase, 5000);
    return () => clearInterval(intervalo);
  }, [frases.length, mostrandoVersiculo]);

  const mostrarVersiculo = () => {
    setMostrandoVersiculo(true);
    setIndiceVersiculo((prev) => (prev + 1) % versiculos.length);
    
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeout = setTimeout(() => {
      setMostrandoVersiculo(false);
    }, 10000);
    setTimeoutId(newTimeout);
  };

  const message = mostrandoVersiculo ? versiculos[indiceVersiculo] : frases[indiceFrase];

  let avatarIcon = faFaceLaugh;
  if (message?.toLowerCase().includes("erro")) {
    avatarIcon = faFrown;
  } else if (message?.toLowerCase().includes("pensando")) {
    avatarIcon = faMeh;
  }

  return (
    <div className="avatar-container">
      <div id="assitente">
      <div className="message-box">
        <span className={`message ${animacao}`} key={mostrandoVersiculo ? indiceVersiculo : indiceFrase}>
          {message}
        </span>
      </div>
      <div className="avatar">
        <FontAwesomeIcon icon={avatarIcon} />
      </div>
      </div>
      <div className="button-container">
        <button onClick={mostrarVersiculo}>Quero um versículo aleatório</button>
        <button> <a href="https://pix-interface.vercel.app/">Como posso ajudar este projeto?</a></button>
      </div>
    </div>
  );
};

export default AvatarMessage;
