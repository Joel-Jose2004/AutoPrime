import { userRepository } from "../repository/userRepository"
import type { carType } from "../types/carType"

export class userServices{
    static shared=new userServices()

    publicar(body:carType,imagem:string){
      
        userRepository.shared.publicar(body,imagem)
    };


    oferta(carId:number,userId:number,offerValue:number){
        var car=carId
        var user=userId
        var offer=offerValue
       return userRepository.shared.consulta(userId,carId).then((res)=>{
             if(res==""){
               return userRepository.shared.Oferta(car,user,offer).then((res)=>{
                    return res
                }).catch((err)=>{
                    return err
                })
           }else{  
           return userRepository.shared.actualizaOferta(user,offer,car).then((res)=>{
            return res
           }).catch((err)=>{
            return err
           })
            }
        

       })
               
    };

  createChat(userId:number,idChat:number,userOpen:number){
     userRepository.shared.insertChatId(userId,idChat,userOpen).then(()=>{
        userRepository.shared.createChat(idChat)
     })
    
  };

  getChatById(userId:number){
    var user=userId
    return userRepository.shared.getChatById(userId).then((res)=>{
       return userRepository.shared.getChatByName(res as string[],user).then((res)=>{
            return res
        })
        
    }).catch((err)=>{
        console.log(err)
    })
  };

  getMessage(chat:number){
    return userRepository.shared.getMessage(chat).then((res)=>{
        return res
    })
  };

 sendMessage(chat:number,userId:number,sms:string) {
    userRepository.shared.sendMessage(chat,userId,sms)
 }

}