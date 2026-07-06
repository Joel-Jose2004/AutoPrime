import { Box, Button, Flex,  Img, Text, useDisclosure, useToast, ButtonGroup, Input, Avatar, Spinner, Divider, Textarea } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardFooter } from '@chakra-ui/react'
import icone from '../assets/FullLogo-removebg-preview.png';
import { userService } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../service/authService';
import type { User } from '../types/userType'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

import { TbTrashX } from 'react-icons/tb';
import { FaBell } from 'react-icons/fa6';
import { AlertDialogModal } from '../components/alertDialog';
import { IoCarSportOutline } from "react-icons/io5";
import { FiSend } from 'react-icons/fi';
import { TbMessage } from 'react-icons/tb';
import type { chatMessage } from '../types/chatType';
import {LuFuel} from 'react-icons/lu'
import { IoColorFillSharp} from 'react-icons/io5'
import { TbCircuitSwitchClosed } from 'react-icons/tb';
import {SiCoronaengine} from "react-icons/si"
import { BsLock } from 'react-icons/bs';
import { AlertSoldDialogModal } from '../components/alertSoldDialog';

interface carOfer{
  id_carro:number,
  brand:string,
  model:string, 
  price:number,
  oferta:number,
  id_users:number, 
  name:string
}


export function UserPage(){

const [user,setUser]=useState<User>()
const {isOpen:isOpenOferta,onOpen:onOpenOferta,onClose:onCloseOferta}=useDisclosure()
const {isOpen:isOpenDialog,onOpen:onOpenDialog,onClose:onCloseDialog}=useDisclosure()
const {isOpen:isOpenSoldDialog,onOpen:onOpenSoldDialog,onClose:onCloseSoldDialog}=useDisclosure()
const [logado,setLogado]=useState(false)
const listAllCars=userService(state=>state.listAllCars)
const listAllOffersCars=userService(state=>state.listAllOffersCars)
const cars=userService(state=>state.cars)
const myChats=userService(state=>state.yourChats)
const carsOffer=userService(state=>state.carsOfer)
const postOffer=userService(state=>state.postOffer)
const deleteOffer=userService(state=>state.deleteOffer)
const createChat=userService(state=>state.createChat)
const getMessage=userService(state=>state.getMessage)
const send=userService(state=>state.sendMessage)
const [messageWrote,setMessageWrote]=useState("")
const [chanelMessage,setChanelMessage]=useState(0)
const [message,setMessage]=useState<chatMessage[]>()
const [ownerId,setOwnerId]=useState(0);
const [idCarro,setIdCarro]=useState(0);
const getChatById=userService(state=>state.getChatById)
const [offerValue,setOfferValue]=useState<number>(0)
const [CarrosOfertado,setCarrosOfertados]=useState<carOfer[]>()
const login=authService(state=>state.getUserById)
const navigate=useNavigate()
const toast=useToast()
const [loader,setLoader]=useState(false)
const [visibleCars,setVisibleCars]=useState(true)
const [visibleChat,setVisibleChat]=useState(false)


useEffect(()=>{
    verify()
    listAllCars()
    listAllOffersCars()
   
},[])


const verify=async()=>{
   const authT=localStorage.getItem("authT")
    if(authT == "true"){
          setLogado(true)
    }else{
      navigate("/")
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


const abrirDrawer=(id:number,id_owner:number)=>{
  
  setOwnerId(id_owner)
  setIdCarro(id)
  setCarrosOfertados(carsOffer.filter(index=>index.id_carro==id))
  onOpenOferta()
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


const colocarOferta=()=>{
           setLoader(true)
        setTimeout(()=>{
        postOffer(idCarro,user?.id_users as number,offerValue).then((res)=>{   
    toast({
         title: "Sucesso",
         description:res,
         status: "success",
         duration: 3000,
         isClosable: true
        })
           setLoader(false)   
           onCloseOferta()

  }).catch((err)=>{
     toast({
         title: "Erro",
         description:err,
         status: "error",
         duration: 3000,
         isClosable: true
        })
            setLoader(false)   

  })
        },2000)


  
}

const DeleteOffer=(carId:number)=>{
  deleteOffer(carId,user?.id_users as number) 
  
}

const abrirAlertDialog=(id:number)=>{
   
  setIdCarro(id)
  onOpenDialog()
}

const abrirAlertSoldDialog=(id:number)=>{
   
  setIdCarro(id)
  onOpenSoldDialog()
}

const OpenChat=(userId:number)=>{
  createChat(userId,user?.id_users as number)
}

const changeVisibleCars=()=>{
  setVisibleCars(true)
  setVisibleChat(false)
}

const changeVisibleChat=()=>{
  setVisibleChat(true)
  setVisibleCars(false)
}

const seeMessage=(chat:number)=>{
  
  setChanelMessage(chat)
  getMessage(chat).then((res)=>{
    setMessage(res as unknown as chatMessage[])
  })

}

const sendMessage=()=>{
    send(chanelMessage,user?.id_users as number,messageWrote)
    setMessageWrote("")
}

const textareaRef=useRef<HTMLTextAreaElement>(null);
const handleInput=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
  setMessageWrote(e.target.value);
  const textarea=textareaRef.current;
  if(textarea){
    textarea.style.height="auto";
    textarea.style.height=textarea.scrollHeight + "px";
  }
}


    return(
     <Box height={"auto"} minHeight={"100vh"} bg={"#f0f0f0"}>
      <Box height={"100vh"} bg={"#f0f0f0"} display={"flex"} flexDirection={"column"} gap={"12px"}>

        {/*-----Menu Bar ---------*/}
        <Box height={{base:"10%",md:"10%",lg:"10%"}} display={"flex"} 
          justifyContent={{base:"flex-end",md:"flex-end",lg:"space-between"}} alignItems={"center"}
               bg={"white"} gap={5} position={"fixed"}
                zIndex={"1"} width={"100%"} >


                  <Box display={"flex"} alignItems={"center"}>
                     <Img src={icone} height={"110px"}/>
                    <Text
                   fontFamily={"arial"} fontSize={{base:"20px",md:"25px",lg:"23px"}}
                  color={"black"}>{user?.nome}</Text></Box>

              <Box  width={{base:"90%",md:"60%",lg:"50%"}} display={"flex"} padding={"3px"}
                 alignItems={"center"} 
                gap={{base:"3%",md:"10%",lg:"5%"}}>  

              
                <Box 
                width={"50%"}
                padding={2}

                display={"flex"}
                justifyContent={"center"}
                fontFamily={"arial"}
                fontWeight={"bold"}
                borderRadius={6}
                cursor={"pointer"}
                color={"orange"}
                  _hover={
                  {
                   bg:"orange.500",
                   color:"white",
                   transition:"1s"
                   
                  }
                }
                onClick={()=>navigate("/")}
              >
              Página Inicial</Box>                   

                <Box 
                width={"50%"}
                padding={2}
                bg={visibleCars?"orange":"white"}
                display={"flex"}
                justifyContent={"center"}
                fontFamily={"arial"}
                fontWeight={"bold"}
                borderRadius={6}
                cursor={"pointer"}
                color={visibleCars?"white":"orange"}
                  _hover={
                  {
                   bg:"orange.500",
                   color:"white",
                   transition:"1s"
                   
                  }
                }
                onClick={changeVisibleCars}
              >
                Carros</Box>  
                
                <Box 
                width={"50%"}
                display={"flex"}
                 padding={2}
                justifyContent={"center"}
                bg={visibleChat?"orange":"white"}
                fontFamily={"arial"}
                fontWeight={"bold"}
                borderRadius={6}
                _hover={
                  {
                   bg:"orange.500",
                   color:"white",
                   transition:"1s"
                  }
                }
                cursor={"pointer"}
                color={visibleCars?"orange":"white"}
                onClick={changeVisibleChat}>
                chats</Box>  

                {logado ? <Flex  width={"80%"} 
                alignItems={"center"}
                gap={5}>
                  <Button width={{base:"30%",md:"30%",lg:"80%"}}  colorScheme='brown' onClick={Logout}>Logout</Button>
                </Flex>
                  :
                   <Button 
                        colorScheme='orange'
                   width={{base:"30%",md:"30%",lg:"30%"}} color='white' onClick={()=>navigate("/Login")}>Login</Button>}
                         
              </Box>
        </Box>
        {/*-----Fim Menu Bar ---------*/}

          
 
    <Box 
     position={"fixed"} 
     top={"50%"}
     cursor={"pointer"}
     right={"2%"} width={"5%"}
     padding={"5px"}
     bg={"orange.500"}
     borderRadius={"50%"}
     boxShadow="1px 2px 3px grey">
       <IoCarSportOutline size={"100%"} color='white' onClick={()=>navigate("/AddCar")}/>

    </Box>

                  

               

        {/*-----Início da listagem dos carros---------*/}
          <Box display={visibleCars?"flex":"none"}  position={"absolute"} top="10%" flexWrap={"wrap"}
           justifyContent={"center"} gap={20} padding={5} 
           bg={"#f0f0f0"} width={"100%"}>

             {Object.entries(cars).map(([i,lista]:any)=>(
                      <Box key={i}>
                    {lista.id_owner==user?.id_users &&(
                       <Card maxW='sm' maxH={"xl"} width={"350px"} overflow={"hidden"}>
                          <Img src={`http://localhost:3000/${lista.image}`} height={"300px"}/>

                          <Box 
                           width={"40%"} 
                          position={"absolute"} 
                          
                          top={"5%"} left={"55%"}>
                            {lista.negotiable=="true" ?(
                        <Box display={"flex"} gap={2} bg={"green.700"} 
                        borderRadius={"5px"} opacity={"90%"}
                         justifyContent={"center"}>  
                          <Text fontWeight={"bold"}  color={"white"}>Negociável</Text>                     
                        </Box>
                          ):(
                        <Box display={"flex"} gap={2} bg={"brown"} justifyContent={"center"}
                          borderRadius={"5px"} opacity={"90%"}
                        >     
                            <Text fontWeight={"bold"} color={"white"} >N/Negociável</Text>
                        </Box>    
                          )}</Box>

                         <Flex justifyContent={"space-between"} padding={2} height={"70px"}>
                            <Box display={"flex"}  padding={2} flexDirection={"column"}>
                                <Text fontWeight={"bold"} color={"grey"} fontSize={"15px"}> {lista.brand}</Text>
                                <Text fontWeight={"bold"} color={"blackAlpha.900"} fontSize={"20px"}>{lista.model}</Text>
                            </Box>

                            <Box><BsLock cursor={"pointer"} color='green'
                            onClick={()=>abrirAlertSoldDialog(lista.id_carro)}/></Box>              
                        </Flex> 

                      
                      <Flex padding={2} justifyContent={"space-between"} >
                       <Box display={"flex"} gap={2} padding={2} flexDirection={"column"}>      
                            <Text  color={"grey"}
                                  display={"flex"} alignItems={"center"} gap={2}>
                              <IoColorFillSharp color={"brown"}/>{lista.color}
                            </Text>
                            <Text  color={"grey"}
                                  display={"flex"} alignItems={"center"} gap={2}>
                              <LuFuel color={"brown"}/> {lista.deposit}
                            </Text>
                            
                        </Box> 
                          
                             
                        <Box display={"flex"} gap={2} padding={2} flexDirection={"column"}>
                          <Text  color={"grey"}
                                display={"flex"} alignItems={"center"} gap={2}>
                            <TbCircuitSwitchClosed color={"brown"}/>{lista.box}
                          </Text>
                          <Text color={"grey"}
                                display={"flex"} alignItems={"center"} gap={2}>
                                  <SiCoronaengine color={"brown"}/>{lista.engine}
                          </Text>  
                        </Box>
                      </Flex>

                       <Divider marginLeft={"5%"} color={"grey"} width={"90%"} borderRadius={"4px"}/>

                      <CardFooter justifyContent={"space-between"}
                      alignItems={"center"}>
                        
                        
                         
                          <Box display={"flex"} gap={2}>
                                <Text fontWeight={"bold"} color={"orange.600"}> {lista.price?.toLocaleString("pt-AO",{style:"currency",currency:"AOA"})}</Text>
                           </Box>
                        
                        <ButtonGroup spacing='2' display={user?"flex":"none"}>
                          {lista.negotiable=="false" ?(
                              <Button  display={lista.id_owner==user?.id_users?"none":"flex"}
                              variant={"unstyled"} onClick={()=>abrirAlertDialog(lista.id_carro)} >
                                <FaBell color="brown" size={"60%"}/>
                              </Button>
                          ):(
                             <Button variant={"solid"} colorScheme='orange'
                           onClick={()=>abrirDrawer(lista.id_carro,lista.id_owner)}
                          >
                            Ver Oferta
                          </Button> 
                        
                          )}

                        </ButtonGroup>

                      </CardFooter>
                    </Card>
                    )}
                  </Box>
             ))}
        </Box>


        <Box display={visibleChat?"flex":"none"}   
           bg={"#f0f0f0"} width={"100%"} height={"100%"} gap={2}>
            {myChats.length ==0?(
              <Box bg={"#F5F5F5"} width={"20%"} padding={2}>
                Sem chat
              </Box>
            ):(
              <Box width={"20%"}>
              {myChats?.map((lista,i)=>(
              
          <Box  width={"100%"} key={i} padding={2}>
             <Flex
              bg={"white"}
              boxShadow={"1px 1px 5px grey"}
              borderRadius={"10px"}
              height={"60px"}
              padding={2}
              cursor={"pointer"}
              onClick={()=>seeMessage(lista.chatId)}
               >
                <Flex gap={2} 
                  alignItems={"center"}>
                  <Avatar name={lista.name} bg={"#D4D4D4"} color={"blue.800"} size={"sm"}/>         
                  {lista.name}</Flex>      
               </Flex>
          </Box>
             ))}
            </Box>
            )}
             

          <Flex bg={"white"}
          padding={5}
           width={"80%"}
           gap={2}
           flexDirection={"column"}>
            {message?.length ==0 ?(
              <Box>Vazio

                <Box 
                display={"flex"}
                alignItems={"center"}             
                width={"78%"} 
                height={"10%"}
                bg={"white"}
                gap={5}
                 marginTop={"35%"}
                position={"fixed"}>
                   <Input type='text'
                   onChange={(e)=>setMessageWrote(e.target.value)}
                    width={"70%"}
                /> <FiSend size={"30px"} cursor={"pointer"} color='blue' onClick={sendMessage}/>
                </Box>
                
              </Box>
            ):(
              <Box display={"flex"} alignItems={"center"} 
               flexDirection={"column"} gap={5} overflowY={"scroll"} 
                height={"110%"} width={"101%"}>
                   {message?.map((lista,i)=>(
              <Box key={i}  width={"50%"}>
                {lista.userId==user?.id_users ?(
                <Box 
                  bg={"orange.500"}
                  color={"white"}
                  display={'inline-block'}
                  boxShadow={"1px 1px 4px brown"}
                  maxW={"80%"}
                  marginLeft={"19%"}
                  padding={3}
                  height={"auto"}
                  borderRadius={20}>
                {lista.sms}
              </Box>
                ):(
                 <Box
                 display={"inline-block"}
                  bg={"whiteAlpha.800"}
                  boxShadow={"1px 1px 5px grey"}
                maxW={"80%"}
                padding={3}
                height={"auto"}
                borderRadius={20}>
                   {lista.sms}
                 </Box>
                )}
               
              </Box>
            ))}
               
            <Box 
                display={"flex"}
                alignItems={"center"} 
                width={"40%"} 
                height={"12%"}

                gap={5}
                 marginTop={"33%"}
                position={"fixed"}>
                  <Textarea 
                  bg={"white"}
                  width={"80%"} 
                  minH={"23px"}
                  
                  rows={1}
                  resize="none"
                  ref={textareaRef}
                  value={messageWrote}
                  onChange={handleInput}
                  overflow={"hidden"}/>
                  <Button colorScheme='orange'>
                    <FiSend size={"30px"} cursor={"pointer"} color='white' onClick={sendMessage}/></Button> 
                </Box>
              </Box>
            )}
             
          </Flex>
   
        </Box>
        {/*-----Fim da listagem dos carros ---------*/}
         
      


      {/*----- Modal, alert Dialog e Drawer ---------*/}
           
        <AlertDialogModal isOpen={isOpenDialog} onClose={onCloseDialog} idCarro={idCarro}/>
        <AlertSoldDialogModal isOpen={isOpenSoldDialog} onClose={onCloseSoldDialog} idCarro={idCarro}/>
          
      <Drawer
        isOpen={isOpenOferta}
        placement='left'
        onClose={onCloseOferta}
       
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color={"blue.500"}>Vejá todas as ofertas</DrawerHeader>

          <DrawerBody display={"flex"} flexDirection={"column"} gap={2}>
            
           {CarrosOfertado?.length == 0 ?(
          
          <Box 
            color={"grey"}
             height={"90%"}
             display={"flex"} 
             justifyContent={"center"}
             alignItems={"center"}
             fontFamily={"arial"}
             fontWeight={"bold"}> Sem ofertas </Box>
           ):(
            <Box 
            display={"flex"} 
            flexDirection={"column"}
            gap={5}>
             {CarrosOfertado?.map((lista,i)=>(
              <Flex key={i} 
              flexDirection={"column"}
              gap={2}
              bg={"white"}
              boxShadow={"1px 1px 5px grey"}
              borderRadius={"10px"}
              padding={2}
              height={"90px"}>
               
               <Flex
                 gap={2} 
                 alignItems={"center"} justifyContent={"space-between"}>
                  <Flex gap={2} 
                 alignItems={"center"}><Avatar name={lista.name} bg={"orange"} color={"white"} size={"sm"}/>         
                    <Text fontFamily={"arial"} fontWeight={"bold"}>{lista.name.replace(lista.name[0],lista.name[0].toUpperCase())}</Text></Flex>
                {user?.id_users==ownerId ? <FaBell color='orange' cursor={"pointer"} size={"20px"}/>:
                <Box display={lista.id_users==user?.id_users?"flex":"none"}> 
                <TbTrashX color='red'cursor={"pointer"} 
                  onClick={()=>DeleteOffer(idCarro)}/>
                </Box>
                }
                  
                    
               </Flex>

                
                <Flex 
                    gap={2} 
                 alignItems={"center"} justifyContent={"space-between"}>
                  <Text color={"grey"} display={"flex"} justifyContent={"center"} gap={2}>A pagar 
                    <Text color={"blue.600"}
                    fontWeight={"bold"}>{lista.oferta?.toLocaleString("pt-AO",{style:"currency",currency:"AOA"})}</Text>
               </Text>
                  
                   <TbMessage color='orange' cursor={"pointer"} size={"20px"}
                   onClick={()=>OpenChat(lista.id_users)}/>
                </Flex>
               

              </Flex>
            ))}
            </Box>
           )}
          </DrawerBody>
          <DrawerFooter gap={2} flexDirection={"column"} display={user?.id_users==ownerId?"none":"flex"}>
            <Input placeholder='Coloque a sua oferta...'
            type="number"
            name='valor'
            onChange={(e)=>setOfferValue(e.target.value as unknown as number)}/>
            <Button colorScheme='blue' width={"100%"} onClick={colocarOferta}>
              <Box display={loader ? "flex":"none"}><Spinner/></Box>
              {loader ? " ":"Save"}
              </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/*-----Ponto final em Modal, alert Dialog e Drawer ---------*/}
      </Box>
   </Box>
    )
}