<template>
  <div class="loginWrap">
    <h1>Login Form</h1>
    <form>
      <input type="text" placeholder="User name" v-model="tempUser.login">
      <span class="err" v-if="noSuchUser">no such user</span>
      <input type="password" placeholder="Password" :class="{'caps':caps}" v-model="tempUser.password" @keypress="capsLockDetection($event)">
      <span class="err" v-if="caps">Caps Lock is on</span>
      <router-link to="/register">Create Account</router-link>
      <span class="err" v-if="invalidPassword">Inwalid Password</span>
      <button @click="login($event)">Login</button>
    </form>
  </div>
</template>

<script>
import temp from '../controlers/temp'
import users from '../controlers/users'
import user from '../controlers/user'

export default {
  data:function () {
    return {
      tempUser: temp.user,
      users: users.users,
      user: user.user,
      caps: false,
      noSuchUser: false,
      invalidPassword: false,
    }
  },
  methods:{
    login:function (e) {
      e.preventDefault();
      console.log(this.tempUser.login);
      for(let i in this.users){
        if(this.users[i].login == this.tempUser.login){
          this.noSuchUser = false;
          if(this.users[i].password != this.tempUser.password){
            this.invalidPassword = true;
          }else{
            this.invalidPassword = false;
            this.user.login = this.users[i].login;
            this.user.password = this.users[i].password;
            this.user.img = this.users[i].img;
            this.$router.push('/');
          }
          break;
        }else{
          this.noSuchUser = true;
        }
      }
    },
    capsLockDetection:function (e) {
      console.log(e);
      var charCode = false;
      if (e.which) {
          charCode = e.which;
      } else if (e.keyCode) {
          charCode = e.keyCode;
      }

      var shifton = false;
      if (e.shiftKey) {
          shifton = e.shiftKey;
      } else if (e.modifiers) {
          shifton = !!(e.modifiers & 4);
      }

      if (charCode >= 97 && charCode <= 122 && shifton) {
        this.caps = true;
          return true;
      }

      if (charCode >= 65 && charCode <= 90 && !shifton) {
        this.caps = true;
          return true;
      }
      this.caps = false;
    }
  }
}
</script>
