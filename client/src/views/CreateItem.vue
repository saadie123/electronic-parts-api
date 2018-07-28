<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Create Item</h1>
            <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="">Name</label>
                    <input v-model="name" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">Description</label>
                    <input v-model="description" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">Quantity</label>
                    <input v-model="quantity" type="number" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">Category</label>
                    <select v-model="category" class="form-control">
                        <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Location</label>
                     <select v-model="location" class="form-control">
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="China">China</option>
                        <option value="Japan">Japan</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Footprint</label>
                    <select v-model="footprint" class="form-control">
                        <option value="footprint 1">Footprint 1</option>
                        <option value="footprint 2">Footprint 2</option>
                        <option value="footprint 3">Footprint 3</option>
                        <option value="footprint 4">Footprint 4</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Attachments</label>
                    <input type="file" class="form-control" multiple @change="onFileSelected">
                </div>
                <button type="submit" class="btn btn-primary">Create Item</button>
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
      quantity: 0,
      category: "",
      location: "",
      footprint: "",
      attachments: []
    };
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    }
  },
  methods: {
    onSubmit() {
      const fd = new FormData();
      fd.append("name", this.name);
      fd.append("description", this.description);
      fd.append("quantity", this.quantity);
      fd.append("category", this.category);
      fd.append("location", this.location);
      fd.append("footprint", this.footprint);
      let totalFiles = this.attachments.length;
      for (let i = 0; i < totalFiles; i++) {
        fd.append("attachments", this.attachments[i], this.attachments[i].name);
      }
      this.$store.dispatch("createItem", fd);
    },
    onFileSelected(event) {
      this.attachments = event.target.files;
    }
  },
  created() {
    this.$store.dispatch("fetchCategories");
  }
};
</script>
