import Home from "./home/Home";
import "./index.css";
import Names from "./Names/Names";
import Person from "./Person/Person";
import { useState } from "react";

const App = () => {
  const [currentStep, setCurrentStep] = useState("home");
  const [personCount, setPersonCount] = useState("");

  const goToPersonStep = () => {
    setCurrentStep("person");
  };

  const goToNamesStep = () => {
    setCurrentStep("names");
  };

  const goToFinalStep = () => {
    setCurrentStep("final");
  };

  return (
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
          onClick={goToNamesStep}
          currentStep={currentStep}
          personCount={personCount}
          setPersonCount={setPersonCount}
        />
      )}

      {currentStep === "names" && (
        <Names
          className=""
          onClick={goToFinalStep}
          currentStep={currentStep}
          personCount={personCount}
        />
      )}
    </main>
  );
};

export default App;
