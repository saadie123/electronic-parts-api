<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <h1>Login</h1>
          <hr>
          <form>
              <div class="form-group">
                  <label for="">Username</label>
                  <input v-model="username" type="text" class="form-control">
              </div>
              <div class="form-group">
                  <label for="">Password</label>
                  <input v-model="password" type="password" class="form-control">
              </div>
              <button type="submit" @click="onLogin($event)" class="btn btn-primary">Login</button>
          </form>
      </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onLogin(event) {
      event.preventDefault();
      this.$store.dispatch("loginUser", {
        userData: {
          username: this.username,
          password: this.password
        },
        router: this.$router
      });
    },
    socialLogin(provider) {}
  }
};
</script>
