const express = require("express");
const db =require("./db/conn");
const emp =require("./model/employee");
const bodyparser =require("body-parser");
const hbs=require("hbs");

const port=process.env.PORT||3000;
const app =express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))
app.set("view engine","hbs");
app.get("/",(req,res)=>{
    try {
        emp.find((err,docs)=>{
            if(!err)
            {
                console.log(docs);
                res.render("list",{
                    viewTitle:"Employee List",
                    data:docs
                });
            }
            else
            {
                console.log(err);
            }
        });

    } catch (error) {
        console.log("error in getting data"+error)
        
    }
})

app.get("/employee",(req,res)=>{
        try {
            res.render("create",{
                viewTitle:"ADD EMPLOYEE"
            })
        } catch (error) {
            console.log("error in data"+error)
        }
})
app.post("/employee/add",(req,res)=>{
    try {
        console.log(req.body);
      var data= new emp();
      data.name=req.body.name;
      data.email=req.body.email;
      data.age=req.body.age;
      data.phone_no=req.body.phone_no;
      data.gender=req.body.gender;
      data.city=req.body.city;
      data.save((err,docs)=>{
          if(!err)
          {
              res.redirect("/")
          }
          else
          {
              console.log("error in adding "+err);
          }
      })
        
    } catch (error) {
        console.log(error);
    }
})
app.get("/employee/delete/:id",(req,res)=>{
    try {
        const id=req.params.id;
        emp.findByIdAndRemove(id,(err,docs)=>{
            if(!err)
            {
                console.log(docs);
                res.redirect("/");
            }
            else
            {
                console.log(err)
            }
        })
    } catch (error) {
        console.log(error)
    }
})
app.get("/employee/edit/:id",(req,res)=>{
    try {
      var  id=req.params.id;
        emp.findById(id,(err,docs)=>{
            if(!err)
            {
                console.log(docs)
                res.render("edit",{
                viewTitle:"Update data",
                data:docs
                })
            }
            else{
                console.log(err);
            }
        })
    } catch (error) {
        console.log("error in data"+error)
    }
})
app.post("/employee/edit/:id",(req,res)=>{
    try {
        const id=req.params.id;
        emp.findByIdAndUpdate({_id:id},req.body,{new:true},(err,docs)=>{
            if(!err)
            {
                console.log(docs);
                res.redirect("/");
            }
            else
            {
                console.log(err)
            }
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(port,()=>{
    console.log("listing on port"+port)
})
