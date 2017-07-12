<template>
  <div>
    <div class="col-md-3" v-for="book in books">
      <div class="panel panel-warning">
        <div class="panel-heading text-center">
          书名:{{book.bookName}}
        </div>
        <div class="panel-body text-center">
          <img :src="book.bookCover" alt=""/>
        </div>
        <div class="panel-footer text-center">
          价格:{{book.bookPrice | currency('￥')}}
         <router-link :to="{name:'detail',params:{id:book.id}}">进入详情</router-link>
        </div>
      </div>
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
    this.$http.get('/book').then((res)=>{
     this.books=res.body
    })
    },
     data(){
         return {books:[
//           {bookName:'小说',bookPrice:30,bookCover:"http://img3x1.ddimg.cn/69/20/24033111-1_b_6.jpg",id:1}
         ]}
     },
    components:{},
    methods:{}
  }
</script>
<style scoped>
img{width: 150px;height: 200px}
</style>
