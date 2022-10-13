const mongoose = require("mongoose");
const Customer = require("./customer");
const Shema = mongoose.Schema;

const AddressSchema = new Shema({
    customerId : {
        type : String,
        required : true,
    },
    addressId : {
        type : String,
        required : true,
    }, 
    address : {
        type : String,
        required : true,
    },
    landmark : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true,
    },
    zipCode : {
        type : Number,
        required : true,
    }

})

const  Address= mongoose.model("address", AddressSchema,"address");

module.exports = Address;