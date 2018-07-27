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
                  <input v-model="password" type="text" class="form-control">
              </div>
              <button type="submit" @click="onLogin($event)" class="btn btn-primary">Login</button>
          </form>
          <br>
          <button class="btn btn-danger btn-block" @click="socialLogin('google')">Login with Google</button>
          <button class="btn btn-primary btn-block">Login with Facebook</button>
          <button class="btn btn-info btn-block ">Login with Twitter</button>
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
    socialLogin(provider) {
      
    }
  }
};
</script>
