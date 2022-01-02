const mongoose = require("mongoose");
const empschema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone_no:{type:Number},
    age:{type:Number},
    gender:{type:String},
    city:{type:String}
})
const Employee = new mongoose.model("emp_data",empschema);
module.exports  = Employee;
