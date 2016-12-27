var express = require('express'),
    port = process.env.PORT || 3000,
    app = express();
var path = require('path');
var mongoose = require('mongoose');
var Movie = require('./model/movie');// = require('movie');
var _ = require('underscore');
var bodyParser  = require('body-parser');
app.set('views','./views/pages');
app.set('view engine','pug');
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost/imooc');
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);
console.log('imooc started on port '+ port);

app.get('/',function(req,res){
    console.log(Movie);
    Movie.fetch(function (err,movies) {
        if(err){
            console.log("err is :"+err);
            return res.json(err);
        }
        res.render('index',{
            title:'imooc 首页',
            movie:movies
        });
    })

});


//admin post movie
app.post('admin/movie/new',function(req,res){

    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if(_id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                return res.json(err);
            }
            _movie = _.extend(movie,movieObj)
            _.movie.save(function(err,movie){
                if(err){
                    return res.json(err);
                }
                res.redirect('/movie/'+movie._id);
            })
        })
    }else{
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            summary:movieObj.summary,
            flash:movieObj.flash,
            poster:movieObj.poster
        })
        _.movie.save(function(err,movie){
            if(err){
                return res.json(err);
            }
            res.redirect('/movie/'+movie._id);
        })
    }
});



//详情 page
app.get('/movie/:id',function(req,res){
    var id = req.param.id;

    var _movie;
    if(_id !== undefined){
        Movie.findById(id,function(err,movie){
            if(err){
                return res.json(err);
            }
            res.render('detail',{
                title:'imooc'+ movie,
                movie:movie
            });
        })
    }

});

//列表
app.get('/admin/list',function(req,res){
    Movie.fetch(function (err,movies) {
        if(err){
            console.log("err is :"+err);
            return res.json(err);
        }
        res.render('index',{
            title:'imooc 首页',
            movie:movies
        });
    })

});

app.get('admin/update/:id',function(req,res){
    var id = req.param.id;
    if(id){
        Movie.findById(id,function (err,movie) {
            res.render('admin',{
                title:"后台管理员",
                movie:movie
            })
        })
    }
});

app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'imooc 管理录入页面'

    })
});
