<template>
    <main :class="homeStyle.pageRoot">
        <section :class="homeStyle.container">
            <h1 :class="homeStyle.heading">{{ ja.app.home.title }}</h1>
            <p :class="homeStyle.description">
                {{ ja.app.home.description }}
            </p>
            <ul :class="homeStyle.navList">
                <li>
                    <NuxtLink
                        :class="homeStyle.navItemLink"
                        to="/pokemon-force-cache"
                    >
                        {{ ja.app.home.toPokemonForceCache }}
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        :class="homeStyle.navItemLink"
                        to="/pokemon-no-store"
                    >
                        {{ ja.app.home.toPokemonNoStore }}
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink :class="homeStyle.navItemLink" to="/pokemon">
                        {{ ja.app.home.toPokemonDynamicFetch }}
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ja } from "~/shared/lang/ja";
import homeStyle from "./home.css";
</script>
