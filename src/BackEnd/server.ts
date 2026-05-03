import express from "express"
import cors from "cors"
import { db } from "./BDconection/BDconetion"
import { userServices } from "./services/userServices"
import { authServices } from "./services/authServices"
import  { upload } from "./config/multer"
import path from "path"


const app=express()
app.use(cors())
app.use(express.json())


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/Conta",(req,res)=>{
    req.body
    const q="SELECT*FROM carros where sold=?"
   const v=0;    
    db.query(q,v,(err,data)=>{
        if(err) return res.json(err)
        
            return res.json(data)
    })
})

app.post('/login',async(req,res)=>{
     const {body}=req.body

    return authServices.shared.login(body.email,body.pass).then((resposta)=>{
        return res.json(resposta)
     }).catch((err)=>{
        return res.json(err)
     })
   
     
})


app.post('/getUser',async(req,res)=>{
     const {body}=req.body

    return authServices.shared.getUserById(body).then((resposta)=>{
        return res.json(resposta)
     }).catch((err)=>{
        return res.json(err)
     })
   
     
})


app.get("/PegaOfertas",(req,res)=>{
    req.body
   const q="select carros.id_carro,carros.brand,carros.model, carros.price,ofertas.oferta,ofertas.id_users,users.name from carros join ofertas on id_carro=ofertas.id_carros join users on ofertas.id_users=users.id_users"
   db.query(q,(err,data)=>{
    if(err) return res.json(err)
        return res.json(data)
  })
})

app.post('/Publicar',upload.single("image"),(req,res)=>{

let im="uploads"+"/"+req.file?.filename
userServices.shared.publicar(req.body,im)
  res.json("Feito")
})



app.post('/Offer',(req,res)=>{
     const {body}=req.body
  
userServices.shared.oferta(body.carId,body.userId,body.offerValue).then((response)=>{
    return res.json(response)
}).catch((err)=>{
    return res.json(err)
})


})

app.delete('/DeleteOffer',(req,res)=>{
    const {carId,userId}=req.body
    const q="delete from ofertas where id_carros=? and id_users=?"
    const value=[carId,userId]
    db.query(q,value,(err)=>{
        if(err) console.log(err)
            res.json("sucesso")
    })

})

app.post('/createChat',(req,res)=>{
    const {body}=req.body

    userServices.shared.createChat(body.userId,body.chat,body.userOpen)
    res.json("feito")
})

app.post("/getChat",(req,res)=>{
    const {body}=req.body

    userServices.shared.getChatById(body).then((result)=>{
      return res.json(result)
    }).catch((err)=>{
        return res.json(err)
    })
})

app.post("/getMessage",(req,res)=>{
    const {body}=req.body
    userServices.shared.getMessage(body).then((result)=>{
        return res.json(result)
    }).catch((err)=>{
        return res.json(err)
    })
})

app.post("/sendMessage",(req)=>{
    const {body}=req.body
    userServices.shared.sendMessage(body.chat,body.userId,body.sms)
})

app.listen(3000,()=>{
    console.log("Rodando na porta 3000")
})