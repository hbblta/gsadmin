<template>
  <div>
    <Table  border :columns="columns12" :data="msgList">
      <template slot-scope="{ row }" slot="title">
        <strong>{{ row.title }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.id)">修改</Button>
      </template>
    </Table>
  </div>
</template>

<script>
  export default {
    name: "IOSN",
    data(){
      return{
        SelectList: [],
        SelectListTwo : [],
        model1: '',
        model1Two:'',
        columns12: [
          {
            title: '标题',
            tooltip : true,
            slot: 'title'
          },
          {
            title: '内容',
            tooltip : true,
            width: 800,
            key: 'body'
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
            title: 'Action',
            slot: 'action',
            align: 'center'
          }
        ],
        msgList: []
      }
    },
    mounted() {
      this.ajax.get('categories/3?pattern=full').then((res) => {
        this.msgList = res.data.articles
      })
    },
    methods: {
      show (id) {
        this.$router.push({
          path: '/nowArticle',
          query:{id:id}
        });
      },
    }
  }
</script>

<style scoped>

</style>
