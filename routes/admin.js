var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  console.log(user);
  productHelper.getProduct().then((products)=>{
  /* console.log(products); */
    res.render('admin/view-products', { products, admin:true, user });
  })
});

router.get('/add-product', function(req, res){
  res.render('admin/add-product', {admin:true})
})

router.post('/add-product', function(req, res){ 
  console.log(req.body);

  let stock = req.body.stock
  let ordered = req.body.ordered
  let difference = stock-ordered
  req.body.difference = JSON.stringify(difference)

  let status = ''
  if(difference<=0){
    status = 'stock out'
  }else{
    status = 'available'
  }
  req.body.status = status

  productHelper.addProduct(req.body, (result)=>{
    res.redirect('/admin/')
  })
})

router.get('/delete-product/:id',(req, res)=>{
  let proId = req.params.id
  console.log(proId);
  productHelper.deleteProduct(proId).then((response)=>{
    console.log(response);
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id', async (req, res)=>{
  let product = await productHelper.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product', {product})
})

router.post('/edit-product/:id',(req, res)=>{
  productHelper.updateProduct(req.params.id, req.body).then(()=>{
    res.redirect('/admin/')
  })
})


module.exports = router;
