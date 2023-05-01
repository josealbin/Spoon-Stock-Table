var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var userHelper = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  /* let user = req.session.user
  console.log(user);
  productHelper.getProduct().then((products)=>{
    res.render('index', { products, user});
  }) */
  res.render('user/admin-login')
});

router.get('/admin-login', (req, res)=>{
  res.render('user/admin-login')
})


router.get('/admin-signup', (req, res)=>{
  res.render('user/admin-signup')
})

router.post('/admin-signup', (req, res)=>{
  userHelper.doSignup(req.body).then((response)=>{
    console.log(response);
    res.render('user/admin-login')
  })
})

router.post('/admin-login', (req, res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/admin')
    }else{
      res.redirect('/admin-login')
    }
  })
})

module.exports = router;
