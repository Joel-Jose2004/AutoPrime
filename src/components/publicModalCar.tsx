import { Box, FormControl, FormLabel,Spinner, useTimeout } from "@chakra-ui/react";

import { Text, Select, Button,Modal, ModalContent, ModalBody, ModalCloseButton, 
        ModalOverlay, ModalHeader, Input,VStack} from '@chakra-ui/react'
import { useState } from "react";
import { userService } from "../service/userService";
import type { User } from "../types/userType";
import type {carType} from "../types/carType"

interface ModalProps{
    isOpen:boolean,
    onClose:()=>void,
    dadosUser:User|undefined
}


export function ModalCar({isOpen,onClose,dadosUser}:ModalProps){

    const [carro,setCarro]=useState<carType>()
    const [loader,setLoader]=useState(false)
    const publica=userService(state=>state.publicar)

    const publicar=async()=>{
         setLoader(true)
        setTimeout(()=>{
            setLoader(false)
            onClose()
        },2000)


        publica(carro as carType,dadosUser?.id_users as number).then((res)=>{
         console.log("resolvido com sucesso"+res)
        })        
        
    }



    return(
        <Box>
           
                    
           <Modal isOpen={isOpen} onClose={onClose} >
                         <ModalOverlay/>
                            <ModalContent width={"30%"}>
                               <ModalCloseButton/>
                               <ModalHeader display={"flex"} justifyContent={"center"} color={"blue.600"}
                               fontWeight={"bold"} fontSize={"larger"}>Solicitar</ModalHeader>
                               <ModalBody>

                               <FormControl gap={3} >

                                 <VStack>
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

                                <Button bg={"blue.600"} color={"white"} _hover={{bg:"blue.500"}} w={"100%"}
                                    onClick={publicar}>
                                    <Box display={loader ? "flex":"none"}><Spinner/></Box>
                                    {loader ? " ":"Publicar"}</Button>
                             </ModalBody>
                          </ModalContent>
                       </Modal>
           
           
           
            
        </Box>
    )
}