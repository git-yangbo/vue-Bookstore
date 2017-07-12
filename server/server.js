//主要提供接口的
let http=require('http');
let url=require('url');
let fs=require('fs');
function readBooks(callback) {
  fs.readFile('./book.json','utf8',function (err,data) {
    if (err || data.length===0) data='[]';
    callback(JSON.parse(data));
  })
}
function writeBooks(data,callback) {
fs.writeFile('./book.json',JSON.stringify(data),callback);
}

//我们对书的增删改查的操作的都是book.json
http.createServer(function (req,res) {
let {pathname,query}=url.parse(req.url,true);

if (pathname==='/book'){
 let id=query.id;
 switch (req.method){
   case 'GET':
     if (id){//判断是否有ID,有ID获取一个,没有ID获取全部数据
       readBooks(function (data) {
         var book=data.find(item=>item.id==id);
         res.end(JSON.stringify(book))
       })

     }else {
       readBooks(function (data) {
         res.end(JSON.stringify(data))
       });
     }
     break;
   case 'POST':
     var str='';
     req.on('data',function (data) {
       str+=data;
     });
     req.on('end',function () {
       var book=JSON.parse(str);
       readBooks(function (books) {
         book.id=books.length?books[books.length-1].id+1:1;
         books.push(book);
         writeBooks(books,function () {
           //一般添加成功后 返回添加的那一项
           res.end(JSON.stringify(book))
         })
       })
     });
     break;
   case 'PUT':
     var str='';
     req.on('data',function (data) {
       str+=data
     });
     req.on('end',function () {
       //book代表前台要我们改的结果
       var book=JSON.parse(str);
       readBooks(function (books) {
         books=books.map(item=>{
           if (item.id==id){
            return book
           }
           return item
         });
         writeBooks(books,function () {
           //修改成功后,返回修改插入成功后那一项
           //RESTFUL风格规定的
           res.end(JSON.stringify(book))
         })
       });
     });

     break;
   case 'DELETE':
     readBooks(function (books) {
       books=books.filter(item=>item.id!=id);
       writeBooks(books,function (callback) {
         //删除成功后返回空对象
         res.end(JSON.stringify({}));
       })
     });
     break;

 }
}else {
  res.statusCode=404;
  res.end()
}
}).listen(4000);
