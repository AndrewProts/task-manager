import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


import MainComponent from './components/MainComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import temp from './controlers/temp'

Vue.use(VueRouter);
Vue.use(VueResource);

var router = new VueRouter({
  routes:[
    {path: '/', component: MainComponent},
    {path: '/register', component: RegisterComponent},
    {path: '/login', component: LoginComponent},
  ]
})

new Vue({
  el: '#app',
  router: router,
  data: {
    server: 'https://cors-anywhere.herokuapp.com/http://api.test.simplex.ink/app_dev.php/api/',
    temp: temp,
  },
  methods:{
    getUsers: function () {
      // this.$http.get(this.server+'secret_page').then(function (response) {
      //   console.log(response);
      //   this.temp.message = response.body.message;
      // },function (err) {
      //   console.log(err);
      //   this.temp.message = err.body.message;
      // });
    }
  },
  created: function () {
    this.getUsers();
  }
})
