import axios from 'axios'


const base_url="http://localhost:1234/expenses"
export const expensesServices={
    getAll:async ()=>(await axios.get(base_url)).data,
    getById: async (id)=>(await axios.get(`${base_url}/${id}`)).data,
    add: async (rec)=>(await axios.post(base_url,rec)).data,
    update: async (id,rec)=>(await axios.put(`${base_url}/${id}`,rec)).data,
    delete: async (id)=>(await axios.delete(`${base_url}/${id}`)).data

}