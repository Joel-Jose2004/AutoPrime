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

interface alertDialogProps{
    isOpen:boolean
    onClose:()=>void
    idCarro:number
}


export function AlertDialogModal({isOpen,onClose,idCarro}:alertDialogProps) {
  const cancelRef=React.useRef(null)


  const Finalizar=()=>{
     alert(idCarro)
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
              Notificar
            </AlertDialogHeader>

            <AlertDialogBody>
              tens a certeza que queres notificar o proprietário do carro?. Está opção é
              irreversível
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red'  onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='blue' onClick={Finalizar} ml={3}>
                Notificar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}