import { hasParseFetcher } from "@/services/fetcher-get";
import { appConfig } from "@/shared/config/config";
import type { FetcherError } from "@/shared/error/fetcher";
import type { Option } from "ts-utility-kit/option";
import type { Result } from "ts-utility-kit/result";
import { pokemonApiScheme } from "../model/model-res";
import type { PokemonView } from "../model/model-view";
import { parsePokemonApi } from "./parse-api";

export async function getPokemon(): Promise<
    Result<Option<Array<PokemonView>>, FetcherError>
> {
    return await hasParseFetcher({
        url: appConfig.pokemonApiUrl,
        scheme: pokemonApiScheme,
        parse: parsePokemonApi
    });
}
