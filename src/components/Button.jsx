import React from "react";

const Button = ({ buttonText, className, onClick }) => {
  return (
    <button
      className={`rounded-xl bg-buttonbackground font-jockey text-base cursor-pointer ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
