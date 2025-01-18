import { useNavigate } from "react-router-dom";
export default function Button({ children })
{
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };
    return(
        <button onClick={handleLogin} className="auth-button">{children}</button>
    );
}