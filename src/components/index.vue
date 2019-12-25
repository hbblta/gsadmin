<template>
  <div>
    <div style="float: left">
      <Menu :style="{height:clientHeight}" active-name="1">
        <MenuGroup title="内容管理">
          <MenuItem to="/articleList" name="1">
            <Icon type="md-chatbubbles" />
            文章列表
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="文章管理">
          <MenuItem to="/" name="3">
            <Icon type="md-document" />
            新建文章
          </MenuItem>
        </MenuGroup>
      </Menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      clientHeight : '',

    }
  },
  methods:{
    goUrl(url){
      console.log(1);
      this.$router.push({path: url})
    },
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`+'px';
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
