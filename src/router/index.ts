import { createRouter, createWebHistory } from "vue-router";
import TeamList from "../views/TeamsList.vue";
import TeamForm from "../views/TeamCreate.vue";
import TeamDetail from "../views/TeamDetail.vue";

const routes = [
    { path: "/teams", component: TeamList },
    { path: "/teams/create", component: TeamForm },
    { path: "/teams/:id/edit", component: TeamForm },
    { path: "/teams/:id", component: TeamDetail },
    { path: "/", redirect: "/teams" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
