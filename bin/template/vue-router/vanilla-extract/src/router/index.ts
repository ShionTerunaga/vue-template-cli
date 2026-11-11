import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import HarryPotterView from "../views/harry-potter-character/harry-potter-characters.vue";
import PokemonView from "../views/pokemon/pokemon.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pokemon",
      name: "pokemon",
      component: PokemonView,
    },
    {
      path: "/harry-potter",
      name: "harry-potter",
      component: HarryPotterView,
    },
  ],
});

export default router;
