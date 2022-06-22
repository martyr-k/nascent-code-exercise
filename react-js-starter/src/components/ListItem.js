const ListItem = ({ name, handlePokemonClick, selectedPokemon }) => {
  const handleClick = () => {
    handlePokemonClick(name);
  };

  return (
    <span
      className={`capitalize bg-blue-50 p-2 rounded-md cursor-pointer ${
        selectedPokemon === name && "border-2 border-red-500"
      }`}
      onClick={handleClick}
    >
      {name}
    </span>
  );
};

export default ListItem;
