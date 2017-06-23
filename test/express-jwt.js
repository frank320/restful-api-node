/**
 * Created by frank on 2017/4/14.
 */
const jwt = require('express-jwt')
const express = require('express')
const app = express()

const jsonwt = require('jsonwebtoken')

const secret_key = ")ovn0t@q+y^t)i)ab%k_qk8ec=_&^u+%w2^%^e5@ja"


//generate token
console.log(jsonwt.sign({name: 'frank'}, secret_key, {
  expiresIn: 60 * 3
}))

//静态资源放在权限验证之前
app.use(express.static(__dirname))
//权限验证
app.use(jwt({secret: secret_key}))
//set req.user
app.get('/tv', function (req, res) {
  res.send(req.user)
})
// error handle
function jwtErrorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    //next();
    res.status(401).end();
  } else {
    next(err);
  }
}
app.use(jwtErrorHandler)

app.listen(3000, function (err) {
  if (!err) {
    console.log(`server is running at localhost:3000`);
  }
})
