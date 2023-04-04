<script setup>
import { mapGetters } from "vuex";
</script>

<template>
  <div class="d-flex justify-content-between">
    <p> <kbd>Click</kbd> on any tag to sort the table by tag name. Filter mode will be active at this time </p>
    <input
      v-model="search_val"
      type="text"
      class="form-control custom-inp mb-3"
      placeholder="Search Subject"
    />
  </div>
</template>


<script>
export default {
  data() {
    return {
      search_val: "",
      new: [],
      old : []
    };
  },
  computed: {
    ...mapGetters(["getTasks"]),
  },

  mounted(){
    this.old = this.getTasks;
  },

  watch: {
        search_val(val){
            this.new = this.old.filter((item) => {
        return item.subject
          .toLocaleLowerCase()
          .includes(val.toLocaleLowerCase());
      });
      this.$store.commit('searchSubject', this.new);
        }
    },
};
</script>

<style scoped>
.custom-inp {
  width: 300px;
}
</style>