<script setup lang="ts">
import { getPokemon, type PokemonView } from "~/features/pokemon";
import type { FetcherError } from "~/shared/error/fetcher";
import { ja } from "~/shared/lang/ja";
import { createNone, createSome, type Option } from "ts-utility-kit/option";
import { isErr } from "ts-utility-kit/result";
import PokemonList from "../pokemon/pokemon-list.vue";

const response = await getPokemon("no-store");
const pokemon: Option<Array<PokemonView>> = isErr(response)
    ? createNone()
    : response.value;
const error: Option<FetcherError> = isErr(response)
    ? createSome(response.err)
    : createNone();
</script>

<template>
    <PokemonList
        :title="ja.app.pokemonNoStore.title"
        :pokemon="pokemon"
        :is-loading="false"
        :error="error"
    />
</template>
