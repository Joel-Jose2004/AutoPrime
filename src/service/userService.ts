import axios from "axios"
import {create} from "zustand"
import type { carType } from "../types/carType"
import type { carOfer } from "../types/carType"
import type { chatType } from "../types/chatType"
import type { chatMessage } from "../types/chatType"


interface action{
  publicar(dado:carType,ownerId:number,imagem:File):Promise<void>
  listAllCars():Promise<void>
  listAllOffersCars():Promise<void>
  postOffer(carId:number,userId:number,offerValue:number):Promise<string|undefined>
  deleteOffer(carId:number,userId:number):Promise<void>
  createChat(userId:number,userOpen:number):Promise<void>
  getChatById(userId:number):Promise<void>
  getMessage(chat:number):Promise<chatMessage[]>
  sendMessage(chanel:number,userId:number,sms:string):Promise<void>
  cars:{},
  carsOfer:carOfer[]
  yourChats:chatType[]
 
}

export const userService=create<action>((set)=>({
  cars:[],
  carsOfer:[],
  yourChats:[],
  
  publicar:async(dado:carType,ownerId:number,imagem:File):Promise<void>=>{
    const dados={...dado,id_owner:ownerId,image:imagem}
  try {
    await axios.post("http://localhost:3000/Publicar", dados, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  } catch(err){
          console.log(err)
         }   
  },
 
 listAllCars:async():Promise<void>=>{
  try{
     const response =await axios.get("http://localhost:3000/Conta")
         set({cars:response.data})
        console.log(response.data)
    }catch(err){
        console.log(err)
    }
  },

  listAllOffersCars:async():Promise<void>=>{
  try{
     const response =await axios.get("http://localhost:3000/PegaOfertas")
         set({carsOfer:response.data})

    }catch(err){
        console.log(err)
    }
  },

  

  postOffer:async(carId, userId, offerValue):Promise<string|undefined>=>{
    const dados={
    carId:carId,
    userId:userId,
    offerValue:offerValue
  }
     try{
    const response =await axios.post("http://localhost:3000/Offer", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            body:dados
            });     
            return(response.data)      
         }catch(err){
          console.log(err)
         }  

  },
 deleteOffer:async(carId, userId)=>{
  
    try{
   await fetch("http://localhost:3000/DeleteOffer", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
              "carId":carId,
              "userId":userId 
            })
            });
 
                       
         }catch(err){
          console.log(err)
         }  

 }, 
 createChat:async(userId,userOpen)=> {
  try{
 const hexa=Math.floor(Math.random()*0xffffffff).toString(16).padStart(8,'a').toLocaleUpperCase()
  
    const data={
        userId:userId,
        chat:hexa,
        userOpen:userOpen
    }
   await axios.post("http://localhost:3000/createChat",{
    method:"POST",
    headers:{"Content-type":"aplication/json"},
    body:data
   })
  }catch(err){

  }

 },

getChatById:async(userId:number)=>{

  try{
   const response= await axios.post("http://localhost:3000/getChat",{
      method:"POST",
      headers:{"Content-type":"aplication/json"},
      body:userId
    })
    set({yourChats:response.data})
  }catch(err){
    console.log(err)
  }

},

getMessage:async(chat:number)=>{
  try{
   const response= await axios.post("http://localhost:3000/getMessage",{
      method:"POST",
      headers:{"Content-type":"aplication/json"},
      body:chat
    })
    return response.data
  }catch(err){
    console.log(err)
  }
},

sendMessage:async(chanel, userId,sms)=> {
    const dado={
      chat:chanel,
      userId:userId,
      sms:sms
    }
    try{
   await axios.post("http://localhost:3000/sendMessage",{
      method:"POST",
      headers:{"Content-type":"aplication/json"},
      body:dado
    })

  }catch(err){
    console.log(err)
  }
},

}))
