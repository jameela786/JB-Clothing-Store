import { useState } from 'react';
import './LoginP.css';

const LoginP = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'password':
        if (!value.trim()) {
          return 'Password is required';
        }
        if (value.length < 6) {
          return 'Password must be at least 6 characters';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    setErrors({
      email: emailError,
      password: passwordError
    });

    setTouched({
      email: true,
      password: true
    });

    // If no errors, submit the form
    if (!emailError && !passwordError) {
      console.log('Form submitted successfully:', formData);
      // Here you would typically make an API call
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please sign in to your account</p>

        <div className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
              aria-required="true"
              aria-invalid={errors.email && touched.email ? 'true' : 'false'}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
            />
            {errors.email && touched.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.password && touched.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
              aria-required="true"
              aria-invalid={errors.password && touched.password ? 'true' : 'false'}
              aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
            />
            {errors.password && touched.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button type="button" onClick={handleSubmit} className="submit-btn">
            Sign In
          </button>
        </div>

        <p className="login-footer">
          Don't have an account? <a href="#signup" className="signup-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginP;