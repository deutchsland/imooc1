var express = require('express'),
    port = process.env.PORT || 3000,
    app = express();
var path = require('path');
var bodyParser  = require('body-parser');
app.set('views','./views');
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port);
console.log('imooc started on port '+ port);

app.get('/',function(req,res){
    res.render('index',{
        title:'imooc 首页'
    })
});
app.get('/movie/:id',function(req,res){
    res.render('detail',{
        title:'imooc 详情'
    })
});
app.get('/admin/list',function(req,res){
    res.render('list',{
        title:'imooc 列表'
    })
});
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'imooc 管理录入页面'
    })
});
