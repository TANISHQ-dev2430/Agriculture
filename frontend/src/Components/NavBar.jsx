import logoImg from '../assets/logo.png';
export default function NavBar()
{
    const handleLogoClick = () => {
          window.location.href = "/"; // Redirect to the home page
    };
    return(
        <div className="navbar">
            <header className='logo'>
                <img src={logoImg} alt="Logo Image" onClick={handleLogoClick} />
                {/* <h1>AgroBazaar</h1> */}
            </header>
            <nav className="nav-links">
                <a href="#Home">Home</a>
                <a href="#aboutus">About Us</a>
                <a href="#feedback">Feedbacks</a>
            </nav>
            <div className="search-login">
                <input type="text" placeholder="Search.." className="search-bar" />
                <button className="login-btn">Login</button>
            </div>
        </div>
    );

}