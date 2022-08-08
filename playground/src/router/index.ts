import {
  Router,
  RouteRecordRaw,
  createRouter,
  createWebHistory
} from "vue-router";
import { toRouteType, routesItems } from "./types";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: { isPublic: true, title: "首页" }
  },
  {
    path: "/debug",
    name: "debug",
    component: () => import("@/views/Debug.vue"),
    meta: { isPublic: true, title: "调试" }
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to: toRouteType, _from, next) => {
  to.matched.some((item: routesItems) => {
    if (!item.meta.title) {
      return "";
    }
    document.title = item.meta.title;
  });
  next();
});
export default router;
