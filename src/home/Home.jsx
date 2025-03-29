import { useState } from "react";
import Button from "../components/Button";

const Main = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <main
      className={`h-screen flex items-center justify-center flex-col ${
        isClicked ? "hidden" : ""
      }`}
    >
      <h1 className="mb-12 text-center font-jockey text-6xl">
        Ko <br></br>Plaća?
      </h1>
      <Button
        buttonText={"START"}
        className={`${isClicked ? "hidden" : ""}`}
        onClick={handleClick}
      />
    </main>
  );
};

export default Main;
