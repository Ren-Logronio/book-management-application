import React from 'react';
import { Link } from 'react-router-dom';
/*
import About from '../Components/About'
import Footer from '../Components/Footer'
import ImageSlider from '../Components/ImageSlider'
import News from '../Components/News'
import PhotoGallery from '../Components/PhotoGallery'
import PopularBooks from '../Components/PopularBooks'
import RecentAddedBooks from '../Components/RecentAddedBooks'
import ReservedBooks from '../Components/ReservedBooks'
import Stats from '../Components/Stats'
import WelcomeBox from '../Components/WelcomeBox'
*/

function Home() {
    return (
        <div id='home' className='min-vh-100 d-flex justify-content-center'>
            <div className="d-flex flex-column justify-content-center">
                <div className='d-flex flex-column justify-content-center'>
                    <img src='/logo.png' alt='Book management app logo ' className='align-self-center mb-2' style={{height: "145px", width: "145px"}} />
                    <p className='h1 mb-3'>Book Management System</p>
                    <Link to="/login" className='rounded rounded-2 btn btn-outline-success w-100'>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

/*

<WelcomeBox/>
            <About/>
            <Stats/>
            <RecentAddedBooks/>
            <PopularBooks/>
            <ReservedBooks/>
            <News/>
            <PhotoGallery/>
            <Footer/>

*/

export default Home
