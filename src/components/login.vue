<template>
  <div :style="{height:clientHeight}" class="loginBack">
    <div class="loginForm">
      <p>后台管理系统</p>
      <div>账号</div>
      <input v-model="formData.mobile" type="text">
      <div>密码</div>
      <input v-model="formData.password" type="password">
      <Button @click="login" style="margin-left: 150px" size="default" type="primary">登录</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        clientHeight : '',
        formData:{
          mobile : '',
          password:''
        }
      }
    },
    mounted() {
      this.clientHeight = `${document.documentElement.clientHeight}`+'px';
    },
    methods:{
      login(){
        this.ajax.post('login',this.formData).then((res) => {
          if(res.code == 0){
            localStorage.setItem('token', res.data);
            this.$router.push({
              path: '/',
            })
          }else{
            this.$Message.info(res.message);
          }

          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  .loginBack{
    /*background: url('https://www.17sucai.com/preview/1145608/2019-06-21/loge/images/banner.jpg') no-repeat fixed center;*/
    /*background-size: 100%;*/
    width: 100%;
    position: relative;
  }
  .loginForm{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-65%);
    padding: 40px;
    width: 460px;
    height: 360px;
    background: white;
    box-shadow: 0px 0px 15px #545454;
    border-radius: 5px;
  }
  .loginForm p {
    padding-bottom: 28px;
    color: #0091e6;
    text-align: center;
    font-size: 22px;
  }
  .loginForm div{
    font-size: 1.0em;
    color: #333;
    font-weight: 400;
    padding-top:10px
  }
  .loginForm input{
    padding: 9px;
    width: 93.4%;
    font-size: 1.1em;
    margin: 3px 0px 25px;
    color: #666666;
    background: #f0f0f0;
    border: none;
    font-weight: 400;
    outline: none;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
    border-radius: 0.2em;
    -webkit-border-radius: 0.2em;
  }
</style>
