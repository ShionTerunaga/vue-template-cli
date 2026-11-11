<script setup lang="ts">
import { useGetPokemon } from "~/features/pokemon";
import { ja } from "~/shared/lang/ja";
import PokemonList from "./pokemon-list.vue";

const { pokemon, isLoading, error } = useGetPokemon();
</script>

<template>
    <PokemonList
        :title="ja.app.pokemonDynamicFetch.title"
        :pokemon="pokemon"
        :is-loading="isLoading"
        :error="error"
    />
</template>
