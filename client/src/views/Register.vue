<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <h1>Register</h1>
          <hr>
          <form @submit.prevent="onRegister">
            <div class="form-group">
                  <label for="">Name</label>
                  <input v-model="name" type="text" class="form-control">
              </div>
              <div class="form-group">
                  <label for="">Username</label>
                  <input v-model="username" type="text" class="form-control">
              </div>
              <div class="form-group">
                  <label for="">Email</label>
                  <input v-model="email" type="email" class="form-control">
              </div>
              <div class="form-group">
                  <label for="">Password</label>
                  <input v-model="password" type="password" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
          </form>
      </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    onRegister() {
      const payload = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("registerUser", payload);
    }
  }
};
</script>
