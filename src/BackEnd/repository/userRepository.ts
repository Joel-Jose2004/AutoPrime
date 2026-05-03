import { db } from "../BDconection/BDconetion.js"
import type { carType } from "../types/carType.js"

interface dado{
    id:number,
    chatId:number,
    userId:number
}

interface chat{
  id:number, 
  chatId:string, 
  name:string,
  userId:number
}[]

export class userRepository{
   static shared=new userRepository()

   consulta(userId:number,carId:number){
    
     return new Promise((resolve,reject)=>{
         const q="select*from ofertas where id_users=? and id_carros=?"
        const value=[userId,carId]


         db.query(q,value,(err,data)=>{
        if(err) reject(err)
         resolve(data)   
     })
     })
    
   };


   publicar(body:carType,image:string) {

    const q="INSERT INTO carros(brand,model,image,color,engine,deposit,box,price,sold,negotiable,id_owner)values(?)"
const values=[body.brand,body.model,image,body.color,body.engine,body.deposit,body.box,body.price,false,body.negotiable,body.id_owner] 

db.query(q,[values],(err)=>{
    if(err) console.log(err)
    console.log("feito com sucesso")
})

};

  Oferta(carId:number,userId:number,offerValue:number){

    return new Promise((resolve,reject)=>{
     const q="INSERT INTO ofertas(id_carros,id_users,oferta)value(?)"
    const values=[carId,userId,offerValue]
    db.query(q,[values],(err)=>{
        if(err) reject(err)
        resolve("Oferta adicionado com sucesso")    
    })

    })
    
  };

 actualizaOferta(userId:number,offerId:number,carId:number){
    return new Promise((resolve,reject)=>{
     const q="update ofertas set oferta=? where id_users=? and id_carros=?"
    const value=[offerId,userId,carId]
    db.query(q,value,(err)=>{
        if(err) reject(err)
        resolve("actualizado")    
    })
    })
    
 };


 insertChatId(userId:number,chatId:number,userOpen:number){
    return new Promise((resolve,reject)=>{
       const array=[userId,userOpen]
    for(var i=0; i<array.length;i++){
       const q="insert into chats(chatId,userId)values(?)"
    
     const value=[chatId,array[i]]
         db.query(q,[value],(err)=>{
           if(err) reject(err)
            resolve("sucesso")
         }) 
    }

    })
    
    

 }

createChat(chatId:number){
   const q="create table "+chatId+"(id int not null auto_increment primary key,userId int references users(id_users), sms varchar(100))";
   db.query(q,(err)=>{
    console.log(err)
   })
     
}

getChatById(userId:number){
    
    return new Promise((resolve,reject)=>{
       const q="select*from chats where userId=?"
      var array:string[]=[]
  db.query(q,userId,(err,data)=>{
    if(err)reject(err)
       data.forEach((element:dado) => {
      if(array.indexOf(element.chatId as unknown as string)== -1)
          array.push(element.chatId as unknown as string)
       }); 
       
        resolve(array)
  })
    })
  
}

getChatByName(name:string[],user:number){
    return new Promise((resolve,reject)=>{
        var array:chat[]=[]

    for(var i=0; i<name.length; i++){
        const q="select id, chats.chatId, users.name,chats.userId  from chats join users on userId=users.id_users where chatId=? and userId!=?"
        const value=[name[i],user]
       db.query(q,value,(err,data)=>{
         if(err)reject(err)
         
       data.forEach((element:chat) => {
      if(array.some(index=>index.chatId==element.chatId)== true){
        console.log("ja existe")
      }else{
          array.push(element as unknown as chat)
          
      }      
       });

        if(array.length==i){
          resolve(array)

        }
       }) 
    }

    })

}

getMessage(chat:number){
    return new Promise((resolve,reject)=>{
        const q="select*from "+chat+""
        db.query(q,chat,(err,data)=>{
          if(err)reject(err)
            resolve(data)
        }) 
    })
}

sendMessage(chat:number,userId:number,sms:string){
  const q="insert into "+chat+" (userId,sms)values(?)"
  const values=[userId,sms]
  db.query(q,[values],(err)=>{
    if(err)console.log(err)
  })
}

}