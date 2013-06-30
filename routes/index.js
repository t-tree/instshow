
/*
 * GET home page.
 */
var instagram = require('instagram-node').instagram();
var consumerKey = "";
var consumerKeySecret = "";

instagram.use({
  client_id: consumerKey,
  client_secret: consumerKeySecret
});

exports.index = function(req, res){
  if(req.session.access_token){
    res.render('index', {
      title: "success"
    });
  } else {
    res.redirect("/login");
  }
};

var redirect_uri = 'http://localhost:3000/handleauth';

exports.login = function(req, res) {
  if(req.session.access_token){
    console.log('already login');
  } else {
    res.render('login', {
      title:'login page' 
    });
  }
};

exports.auth = {};
exports.auth.instagram= function(req, res){
  res.redirect(instagram.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state'}));
};

exports.handleauth = function(req, res){
  instagram.authorize_user(req.query.code, redirect_uri, function(err, result){
    if(err){
      console.log(err.body);
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      req.session.access_token = result.access_token;
      res.redirect("/");
    }
  });
};
