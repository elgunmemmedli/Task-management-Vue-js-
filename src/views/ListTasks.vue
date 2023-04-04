
<script setup>
import List from '../components/List.vue'
import FilterTags from '../components/FilterTags.vue';
</script>

<template>
    <div class="container">
       <div class="custom-form">
        <h1 class="text-center mb-5"> Tasks List </h1>
        <div class="row">
            <div class="col-10 offset-lg-1">
                <List/>
            </div>
        </div>
       </div>
       <FilterTags/>
    </div>
</template>


<style scoped>
.custom-form{
    padding: 30px;
    margin-top: 50px;
    background-color: #eee;
    box-shadow: 2px 2px 5px 0 rgb(219, 218, 218),  -2px -2px 5px 0 rgb(219, 218, 218);
}
</style>