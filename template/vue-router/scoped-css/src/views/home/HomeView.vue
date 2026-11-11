<script setup lang="ts">
import { ja } from "../../shared/lang/ja";
</script>

<template>
    <main class="page-root">
        <section class="container">
            <h1 class="heading">{{ ja.app.home.title }}</h1>
            <p class="description">{{ ja.app.home.description }}</p>
            <ul class="nav-list">
                <li>
                    <RouterLink class="nav-item-link" to="/pokemon">
                        {{ ja.app.home.toPokemonDynamicFetch }}
                    </RouterLink>
                </li>
            </ul>
        </section>
    </main>
</template>

<style scoped>
.page-root {
    min-height: 100dvh;
    padding: 72px 24px;
    background: radial-gradient(
        circle at 10% 20%,
        #dbeafe 0%,
        #eff6ff 45%,
        #f8fafc 100%
    );
}

.container {
    max-width: 920px;
    margin: 0 auto;
    padding: 32px;
    border: 1px solid #dbe1ea;
    border-radius: 24px;
    background: rgb(255 255 255 / 88%);
    box-shadow: 0 22px 50px rgb(15 23 42 / 12%);
}

.heading {
    margin-bottom: 16px;
    letter-spacing: -0.03em;
}

.description {
    margin-bottom: 24px;
    color: #334155;
    line-height: 1.6;
}

.nav-list {
    display: grid;
    gap: 12px;
    padding: 0;
    list-style: none;
}

.nav-item-link {
    display: block;
    padding: 14px 16px;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    color: #0f172a;
    font-weight: 500;
    text-decoration: none;
    background: #f8fafc;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
}

.nav-item-link:hover {
    border-color: #60a5fa;
    box-shadow: 0 10px 24px rgb(59 130 246 / 16%);
    transform: translateY(-2px);
}
</style>
