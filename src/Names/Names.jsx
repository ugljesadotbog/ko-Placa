import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { people } from "../db/people.js";

const Names = ({ personCount }) => {
  const [osobe, setOsobe] = useState([...people]);

  const [names, setNames] = useState("");
  const [numofPeople, setnumOfPeople] = useState(1);

  const handleInputChange = (event) => {
    setNames(event.target.value);
  };

  const pushArray = () => {
    console.log("names:", names);
    setOsobe((prevOsobe) => [...prevOsobe, names]);
    setNames("");
    setnumOfPeople((prevNum) => prevNum + 1);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div
        className={`flex flex-col justify-center items-center ${
          numofPeople > personCount ? "hidden" : ""
        }`}
      >
        <h3 className="text-large font-jockey">ime {numofPeople}. osobe</h3>
        <div className="flex flex-row justify-center items-center gap-2 my-3 ml-10">
          <Input
            name={"names"}
            type={"text"}
            placeholder={""}
            value={names}
            onChange={handleInputChange}
          />
          <Button
            buttonText={"ok"}
            className={`px-4 py-0.5 h-fit`}
            onClick={pushArray}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 flex-wrap px-4 max-w-md mx-auto">
        {osobe.map((osoba, index) => (
          <div
            key={index}
            className="flex-grow basis-[33%] flex justify-center items-center bg-buttonbackground rounded-xl py-2 px-8"
          >
            {osoba}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Names;
