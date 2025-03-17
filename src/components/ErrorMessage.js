import React from "react";

const ErrorMessage = ({ message, style }) => {
  if (!message) return null;

  return (
    <p style={style}>
      {message}
    </p>
  );
};

export default ErrorMessage;
