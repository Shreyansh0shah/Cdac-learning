import React, { useEffect, useState } from "react";
import { expensesServices } from "../Services/expenseServices";

export default function Expenses() {

    const [expense ,setexpense]=useState([]);
    const [form,setform]=useState({id:0,amount:0,category:"food",description:"",expense_date:""})


    useEffect(()=>{
        expensesServices.getAll().then((data)=>(setexpense(data)))
    },[])

    const handlechange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const handleadd=async ()=>{
        if(!form.amount||!form.category||!form.description||!form.expense_date){
            alert('All fields required!');
            return;
        }
        const datatosend={
            amount:parseFloat(form.amount),
            category:form.category,
            description:form.description,
            expense_date:form.expense_date

        };

        const newRecord=await expensesServices.add(datatosend)
        setexpense([...expense,newRecord]);
        setform({id:0,amount:"",category:"food",description:"",expense_date:""})
    }
        const handleUpdate=async ()=>{
            if(!form.id){
                alert('select an expense to update')
                return;
            }
            const datatosend={
                amount:parseFloat(form.amount),
                category:form.category,
                description:form.description,
                expense_date:form.expense_date
            }
            await expensesServices.update(form.id,datatosend)
            setexpense(expense.map((e)=>(e.id === form.id ? {...e,...form} : e)));
            setform({id:0,amount:"",category:"food",description:"",expense_date:""})


        }
        const handledelete=async (id)=>{
            if(window.confirm("are you sure you want to delete this expense"))
                await expensesServices.delete(id);
            setexpense(expense.filter((e)=>e.id !==id));
        }

        const handleclear=()=>{
            setform({ id: 0, amount: "", category: "food", description: "", expense_date: "" });

        }

    return(
        <div><td>
            <div style={{border:"2px solid black",
                padding:"20px",
                width:"80%",
                margin:"20px auto",
                borderRadius:"10px",
                textAlign:"center",
                boxShadow:"0 0 100px rgba(17, 218, 249, 1)"

            }}>  
            <h1>Expense Managment System</h1>
            <h2>Expense List </h2>

            <ul style={{ listStyleType: "none", padding: 0 }}>
                {expense.map(e=>(
                    <li key ={e.id} >
                        <p><b>Id: </b>{e.id}</p>
                        <p><b>Amount:Rs </b>{e.amount}</p>
                        <p><b>Category: </b>{e.category}</p>
                        <p><b>Description: </b>{e.description}</p>
                        <p> <b>Date: </b>{e.expense_date ? e.expense_date.split("T")[0]:"No date"}</p>
                        <button onClick={()=>setform({
                            id:e.id,
                            amount:e.amount,
                            category:e.category,
                            description:e.description,
                            expense_date:e.expense_date
                        })}>Edit</button>
                        <button onClick={()=>handledelete(e.id)}>Delete</button>
                        <hr/>
                    </li>
                ))}
            </ul>
            <hr/>


            <h2>{form.id ? "Update expense":"Add new expense"}</h2>

            <div >
                <label>Amount: </label>
                <input type="number" value={form.amount} placeholder="Enter Amount" name="amount" onChange={handlechange}/>
            </div>
            <div>
                <label>Category:</label>
                <select value={form.category}  name="category" onChange={handlechange}>
                    <option value="food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div>
                <label>Description:</label><br/>
                <textarea name="description" value={form.description} placeholder="Enter description "  onChange={handlechange}/>
            </div>
            <div>
                <label>Date</label>
                <input 
                type="date"
                name="expense_date"
                value={form.expense_date}
                onChange={handlechange}

                />
            </div>
            <div>
                <button  onClick={handleUpdate}>Update</button>
                <button  onClick={handleadd}>Add</button>
                <button onClick={handleclear}>Clear</button>


            </div>


        </div> </td>
</div>
    )

}
