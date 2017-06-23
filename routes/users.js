const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
const router = express.Router();


// 注册账户
router.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, message: '请输入您的账号密码.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    })
    // 保存用户账号
    newUser.save((err) => {
      if (err) {
        return res.json({success: false, message: '用户名已经存在,注册失败!'});
      }
      res.json({success: true, message: '成功创建新用户!'});
    });
  }
});

// 检查用户名与密码并生成一个accesstoken如果验证通过
router.post('/user/accesstoken', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({success: false, message: '认证失败,用户不存在!'});
    } else if (user) {
      // 检查密码是否正确
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign({name: user.name}, config.secret, {
            expiresIn: 60 * 1
          });
          //user.age = 27; 添加的字段不在数据骨架中 数据库中不会保存此字段
          user.save(function (err) {
            if (err) {
              res.send(err);
            }
          });
          res.json({
            success: true,
            message: '验证成功!',
            token: 'Bearer ' + token,
            name: user.name
          });
        } else {
          res.send({success: false, message: '认证失败,密码错误!'});
        }
      });
    }
  });
});

//测试 api
// passport-http-bearer token 中间件验证 (api权限判断)
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/getInfo/user_info',
  function (req, res) {
    res.json({user: req.user});//user会挂载到req上
  })

module.exports = router
