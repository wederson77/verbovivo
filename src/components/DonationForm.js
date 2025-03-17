import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ToastContainer, toast } from 'react-toastify'; // Importando a biblioteca
import 'react-toastify/dist/ReactToastify.css'; // Estilos para o Toast
import './DonationForm.css';

const DonationComponent = () => {
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar a visibilidade do componente

  const donationOptions = [
    { value: 10, pixKey: 'suachavepix1@provedor.com' },
    { value: 25, pixKey: 'suachavepix2@provedor.com' },
    { value: 50, pixKey: 'suachavepix3@provedor.com' },
    { value: 100, pixKey: 'suachavepix3@provedor.com' },
  ];

  const handleCopy = (pixKey) => {
    navigator.clipboard.writeText(pixKey);
    toast.success('✔️ Chave Pix copiada com sucesso! Sua contribuição faz toda a diferença. 🙏');
  };

  const handleSupport = () => {
    toast.info('💖 Agradecemos por considerar apoiar nosso projeto! Sua ajuda é fundamental!');
  };

  const handleClose = () => {
    setIsVisible(false); // Esconde o componente ao clicar no botão "X"
  };

  if (!isVisible) return null; // Retorna null se o componente não for visível

  return (
    <div className="donation-container">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <h1 className="donation-title">Contribua para um Propósito Maior</h1>
      <p className="donation-subtitle">
        Sua contribuição nos ajuda a tornar a Palavra de Deus ainda mais acessível a todos.
        Cada doação nos permite melhorar este projeto e alcançar mais vidas. 🙏
      </p>

      <div className="donation-options">
        {donationOptions.map((option, index) => (
          <div key={index} className="donation-card">
            <p className="donation-text">Doe <strong>R${option.value}</strong></p>
            <QRCodeSVG value={option.pixKey} size={120} className="qrcode" />
            <button
              onClick={() => handleCopy(option.pixKey)}
              className="donation-copy-button"
            >
              Copiar Chave Pix
            </button>
          </div>
        ))}
      </div>

      <p className="donation-final-note">
        Pequenos gestos geram grandes mudanças. Seja parte desta transformação hoje!
      </p>

      <button
        className="donation-cta-button"
        onClick={handleSupport}
      >
        Quero Apoiar Agora 🙌
      </button>

      {/* Componente ToastContainer para renderizar os toasts */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default DonationComponent;
  