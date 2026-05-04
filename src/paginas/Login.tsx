import { Box, FormControl, FormLabel,Spinner, useToast } from "@chakra-ui/react";

import { Text,  Button, Input,VStack} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../service/authService";



export function Login(){

    const [log,setLog]=useState({
        email:"",
        password:""
    })
    const [loader,setLoader]=useState(false)
    const navigate=useNavigate()
     const toast=useToast()
    const login=authService(state=>state.login)


    useEffect(()=>{
      const handleKey=(event:KeyboardEvent)=>{
        if(event.key=="Enter"){
           event.preventDefault()
           logar()
        }
      }
    
     window.addEventListener("keydown",handleKey)
    return ()=>{ 
      window.removeEventListener("keydown",handleKey)
    } 

    },[])

    const logar=()=>{
         setLoader(true)
        setTimeout(()=>{
         login(log.email,log.password).then((res)=>{
            
              toast({
                 title: "Sucesso",
                 description:res,
                 status: "success",
                 duration: 3000,
                 isClosable: true
                })
               navigate("/")

        }).catch((err)=>{
            
              toast({
                 title: "Erro",
                 description:err,
                 status: "error",
                 duration: 3000,
                 isClosable: true
                })
        })             
            setLoader(false)
            
        },2000)

         

       
        
    }
    

    return(



         <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}
               bg={"blackAlpha.100"}>
         
         
               <Box width={{ base: "80%",sm:"47%", md: "40%", lg: "30%" }} display={"flex"}
                 flexDirection={"column"} gap={"15px"} 
                 borderRadius={"5px"}
                 padding={"20px"} boxShadow={"0px 3px 8px grey"}
                 bg={"white"}
               >
                 
                               <FormControl gap={6} >

                                 <VStack>
                                  <FormLabel width={"100%"}>Nome</FormLabel>
                                 <Input type="email"
                                   name="email"
                                   value={log.email}
                                 onChange={(e)=>setLog(dados=>({...dados,email:e.target.value}))}/>
                                
                                 <FormLabel width={"100%"}>Palavra-Passe</FormLabel>
                                 <Input
                                 name="password"
                                 value={log.password}
                                  onChange={(e)=>setLog(dados=>({...dados,password:e.target.value}))}
                                 />

                                </VStack>
                                
                                </FormControl>

                                <Button   colorScheme='orange' w={"100%"}
                                    onClick={logar}>
                                    <Box display={loader ? "flex":"none"}><Spinner/></Box>
                                    {loader ? " ":"Login"}</Button>

                                 <Box width={"100%"} display={"flex"} justifyContent={"space-between"}
                                          flexDirection={"column"} >
          
                                    <Text
                                     color={"blackAlpha.800"}
                                     width={"100%"} display={"flex"} justifyContent={"center"}>
                                     Não tenho uma conta?
                                     <Button variant={"link"} colorScheme="blue"
                                       >Criar Conta</Button></Text>
                       
                                       <Button variant={"link"} colorScheme="blue" onClick={()=>navigate("/")}>Página Inicial</Button>
                                   </Box>
         
               </Box>

         </Box>







           
                    
                             
           
           
            
    )
}