import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const request = new axios.create({
  baseURL: "http://localhost:8000/api"
});
export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload;
    }
  },
  actions: {
    loginUser: ({ commit }, payload) => {
      request.post("/auth/login", payload.userData).then(response => {
        commit("setToken", response.data.token);
        payload.router.push({ path: "/" });
      });
    },
    logoutUser: ({ commit }, payload) => {
      commit("setToken", payload);
    }
  },
  getters: {
    getToken: state => {
      return state.token;
    }
  }
});
