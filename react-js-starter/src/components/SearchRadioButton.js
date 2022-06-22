const SearchRadioButton = ({
  title,
  description,
  id,
  name,
  value,
  searchMethod,
  handleChange,
  img,
  error,
}) => {
  return (
    <label
      className={`flex flex-col items-center justify-between font-light border p-3 rounded-lg shadow-sm cursor-pointer${
        error === "no-search" ? " border-red-500" : ""
      } hover:bg-blue-50${value === searchMethod ? " bg-blue-50" : ""}`}
    >
      <div className="text-center">
        <h2 className="mb-1 underline decoration-sky-500 decoration-wavy underline-offset-2">
          {title}
        </h2>
        <small>{description}</small>
      </div>
      <div className="text-center">
        <img className="w-full" src={img} />
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={value === searchMethod}
          onChange={handleChange}
        />
      </div>
    </label>
  );
};

export default SearchRadioButton;
