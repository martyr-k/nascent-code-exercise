export const getMagicNumber = (initialOne, initialTwo, firstName) => {
  const product = initialOne.charCodeAt() * initialTwo.charCodeAt();

  // 898 unique pokemon
  return ((product * firstName.length) % 898) + 1;
};

export const parsePokemonName = (name) => {
  const parsedName = name.charAt(0).toUpperCase() + name.slice(1);
  return parsedName.split("-").join(" ");
};

export const findPage = (list, limit, selectedPokemon) => {
  const pokemonIndex = list.findIndex((item) => item.name === selectedPokemon);

  return pokemonIndex === -1 ? 0 : Math.floor(pokemonIndex / limit);
};
