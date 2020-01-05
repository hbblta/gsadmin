<template>
  <div>
    <div class='headerClass'>
      <div style="margin-left: 30px;">拱墅后台</div>
      <div style="margin-right: 30px;">Admin</div>
    </div>
    <div style="display: flex">
      <div>
        <Menu theme="dark" :style="{height:clientHeight}" active-name="1">
          <Menu theme="dark">
            <Submenu :name="item.id" v-for="(item,index) in list" :key="index">
              <template v-if="item.id != 999" slot="title">
                {{item.name}}
              </template>
              <MenuItem @click.native="goUrl('/articleList',item.id)"   :name="item.id" v-if="item.children.length == [] && item.id != 999">管理文章</MenuItem>
<!--              <MenuItem @click.native="goUrl('/newArticle')"   :name="item.id" v-if="item.id == 999">新建</MenuItem>-->
              <MenuItem @click.native="goUrl('/articleList',items.id)"  :name="items.id" v-for="(items,indexs) in item.children" :key="indexs">{{items.name}}</MenuItem>
            </Submenu>
            <MenuGroup title="内容管理">
              <MenuItem @click.native="goUrl('/newArticle')"  name="999">
                <Icon   type="md-document" />
                新建文章
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Menu>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      clientHeight : '',
      list : [],
      lists : {
        name : '新建文章',
        id : 999,
        children :[]
      },
    }
  },

  methods:{
    goUrl(url,id){
      this.$router.replace({
        path: url,
        query:{id:id}
      });
    },
  },
  mounted() {
    this.goUrl('/articleList',1)
    this.ajax.get('categories/all').then((res) => {
      this.list = res
    })
    if(!localStorage.getItem('token')){
      this.goUrl('/login')
    }
    this.clientHeight = `${document.documentElement.clientHeight - 62}`+'px';
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headerClass{
    width: 100%;
    height: 60px;
    background: #515a6e;
    color: white;
    display: flex;
    border-bottom: 1px solid #dddddd;
    justify-content: space-between;
    align-items: center;
  }
</style>
