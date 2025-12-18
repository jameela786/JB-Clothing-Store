import React, { useEffect, useState } from 'react'
import { useFormAction } from 'react-router-dom';
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmpassword: '',
        address: '',
        phonenumber: ''
    });
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmpassword: '',
        address: '',
        phonenumber: ''
    });
    const [touched, setTouched] = useState({
        fullName: false,
        email: false,
        password: false,
        confirmpassword: false,
        address: false,
        phonenumber: false
    });

    const [isFormValid, setIsFormValid] = useState(false)

    const emailRegex = /^[\s]+@[\s]+\.[\s]+$/;
    const phoneRegex = /[\s]+$/;



    const validateFields = (name, value) => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) {
                    return 'Fullname is required'
                }
                if (value.length < 2) {
                    return 'FullName must be atleast 2 charecters'
                }
                return ''
            case 'email':
                if (!value.trim()) {
                    return 'Email is required'
                }
                if (emailRegex.test(value)) {
                    return 'Enter valid email'
                }
                return ''
            case 'password':
                if (!value) {
                    return 'Password is required'
                }
                if (value.length < 6) {
                    return 'Password must be atleast 6 charecters'
                }
                return ''
            case 'confirmpassword':
                if (!value) {
                    return 'confirm password is required'
                }
                if (value !== formData.password) {
                    return 'Password does not match'
                }
                return ''
            case 'address':
                if (!value.trim()) {
                    return 'Address is required'
                }
                if (value.length < 6) {
                    return 'Address must be atleast 6 charecters'
                }
                return ''
            case 'phonenumber':
                if (!value.trim()) {
                    return 'PhoneNumber is required'
                }
                if (phoneRegex.test(value)) {
                    return 'Enter valid Phone number'
                }
                if (value.length < 10) {
                    return 'Phone number must be 10 charecters'
                }
                return ''
            default:
                return ''

        };
    };

    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every(value=>value.trim() !== '');
        const noErrors = Object.values(errors).every(each=>each.trim() === '');
        const allFieldsValid = Object.keys(formData).every(key=>validateFields(key,formData[key])==='');
        setIsFormValid(allFieldsFilled && noErrors && allFieldsValid);
    }, [formData, errors]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev, [name]: value
        }));


        if (touched[name]) {
            setErrors(prev => ({
                ...prev, [name]: validateFields(name, value)
            }));
        };

        if(name=='password' && touched.confirmpassword){
            setErrors(prev=>({
                ...prev,confirmpassword: formData.confirmpassword !== value && formData.confirmpassword ?  'password does not match' : ''
            }))
        }

    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setTouched(prev => ({
            ...prev, [name]: true
        }));

        setErrors(prev => ({
            ...prev, [name]: validateFields(name, value)
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach(key=>{
            newErrors[key] = validateFields(key,formData[key])
            }
        );
        setErrors(newErrors);

        const allTouched = {};
        Object.keys(touched).forEach(key=>{
            allTouched[key] = true;
        });
        setTouched(allTouched);

        const FormisValid = Object.values(newErrors).every(error=>error==='');
        console.log("check")
        if(FormisValid){
            console.log('Registration data:', {
                fullName: formData.fullName,
                email: formData.email,
                address: formData.address,
                phoneNumber: formData.phonenumber
              });
        }
        resetForm();
    }

    const resetForm = ()=>{
        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmpassword: '',
            address: '',
            phonenumber: ''
        });

        setErrors({
            fullName: '',
            email: '',
            password: '',
            confirmpassword: '',
            address: '',
            phonenumber: ''
        })

        setTouched({
            fullName: false,
            email: false,
            password: false,
            confirmpassword: false,
            address: false,
            phonenumber: false
        })
    }

    return (
        <div className='register_container'>
            <div className='register_card'>
                <h1 className='register_title'>Register</h1>
                <div className='register_form'>
                    <div className='form_group'>
                        <label className='form_label' htmlFor='name'>FullName</label>
                        <input className={`form_input ${errors.fullName && touched.fullName ? 'input_error' : ''}`}  placeholder="Enter your full name" name="fullName" value={formData.fullName} onBlur={handleBlur} onChange={handleChange}/>
                        {errors && touched.fullName && (<span className='error_message'>{errors.fullName}</span>)}
                    </div>
                    <div className='form_group'>
                        <label className='form_label' htmlFor='email'>Email</label>
                        <input className={`form_input ${errors.email && touched.email ? 'input_error' : ''}`} placeholder="Enter your email" name="email" value={formData.email} onBlur={handleBlur} onChange={handleChange}/>
                        {errors && touched.email && (<span className='error_message'>{errors.email}</span>)}
                    </div>
                    <div className='form_group'>
                        <label className='form_label' htmlFor='password'>Password</label>
                        <input type="password" className={`form_input ${errors.password && touched.password ? 'input_error' : ''}`} placeholder="Enter your password" name="password" value={formData.password} onBlur={handleBlur} onChange={handleChange}/>
                        {errors && touched.password && (<span className='error_message'>{errors.password}</span>)}
                    </div>
                    <div className='form_group'>
                        <label className='form_label' htmlFor='confirmpassword'>Confirm password</label>
                        <input type="password"  className={`form_input ${errors.confirmpassword && touched.confirmpassword ? 'input_error' : ''}`} placeholder="Enter your confirm password" name="confirmpassword" value={formData.confirmpassword} onBlur={handleBlur} onChange={handleChange}/>
                        {errors && touched.confirmpassword && (<span className='error_message'>{errors.confirmpassword}</span>)}
                    </div>
                    <div className='form_group'>
                        <label className='form_label' htmlFor='address'>Address</label>
                        <textarea rows={3}  className={`form_input form-textarea ${errors.address && touched.address ? 'input_error' : ''}`} placeholder="Enter your address" name="address" value={formData.address} onBlur={handleBlur} onChange={handleChange}/>
                        {errors && touched.address && (<span className='error_message'>{errors.address}</span>)}
                    </div>
                    <div className='form_group'>
                        <label className='form_label' htmlFor='phonenumber'>Phone Number</label>
                        <input className={`form_input ${errors.phonenumber && touched.phonenumber ? 'input_error' : ''}`} placeholder="Enter your phonenumber" name="phonenumber" value={formData.phonenumber} onBlur={handleBlur} onChange={handleChange}/>
                        {errors && touched.phonenumber && (<span className='error_message'>{errors.phonenumber}</span>)}
                    </div>
                    <button type="button" disabled={!isFormValid} className='register_btn' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register
