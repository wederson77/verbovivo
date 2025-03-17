import React from "react";
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="content-container">
        <div className="logo-section">
          <h2 className="logo-rodape">Verbo Vivo</h2>
          <p className="tagline">"Buscai primeiro o Reino de Deus e a sua justiça..." - Mateus 6:33</p>
        </div>

        <div id="links-contatos-footer">
          <div className="links-section">
            <h4 className="section-title">Recursos</h4>
            <ul className="link-list">
              <li><a href="/pesquisa" className="link">Pesquisar na Bíblia</a></li>
              <li><a href="/planos-de-leitura" className="link">Planos de Leitura</a></li>
              <li><a href="/estudos" className="link">Estudos Bíblicos</a></li>
            </ul>
          </div>

          <div className="contact-section">
            <h4 className="section-title-contato">Contato</h4>
            <ul className="contact-list">
            <li style={{ display: "flex", alignItems: "center", gap: "2px", whiteSpace: "nowrap" }}>
              <FontAwesomeIcon icon={faEnvelope}/><span>Email: verbovivo28@gmail.com</span>
            </li>
              <li>
                <a href="https://www.instagram.com/_verbo_vivoo/" className="contact-link" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} /> <span> Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@_verbo_vivo" className="contact-link" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTiktok} /> <span> TikTok</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
