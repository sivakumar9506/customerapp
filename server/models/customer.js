const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const CustomerSchema = new Shema({

    customerId : {
        type : String,
        required : true,
    },

    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
    },
    dob : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true,
    }
})

const  Customer= mongoose.model("customer", CustomerSchema,"customer");

module.exports = Customer;