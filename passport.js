const Strategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = function (passport) {
  passport.use(new Strategy(
    function (token, done) {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return done(null, false)
        } else {
          return done(null, decoded.name)
        }
      })
      //use native promise
      //User
      //  .findOne({
      //    token: token
      //  })
      //  .then(user=> {
      //    if (!user) {
      //      return done(null, false)
      //    }
      //    return done(null, user)
      //  })
      //  .catch(err=> {
      //    return done(err)
      //  })

      //User.findOne({
      //  token: token
      //}, function (err, user) {
      //  if (err) {
      //    return done(err);
      //  }
      //  if (!user) {
      //    return done(null, false);
      //  }
      //  return done(null, user);
      //});
    }
  ));
};
