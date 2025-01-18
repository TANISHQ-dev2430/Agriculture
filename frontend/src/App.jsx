import NavBar from './Components/NavBar.jsx';
import Hero from './Components/Hero.jsx';
import LoginButtons from './Components/LoginButtons.jsx';
import Reviews from './Components/Reviews.jsx';
import AboutUs from './Components/AboutUs.jsx';
import ContactUs from './Components/ContactUs.jsx';
import Footer from './Components/Footer.jsx';

function App() {
  return (
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

export default App;