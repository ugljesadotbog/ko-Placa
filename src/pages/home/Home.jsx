import Button from "../../components/Button";

const Home = ({ buttonText, className, onClick, currentStep, goToPrevious }) => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="mb-12 text-center font-jockey text-6xl tracking-wider">
        Ko <br></br>Plaća?
      </h1>
      <Button
        buttonText={buttonText}
        className={`px-6 py-2`}
        onClick={onClick}
      />
    </div>
  );
};

export default Home;
