import { Box, Button, Flex, Image, Img, Text, useDisclosure, useToast, ButtonGroup, Input, Avatar, Spinner, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { FiPhone } from "react-icons/fi";
import im from "../assets/2021-bugatti-chiron-super-sport-300.jpg";
import icone from '../assets/FullLogo-removebg-preview.png';
import { GoMail } from "react-icons/go";
import { ModalCar } from '../components/publicModalCar';
import { userService } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../service/authService';
import type { User } from '../types/userType'
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,} from '@chakra-ui/react'
import { TbTrashX } from 'react-icons/tb';
import { FaBell } from 'react-icons/fa6';
import { AlertDialogModal } from '../components/alertDialog';
import { TbUserCircle } from 'react-icons/tb';
import {LuFuel} from 'react-icons/lu'
import { IoColorFillSharp} from 'react-icons/io5'
import { TbCircuitSwitchClosed } from 'react-icons/tb';
import {SiCoronaengine} from "react-icons/si"
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


export function HomePage(){

const [user,setUser]=useState<User>()
const [carro,setCarro]=useState<carType[]>()

const {isOpen,onOpen,onClose}=useDisclosure()
const {isOpen:isOpenOferta,onOpen:onOpenOferta,onClose:onCloseOferta}=useDisclosure()
const {isOpen:isOpenDialog,onOpen:onOpenDialog,onClose:onCloseDialog}=useDisclosure()
const [logado,setLogado]=useState(false)
const listAllCars=userService(state=>state.listAllCars)
const listAllOffersCars=userService(state=>state.listAllOffersCars)
const cars=userService(state=>state.cars)
const carsOffer=userService(state=>state.carsOfer)
const postOffer=userService(state=>state.postOffer)
const deleteOffer=userService(state=>state.deleteOffer)
const [ownerId,setOwnerId]=useState(0);
const [idCarro,setIdCarro]=useState(0);
const [offerValue,setOfferValue]=useState<number>(0)
const [CarrosOfertado,setCarrosOfertados]=useState<carOfer[]>()
const login=authService(state=>state.getUserById)
const navigate=useNavigate()
const toast=useToast()
const [loader,setLoader]=useState(false)
const [scrolled,setScrolled]=useState(false)

const ver=useEffect(()=>{
    verify()
    listAllCars()
    listAllOffersCars()
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

useEffect(()=>{
   const handleScroll=()=>{
    if(window.scrollY > 10){
      setScrolled(true);
    }else{
      setScrolled(false)
    }
   }
   window.addEventListener("scroll",handleScroll)

   return ()=>{
    window.removeEventListener("scroll",handleScroll)
   }
},[])
const OpenModalCar=()=>{
   if(user){
       onOpen()
   }else{
      toast({
         title: "Erro",
         description:"Faça o login",
         status: "error",
         duration: 3000,
         isClosable: true
        })
   }

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


    return(
     <Box height={"auto"} minHeight={"100vh"} bg={"#f0f0f0"}>
      <Box height={"100vh"} bg={"white"}>

        {/*-----Menu Bar ---------*/}
        <Box height={{base:"10%",md:"10%",lg:"10%"}} display={"flex"} 
          justifyContent={{base:"flex-end",md:"flex-end",lg:"space-between"}} alignItems={"center"}
               bg={scrolled?"transparent":"white"} gap={5} transition={"0.3s ease"} position={"fixed"}
                zIndex={"1"} width={"100%"} backdropFilter={scrolled?"blur(10px)":"none"}>


                  <Box display={"flex"} alignItems={"center"}>
                     <Img src={icone} height={"110px"} />
                </Box>

              <Box  width={{base:"90%",md:"60%",lg:"10%"}} display={"flex"} padding={"3px"}
                 alignItems={"center"}  
                gap={{base:"3%",md:"10%",lg:"10%"}}>  
                
                
                {logado ? <Flex  width={"60%"}
                alignItems={"center"} 
                gap={5}>
                     <TbUserCircle size={"50px"} color='brown' cursor={"pointer"}
                     onClick={()=>navigate("/UserPage")}/>
                </Flex>
                  :
                   <Button 
                       bg={"blue.800"} _hover={{bg:"blue.800"}}
                   width={{base:"30%",md:"30%",lg:"30%"}} color='white' onClick={()=>navigate("/Login")}>Login</Button>}
                         
              </Box>
        </Box>
        {/*-----Fim Menu Bar ---------*/}

          
                  <Box bg={"black"} height={"80%"} width={"100%"}>
                     <Box backgroundImage={im} height={"70%"} 
                     width={"100%"} backgroundSize={"cover"} opacity={"70%"}
                     display={"flex"} justifyContent={"center"} position={"absolute"} top="10%"
                      flexDirection={"column"} gap={"5"} alignItems={"center"}
                     ></Box>
                  </Box>
               
                  <Box display={"flex"} alignItems={"center"}
                        flexDirection={"column"} gap={"12px"}
                         width={{base:"90%",lg:"30%"}} height={"40%"} position={"absolute"} top={"35%"}
                         left={{base:"2%",lg:"60%"}}>
                        <Text color='white' fontSize={25} fontWeight={"bold"} fontFamily={"arial"}>Compre o seu carro</Text>
                        <Text color="white" fontSize={"16px"}
                        fontFamily={"arial"}>Aqui vais encontrar todos os carros à venda
                            se queres vender publica também o teu produto.
                             </Text>
                        <Button width={"50%"} outline='link' colorScheme={"orange"} 
                         onClick={OpenModalCar}>Publicar</Button>
                  </Box>


                  
                <Box
                 bg={"whiteAlpha.800"}
                 width={"100%"}
                 height={"30%"}
                 display={"flex"}
                 gap={1}
                 justifyContent={"center"}
                 flexDirection={"column"}
                 alignItems={"center"}
                >

                  <Text 
                  fontFamily={"arial"} 
                  color={"orange.500"}
                  fontSize={"13px"} 
                  fontWeight={"bold"}>
                    NOSSO ESTOQUE
                   </Text>

                  
                  <Text 
                  fontFamily={"arial"}
                  color={"black"}
                  fontSize={"25px"} 
                  fontWeight={"bold"}>
                  Enconte o carro ideal para você
                   </Text> 

                  <Text
                  fontFamily={"arial"}
                  color={"gray"}
                  fontSize={"15px"} >
                   Veículos todos prontos a sua disposição e de 
                   alta qualidade
                  </Text> 

      </Box>



               

        {/*-----Início da listagem dos carros---------*/}
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={20} padding={5} 
           bg={"#f0f0f0"} width={"100%"}>
            

             {Object.entries(cars).map(([i,lista]:any)=>(
                <Box key={i}>
                    <Card maxW='sm' maxH={"xl"} key={i} width={"340px"} overflow={"hidden"}>
                          <Img src={`http://localhost:3000/${lista.image}`}  height={"300px"}/>

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
                              <Button  variant={"unstyled"} onClick={()=>abrirAlertDialog(lista.id_carro)} >
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
                    
                </Box>
             ))}
        </Box>
        {/*-----Fim da listagem dos carros ---------*/}
         

        {/*-----Footer ---------*/}
               
              <Box bg={"blackAlpha.800"} color={"white"} height={"30%"} width={"100%"} 
              gap={"1%"}
              display={"flex"} flexWrap={"wrap"} justifyContent={"center"}
              >

                <Box width={"48%"}
                display={"flex"} flexDirection={"column"} gap={"10px"} padding={"10px"}>
                 
                 
                  
                  <Box display={"flex"} gap={"10px"}>
                  <FiPhone size={25} />
                  <Text>+244 923 456 789</Text>
                  </Box>

                  <Box display={"flex"} gap={"10px"} >
                  <GoMail size={25}/>
                  <Text>contato@StandCarro.com</Text>
                  </Box>
                </Box>
                  
 


                <Box  width={"48%"}
                display={"flex"} flexDirection={"column"} gap={"10px"} padding={"10px"}>
                 
                   <Text>Sobre o site</Text>
                   <Text>Este site foi desenvolvido para facilitar a divulgação de vendas de carros por 
                    parte das pessoas que querem vendo-lo.</Text>
                </Box>


              <Box width={"100%"}
              display={"flex"} justifyContent={"center"}>
              <Text>Copyright 2025. All rights Reserved-Joel josé</Text> 
               </Box>

              </Box>
        {/*-----Final do footer ---------*/}


      


      {/*----- Modal, alert Dialog e Drawer ---------*/}
           
        <ModalCar isOpen={isOpen} onClose={onClose} dadosUser={user}  />
        <AlertDialogModal isOpen={isOpenDialog} onClose={onCloseDialog} idCarro={idCarro}/>
          
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
                 alignItems={"center"} ><Avatar name={lista.name} bg={"#D4D4D4"} color={"blue.800"} size={"sm"}/>         
                {lista.name}</Flex>
                {user?.id_users==ownerId ? <FaBell color='brown' cursor={"pointer"} size={"20px"}/>:
                <Box display={lista.id_users==user?.id_users?"flex":"none"}> 
                <TbTrashX color='red'cursor={"pointer"} 
                  onClick={()=>DeleteOffer(idCarro)}/>
                </Box>
                }
                  
                    
               </Flex>

                
                <Box >
                  
                  A pagar {lista.oferta?.toLocaleString("pt-AO",{style:"currency",currency:"AOA"})}
                </Box>


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