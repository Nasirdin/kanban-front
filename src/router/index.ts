import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import Reg from "@/views/Reg.vue";
import Board from "@/views/Board.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Board },
  { path: "/signin", component: Login },
  { path: "/signup", component: Reg }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
