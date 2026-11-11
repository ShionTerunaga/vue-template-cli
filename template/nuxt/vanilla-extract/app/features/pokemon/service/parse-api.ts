import type { FetcherError } from "~/shared/error/fetcher";
import { createSome, type Option } from "ts-utility-kit/option";
import { createOk, type Result } from "ts-utility-kit/result";
import type { PokemonApiResponse } from "../model/model-res";
import type { PokemonView } from "../model/model-view";

export function parsePokemonApi(
    api: PokemonApiResponse
): Result<Option<Array<PokemonView>>, FetcherError> {
    const pokemon = api.results.flatMap((item) => {
        const id = item.url.match(/\/pokemon\/(\d+)\/?$/)?.[1];

        if (id === undefined) {
            return [];
        }

        return [
            {
                id: Number(id),
                name: item.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            }
        ];
    });

    return createOk(createSome(pokemon));
}
