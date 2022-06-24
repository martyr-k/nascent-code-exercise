import axios from "axios";

export const getMagicNumber = (initialOne, initialTwo, firstName) => {
  const product = initialOne.charCodeAt() * initialTwo.charCodeAt();

  // 898 unique pokemon
  return ((product * firstName.length) % 898) + 1;
};

export const parsePokemonName = (name) => {
  const parsedName = name?.charAt(0).toUpperCase() + name?.slice(1);
  return parsedName ? parsedName?.split("-").join(" ") : null;
};

export const findPage = (list, limit, selectedPokemon) => {
  const pokemonIndex = list.findIndex((item) => item.name === selectedPokemon);

  return pokemonIndex === -1 ? 0 : Math.floor(pokemonIndex / limit);
};

export const handleSearchMethod = async ({
  method,
  pokemon,
  pokemonByColor,
  color,
  initials,
  firstName,
}) => {
  switch (method) {
    case "name":
      try {
        await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
        );
        return [{ pokemonName: pokemon.toLowerCase(), method }, null];
      } catch (error) {
        return [null, "invalid-name"];
      }

    case "color":
      return [{ pokemonName: pokemonByColor, method, color }, null];

    case "initials":
      const [initialOne, initialTwo] = initials.toLowerCase();
      if (initialOne.match(/[a-z]/i) && initialTwo.match(/[a-z]/i)) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${getMagicNumber(
              initialOne,
              initialTwo,
              firstName
            )}`
          );
          return [{ pokemonName: response.data.name, method, initials }, null];
        } catch (error) {
          return [null, error];
        }
      } else {
        return [null, "invalid-initials"];
      }

    default:
      return [null, "no-search"];
  }
};
