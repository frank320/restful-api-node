/**
 * Created by wikeLi on 2017/4/12.
 */
const jwt = require('jsonwebtoken')
const config = require('../config')

const secret_key = ")ovn0t@q+y^t)i)ab%k_qk8ec=_&^u+%w2^%^e5@ja"

console.log(jwt.sign({name: 'n76pdlcfrb8mmbzyj08xs9k9'}, secret_key, {
  expiresIn: 60 * 30
}))





//const token = jwt.sign({name: 'frank'}, config.secret, {
//  expiresIn: 16
//})
//
//
//console.log(token)
//
//console.log('--------------------------------------')
//
//setTimeout(()=> {
//  const decoded = jwt.verify(token, config.secret)
//  console.log(decoded)
//}, 10000)

//// invalid token
//jwt.verify(token, 'wrong-secret', function(err, decoded) {
//  // err
//  // decoded undefined
//})


