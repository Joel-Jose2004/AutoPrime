import { db } from "../BDconection/BDconetion"


export class authRepository{
    static shared=new authRepository()

    login(email:string,password:string){
    
     return new Promise((resolve,reject)=>{
        const q="select*from users where email=? and password=?";
        const value=[email,password] 
        db.query(q,value,(err:any,data)=>{
        if(err) reject(err)
        resolve(data)
        })
    
        })
    }
    

    getUserById(id:number){
    
     return new Promise((resolve,reject)=>{
        const q="select*from users where id_users=?";
        const value=[id] 
        db.query(q,value,(err:any,data)=>{
        if(err) reject(err)
        resolve(data)
        })
    
        })
    }
}