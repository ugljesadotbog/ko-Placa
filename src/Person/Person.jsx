import Button from "../components/Button";
import { useState } from "react";
import Input from "../components/Input";

const Person = ({ className, onClick, currentStep, personCount, setPersonCount }) => {
  

  const handleInputChange = (event) => {
    setPersonCount(event.target.value);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h2 className="text-xl font-jockey mb-4">koliko osoba je za stolom</h2>
      <Input
        onChange={handleInputChange}
        value={personCount}
        type={"number"}
        name={"counter"}
        placeholder={"3"}
      />
      <Button
        buttonText={"ok"}
        className={`px-6 py-1 mt-6 ${className}`}
        onClick={onClick}
      />
    </div>
  );
};

export default Person;
