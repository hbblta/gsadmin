<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      Admin : 'Admin'
    }
  },
  name: 'App',
}
</script>

<style>
  ::-webkit-scrollbar {display:none}

</style>
