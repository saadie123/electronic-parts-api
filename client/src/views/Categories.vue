<template>
    <div class="row justify-content-center">
        <div class="col-xs-12">
            <h1>Categories</h1>
            <router-link class="btn btn-primary" to='/categories/create'>Create Category</router-link>
            <br><br>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Sub Categories</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in categories" :key="category._id">
                        <td>{{category.name}}</td>
                        <td>{{category.description}}</td>
                        <td>{{category.subCategories.length}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    }
  },
  created() {
    this.$store.dispatch("fetchCategories");
  }
};
</script>
