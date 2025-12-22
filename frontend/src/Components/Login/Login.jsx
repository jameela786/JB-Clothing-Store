import React,{useState} from 'react'
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
    

    const [formData,setFormData] = useState({email:"",password:""});
    const [touched,setTouched] = useState({email:"",password:""});
    const [errors,setErrors] = useState({email:"",password:""});
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+\@[^\s@]+\.[^\s@]+$/;

    const validateField = (name,value)=>{
        switch(name){
            case 'email':
                if(!value.trim()){
                    return "Email is required"
                }
                if(!emailRegex.test(value)){
                    return "Enter valid email"
                }
                return ''
            case 'password':
                if(!value.trim()){
                    return "Password is required"
                }
                if(value.length<6){
                    return "Password must be at least 6 characters"
                }
                return ''
            default:
                return ''
        }
    };

    const handleOnChange = (e)=>{
        const {name,value} = e.target;

        setFormData(prev=>({
            ...prev,[name]:value
        }));

        if(touched[name]){
            setErrors(prev=>({
                ...prev,[name]:validateField(name,value)
            }))
        };
    };

    const handleOnBlur=(e)=>{
        const {name,value} = e.target;
        setErrors(prev=>({
            ...prev,[name]:validateField(name,value)
        }));
        setTouched(prev=>({
            ...prev,[name]:true
        }));
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        const emailErrors = validateField('email',formData.email);
        const passwordErrors = validateField('password',formData.password);

        setErrors({
            email:emailErrors,
            password:passwordErrors
        });

        setTouched({
            email:true,
            password:true
        });

        if(!emailErrors && !passwordErrors){
            console.log("can now submit data to api",formData)
            setIsLoggedIn(true);
            navigate('/landingpage');
        }

    }

  return (
    <div className='login_container'>
        <div className='login_card'>
            <h1 className='login_title'>WELCOME</h1>
            <div className='login_form'>
                <div className='form_group'>
                    <label htmlFor='email' className='form_label'>Email</label>
                    <input className={`form_input ${errors.email && touched.email ? 'input_error' : '' }`} name="email" value={formData.email} onChange={handleOnChange} onBlur={handleOnBlur}/>
                    {errors.email && touched.email && (
                        <span className='error_message'>{errors.email}</span>
                    )}
                </div>
                <div className='form_group'>
                    <label className='form_label'>Password</label>
                    <input className={`form_input ${errors.password && touched.password ? 'input_error' : '' }`} name="password" value={formData.password} onChange={handleOnChange} onBlur={handleOnBlur}/>
                    {errors.password && touched.password && (
                        <span className='error_message'>{errors.password}</span>
                    )}
                </div>
                <button className='submit_btn' onClick={handleSubmit}>Login</button>
                <p className='login_footer'>Don't have an account? <a href="/register" className='signup_link'>Sign up</a> </p>
            </div>
        </div>
    </div>
  )
}

export default Login
