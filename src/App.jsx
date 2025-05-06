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
import BackButton from "./components/BackButton";

const App = () => {
  const [currentStep, setCurrentStep] = useState("home");
  const [personCount, setPersonCount] = useState("");
  const [billCount, setBillCount] = useState("");
  const [osobe, setOsobe] = useState([...people]);
  const [numOfPeople, setNumOfPeople] = useState(people.length);

  const steps = ["home", "person", "names", "bills", "final", "ai"];

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if(currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  // const goToPersonStep = () => {
  //   setCurrentStep(steps[1]);
  // };

  // const goToNamesStep = () => {
  //   setCurrentStep(steps[2]);
  // };

  // const goToBillsStep = () => {
  //   setCurrentStep(steps[3]);
  // };

  // const goToFinalStep = () => {
  //   setCurrentStep(steps[4]);
  // };

  // const goToAIStep = () => {
  //   setCurrentStep(steps[5]);
  // };


  return (
    <div className="flex flex-col min-h-screen app-container">
      <main className="flex-grow">
        <BackButton steps={steps} 
        setCurrentStep={setCurrentStep} 
        currentStep={currentStep}/>

        {currentStep === "home" && (
          <Home
            buttonText={"START"}
            className={steps[0]}
            onClick={goToNextStep}
            currentStep={currentStep}
          />
        )}
        {currentStep === "person" && (
          <Person
            className=""
            onClick={goToNextStep}
            currentStep={steps[0]}
            personCount={personCount}
            setPersonCount={setPersonCount}
          />
        )}
        {currentStep === "bills" && (
          <Bill
            className=""
            onClick={goToNextStep}
            currentStep={currentStep}
            billCount={billCount}
            setBillCount={setBillCount}
          />
        )}
        {currentStep === "names" && (
          <Names
            className=""
            onClick={goToNextStep}
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
