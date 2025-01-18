import NavBar from "../HomePage/NavBar.jsx";
import Hero from "./Hero.jsx";
import LoginButtons from "./LoginButtons.jsx";
import Reviews from "./Reviews.jsx";    
import AboutUs from "./AboutUs.jsx";
import ContactUs from "./ContactUs.jsx";
import Footer from "./Footer.jsx";
export default function Home()
{
    return(
        <>
            <NavBar />
            <div id="body">
                <Hero />
                <LoginButtons />
                <Reviews />
                <AboutUs />
                <ContactUs />
                <Footer />
            </div>
        </>
    );
    
}