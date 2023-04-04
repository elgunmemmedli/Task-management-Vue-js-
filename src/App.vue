<script setup>
import Navbar from './components/Navbar.vue';
import {RouterView} from 'vue-router'
</script>

<template>
  <div>
    <Navbar/>
    <RouterView/>
  </div>
</template>


<script>
export default {
  mounted(){
    this.$store.commit('checkStorage');
  }
}
</script>
