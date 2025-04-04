import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { people } from "../../db/people";

const Names = ({
  personCount,
  osobe,
  setOsobe,
  numOfPeople,
  setNumOfPeople,
  onClick,
}) => {
  const [names, setNames] = useState("");
  const [money, setMoney] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    setNumOfPeople(osobe.length);

    if (parseInt(personCount) <= osobe.length && osobe.length > 0) {
      setTimeout(() => {
        onClick();
      }, 500);
    }
  }, [osobe, personCount, onClick]);

  const handleInputChange = (event) => {
    setNames(event.target.value);
  };

  const handleMoneyChange = (event) => {
    setMoney(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const pushArray = () => {
    if (!names.trim()) return;

    const newPerson = {
      name: names,
      money: parseInt(money) || 0,
      costOfItem: parseInt(money) || 0,
    };

    setOsobe((prevOsobe) => [...prevOsobe, newPerson]);
    setNames("");
    setMoney("");
    setCost("");
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div
        className={`flex flex-col justify-center items-center ${
          parseInt(personCount) <= osobe.length ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col lg:flex-row justify-center gap-4 items-center">
          <label
            htmlFor="names"
            className="flex flex-col items-center font-jockey"
          >
            ime {numOfPeople + 1}. osobe?
            <Input
              name="names"
              type="text"
              placeholder=""
              value={names}
              onChange={handleInputChange}
              className="mt-1 lg:w-auto"
            />
          </label>

          <label
            htmlFor="money"
            className="flex flex-col items-center font-jockey text-base lg:w-auto"
          >
            koliko novca ima?
            <Input
              name="money"
              type="text"
              placeholder=""
              value={money}
              onChange={handleMoneyChange}
              className="mt-1 lg:w-auto"
            />
          </label>
          <label
            htmlFor="cost"
            className="flex flex-col items-center font-jockey text-base"
          >
            koliko kosta stvar?
            <Input
              name="cost"
              type="text"
              placeholder=""
              value={cost}
              onChange={handleCostChange}
              className="mt-1 lg:w-auto"
            />
          </label>

          <Button
            buttonText="OK"
            className="px-4 py-1 h-fit mb-2"
            onClick={pushArray}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 flex-wrap px-4 max-w-md mx-auto">
        {osobe.map((osoba, index) => (
          <div
            key={index}
            className="flex-grow basis-[33%] flex justify-center items-center bg-buttonbackground rounded-xl py-2 px-8 text-center text-sm"
          >
            {osoba.name} - {osoba.money}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Names;
