import React from 'react'
import News from '../ComponentHome/News/News'
import Promotion from '../ComponentHome/Promotion/Promotion'
import AboutUs from '../ComponentHome/AboutUs/AboutUs'
import CarouselBanner from '../ComponentHome/Carousel/CarouselBanner'
import MovieSection from '../ComponentHome/Movie/MovieSection'
import articles from '@/lib/cinemaCorner.data'
import '../../styles/main.css'
export default function Home() {
  return (
    <div className='space-y-16 md:space-y-20'>
       <CarouselBanner/>
       <MovieSection/>
       <News items={articles}/>
<AboutUs/>
       <Promotion/>
       
    </div>
  )
}
