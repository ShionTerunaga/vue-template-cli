import { optionConversion } from "ts-utility-kit/option";

export const appConfig = {
  apiKey: optionConversion(import.meta.env.VITE_API_KEY),
  pokemonApiUrl: optionConversion(import.meta.env.VITE_POKEMON_API_URL),
};
