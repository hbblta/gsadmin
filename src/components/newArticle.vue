<template>
  <div>
    <Divider orientation="left">文章分类</Divider>
    <Select v-model="model1" @on-change="nowTitle" style="width:250px;padding-left: 20px" >
      <Option  v-for="item in SelectList" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
    <Select  v-model="msgData.categoryId" @on-change="nowTitleTwo" style="width:250px;padding-left: 20px">
      <Option  v-for="(item,index) in SelectListTwo" :value="item.id" :key="item.id">{{ item.name}}</Option>
    </Select>
    <Divider orientation="left">文章类别</Divider>
    <Select v-model="msgData.type"  style="width:250px;padding-left: 20px" >
      <Option  v-for="item in typeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
    </Select>
    <Divider orientation="left">{{msgData.type == 'text' ? '封面图片' : '内容视频/封面图片'}}</Divider>
    <div >
      <Upload
        v-if="msgData.type == 'text'"
        type="drag"
        ref="textImg"
        style="padding-left: 20px"
        :accept="'image/*'"
        :format="['jpg','jpeg','png', 'gif']"
        :on-success="successImg"
        :max-size='1024'
        :on-exceeded-size="handleMaxSize"
        :data = "uploadData"
        :on-format-error = "handleFormatError"
        :before-upload="handleUpload"
        :on-remove = 'removeImg'
        :on-error="errorFn"
        :action="UploadUrl">
        <div  style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>上传图片</p>
        </div>
      </Upload>
      <Upload
        style="padding-left: 20px"
        v-if="msgData.type == 'video'"
        type="drag"
        ref="textVideo"
        :format="['mp4']"
        :data = "uploadData"
        :max-size='102400'
        :accept="'video/*'"
        :on-exceeded-size="handleMaxSize"
        :on-success="successImg"
        :before-upload="handleUpload"
        :on-format-error = "handleFormatError"
        :on-remove = 'removeImg'
        :action="UploadUrl">
        <div  style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>上传视频</p>
        </div>
      </Upload>
            <Upload
              ref="ImgVideo"
              v-if="msgData.type == 'video'"
              style="width:300px;padding-left: 20px"
              :max-size='1024'
              :accept="'image/*'"
              :on-exceeded-size="handleMaxSize"
              :data = "uploadDatas"
              :before-upload="handleUploads"
              :format="['jpg','jpeg','png', 'gif']"
              :on-format-error = "handleFormatError"
              :on-success="successImgs"
              :on-error="errorFn"
              :action="UploadUrls">
              <Button icon="ios-cloud-upload-outline">上传视频封面图片</Button>
            </Upload>
    </div>
    <Divider orientation="left">文章标题</Divider>
    <Input v-model="msgData.title" placeholder="请填写标题" style="width: 300px;padding-left: 20px;padding-bottom: 20px" />
    <div style="padding: 20px"  id="editor" :style="{width:clientWidth}">
    </div>
    <Button type="primary" @click="setUp" style="position: relative;left: 45%;top: 20px">创建文章</Button>
  </div>
</template>

<script>
  import E from 'wangeditor'
    export default {
        name: "newArticle",
        data() {
          return {
            uploadData : {},
            uploadDatas : {},
            typeList : [
              {
                name:'图文',
                type : 'text'
              },

              {
                name:'视频',
                type : 'video'
              }
            ],
            token : '',
            SelectList: [],
            SelectListTwo : [],
            titleText : '',
            model1: '',
            model1Two:'',
            editor: null,
            info_: null,
            clientWidth : '',
            file: null,
            files : null,
            UploadUrl : '',
            UploadUrls : '',
            DataUrls : '',
            DataUrl : '',
            handleMaxSizeType : true,
            msgData:{
              categoryId : 0,
              title : '',
              body : '',
              coverUrl : '',
              photos :[],
              videos : [],
              type : 'text'
            }
          }
        },
        mounted(){
          this.token = localStorage.getItem('token')
          this.ajax.get('categories?pattern=1').then((res) => {
            this.SelectList = res.data
          })
          this.clientWidth = `${document.documentElement.clientWidth -240 }`+'px';
            this.initEdiot()
        },
        methods: {
          handleFormatError(error){
            console.log(error);
          },
          handleMaxSize (file) {
            if(this.msgData.type == 'text'){
              this.$Notice.warning({
                title: '文件大小超限',
                desc: '文件  ' + file.name + ' 太大，上传文件大小不能超过1M.'
              });
            }else{
              this.$Notice.warning({
                title: '文件大小超限',
                desc: '文件  ' + file.name + ' 太大，上传文件大小不能超过100M.'
              });
            }
            this.handleMaxSizeType = false
          },
          errorFn(data){
            console.log(data);
          },
          handleUpload (file) {
            let exts = ''
            if(this.msgData.type == 'text'){
              exts = 'png'
            }else{
              exts = 'mp4'
            }
            console.log(file);
            this.ajax.gets('upload?ext='+exts,this.token).then((res) => {
              console.log(res);
              this.UploadUrl = res.requestUri
              this.uploadData.key = res.key
              this.uploadData.bucket = res.bucket
              this.uploadData.ossAccessKeyId = res.ossAccessKeyId
              this.uploadData.policy = res.policy
              this.uploadData.signature = res.signature
              this.DataUrl = res.url
              setTimeout(()=>{
                if(!this.handleMaxSizeType){
                  return
                }
                if(this.msgData.type == 'text'){
                  this.$refs.textImg.post(file)
                }else{
                  this.$refs.textVideo.post(file)
                }

              },500)
            })
            return false;
          },
          handleUploads (file) {
            this.ajax.gets('upload?ext=png',this.token).then((res) => {
              this.UploadUrls = res.requestUri
              this.uploadDatas.key = res.key
              this.uploadDatas.bucket = res.bucket
              this.uploadDatas.ossAccessKeyId = res.ossAccessKeyId
              this.uploadDatas.policy = res.policy
              this.uploadDatas.signature = res.signature
              this.DataUrls = res.url
              setTimeout(()=>{
                this.$refs.ImgVideo.post(file)
              },500)
            })
            return false;
          },
          nowTitle(id){
            this.SelectListTwo = []
            this.msgData.categoryId = 0
            this.ajax.get(`categories/${id}?pattern=full`).then((res) => {
              if(res.data.children.length > 0){
                this.SelectListTwo = res.data.children
              }else{
                this.msgData.categoryId = res.data.id
              }
            })
          },
          successImgs(img){
            this.msgData.coverUrl = this.DataUrls
          },
          removeImg(img){
            console.log(img);
          },
          successImg(img){
            if(this.msgData.type == 'text'){
              this.msgData.photos[0] = this.DataUrl
            }else{
              this.msgData.videos[0] = this.DataUrl
            }
          },
          nowTitleTwo(id){
            this.msgData.categoryId = id
          },
          isClear(val) {
            // 触发清除文本域内容
            if (val) {
              this.editor.txt.clear()
              this.info_ = null
            }
          },
          setUp(){
            if(this.categoryId == 0){
              this.$Message.warning('请填写完整');
            }
              this.ajax.post('articles',this.msgData,this.token).then((res) => {
                if(res.code == 0){
                  this.msgData = {
                    categoryId : 0,
                    title : '',
                    body: '',
                    coverUrl : '',
                    photos : [],
                    videos : [],
                    type : ''
                  }
                  this.$Message.success('创建成功')
                }
              })
            this.files = null;
            this.file = null;
          },
          initEdiot(){
              this.editor = new E('#editor')
              this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
              this.editor.customConfig.uploadImgServer = 'https://api.zjdandaotech.com/upload'  // 配置服务器端地址
              this.editor.customConfig.uploadImgHeaders = {'authorization': this.token}// 自定义 header
              this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
              this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024 // 将图片大小限制为 2M
              this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
              this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

              // 配置菜单
              this.editor.customConfig.menus = [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'code', // 插入代码
                'undo', // 撤销
                'redo', // 重复
                'fullscreen' // 全屏
              ]
            this.editor.customConfig.uploadImgHooks = {
                fail: (xhr, editor, result) => {
                  // 插入图片失败回调
                },
                success: (xhr, editor, result) => {
                  // 图片上传成功回调
                },
                timeout: (xhr, editor) => {
                  // 网络超时的回调
                },
                error: (xhr, editor) => {
                  // 图片上传错误的回调
                },
                customInsert: (insertImg, result, editor) => {
                  // 图片上传成功，插入图片的回调
                  //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
                  // console.log(result.data[0].url)
                  //insertImg()为插入图片的函数
                  //循环插入图片
                  // for (let i = 0; i < 1; i++) {
                  console.log(result)
                  let url = "https://img.zjdandaotech.com/"+result.data[0].key
                  insertImg(url)
                  // }
                }
              }
              this.editor.customConfig.onchange = (html) => {
                this.msgData.body = html
              }
              // 创建富文本编辑器
              this.editor.create()
          }
        }
    }
</script>

<style scoped>


</style>
