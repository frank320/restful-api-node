const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
//const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true, //确保用户名唯一性
    require: true
  },
  password: {
    type: String,
    require: true
  },
  token: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  }
})

//密码加密
function crypto_md5(text) {
  var hash = crypto.createHash("md5")
  hash.update(new Buffer(text, "binary"))
  //return hash.digest('hex') //16进制
  return hash.digest('base64')
}

//schema.pre('save', function(next) {
//  // You **must** do `new Error()`. `next('something went wrong')` will
//  // **not** work
//  var err = new Error('something went wrong');
//  next(err);
//});
//
//// later...
//
//myDoc.save(function(err) {
//  console.log(err.message) // something went wrong
//})


// 添加用户保存时中间件对password进行加密,这样保证用户密码只有用户本人知道
UserSchema.pre('save', function (next) {
  var user = this //User实例
  if (this.isModified('password') || this.isNew) {//isModified isNew 内置方法
    user.password = crypto_md5(user.password)
    next()
  } else {
    return next()
  }
})


// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function (passw, cb) {//给数据模型添加方法
  if (crypto_md5(passw) === this.password) {//this 指向User实例
    cb(null, true)
  } else {
    cb(true)
  }
};

module.exports = mongoose.model('User', UserSchema)
