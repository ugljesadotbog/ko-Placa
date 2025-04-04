import Button from "../../components/Button";
import Input from "../../components/Input";

const Person = ({ className, onClick, billCount, setBillCount }) => {
  const handleInputChange = (event) => {
    setBillCount(event.target.value);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h2 className="text-xl font-jockey mb-4">koliki je račun</h2>
      <Input
        onChange={handleInputChange}
        value={billCount === "" ? "" : Number(billCount)}
        type={"number"}
        name={"bill"}
        placeholder={""}
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
