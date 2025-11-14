const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");

const app=express();
const portNo=1234;

//handels body parse from post operation-(adding a middleware) ////
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//// connection my sql /////

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'****',
    database:'expense_management'
})

db.connect((err)=>{
    err == null ? console.log("connected"):console.error(err.message);
})
////sql commands //////

const getAll = "select * from expenses";
const getById="select * from expenses where id=?";
const insert ="insert into expenses (amount,category,description,expense_date) values(?,?,?,?)"
const update="update expenses set amount=?,category=?,description=?,expense_date=? where id=?"
const del   ="delete from expenses where id=?"


//api end point /////
app.get("/expenses",(req,res)=>{
    db.query(getAll,(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
            else res.json(result)
    })
})

app.get("/expenses/:id",(req,res)=>{
    const {id}=req.params;
    db.query(getById,(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        else res.json(result)
    })
})

app.post("/expenses",(req,res)=>{
    const {amount,category,description,expense_data}=req.body;
    db.query(insert ,[amount,category,description,expense_data],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        else res.json({id:result.insertId,amount,category,description,expense_data});
    })
})
app.put("/expenses/:id",(req,res)=>{
    const {id}=req.params;
    db.query(update,[amount,category,description,expense_data,id],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
            else res.json({"message" : "expense updated sucessfully"});

    })

})
app.delete("/expenses/:id",(req,res)=>{
    const {id}=req.params;
    db.query(del,[id],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        else res.json({"message":"expense deleted sucessfully"})
    })
});

///start ur server //////
app.listen(portNo,()=>{
    console.log(`server is running at port number ${portNo}`)
 
})
