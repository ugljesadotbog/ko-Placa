import React from "react";

const Button = ({ buttonText, onClick, className }) => {
  return (
    <button
      className={`rounded-xl bg-amber-600 px-[26px] py-[12px] font-jockey text-base bg-buttonbg cursor-pointer ${
        className || ""
      }`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
