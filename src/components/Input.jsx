const Input = ({ value, onChange, type, placeholder, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className=" my-2 p-0.75 bg-buttonbackground rounded-xl text-center w-32 text-black"
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default Input;
