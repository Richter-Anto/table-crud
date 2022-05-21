
import Vue from "vue";
import VueRouter from "vue-router";
import AxiosTable from "../components/AxiosTable.vue";
import CreatePost from "../components/CreatePost.vue";
import EditPost from "../components/EditPost.vue";

Vue.use(VueRouter)

let routes = [
  {
    path: "/",
    component: AxiosTable,
  },
  {
    path: "/create-post",
    component: CreatePost,
  },
  {
    path: "/edit-post/:id",
    component: EditPost,
  },
];

let router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,routes
});

export default router;
