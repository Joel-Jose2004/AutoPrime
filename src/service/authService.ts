import axios from "axios"
import {create} from "zustand"
import type { carType } from "../types/carType"
import type { userType } from "../BackEnd/types/userType"

interface use{
    nome:string,
    email:string,
    id_users:number
}

interface action{
  login(email:string,password:string):Promise<string>
  getUserById(id:number):Promise<use>
  cars:carType[]

}

export const authService=create<action>(()=>({
  cars:[],


login:async(email, password):Promise<string>=> {
       const data={
        email:email,
        pass:password
       }   
      
     return new Promise(async(resolve,reject)=>{
       await axios.post("http://localhost:3000/login",{
      method:"POST",
      Headers:{"content-type":"application/json"},
      body:data
     }).then((res)=>{
         if(res.data=="Usuário não encontrado"){
           reject(res.data)          
         }else{
             const dado:userType[]=res.data
     
          const convertendo={
              "nome":dado.map(index=>index.name).toString(),
              "email":dado.map(index=>index.email).toString(),
              "id_users":dado.map(index=>index.id_users).toString()
           }
           localStorage.setItem("authT","true")
          localStorage.setItem("auth",JSON.stringify(convertendo.id_users))
          resolve("Login realizado com sucesso")
         }

     })
              
 
     })  
     
        
     
  },



  getUserById:async(id:number):Promise<use>=> {
  return new Promise(async(resolve,reject)=>{
   await axios.post("http://localhost:3000/getUser",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:id
    }).then((res)=>{
             const dado:userType[]=res.data
         const convertendo={
         "nome":dado.map(index=>index.name).toString(),
         "email":dado.map(index=>index.email).toString(),
         "id_users":dado.map(index=>index.id_users).toString()
      }
 
      if(dado.length >=1){
          resolve(convertendo as unknown as use)
      }else{
        reject("erro")
      }
 
    })

        
 })     
    
    
        

     
  },
}))
