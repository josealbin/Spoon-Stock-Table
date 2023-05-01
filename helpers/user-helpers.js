const db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt')

module.exports = {
    doSignup: (userData)=>{
        return new Promise(async (resolve, reject)=>{
            userData.password= await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.insertedId)
            })
        })
    },
    doLogin: (userData)=>{
        return new Promise(async (resolve, reject)=>{
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password, user.password).then((status)=>{
                    if(status){
                        console.log('sucessful login');
                        response.user= user
                        response.status= true
                        resolve(response)
                    }else{
                        console.log('failed login attempt');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('failed login attempt');
                resolve({status:false})
            }
        })
    }
}