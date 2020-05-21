const {User} = require("./../models/user");

let auth = function (req, res, next) {
   let token = req.cookies.auth; // get the token if user is logged in

   User.findByToken(token, function (err, user) {
   if(err) throw err;

   if(!user) return res.json({
      error: true
   });

   req.token = token;
   req.user = user;
   next();  // next line of code
})
};

module.exports = {auth};