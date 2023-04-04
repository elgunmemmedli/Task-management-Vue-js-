
<script setup>
import AddForm from '../components/AddForm.vue';
import OldTags from '../components/OldTags.vue';
</script>

<template>
    <div class="container">
       <div class="custom-form">
        <h1 class="text-center mb-5"> New Tasks </h1>
        <div class="row">
            <div class="col-6 offset-3">
                <AddForm/>
            </div>
        </div>
       </div>
       <div>
        <OldTags/>
       </div>
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