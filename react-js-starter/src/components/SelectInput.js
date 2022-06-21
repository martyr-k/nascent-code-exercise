const SelectInput = ({ children, ...rest }) => {
  return (
    <select
      className="border border-gray-500 rounded p-2 w-full focus:outline-none focus:ring focus:border focus:border-blue-400 appearance-none bg-white cursor-pointer"
      {...rest}
    >
      {children}
    </select>
  );
};

export default SelectInput;
