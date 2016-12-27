/**
 * Created by 8000570084 on 2016/12/26.
 */
var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    title:{
        type:String
    },
    doctor:{
        type:String
    },
    country:{
        type:String
    },
    language:{
        type:String
    },
    year:{
        type:String
    },
    summary:{
        type:String
    },
    flash:String,
    poster:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})
MovieSchema.pre('save',function(next){
    if(this.isNew){
       this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else{
        this.meta.updateAt = Date.now()
    }
    next()
})

MovieSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.updateAt')
        exec(cb)
    },
    findById:function(id,cb) {
        return this.findOne({_id:id})
        exec(cb)
    }
}

module.exports  = mongoose.model('Movie',MovieSchema);


