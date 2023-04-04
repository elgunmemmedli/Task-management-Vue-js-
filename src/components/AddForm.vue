<template>
  <div>
    <form action="">
      <input
        type="text"
        v-model="subject"
        @blur="v$.subject.$touch()"
        placeholder="Subject"
        class="form-control"
      />
      <div class="input-errors">
        <span v-if="v$.subject.$error" class="badge bg-danger">
          {{ v$.subject.required.$message }}
        </span>
      </div>
      <input
        type="text"
        @keyup="keyHandler"
        @blur="blurHandler"
        v-model="tag"
        placeholder="Add tag"
        class="form-control mt-3"
      />
      <small
        :class="{
          badge: true,
          'bg-info': true,
          info: true,
          'd-none': tags.length > 0,
        }"
      >
        To add a new tag, separate it with a comma, click outside the entry, or
        click enter
      </small>
      <ul class="tags mt-2 ps-0">
        <TransitionGroup name="slide-fade">
          <li
            v-for="(item, index) in tags"
            :key="index"
            class="badge text-bg-secondary custom-tag"
          >
            {{ item }}
            <button type="button" @click="Delete(index)" class="custom-remove">
              X
            </button>
          </li>
        </TransitionGroup>
      </ul>

      <div class="text-center">
        <button type="button" @click="send" class="btn btn-success my-3">
          Add Tasks
        </button>
      </div>
    </form>

    <Transition name="bounce">
      <div :class="{ info: true, 'mt-5': true, 'd-none': tags.length === 0 }">
        <span> İnfo: </span>
        <small class="badge bg-info info">
          To add a new tag, separate it with a comma, click outside the entry,
          or click enter
        </small>
      </div>
    </Transition>
  </div>
</template>


<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Swal from "sweetalert2";
export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      subject: "",
      tag: "",
      tags: [],
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

          if(!this.tags.includes(this.tag.substr(0, this.tag.length - 1))){
            this.tags.push(this.tag.substr(0, this.tag.length - 1));
          this.tag = "";
      }else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "İnformation is available",
        });
      }
        }
      });
      //   enter event
      if (e.key === "Enter" || e.keyCode === 13) {
        if (this.tag != "" && this.tag != " ") {
          if(!this.tags.includes(this.tag)){
        this.tags.push(this.tag);
        this.tag = "";
      }else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "İnformation is available",
        });
      }
        }
      }
    },

    // blur event
    blurHandler() {
      if (this.tag != "" && this.tag != " ") {
      if(!this.tags.includes(this.tag)){
        this.tags.push(this.tag);
        this.tag = "";
      }else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "İnformation is available",
        });
      }
      }
    },

    // tag delete
    Delete(ind) {
      this.tags.splice(ind, 1);
    },

    // tag add event
    async send() {
      // new tasks
      const result = await this.v$.$validate();
      if (result) {
        let tasks = {
          subject: this.subject,
          tags: this.tags,
          status: 0,
        };
        this.$store.commit("setTasks", tasks);
        this.subject = "";
        this.tags = [];
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "İnformation sent",
        });
        this.$router.replace('/')
      }
    },
  },
  mounted() { 
    this.emitter.on("oddTags-add", oldTags => {
      if(!this.tags.includes(oldTags)){
        this.tags.push(oldTags);
      }else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "İnformation is available",
        });
      }
    });
  }
};
</script>


<style scoped>
.info {
  white-space: break-spaces;
}
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