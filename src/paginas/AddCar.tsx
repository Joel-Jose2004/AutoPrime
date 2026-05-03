import { Box, Button, Text ,Img, Select, useToast,Flex,
    FormLabel,VStack, FormControl,Input, Spinner,  } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { IoCamera } from 'react-icons/io5';
import { userService } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../service/authService';
import type { User } from '../types/userType'
import type { carType } from '../types/carType';


interface carOfer{
  id_carro:number,
  brand:string,
  model:string, 
  price:number,
  oferta:number,
  id_users:number, 
  name:string
}


export function AddCar(){

  const toast=useToast()
const [user,setUser]=useState<User>()
const [logado,setLogado]=useState(false)
const [imagemCarro,setImagem]=useState<File|null>(null)
const getChatById=userService(state=>state.getChatById)
const login=authService(state=>state.getUserById)
const navigate=useNavigate()
const [carro,setCarro]=useState<carType>()
const [loader,setLoader]=useState(false)
const publica=userService(state=>state.publicar)

const emptyCar={
    id_carro:0,
    brand:"",
    image:File,
    model:"",
    color:"",
    engine:"",
    deposit:"",
    box:"",
    price:0,
    sold:"",
    negotiable:"",
    id_owner:""
}



    const publicar=async()=>{
         setLoader(true)
        setTimeout(()=>{
            setLoader(false) 
        },2000)

        publica(carro as carType,user?.id_users as number,imagemCarro as unknown as File).then((res)=>{
         
         toast({
         title: "Sucesso",
         description:"resolvido com sucesso"+res,
         status: "success",
         duration: 3000,
         isClosable: true
        })
         setCarro(emptyCar as unknown as carType)
         
        })        
        
    }

  const handleImagem=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file=e.target.files?.[0]
        if(file){
             setImagem(file)
        }
  }

useEffect(()=>{
    verify()
   
},[])


const verify=async()=>{
   const authT=localStorage.getItem("authT")
    if(authT == "true"){
          setLogado(true)
    }
    const auth=localStorage.getItem("auth")||""
    const removeAspas=auth.replace(/"/g,"")
    const converteInteiro=Number(removeAspas)
      
      login(converteInteiro).then((res)=>{
         setUser(res)

       }).catch(()=>{
        setUser(undefined)
       })


}




const Logout=()=>{
  localStorage.removeItem("auth")
  localStorage.removeItem("authT")
  setLogado(false)
  verify()
}

useEffect(()=>{
    if(user!=undefined){
      getChatById(user.id_users)
    }
},[user])



    return(
     <Box height={"auto"} minHeight={"100vh"} bg={"#f0f0f0"}>
      <Box height={"100vh"} bg={"#f0f0f0"} display={"flex"} flexDirection={"column"} 
      >
      
     <Flex gap={10} position={"relative"} height={"80%"}
      top={"15%"} width={"90%"} right={"-5%"} bg={"white"} flexWrap={"wrap"}
      alignContent={"center"} justifyContent={"center"}>
      
       
        <Box width={"90%"} 

         height={"60px"}
         display={"flex"}
         justifyContent={"center"}
         alignItems={"center"}>
             <Text fontFamily={"arial"} fontSize={"25px"} color={"orange.600"}>Meu Carro</Text>
        </Box>

        <Box width={"40%"} height={"70%"} border={"1px dashed orange"} 
         display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Box display={imagemCarro?"none":"flex"}><IoCamera size={"30px"}/></Box>
               <Input type='file' height={"60%"} accept='image/*' onChange={handleImagem} 
               width={"40%"} opacity={"0%"} cursor={"pointer"}
               position={"absolute"}/>
             
            {imagemCarro &&(
                <Img src={URL.createObjectURL(imagemCarro)} w="100%" h="100%" objectFit={"cover"}/>
            )}
               
               
        </Box>


     <FormControl gap={10} width={"50%"} display={"flex"}>
     
          <VStack width={"50%"}>
           <FormLabel width={"100%"}>Marca</FormLabel>
          <Input type="text"
            name="marca"
            value={carro?.brand}
          onChange={(e)=>setCarro(dados=>({...dados,brand:e.target.value})as carType)}/>
         
          <FormLabel width={"100%"}>Modelo</FormLabel>
          <Input
          name="modelo"
          value={carro?.model}
           onChange={(e)=>setCarro(dados=>({...dados,model:e.target.value})as carType)}
          />

          <FormLabel width={"100%"}>Cor</FormLabel>
          <Input
          name="cor"
          value={carro?.color}
           onChange={(e)=>setCarro(dados=>({...dados,color:e.target.value})as carType)}
          />

          <FormLabel width={"100%"}>Preço</FormLabel>
          <Input 
          name="preco"
          value={carro?.price}
           onChange={(e)=>setCarro(dados=>({...dados,price:e.target.value})as unknown as carType)}
          />

        </VStack>

        <VStack width={"50%"}>
        <FormLabel width={"100%"}>Motor</FormLabel>
        <Select focusBorderColor="blue.600"
             name="motor"
              value={carro?.engine}
              onChange={(e)=>setCarro(dados=>({...dados,engine:e.target.value})as carType)}
              placeholder="selecione opção"
            >
                 <option value="selado">Selado</option>
                 <option value="foi aberto">Foi aberto</option>
                 
        </Select>

         <FormLabel width={"100%"}>Caixa</FormLabel>
        <Select focusBorderColor="blue.600"
             name="motor"
              value={carro?.box}
              onChange={(e)=>setCarro(dados=>({...dados,box:e.target.value})as carType)}
              placeholder="selecione opção"
            >
                 <option value="Automático">Automático</option>
                 <option value="Manual">Manual</option>
                 
        </Select>

        
         <FormLabel width={"100%"}>Deposito</FormLabel>
        <Select focusBorderColor="blue.600"
             name="motor"
              value={carro?.deposit}
              onChange={(e)=>setCarro(dados=>({...dados,deposit:e.target.value})as carType)}
              placeholder="selecione opção"
            >
                 <option value="Gasolina">Gasolina</option>
                 <option value="Gasóleo">Gasóleo</option>
                 
        </Select>

                                 
        <FormLabel width={"100%"}>Negociável</FormLabel>
         <Select focusBorderColor="blue.600"
             name="negocio"
             value={carro?.negotiable}
              onChange={(e)=>setCarro(dados=>({...dados,negotiable:e.target.value})as unknown as carType)}
              placeholder="selecione opção"
            >
                 <option value={"true"} >Negociável</option>
                 <option value={"false"}>Não Negociável</option>
                         
             </Select>
             
            </VStack>
                            
             </FormControl>
             
                 <Button bg={"blue.600"} color={"white"} _hover={{bg:"blue.500"}} w={"20%"}
                     onClick={publicar}>
                     <Box display={loader ? "flex":"none"}><Spinner/></Box>
                                 {loader ? " ":"Publicar"}</Button>
    </Flex>

      </Box>
   </Box>
    )
}