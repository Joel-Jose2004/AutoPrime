import { Box, Button, Flex, Image, Img, Text, useDisclosure, useToast,Stack, ButtonGroup } from '@chakra-ui/react';
import { useDebugValue, useEffect, useState } from 'react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { FiPhone } from "react-icons/fi";
import im from "../assets/2021-bugatti-chiron-super-sport-300.jpg";
import dadorSangue from "../assets/rent-Mercedes-AMG-G63-in-Dubai-1-900x600.jpg";
import dadorSangue2 from "../assets/410908_2021_mercedes-benz_gle-class1684437019338.jpg"
import icone from '../assets/react.svg';
import imagem from "../assets/image/analisar-tipo-sanguineo-fundamental-para-escolher-um-doador-sangue-5500e34233eeb.webp"
import { TbTargetArrow } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import axios from "axios"
import { ModalCar } from '../components/publicModalCar';
import { userService } from '../service/userService';

import { useNavigate } from 'react-router-dom';


interface conta{
    id:number,
    brand:string,
    model:string,
    color:string,
    engine:string,
    sold:boolean
}

export function Car(){

const [logado,setLogado]=useState(false)
const [user,setUser]=useState<conta[]>()
const {isOpen,onOpen,onClose}=useDisclosure()
const listAllCars=userService(state=>state.listAllCars)
const cars=userService(state=>state.cars)
const navigate=useNavigate()



useEffect(()=>{
    listar()
    listAllCars()

},[])

const listar=async()=>{
 
}

    return(
     <Box height={"auto"} minHeight={"100vh"} bg={"#f0f0f0"}>
      <Box height={"100vh"} bg={"white"}>

        {/*-----Menu Bar ---------*/}
        <Box height={{base:"10%",md:"10%",lg:"10%"}} display={"flex"} 
          justifyContent={{base:"flex-end",md:"flex-end",lg:"space-between"}} alignItems={"center"}
               bg={"white"} gap={5} position={"fixed"}
                zIndex={"1"} width={"100%"}>


                  <Box display={"flex"} alignItems={"center"}>
                     <Img src={icone} height={"50px"}  onClick={()=>navigate("/")}/>
                    <Text
                   fontFamily={"arial"} fontSize={{base:"20px",md:"25px",lg:"23px"}}
                  color={"blue.800"}>Stand-Cars</Text></Box>

              <Box  width={{base:"90%",md:"60%",lg:"35%"}} display={"flex"} padding={"3px"}
                justifyContent={{base:"flex-end",lg:"center"}} alignItems={"center"} 
                gap={{base:"3%",md:"10%",lg:"10%"}}>  
                


                  {logado == true?(
                      <Button width={{base:"30%",md:"30%",lg:"30%"}} color='blue.600'>Logout</Button>
                  ):(
                   <Button 
                       bg={"blue.800"} _hover={{bg:"blue.800"}}
                   width={{base:"30%",md:"30%",lg:"30%"}} color='white'>Login</Button>
                  )}
                         
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
                        <Text color='white' fontSize={25} fontWeight={"bold"}>Compre o seu carro</Text>
                        <Text color="white" fontSize={"16px"}>Aqui vais encontrar todos os carros à venda
                            se queres vender publica também o teu produto.
                             </Text>
                        <Button width={"50%"} color={"white"} bg={"blue.700"} _hover={{bg:"blue.400"}}
                        opacity={"80%"} onClick={onOpen}>Publicar</Button>
                  </Box>


                  
                <Box
                 bg={"whiteAlpha.800"}
                 width={{base:"100%", md:"100%",lg:"100%"}}
                 height={{sm:"80%",md:"100%",lg:"100%"}}
                 display={{base:"block",md:"flex",lg:"flex"}}
                 justifyContent={"center"}
                 flexDirection={"column"}
                 alignItems={"center"}
                >

                  <Box  display={"flex"} flexDirection={"column"}
                  justifyContent={"center"} alignItems={"center"} gap={20}>

                <Box overflow={"hidden"} 
                display={"flex"} padding={"12px"}
                gap={2}
              justifyContent={"space-between"} width={{base:"90%",md:"90%",lg:"80%"}}
                 height={{base:"130%",sm:"450%",md:"70%",lg:"42%"}} textAlign={"justify"}
                >
                 

                <Text position={"relative"} top={"12px"} width={{base:"100%",sm:"100%",lg:"55%"}} opacity={"80%"}>
                      <Text fontSize={"145%"} fontWeight={"bold"} color={"blue.900"}>Bugatti</Text>
                
                  Os automóveis Bugatti são reconhecidos mundialmente como hipercarros de luxo,caracterizados por
                  desempenho extremo, motores W16 de 8 litros com 4 turbos (gerando cerca de 1500 - 1600 cv),
                  velocidades máximas superiores a 400 km/h (com recordes próximos de 490 km/h), estrutura em fibra
                  de carbono, tração integral e design exclusivo e aerodinâmico.
                </Text>   <Image src={dadorSangue2} width={"40%"} height={{md:"90%",lg:"100%"}}
                      display={{base:"none",sm:"none",md:"flex",lg:"flex"}}/>
                </Box>   


                   <Box overflow={"hidden"} display={"flex"} padding={"12px"}
                   gap={2}
                justifyContent={"space-between"} width={{base:"90%",md:"90%",lg:"80%"}}
                 height={{base:"130%",sm:"140%",md:"70%",lg:"40%"}} textAlign={"justify"}
                >
                  <Image src={dadorSangue} width={"40%"} height={{md:"90%",lg:"100%"}}
                  display={{base:"none",sm:"none",md:"flex",lg:"flex"}}/>

                <Text position={"relative"} top={"12px"} width={{base:"100%",sm:"100%",lg:"55%"}} opacity={"80%"}>
                      <Text fontSize={"145%"} fontWeight={"bold"} color={"blue.900"}>Mercedes-AMG g63</Text>
                  É um SUV de alto luxo e performance, equipado com motor 4.0L V8 Biturbo que entrega 585 cv e 850 Nm
                  de torque. Com tração integral e câmbio automático de 9 marchas AMG Speedshift, acelera de 0 a 100 km/h
                  em 4,4 a 4,5 segundos. Destaca-se pelo design icônico, suspensão adaptativa, luxo interior e capacidades
                  off-road excepcionais.
       
                </Text> 
                </Box>   

          </Box>

      </Box>



               


          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={20} padding={5} 
           bg={"#f0f0f0"} width={"100%"}>

             {user?.map((lista,i)=>(
                <Box key={i}>
                    <Card maxW='sm' maxH={"xl"} key={i} width={"340px"} overflow={"hidden"}>
                          <Img src={im}  />

                         <Box display={"flex"} justifyContent={"space-around"} padding={2}>
                            <Box display={"flex"} gap={2}>
                                <Text fontWeight={"bold"} color={"blue.700"}>Marca</Text> {lista.brand}
                            </Box>

                            <Box display={"flex"} gap={2}>
                                <Text fontWeight={"bold"} color={"blue.700"}>Modelo</Text> {lista.model}
                            </Box>
                        </Box> 

                      <CardBody >
                       
                        <Stack mt='1' spacing='5'>
                    
                          
                    
                          <Text  padding={2} borderRadius={5} bg={"#EFF6FF"}
                          borderLeft={"3px solid rgb(139 39 39)"} color={"blackAlpha.800"}>
                            
                          </Text>
                    
                        </Stack>
                      </CardBody>
                     
                      <CardFooter justifyContent={"space-between"}
                      alignItems={"center"}>
                        <ButtonGroup spacing='2'>
                          <Button variant='outline' colorScheme='blue'
                    
                          >
                            Oferta
                          </Button> 
                        </ButtonGroup>
                    
                           
                      </CardFooter>
                    </Card>
                    
                </Box>
             ))}
        </Box>




               
              <Box bg={"blackAlpha.800"} color={"white"} height={"30%"} width={"100%"} 
              gap={"1%"}
              display={"flex"} flexWrap={"wrap"} justifyContent={"center"}
              >

                <Box width={"48%"}
                display={"flex"} flexDirection={"column"} gap={"10px"} padding={"10px"}>
                 
                 
                  
                  <Box display={"flex"} gap={"10px"}>
                  <FiPhone size={25}/>
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

         <ModalCar isOpen={isOpen} onClose={onClose}/>


      </Box>
   </Box>
 
    )
}