const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");


const app=express();
const protNo=1234;

///handle body parser (add middleware)//////
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//my sql connection //////
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Shah@123',
    database:'student_management'

})

db.connect((err)=>{err==null ?console.log("connected"):console.error(err.message)});

/////sql commands/////

const getAll="select * from students"
const getById="select * from students where id=?"
const insert="insert into students (name,rollNo,course,year,contact) values(?,?,?,?,?)"
const update="update students set name=?,rollNo=?,course=?,year=?,contact=? where id=?"
const del="delete from students where id=?"

////end points /////

app.get("/students",(req ,res)=>{
    db.query(getAll,(err,result)=>{
        if(err) return res.status(500).json({error:err.message})
            else res.json(result)
    })
})
app.get("/students/:id",(req,res)=>{
    const {id}=req.params;
    db.query(getById,[id],(err,result)=>{
        if(err) return res.status(500).json({error:err.message})
            else res.json(result)
    })
})
app.post("/students",(req,res)=>{
    const {name,rollNo,course,year,contact}=req.body
    db.query(insert,[name,rollNo,course,year,contact],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
            else res.json({id:result.insertId,name,rollNo,course,year,contact});
    })
})
app.put("/student/:id",(req,res)=>{
    const {id,name,rollNo,course,year,contact }=req.body
    db.query(update,[name,rollNo,course,year,contact,id],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        else res.json({"message":"student Updated sucessfully"})
    })
})

app.delete("/students/:id",(req,res)=>{
    const {id}=req.params;
    db.query(del,[id],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        else res.json({"message":"student id deleted sucessfully"});
    })
})

app.listen(protNo,()=>{
    console.log(`Server is running at port number ${protNo}`)
})