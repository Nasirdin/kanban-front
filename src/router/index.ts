import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import Reg from "@/views/Reg.vue";
import Board from "@/views/Board.vue";
import Welcome from "@/views/Welcome.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Board },
  { path: "/welcome", component: Welcome },
  { path: "/signin", component: Login },
  { path: "/signup", component: Reg },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
