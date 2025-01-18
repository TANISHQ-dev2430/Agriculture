export default function NavBar()
{
    return(
        <div className="navbar">
            <header>
                <img src="" alt="Logo Image" />
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