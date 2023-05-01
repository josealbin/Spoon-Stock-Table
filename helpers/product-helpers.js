const db = require('../config/connection')
var collection = require('../config/collection')
const { ObjectId } = require('mongodb-legacy')
//var objectId = require('mongodb').ObjectId

module.exports = {
addProduct:(product, callback) => {
    db.get().collection('stock').insertOne(product).then((data) => {
      callback(data.insertedId)
    })
},
getProduct:()=>{
  return new Promise(async(resolve, reject)=>{
    let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
    resolve(products)
  })
},
deleteProduct:(prodId)=>{
  return new Promise((resolve, reject)=>{
    db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id: new ObjectId(prodId)}).then((response)=>{
      resolve(response)
    })
  })
},
getProductDetails:(proId)=>{
  return new Promise((resolve, reject)=>{
    db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id: new ObjectId(proId)}).then((product)=>{
      resolve(product)
    })
  })
},
updateProduct:(proId, proDetails)=>{
  
  let stock = proDetails.stock
  let ordered = proDetails.ordered
  let difference = stock-ordered
  proDetails.difference = JSON.stringify(difference)

  let status = ''
  if(difference<=0){
    status = 'stock out'
  }else{
    status = 'available'
  }
  proDetails.status = status

  return new Promise((resolve, reject)=>{
    db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id: new ObjectId(proId)},{
      
      $set:{
        name: proDetails.name,
        category: proDetails.category,
        price: proDetails.price,
        stock: proDetails.stock,
        ordered: proDetails.ordered,
        difference: proDetails.difference,
        status: proDetails.status,
        date: proDetails.date
      }
     
    }).then((response)=>{
      resolve()
    })
  })
}
}