const isVowel = (word) => {
  const vowels = "aeiou";
  return vowels.includes(word[0]);
};

const renderErrorText = (error, field, name) => {
  if (error && field) {
    return (
      <p className="text-xs text-red-500 mt-1">
        {name === "postalCode"
          ? `A valid ${field} is required.`
          : `A${isVowel(field) ? "n" : ""} ${field} is required.`}
      </p>
    );
  }
};

const TextInput = ({ className, name, error, errorLabel, type, ...rest }) => {
  return (
    <>
      <input
        className={`border ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-gray-500 focus:border-blue-400"
        } rounded p-2 w-full focus:outline-none focus:ring focus:border appearance-none${
          className ? ` ${className}` : ""
        }`}
        type={type}
        name={name}
        {...rest}
      />
      {renderErrorText(error, errorLabel, name)}
    </>
  );
};

export default TextInput;
