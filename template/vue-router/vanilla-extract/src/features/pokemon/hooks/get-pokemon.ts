import type { FetcherError } from "@/shared/error/fetcher";
import { createNone, createSome, type Option } from "ts-utility-kit/option";
import { isErr } from "ts-utility-kit/result";
import { onMounted, ref } from "vue";
import type { PokemonView } from "../model/model-view";
import { getPokemon } from "../service/get-pokemon";

export function useGetPokemon() {
  const pokemon = ref<Option<Array<PokemonView>>>(createNone());
  const isLoading = ref(true);
  const error = ref<Option<FetcherError>>(createNone());

  onMounted(async () => {
    const response = await getPokemon();

    if (isErr(response)) {
      error.value = createSome(response.err);
    } else {
      pokemon.value = response.value;
    }

    isLoading.value = false;
  });

  return { pokemon, isLoading, error };
}
