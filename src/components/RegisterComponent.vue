<template>
  <div class="loginWrap">
    <h1>Register Form</h1>
    <form action="#">
      <div class="userAvatar">

      </div>
      <div class="addAvatar" v-if="tempUser.img" :style="{'background-image':'url('+tempUser.img+')'}" @click="addImg = true"></div>
      <div class="addAvatar" v-else style="background-image: url(https://image.flaticon.com/icons/svg/236/236831.svg)" @click="addImg = true"></div>
      <input type="text" placeholder="IMG URL" style="margin-bottom: 20px" v-if="addImg" v-model="tempUser.img">
      <input type="text" placeholder="User name" v-model="tempUser.login">
      <span class="err" v-if="err1">This name is already taken</span>
      <span class="err" v-if="err2">Too short</span>
      <input type="password" placeholder="Password" v-model="tempUser.password">
      <span class="err" v-if="err3">Too short</span>
      <router-link to="/login">Log In</router-link>
      <button type="submit" @click="register($event)">Register</button>
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
      err1:false,
      err2:false,
      err3:false,
      addImg: false
    }
  },
  methods:{
    register: function (e) {
      e.preventDefault();
      if(this.tempUser.login.length < 4){
        this.err2 = true;
        return;
      }else{
        this.err2 = false;
      }
      for(let i in this.users){
        if(this.users[i].login == this.tempUser.login){
          this.err1 = true;
        }else{
          this.err1 = false;
          if(this.tempUser.password.length < 3){
            this.err3 = true;
          }else{
            this.err3 = false;
            this.user.login = this.tempUser.login;
            this.user.password = this.tempUser.password;
            if(!this.tempUser.img){
              this.user.img = 'https://image.flaticon.com/icons/svg/236/236831.svg'
              this.users.push({login:this.tempUser.login,password:this.tempUser.password,img:'https://image.flaticon.com/icons/svg/236/236831.svg'});
            }else{
              this.user.img = this.tempUser.img;
              this.users.push({login:this.tempUser.login,password:this.tempUser.password,img:this.tempUser.img});
            }
            this.$router.push('/');
            return;
          }
        }
      }
    }
  }
}
</script>
