<template>
  <div id="app">
    <h3>图书增加页</h3>
    <form>
      <div class="form-group">
        <label for="bookName">书名</label>
        <input type="text" class="form-control" id="bookName"  placeholder="请输入书名" autocomplete="off" v-model="book.bookName"/>
      </div>
      <div class="form-group">
        <label for="bookCover">封面</label>
        <input type="text" class="form-control" id="bookCover" placeholder="请输入封面" autocomplete="off" v-model="book.bookCover"/>
      </div>
      <div class="form-group">
        <label for="bookPrice">价格</label>
        <input type="text" class="form-control" id="bookPrice" placeholder="请输入价格" autocomplete="off" v-model="book.bookPrice"/>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" @click="add">确认增加</button>
      </div>
    </form>
  </div>
</template>


<script>
  export default{
      data(){
          return{
              book:{
                  bookName:'',
                  bookPrice:'',
                bookCover:''
              }
          }
      },
    methods:{
      add(){
          if (this.book.bookName&&this.book.bookCover&&this.book.bookPrice){
            this.$http.post('/book',this.book).then(res=>{
              this.$router.push('/list')
            }).catch(err=>{
              console.log(err);
            });
          }else {
              alert('请将信息填写完整');
          }

      }
    }

  }
</script>
<style>
</style>
