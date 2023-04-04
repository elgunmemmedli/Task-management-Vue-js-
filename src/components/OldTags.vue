<script setup>
import { mapGetters } from "vuex";
</script>

<template>
    <div>
        <p v-if="old_tasks.length>0" class="text-center mt-3"> Click to choose from pre-created tags: </p>
        <ul class="tags mt-2 ps-0">
        <TransitionGroup name="slide-fade">
          <li
          @click="add(item)"
            v-for="(item, index) in old_tasks"
            :key="index"
            class="badge text-bg-secondary custom-tag"
          >
            {{ item }}
          </li>
        </TransitionGroup>
      </ul>
    </div>
</template>


<script>
export default {
    data(){
        return {
            old_tasks : [],
        }
    },
    computed : {
        ...mapGetters(['getTasks'])
    },

    methods : {
        add(item){
            this.emitter.emit('oddTags-add', item);
        }
    },

    mounted(){
        this.getTasks.forEach(item=>{
            item.tags.forEach(item=>{
               if(!this.old_tasks.includes(item)){
                this.old_tasks.push(item);
               }
            });
        });
    }
}
</script>

<style scoped>

.custom-tag{
    font-size: 15px;
    padding: 5px;
    cursor: pointer;
}
</style>