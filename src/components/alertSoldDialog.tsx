import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { userService } from '../service/userService'

interface alertDialogProps{
    isOpen:boolean
    onClose:()=>void
    idCarro:number
}


export function AlertSoldDialogModal({isOpen,onClose,idCarro}:alertDialogProps) {
  const cancelRef=React.useRef(null)
  const sold=userService(state=>state.soldCar)

  const Finalizar=()=>{
     sold(idCarro)
     onClose()
  }
  return (
    <>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Atenção
            </AlertDialogHeader>

            <AlertDialogBody>
              Este carro será marcado como vendido?. Está opção é
              irreversível
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red'  onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='blue' onClick={Finalizar} ml={3}>
                Vendido
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}