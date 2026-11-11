<script setup lang="ts">
import { Card, Error } from "~/components/layout";
import type { PokemonView } from "~/features/pokemon";
import type { FetcherError } from "~/shared/error/fetcher";
import { isNone, isSome, type Option } from "ts-utility-kit/option";
import pokemonStyle from "./pokemon.css";

defineProps<{
    title: string;
    pokemon: Option<Array<PokemonView>>;
    isLoading: boolean;
    error: Option<FetcherError>;
}>();
</script>

<template>
    <main>
        <h1 :class="pokemonStyle.title">{{ title }}</h1>
        <p v-if="isLoading">読み込み中...</p>
        <Error v-else-if="isSome(error)" :error-message="error.value.message" />
        <Error
            v-else-if="isNone(pokemon)"
            error-message="ポケモンが見つかりません。"
        />
        <div v-else :class="pokemonStyle.grid">
            <Card
                v-for="item in pokemon.value"
                :key="item.id"
                :title="item.name"
                :src="item.image"
                :alt="item.name"
                :boxHeight="250"
                :srcWidth="150"
                :srcHeight="150"
            />
        </div>
    </main>
</template>
