const passport = require('passport')
//定义认证规则
require('../passport')(passport)
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({message: 'hello index!'})
  })
  // passport-http-bearer token 中间件验证 (api权限判断)
  // 通过 header 发送 Authorization -> Bearer  + token
  // 或者通过 ?access_token = token
  app.use('/api/getInfo', passport.authenticate('bearer', {session: false})) //sets req.user
  //用户注册和获取token的api
  app.use('/api', require('./users')); // 在所有users路由前加/api

}
