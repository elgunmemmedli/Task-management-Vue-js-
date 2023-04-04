<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form action="">
            <input
              type="text"
              v-model="editTask.subject"
              @blur="v$.subject.$touch()"
              placeholder="Subject"
              class="form-control"
            />
            <div class="input-errors">
              <span v-if="editTask.subject == ''" class="badge bg-danger">
                {{ v$.subject.required.$message }}
              </span>
            </div>

            <select
              class="form-select mt-3"
              aria-label="Default select example"
              @change="StatusChange"
            >
              <option disabled>Status Change</option>
              <option :selected="editTask.status" value="0">
                Not Comploted
              </option>
              <option :selected="editTask.status" value="1">Comploted</option>
            </select>

            <input
              type="text"
              @keyup="keyHandler"
              @blur="blurHandler"
              v-model="tag"
              placeholder="Add tag"
              class="form-control mt-3"
            />

            <ul class="tags mt-2 ps-0">
              <TransitionGroup name="slide-fade">
                <li
                  v-for="(item, index) in editTask.tags"
                  :key="index"
                  class="badge text-bg-secondary custom-tag"
                >
                  {{ item }}
                  <button
                    type="button"
                    @click="Delete(index)"
                    class="custom-remove"
                  >
                    X
                  </button>
                </li>
              </TransitionGroup>
            </ul>

            <div class="text-center">
              <button type="button" data-bs-dismiss="modal" @click="send" class="btn btn-success my-3">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: ["editTask"],

  data() {
    return {
      subject: this.editTask.subject,
      tag: "",
    };
  },

  validations() {
    return {
      subject: { required },
    };
  },

  methods: {
    // comma event
    keyHandler(e) {
      let stringTag = this.tag.split("");
      stringTag.forEach((element) => {
        if (element == "," && this.tag !== ",") {
          this.editTask.tags.push(this.tag.substr(0, this.tag.length - 1));
          this.tag = "";
        }
      });
      //   enter event
      if (e.key === "Enter" || e.keyCode === 13) {
        if (this.tag != "" && this.tag != " ") {
          this.editTask.tags.push(this.tag);
          this.tag = "";
        }
      }
    },

    // blur event
    blurHandler() {
      if (this.tag != "" && this.tag != " ") {
        this.editTask.tags.push(this.tag);
        this.tag = "";
      }
    },

    // tag delete
    Delete(ind) {
      this.editTask.tags.splice(ind, 1);
    },

    StatusChange(e){
        this.editTask.status = e.target.value;
    },

    // tag add event
    async send() {
        this.$store.commit("editTasks", this.editTask);
      // new tasks
    //   const result = await this.v$.$validate();
    //   if (result) {
    //     this.$store.commit("editTasks", this.editTask);
    //   }
    },
  },
};
</script>


<style scoped>
.custom-tag {
  font-size: 16px;
  padding: 10px 15px;
  margin: 5px;
}

.custom-tag:first-child {
  margin-left: 0;
}

.custom-remove {
  border: none;
  outline: none;
  margin-left: 10px;
  font-weight: bold;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>