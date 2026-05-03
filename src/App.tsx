import { HomePage } from './paginas/HomePage'
import { Login } from './paginas/Login';
import { AddCar } from './paginas/AddCar';
import { UserPage } from './paginas/UserPage';
import { ChakraProvider,Box } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import {  HOME_ROUTE,LOGIN_ROUTE,USER_PAGE_ROUTE,ADDCAR_PAGE_ROUTE } from "./utils/constants"

function App() {


  const route=createBrowserRouter([
    {
      path:HOME_ROUTE.route,
      element:<HomePage/>
    },{
      path:LOGIN_ROUTE.route,
      element:<Login/>
    },{
      path:USER_PAGE_ROUTE.route,
      element:<UserPage/>
    },{
      path:ADDCAR_PAGE_ROUTE.route,
      element:<AddCar/>
    }
  ])
  return (
    <ChakraProvider>
    
    <Box>
      <RouterProvider router={route}/>
      
    </Box>
    </ChakraProvider>
    
  )
}

export default App
