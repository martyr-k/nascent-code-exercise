const isVowel = (word) => {
  const vowels = "aeiou";
  return vowels.includes(word[0]);
};

const renderErrorText = (error, field, name) => {
  if (typeof error === "string") {
    return <p className="text-xs text-red-500 mt-2">{error}</p>;
  }
  if (error && field) {
    return (
      <p className="text-xs text-red-500 mt-2">
        {name === "postalCode" ||
        name === "email" ||
        name === "clientPostalCode"
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
        } rounded p-1 w-full focus:outline-none focus:ring focus:border appearance-none ${
          className ? className : ""
        }`}
        type={type}
        onKeyPress={(event) => {
          if (type === "number") {
            if (!/[0-9.]/.test(event.key)) {
              event.preventDefault();
            }
          }
        }}
        // https://stackoverflow.com/questions/43687964/only-numbers-input-number-in-react
        name={name}
        {...rest}
      />
      {renderErrorText(error, errorLabel, name)}
    </>
  );
};

export default TextInput;
