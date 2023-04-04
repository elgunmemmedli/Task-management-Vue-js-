<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#"><img class="custom-img" src="../assets/logo.png" alt=""></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 offset-4">
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" aria-current="page" to="/"> Task Lists </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" aria-current="page" to="/add">Add tasks</RouterLink>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
    </div>
</template>

<style scoped>
.custom-img{
    width: 200px;
}

.navbar{
    box-shadow: 0 3px 5px 0 gray;
}

.active{
  background-color: rgb(13,202,240);
  color: #fff !important;
}
</style>