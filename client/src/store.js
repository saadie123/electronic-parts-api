import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import axios from "axios";
Vue.use(Vuex);
// axios.defaults.baseURL = "http://localhost:8000/api";

export default new Vuex.Store({
  state: {
    token: null,
    categories: [],
    items: []
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload;
    },
    setCategories: (state, payload) => {
      state.categories = payload;
    },
    setItems: (state, payload) => {
      state.items = payload;
    }
  },
  actions: {
    loginUser: ({ commit }, payload) => {
      axios.post("/auth/login", payload.userData).then(response => {
        commit("setToken", response.data.token);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        payload.router.push({ path: "/" });
      });
    },
    logoutUser: ({ commit }) => {
      commit("setToken", null);
      router.push("/login");
    },
    registerUser: ({ commit }, payload) => {
      axios.post("/auth/register", payload).then(response => {
        router.push("/login");
      });
    },
    fetchCategories: ({ commit }) => {
      axios.get("/categories").then(response => {
        commit("setCategories", response.data.rootCategory);
      });
    },
    createCategory: ({ commit }, payload) => {
      axios.post("/categories", payload).then(response => {
        router.push("/categories");
      });
    },
    fetchItems: ({ commit }) => {
      axios.get("/items").then(response => {
        commit("setItems", response.data);
      });
    },
    createItem: ({ commit }, payload) => {
      axios.post("/items", payload).then(response => {
        router.push("/items");
      });
    }
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getCategories: state => {
      return state.categories;
    },
    getItems: state => {
      return state.items;
    }
  }
});
