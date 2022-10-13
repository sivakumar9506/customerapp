const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const isEmpty = require('is-empty')
const Customer = require('./models/customer',);
const Address = require('./models/address');
const app = express();
const PORT = 2053;
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())

  app.post('/add-users', async function (req,res){
    console.log(req.body,'----body')

    let errors = {};


if(isEmpty(req.body.customerId)){ 
        errors.customerId = 'customerId is required'
       }

    if(isEmpty(req.body.firstName)){ 
        errors.firstName = 'firstName is required'
       }

       if(isEmpty(req.body.lastName)){ 
        errors.lastName = 'lastName is required'
       }
   
       if(isEmpty(req.body.userName)){ 
        errors.userName = 'userName is required'
       }

     if(isEmpty(req.body.email)){
      errors.email = 'email is required'
     }else if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test (req.body.email))
      {
       errors.email = 'Please provide a valid email address'
      }
     

      if(isEmpty(req.body.phone)){ 
       errors.phone = 'phone number is required'
      }
     

      if(isEmpty(req.body.dob)){
       errors.dob = 'date of birth is required'
      }

      if(isEmpty(req.body.gender)){
        errors.gender = 'gender is required'
       }

      if(isEmpty(req.body.addressId)){
        errors.addressId = 'addressId is required'
       }
 

       if(isEmpty(req.body.address)){
        errors.address = 'address is required'
       }

       if(isEmpty(req.body.landmark)){
        errors.landmark = 'landmark is required'
       }
       if(isEmpty(req.body.city)){
        errors.city = 'city is required'
       }
       if(isEmpty(req.body.state)){
        errors.state = 'state is required'
       }
       if(isEmpty(req.body.country)){
        errors.country = 'country is required'
       }
       if(isEmpty(req.body.zipCode)){
        errors.zipCode = 'zipCode is required'
       }

      

       if(!isEmpty(errors)){
         return res.status(400).json({'status':false,'errors': errors })
       }
       
       let emailCheck = await Customer.findOne({'email': req.body.email });
       console.log(emailCheck,'----emailCheck');

       if(!isEmpty(emailCheck)){
        return res.status(400).json({'status': false,'errors': {'email': 'email is already exist'} })
       }
      
       let userNameCheck = await Customer.findOne({'userName': req.body.userName });
       console.log(userNameCheck,'----userNameCheck');

       if(!isEmpty(userNameCheck)){
        return res.status(400).json({'status': false,'errors': {'userName': 'userName is already exist'} })
       }
       const newCustomer = new Customer({
        customerId:req.body.customerId,
        firstName:req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
           email : req.body.email,
           phone : req.body.phone,
           dob : req.body.dob,
           gender : req.body.gender,
          
       })
      console.log("newCustomerrr", newCustomer)
       newCustomer.save();  

       const newAddress = new Address({
        customerId:req.body.customerId,
        addressId:req.body.addressId,
        address : req.body.address,
        landmark : req.body.landmark,
           city : req.body.city,
           state : req.body.state,
           country : req.body.country,
           zipCode : req.body.zipCode,
          
       })
       newAddress.save(); 
       

      return res.status(200).json({'status': true, 'message' : 'user added successfully'})
})

app.post('/delete-users', async function (req,res){
    console.log("backend delete",req.body)

      let newCustomer = await Customer.deleteOne({customerId: req.body.id})
      let newAddress = await Address.deleteOne({customerId: req.body.id})
      
    console.log(newCustomer,'--------newCustomer')
    console.log(newAddress,'--------newCustomer')

    return res.status(200).json({'status': true, 'message' : 'user deleted successfully'})

}) 

app.post('/edit-data',async function(req,res) {

    console.log(req.body,'----body')
    let updateCustomer = { customerId:req.body.customerId,
        firstName:req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
           email : req.body.email,
           phone : req.body.phone,
           dob : req.body.dob,
           gender : req.body.gender,
          };
let updateAddress = {
    customerId:req.body.customerId,
    addressId:req.body.addressId,
    address : req.body.address,
    landmark : req.body.landmark,
       city : req.body.city,
       state : req.body.state,
       country : req.body.country,
       zipCode : req.body.zipCode,
}
    
    let newCustomer = await Customer.findOneAndUpdate({customerId:req.body.customerId},  { $set: updateCustomer },
        {new:true});
    let newAddress = await Address.findOneAndUpdate({customerId:req.body.customerId},
        { $set: updateAddress },
         {new:true});
    return res.status(200).json({'status':true,'newCustomer': newCustomer ,'newAddress' :newAddress })
   
  })

  app.get('/get-all-users', async function (req,res){

    let customerData = await Customer.find({}).sort({customerId:-1})
    let addressData = await Address.find({}).sort({customerId:-1})
    
    console.log(customerData,'.....customerData')
    console.log(addressData,'.....addressData')

  return res.status(200).json({'status': true, 'message' : 'user find successfully', 'addressData': addressData , 'customerData':customerData})

})

app.get('/get-singleuser-data/:customerId',async function(req,res) {
   console.log("request params",req.params.customerId)
     let { customerId } = req.params; 
     console.log("hghu......................",customerId.substring(1))
  
    let customerData = await Customer.findOne({customerId:customerId.substring(1)});
    console.log("cust........", customerData)
    let addressData = await Address.findOne({customerId:customerId.substring(1)}); 
    return res.status(200).json({'status':true,'addressData': addressData,'customerData': customerData})
   
  })

  mongoose.connect('mongodb://localhost:27017/userdata').then((response) => {
  console.log("MONGODB CONNECTED SUCCESSFULLY")
}).catch(err => {
console.log("MONGODB NOT CONNECTED")
})

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}`)
})