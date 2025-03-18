import React from 'react';
import ReactDOM from 'react-dom/client';  // Alterado para importar de 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import App from './App';

// Usando createRoot ao invés de render
const root = ReactDOM.createRoot(document.getElementById('root'));  // Criação da raiz
root.render(
  <HelmetProvider>
    <Helmet>
      {/* SEO Global */}
      <title>Verbo Vivo - Estudo Bíblico Online</title>
      <meta name="description" content="Encontre versículos bíblicos de forma rápida e intuitiva. Digite uma palavra e descubra passagens relacionadas para aprofundar seu estudo." />
      <meta name="keywords" content="Bíblia, estudo bíblico, versículos, cristianismo, pesquisa bíblica, Palavra de Deus" />
      <meta name="author" content="Verbo Vivo" />
      
      {/* Open Graph (Para compartilhamento em redes sociais) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Verbo Vivo - Pesquisa Bíblica Online" />
      <meta property="og:description" content="Pesquise versículos bíblicos facilmente. Digite uma palavra-chave e encontre passagens relevantes para seu estudo espiritual." />
      <meta property="og:image" content="https://verbovivo-seven.vercel.app/" />
      <meta property="og:url" content="https://verbovivo-seven.vercel.app/" />

      {/* Twitter Card (Para compartilhamento no Twitter) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Verbo Vivo - Estudo Bíblico Online" />
      <meta name="twitter:description" content="Descubra versículos bíblicos digitando palavras-chave. Ferramenta ideal para seu estudo diário da Palavra de Deus." />
      <meta name="twitter:image" content="https://verbovivo-seven.vercel.app/" />

      {/* Definir idioma e viewport */}
      <html lang="pt-BR" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>

    <Router>
      <App />
    </Router>
  </HelmetProvider>
);
