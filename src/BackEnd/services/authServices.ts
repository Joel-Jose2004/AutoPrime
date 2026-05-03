import { authRepository } from "../repository/authRepository"




export class authServices{
   static shared =new authServices()

   async login(email:string,password:string){
   return authRepository.shared.login(email,password).then((res)=>{
        
       if(res==""){
         return "Usuário não encontrado"     
       }else{
         return res
       }
   }).catch((err)=>{
      return err
   })
   }

   getUserById(id:number){
      return authRepository.shared.getUserById(id).then((res)=>{
         return res
      }).catch((err)=>{
         return err
      })
   }

}