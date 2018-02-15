<template>
  <div class="wrap">
      <div class="modalBlur" v-if="modal">
        <div class="modal">
          <div class="modal__close" @click="modal=false"><i class="fa fa-times" aria-hidden="true"></i></div>
          <input type="text" placeholder="Title" v-model="newTitle">
          <textarea placeholder="Text" v-model="newText"></textarea>
          <button type="submit" @click="addTask()">Add</button>
        </div>
      </div>
      <header>
        <div class="profile">
          <div class="profile__avatar" :style="{'background-image': 'url('+user.img+')'}"></div>
          <span class="profile__name">{{user.login}}</span>
        </div>
        <div class="menu">
          <div class="add" @click="modal=true">Add Task</div>
          <div class="logout" @click="logout()">Logout</div>
        </div>

      </header>
      <div class="tasks">
        <div class="task" v-for="(task,index) in tasks">
          <div class="task__close" @click="deleteTask(index)"><i class="fa fa-times" aria-hidden="true"></i></div>
          <div class="task__title">{{task.title}}</div>
          <div class="task__text">{{task.text}}</div>
        </div>
      </div>
      <footer>{{temp.message}}</footer>
    </div>
</template>

<script>
import users from '../controlers/users'
import user from '../controlers/user'
import tasks from '../controlers/tasks'
import temp from '../controlers/temp'

export default {
  data: function () {
    return {
      users: users.users,
      user: user.user,
      temp: temp,
      tasks: '',
      dataTasks: tasks,
      modal: false,
      newTitle: '',
      newText: '',
    }
  },
  methods:{
    addTask:function () {
      this.tasks.push({
        title: this.newTitle,
        text: this.newText
      });
      this.newText = '';
      this.newTitle = '';
      this.modal = false;
    },
    logout:function () {
      this.user.login = '';
      this.user.password = '';
      this.user.img = '';
      this.$router.push('/login');
    },
    deleteTask(e){
      this.tasks.splice(e,1);
    }
  },
  created: function () {
    if(!this.user.login){
      this.$router.push('/login');
    }
    this.tasks = this.dataTasks[this.user.login]
    this.dataTasks = '';
  }
}
</script>
