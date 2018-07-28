import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login";
import Register from "./views/Register";
import Items from "./views/Items";
import CreateItem from "./views/CreateItem";
import Categories from "./views/Categories";
import CreateCategory from "./views/CreateCategory";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/items",
      name: "items",
      component: Items
    },
    {
      path: "/items/create",
      name: "create-item",
      component: CreateItem
    },
    {
      path: "/categories",
      name: "categories",
      component: Categories
    },
    {
      path: "/categories/create",
      name: "create-category",
      component: CreateCategory
    }
  ]
});
