// CSS imports
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../components/Auth/Auth';
import './Auth.css';
import axios from 'axios';
import { sigin } from '../../apis/fakeStoreProdApis';
import { useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import {jwtDecode} from "jwt-decode";
import UserContext from '../../context/UserContext';

function Login() {
      const authRef = useRef(null);
       const navigate = useNavigate();
    const [token, setToken] = useCookies(['jwt-token']);
    const {setUser}=useContext(UserContext);
    async function onAuthFormSubmit(formDetails) {
        try {
            const response = await axios.post(sigin(), {
                username: formDetails.username,
                email: formDetails.email,
                password: formDetails.password
            }); 
            const tokenDetails=jwtDecode(response.data.token);
            setUser({username:tokenDetails.user,id:tokenDetails.id});
            console.log(tokenDetails);
            setToken('jwt-token', response.data.token, {httpOnly: true});
            navigate('/');
        } catch (error) {
            authRef.current.resetFormData();
            console.log(error);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <h2 className="home-title text-center">
                    Welcome to Shopify
                </h2>
            </div>
            <div className="login-wrapper" id="loginForm">
                <h4 className="text-center">Login</h4>
                <Auth onSubmit={onAuthFormSubmit} ref={authRef} />
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