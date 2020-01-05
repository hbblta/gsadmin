<template>
    <div>
<!--      <Select v-model="model1" @on-change="nowTitle" style="width:250px;padding: 20px" >-->
<!--        <Option   v-for="item in SelectList" :value="item.id" v-if="item.id != '1'  && item.id != '3'" :key="item.id">{{ item.name }}</Option>-->
<!--      </Select>-->
<!--      <Select  v-model="model1Two" @on-change="nowTitleTwo" style="width:250px;padding: 20px">-->
<!--        <Option  v-for="(item,index) in SelectListTwo" :value="index" :key="item.id">{{ item.name}}</Option>-->
<!--      </Select>-->
      <Table  border :columns="columns12" :height="clientHeight" :data="msgList">
        <template slot-scope="{ row }"  slot="title">
          <strong>{{ row.title }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.id)">修改</Button>
          <Button v-if="id != 1 && id != 3" type="error" size="small" style="margin-right: 5px" @click="del(row.id)">删除</Button>
        </template>
      </Table>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            SelectList: [],
            SelectListTwo : [],
            model1: '',
            model1Two:'',
            clientHeight : '',
            columns12: [
              {
                title: '标题',
                tooltip : true,
                slot: 'title'
              },

              {
                title: '栏目',
                tooltip : true,
                slot: 'title',
                render:(h, params) => {
                  return h('div',params.row.category.name )
                }
              },
              {
                title: '类型',
                width: 100,
                key: 'type',
                render:(h, params) => {
                  if (params.row.type == 'text'){
                    return h('div','图文')
                  }else{
                    return h('div','视频')
                  }
              }
              },
              {
                title: '修改时间',
                tooltip : true,
                key: 'createTime'
              },
              {
                title: '操作',
                slot: 'action',
                align: 'center'
              }
            ],
            msgList: [],
            id : 1
          }
      },
      watch: {
        //监听路由变化
        '$route' (to, from) {
          this.ajax.get(`articles?categoryId=${this.$route.query.id}&from=0&size=999`).then((res) => {
            this.id = this.$route.query.id
            this.msgList = res.data.items
          })

        }
      },
      mounted() {
        this.clientHeight = document.documentElement.clientHeight - 150;
        this.ajax.get(`articles?categoryId=${this.$route.query.id}&from=0&size=999`).then((res) => {
          this.id = this.$route.query.id
          this.msgList = res.data.items
        })

      },
      methods: {
        nowTitle(id){
          this.SelectListTwo = []
          this.model1Two = ''
          this.msgList = []
          this.ajax.get(`categories/${id}?pattern=full`).then((res) => {
            if(res.data.children.length > 0){
              this.SelectListTwo = res.data.children
            }
          })
        },
        nowTitleTwo(index){
          this.msgList = this.SelectListTwo[index].articles
        },
        show (id) {
          this.$router.push({
            path: '/nowArticle',
            query:{id:id}
          });
        },
        del(id){
          this.ajax.Delete(`articles/${id}`,localStorage.getItem('token')).then((res) => {
            if(res.code == 0){
              this.$Message.success('删除成功')
              this.ajax.get(`articles?categoryId=${this.$route.query.id}&from=0&size=999`).then((res) => {
                this.msgList = res.data.items
              })
            }
          })

        }
      }
    }
</script>

<style scoped>
  ::-webkit-scrollbar {display:none}
</style>
