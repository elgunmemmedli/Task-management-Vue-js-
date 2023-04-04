<script setup>
import { mapGetters } from "vuex";
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";
import EditModal from './EditModal.vue'
import FilterInput from './FilterInput.vue'
</script>

<template>
 <div>
    <FilterInput/>
    <table class="table table-dark table-striped table-bordered">
    <thead>
      <tr class="text-center">
        <th scope="col">#</th>
        <th scope="col">Subject</th>
        <th scope="col">Tag</th>
        <th scope="col">Status (edit to change status)</th>
        <th scope="col">Options</th>
      </tr>
    </thead>
    <tbody v-if="getTasks.length > 0">
      <tr v-for="(item, index) in getTasks" :key="index" class="text-center">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item.subject }}</td>
        <td>
          <ul v-if="item.tags.length>0" class="tags mt-2 ps-0">
            <TransitionGroup name="slide-fade">
              <li
              @click="filterTag(item)"
                v-for="(item, index) in item.tags"
                :key="index"
                class="badge text-bg-secondary custom-tag"
              >
                {{ item }}
              </li>
            </TransitionGroup>
          </ul>
          <span v-else class="badge bg-info">
            No tag added. Edit to add
          </span>
        </td>
        <td>
          <span v-if="item.status == 0" class="badge bg-danger">
            Not Comploted 
          </span>
          <span v-else class="badge bg-success"> Comploted </span>
          
        </td>
        <td>
          <button @click="Edit(item, index)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning btn-sm mx-1">Edit</button>
          <button @click="Delete(index)" class="btn btn-danger btn-sm">
            Delete
          </button>
        </td>
      </tr>
    </tbody>

    <tbody v-else>
      <tr>
        <td colspan="5">
          <h3 class="text-center">
            Click to add no new tasks :
            <RouterLink to="/add" class="add-tasks">Add Tasks</RouterLink>
          </h3>
        </td>
      </tr>
    </tbody>
  </table>

  <EditModal :editTask="editTaskFind" />

 </div>
</template>

  

<script>
export default {
    data(){
       return {
        editTaskFind : {},
       }
    },
  computed: {
    ...mapGetters(["getTasks"]),
  },

  methods: {
    Delete(index) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
            this.$store.commit("deleteTasks", index);
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
     
    },

    Edit(item,index){
        item.index = index;
        this.editTaskFind = item;
    },

    filterTag(item){
      let newFilter = [];
      this.getTasks.forEach(element => {
       if(element.tags.includes(item)){
       newFilter.push(element);
       }
      });
      this.$store.commit('searchSubject', newFilter);
      this.emitter.emit('filter-tags', item);
    }
  },
};
</script>

<style>
.custom-tag {
  font-size: 16px;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
}

.add-tasks {
  text-decoration: none;
  font-size: 20px;
}
</style>