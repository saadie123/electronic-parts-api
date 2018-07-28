<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Create Category</h1>
            <form @submit.prevent="onCreateCategory">
                <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" v-model="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">Description</label>
                    <input type="text" v-model="description" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">Parent Category</label>
                    <select v-model="parentCategory" class="form-control">
                        <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Create Category</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      parentCategory: ""
    };
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    }
  },
  methods: {
    onCreateCategory() {
      const payload = {
        name: this.name,
        description: this.description,
        parentCategory: this.parentCategory
      };
      this.$store.dispatch("createCategory", payload);
    }
  },
  created() {
    this.$store.dispatch("fetchCategories");
  }
};
</script>
