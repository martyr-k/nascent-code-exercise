const getRandNumber = () => Math.round(10 * Math.random() + 1);

export const getMagicNumber = (initialOne, initialTwo) => {
  const product = initialOne.charCodeAt() * initialTwo.charCodeAt();

  // 898 unique pokemon
  let code = (product * getRandNumber()) % 898;

  while (code === 0) {
    code = (product * getRandNumber()) % 898;
  }

  return code;
};

export const parsePokemonName = (name) => {
  const parsedName = name.charAt(0).toUpperCase() + name.slice(1);
  return parsedName.split("-").join(" ");
};

export const findPage = (list, limit, selectedPokemon) => {
  const pokemonIndex = list.findIndex((item) => item.name === selectedPokemon);
  console.log(pokemonIndex);

  return pokemonIndex === -1 ? 0 : Math.floor(pokemonIndex / limit);
};
