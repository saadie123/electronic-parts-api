<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    navbar: Navbar
  }
};
</script>

<style>
</style>
