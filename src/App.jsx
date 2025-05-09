import Home from "./pages/home/Home";
import "./index.css";
import Names from "./pages/Names/Names";
import Person from "./pages/Person/Person";
import Bill from "./pages/Bill/Bill";
import AI from "./pages/AI/AI";
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

  const steps = ["person", "names", "bills", "final", "ai"];

  const goToPersonStep = () => {
    setCurrentStep(steps[0]);
  };

  const goToNamesStep = () => {
    setCurrentStep(steps[1]);
  };

  const goToBillsStep = () => {
    setCurrentStep(steps[2]);
  };

  const goToFinalStep = () => {
    setCurrentStep(steps[3]);
  };

  const goToAIStep = () => {
    setCurrentStep(steps[4]);
  };

  const goToPrevious = (step) => {
    if(steps.includes(step)) {
      setCurrentStep(step)
    }
  }

  return (
    <div className="flex flex-col min-h-screen app-container">
      <main className="flex-grow">
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
      </main>

      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
