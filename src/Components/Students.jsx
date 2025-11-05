import React, { useEffect, useState }  from "react";
import { studentServices } from "../Services/studentServices";

export default function Student(){
    const [students,setStudents]=useState([]);
    const [form ,setform]=useState({id:0,name:"",rollNo:"",course:"",year:0,contact:""})
    //use effect to fetch the data

    useEffect(()=>{
        studentServices.getAll().then((data)=>setStudents(data))
    },[]);

   ////ui related operation ////

   const handelchange=(e)=>{
    setform({...form,[e.target.name]:e.target.value})
   }

   const handleadd= async ()=>{
    if(!form.name||!form.rollNo||!form.course||!form.year||!form.contact){
        alert("Details not set Validation failed")
        return;
    }
    const datatosend={
        name:form.name,
        rollNo:form.rollNo,
        course:form.course,
        year:parseInt(form.year),
        contact:form.contact
    };
    const newRec=await studentServices.add(datatosend)
    setStudents([...students,newRec]);
    setform({id:0,name:"",rollNo:"",course:"DAC",year:0,contact:""});
   }
   const handleupdate=async ()=>{
    if(!form.id){
        alert('Select an student to update')
        return;
    }
    const datatosend={
        name:form.name,
        rollNo:form.rollNo,
        course:form.course,
        year:parseInt(form.year),
        contact:form.contact
    }
    await studentServices.update(form.id,datatosend)
    setStudents(students.map(e=>(e.id===form.id)?{...e,...form}:e));
    handleclear();
    

   }
   const handledelete =async (id)=>{
    if(window.confirm("Are you sure you want to delete this student id"))
        await studentServices.delete(id);
    setStudents(students.filter(e=>(e.id !== id)))
   }

   const handleclear=()=>{
    setform({id:0,name:"",rollNo:'',course:'DAC',year:0,contact:''});
   }
   
   return(
    <>
    <h1 className="h1 text-danger">Student Management System</h1>
    <hr/>
    <div className="container"  >
        <div className="row">
            <div className="col-md-8">
                <div className="container">
                    <div className="row">
                        {
                            students.map(e=>{
                                return(
                                    <div key={e.id} className="card">
                                        <div className="card-title text-primary  text-center">{e.name}</div>
                                        <hr/>
                                        <div className="card-body">
                                            <p><b>Roll No: </b>{e.rollNo}</p>
                                            <p><b>Course : </b>{e.course}</p>
                                            <p><b>Year : </b>{e.year}</p>
                                            <p><b>Contact : </b>{e.contact}</p>
                                            <button className="btn btn-warning"
                                                onClick={()=>
                                                setform({
                                                    id:e.id,
                                                    name:e.name,
                                                    rollNo:e.rollNo,
                                                    course:e.course,
                                                    year:e.year,
                                                    contact:e.contact
                                                })
                                                }
                                                >Edit

                                            </button>
                                            <button className="btn btn-danger"
                                            onClick={()=>handledelete(e.id)}>Delete</button>
                                            </div>

                                    </div>
                                    
                                )
                            })
                        }

                    </div>
                </div>              
            </div>
            <div className="col-md-4">
                <h2>New Record Adding</h2>
                <hr/>
                <input className="form control m-3" name="name" value={form.name} placeholder="Enter your Name" onChange={handelchange}/>
                <input className="form control m-3" name="rollNo" value={form.rollNo} placeholder="Enter your Roll No" onChange={handelchange}/>
                <input className="form control m-3" name="course" value={form.course} placeholder="Enter your Course" onChange={handelchange}/>
                <input className="form control m-3" name="year" value={form.year} placeholder="Enter year" onChange={handelchange}/>
                <input className="form control m-3" name="contact" value={form.contact} placeholder="Enter Contact Details" onChange={handelchange}/>
                <hr/>
                <button onClick={handleadd} className="btn btn-primary">Add Record</button>
                <button onClick={()=>handledelete(form.id)} className="btn btn-danger m-2">Delete</button>
                <button onClick={handleupdate}className="btn btn-primary">Update</button>
                <button onClick={handleclear} >Clear</button>


            </div>
        </div>
    </div>
    </>
   )


}


