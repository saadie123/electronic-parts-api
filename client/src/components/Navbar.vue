<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">My App</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li v-if="token" class="nav-item">
        <router-link class="nav-link" to="/items">Items</router-link>
      </li>
      <li v-if="token" class="nav-item">
        <router-link class="nav-link" to="/categories">Categories</router-link>
      </li>
    </ul>
    <ul v-if="!token" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/register">Register</router-link>
      </li>
    </ul>
    <ul v-else class="navbar-nav ml-auto">
        <a class="nav-link" @click="onlogout" href="#">Logout</a>
    </ul>
    
  </div>
</nav>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    onlogout(event) {
      event.preventDefault();
      this.$store.dispatch("logoutUser");
    }
  }
};
</script>
