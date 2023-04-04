<template>
    <div v-if="selectTag">
        <p class="text-center mt-3"> Tag filtering is on : {{ selectTag }} </p>
      <div class="text-center pb-5">
        <button @click="filterOff" class="btn btn-warning"> Filter off </button>
      </div>
    </div>
</template>


<script>
export default {

    data(){
        return {
            selectTag : ''
        }
    },

    methods : {
        filterOff(){
            this.$store.commit('checkStorage');
            this.selectTag = "";
        }
    },

    mounted() { 
    this.emitter.on("filter-tags", selectTag => {
     this.selectTag = selectTag;
    });
  }
}
</script>