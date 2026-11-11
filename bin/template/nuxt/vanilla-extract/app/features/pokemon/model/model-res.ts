import * as v from "valibot";

export const pokemonApiScheme = v.object({
    results: v.array(
        v.object({
            name: v.string(),
            url: v.string()
        })
    )
});

export type PokemonApiResponse = v.InferOutput<typeof pokemonApiScheme>;
