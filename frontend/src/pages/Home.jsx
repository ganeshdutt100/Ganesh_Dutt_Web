import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Stats from '../components/home/Stats'
import FeaturedProjects from '../components/FeaturedProjects'
import Experience from '../components/Experience'
import CallToAction from '../components/CallToAction'
import TechStack from '../components/TechStack'



const Home = () => {
    return (
        <div>
            <HeroSection />
            <Stats />

            <TechStack />



            <FeaturedProjects />
            <Experience />

            <CallToAction />

        </div>
    )
}

export default Home