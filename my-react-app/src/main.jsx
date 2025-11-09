import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import BuyTicket from './Pages/ListElement/BuyTicket.jsx'
import Movie from './Pages/ListElement/TabMovie/pages/Movie.jsx'
import Event from './Pages/ListElement/TabEvent/Event.jsx'
import Product from './Pages/ListElement/TabProduct/Product.jsx'
import {Provider} from 'react-redux'
import store from '../src/Pages/ComponentBuyTicket/redux/store.js'
import Home from './Pages/Home/Home.jsx'
import CinemaCorner from './Pages/ListElement/CinemaCorner/CinemaCorner'
import CinemaCornerDetail from './Pages/ListElement/CinemaCorner/Detail'
import { QueryClient, QueryClientProvider  } from '@tanstack/react-query'
import MovieDetail from './Pages/ListElement/TabMovie/detail/MovieDetail'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
<Route path='/' element={<App/>}>
<Route index element={<Home/>} />
<Route path='movie' element={<Movie/>} />
<Route path='movie/:id' element={<MovieDetail/>} />
<Route path='event' element={<Event/>}/>
<Route path='product' element={<Product/>} />
<Route path='buyticket' element={<BuyTicket/>} />
<Route path='cinemacorner' element={<CinemaCorner/>} />
<Route path='cinemacorner/:slug' element={<CinemaCornerDetail/>}/>
</Route>



      </Routes> 



    </BrowserRouter>
    
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
