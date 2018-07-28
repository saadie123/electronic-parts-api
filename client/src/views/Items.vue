<template>
    <div class="row justify-content-center">
        <div class="col-xs-12">
            <h1>Items</h1>
            <router-link class="btn btn-primary" to='/items/create'>Create Item</router-link>
            <br><br>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Footprint</th>
                        <th>Attachments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item._id">
                        <td>{{item.name}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.category.name}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.footprint}}</td>
                        <td>
                            <ul v-if="item.attachments">
                                <li v-for="file in item.attachments" :key="file._id">
                                    <a :href="file.fileURL">{{ file.fileName }}</a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.getters.getItems;
    }
  },
  created() {
    this.$store.dispatch("fetchItems");
  }
};
</script>
