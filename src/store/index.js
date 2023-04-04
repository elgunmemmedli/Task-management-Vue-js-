import { createStore } from 'vuex';

const store = createStore({
  state : {
    tasks : []
  },
  getters : {
    getTasks(state){
      return state.tasks
    }
  },
  mutations : {
    setTasks(state, payload){
        state.tasks.push(payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTasks(state, payload){
      state.tasks.splice(payload,1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTasks(state, payload){
      state.tasks.splice(payload.index,1,payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    searchSubject(state,payload){
      state.tasks = payload;
    },
    filterTags(state, payload){
      state.tasks = [];
      state.tasks.push(payload);
    },
    checkStorage(state){
      let storage = localStorage.getItem('tasks');
      if(storage){
        state.tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    }
  },
  actions : {}
  });

  export default store;