<script setup lang="ts">
import Card from "@/components/layout/card/card.vue";
import { useGetPokemon } from "@/features/pokemon";
import { isNone, isSome } from "ts-utility-kit/option";

const { pokemon, isLoading, error } = useGetPokemon();
</script>

<template>
    <main>
        <h1>Pokémon</h1>
        <p v-if="isLoading">読み込み中...</p>
        <p v-else-if="isSome(error)">エラー: {{ error.value.message }}</p>
        <p v-else-if="isNone(pokemon)">ポケモンが見つかりません。</p>
        <div v-else class="grid-box">
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

<style scoped>
h1 {
    text-align: center;
}

.grid-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px;
    justify-items: center;
}
</style>
