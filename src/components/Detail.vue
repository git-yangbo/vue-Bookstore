<template>
  <div>
    <div>
      <div class="panel panel-warning">
        <div class="panel-heading text-center">
          书名:<span v-show=" !flag"> {{book.bookName}}</span>
          <input type="text" v-model="book.bookName"  v-show="flag"/>
        </div>
        <div class="panel-body text-center">
          <img :src="book.bookCover" alt=""/>
        </div>
        <div class="panel-footer text-center">
          价格:<span v-show="!flag">{{book.bookPrice | currency('￥')}}</span>
          <input type="text" v-model="book.bookPrice" v-show="flag"/>
         <button class="btn btn-danger" @click="remove" v-show="!flag">删除</button>
          <button class="btn btn-warning" v-show="!flag" @click="changeFlag">修改</button>
          <button class="btn btn-primary" v-show="flag" @click="update">确认修改</button>
        </div>
      </div>
      <button class="btn btn-primary" v-show="!flag" @click="opg">返回首页</button>
    </div>
  </div>
</template>
<script>
  export default{
    filters:{
      currency(input,param1){
        return param1+input
      }
    },
    created(){
    //页面一加载 需要获取数据 根据ID对应的数据
     this.id=this.$route.params.id;
      this.$http.get('/book?id='+this.id).then(res=>{
          this.book=res.body;
      })


    },
    data(){
      return {book:{
        bookName:'',
        bookCover:'',
        bookPrice:''
      },
        id:'',
        flag:false//默认为false,不显示出来输入框
//           {bookName:'小说',bookPrice:30,bookCover:"http://img3x1.ddimg.cn/69/20/24033111-1_b_6.jpg",id:1}
      }
    },
    components:{},
    methods:{
      opg(){
        this.$router.push('/list');
      },
      remove(){
          this.$http.delete('/book?id='+this.id).then(()=>{
              this.$router.push('/list');
          })
      },
      changeFlag(){
          this.flag=!this.flag;
      },
      update(){//通过url传递ID  数据通过请求体
        //服务端res.end触发就会调用then成功后回调
    this.$http.put('/book?id='+this.id,this.book).then(()=>{
        this.flag=false;//vueresouce将then中this处理掉了,默认指向的是当前组件,点击确认修改后,再次变为false,再次隐藏

    })
      }
    }
  }
</script>
<style scoped>
  img{width: 150px;height: 200px}
</style>
