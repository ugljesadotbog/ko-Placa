import { IoArrowBack } from "react-icons/io5";

const BackButton = ({ steps, currentStep, setCurrentStep }) => {
  
  const goToPrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
    console.log(`currentIndex: ${currentIndex}`)
    console.log(`step: ${currentStep}`)
    console.log(`stepBefore: ${currentIndex-1}`)
    console.log(steps[0])
  };

  return (
    <div
      className="backButton absolute top-4 left-5 flex flex-row-reverse items-center gap-0.5 cursor-pointer"
      onClick={goToPrevious}
    >
      <p className="font-jockey text-sm">Nazad</p>
      <IoArrowBack />
    </div>
  );
};

export default BackButton;
