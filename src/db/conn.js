const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/empdb",{
    useNewUrlParser:true,    
useUnifiedTopology:true
}).then(()=>{
    console.log("connection sucessfully")
}).catch((e)=>{
    console.log(`error in connection ${e}`)
})
