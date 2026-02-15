// CSS imports
import { Link } from 'react-router-dom';
import Auth from '../../components/Auth/Auth';
import './Auth.css';

function Login() {
    return (
        <div className="container">
            <div className="row">
                <h2 className="home-title text-center">
                    Welcome to Shopify
                </h2>
            </div>
            <div className="login-wrapper" id="loginForm">
                <h4 className="text-center">Login</h4>
                <Auth />
                <div className="signup-btn text-center" id="showSignupBtn">
                    <Link  to="/signup">
                     Do not have an Account? Sign Up Here
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default Login;