import Home from "./Main/home/Home";
import "./index.css";
import Names from "./Main/Names/Names";
import Person from "./Main/Person/Person";
import Bill from "./Main/Bill/Bill";
import AI from "./Main/AI/AI";
import { useState } from "react";
import { people } from "./db/people";
import Footer from "./Footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  const [currentStep, setCurrentStep] = useState("home");
  const [personCount, setPersonCount] = useState("");
  const [billCount, setBillCount] = useState("");
  const [osobe, setOsobe] = useState([...people]);
  const [numOfPeople, setNumOfPeople] = useState(people.length);

  const goToPersonStep = () => {
    setCurrentStep("person");
  };

  const goToNamesStep = () => {
    setCurrentStep("names");
  };

  const goToBillsStep = () => {
    setCurrentStep("bills");
  };

  const goToFinalStep = () => {
    setCurrentStep("final");
  };

  const goToAIStep = () => {
    setCurrentStep("ai");
  };

  return (
    <div className="app-container">
      <main>
        {currentStep === "home" && (
          <Home
            buttonText={"START"}
            className=""
            onClick={goToPersonStep}
            currentStep={currentStep}
          />
        )}
        {currentStep === "person" && (
          <Person
            className=""
            onClick={goToBillsStep}
            currentStep={currentStep}
            personCount={personCount}
            setPersonCount={setPersonCount}
          />
        )}
        {currentStep === "bills" && (
          <Bill
            className=""
            onClick={goToNamesStep}
            currentStep={currentStep}
            billCount={billCount}
            setBillCount={setBillCount}
          />
        )}
        {currentStep === "names" && (
          <Names
            className=""
            onClick={goToAIStep}
            currentStep={currentStep}
            personCount={personCount}
            osobe={osobe}
            setOsobe={setOsobe}
            people={people}
            numOfPeople={numOfPeople}
            setNumOfPeople={setNumOfPeople}
          />
        )}
        {currentStep === "ai" && (
          <AI
            className=""
            currentStep={currentStep}
            personCount={personCount}
            billCount={billCount}
            osobe={osobe}
            people={people}
            numOfPeople={numOfPeople}
          />
        )}
        <button
          onClick={() => {
            throw new Error("This is your first error!");
          }}
        >
          Break the world
        </button>
        ;
      </main>
      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
