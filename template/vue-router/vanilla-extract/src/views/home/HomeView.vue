<script setup lang="ts">
import { ja } from "../../shared/lang/ja";
import homeViewStyle from "./HomeView.css";
</script>

<template>
    <main :class="homeViewStyle.pageRoot">
        <section :class="homeViewStyle.container">
            <h1 :class="homeViewStyle.heading">{{ ja.app.home.title }}</h1>
            <p :class="homeViewStyle.description">
                {{ ja.app.home.description }}
            </p>
            <ul :class="homeViewStyle.navList">
                <li>
                    <RouterLink
                        :class="homeViewStyle.navItemLink"
                        to="/pokemon"
                    >
                        {{ ja.app.home.toPokemonDynamicFetch }}
                    </RouterLink>
                </li>
            </ul>
        </section>
    </main>
</template>
