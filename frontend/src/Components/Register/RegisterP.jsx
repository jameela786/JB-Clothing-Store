import { useState, useEffect } from 'react';
import './RegisterP.css';

const Register = () => {
  // State for form data - controlled components
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: ''
  });

  // State to track which fields have been touched/interacted with
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    address: false,
    phoneNumber: false
  });

  // State to track if form is valid (for button disabling)
  const [isFormValid, setIsFormValid] = useState(false);

  // Regex patterns for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/; // Allows digits, spaces, hyphens, plus, parentheses

 
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          return 'Full name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return '';

      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';

      case 'password':
        if (!value) {
          return 'Password is required';
        }
        if (value.length < 6) {
          return 'Password must be at least 6 characters';
        }
        return '';

      case 'confirmPassword':
        if (!value) {
          return 'Please confirm your password';
        }
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        return '';

      case 'address':
        if (!value.trim()) {
          return 'Address is required';
        }
        if (value.trim().length < 5) {
          return 'Address must be at least 5 characters';
        }
        return '';

      case 'phoneNumber':
        if (!value.trim()) {
          return 'Phone number is required';
        }
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number';
        }
        if (value.replace(/\D/g, '').length < 10) {
          return 'Phone number must be at least 10 digits';
        }
        return '';

      default:
        return '';
    }
  };

  /**
   * Handles input change events
   * Updates form data and validates if field has been touched
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field if it has been touched
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }

    // Special case: revalidate confirmPassword if password changes
    if (name === 'password' && touched.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: formData.confirmPassword !== value && formData.confirmPassword
          ? 'Passwords do not match'
          : ''
      }));
    }
  };

  /**
   * Handles input blur events (when user leaves a field)
   * Marks field as touched and validates it
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate the field
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  /**
   * Checks if entire form is valid
   * Used to enable/disable submit button
   */
  useEffect(() => {
    // Check if all fields have values
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    
    // Check if there are no errors
    const noErrors = Object.values(errors).every(error => error === '');
    
    // Validate all fields to ensure accuracy
    const allFieldsValid = Object.keys(formData).every(key => 
      validateField(key, formData[key]) === ''
    );

    setIsFormValid(allFieldsFilled && noErrors && allFieldsValid);
  }, [formData, errors]);

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields one final time
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(touched).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Check if form is valid
    const formIsValid = Object.values(newErrors).every(error => error === '');

    if (formIsValid) {
      console.log('Form submitted successfully:', formData);
      console.log('Registration data:', {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        phoneNumber: formData.phoneNumber
      });
      
      // Here you would typically make an API call to register the user
      // Example: await registerUser(formData);
      
      // Optionally reset form after successful submission
      // resetForm();
    }
  };

  /**
   * Resets the form to initial state
   */
  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phoneNumber: ''
    });
    setErrors({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phoneNumber: ''
    });
    setTouched({
      fullName: false,
      email: false,
      password: false,
      confirmPassword: false,
      address: false,
      phoneNumber: false
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header Section */}
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join us today! Please fill in your details</p>
        </div>

        {/* Registration Form */}
        <div className="register-form">
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.fullName && touched.fullName ? 'input-error' : ''}`}
              placeholder="Enter your full name"
              aria-required="true"
              aria-invalid={errors.fullName && touched.fullName ? 'true' : 'false'}
              aria-describedby={errors.fullName && touched.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && touched.fullName && (
              <span id="fullName-error" className="error-message" role="alert">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}`}
              placeholder="Confirm your password"
              aria-required="true"
              aria-invalid={errors.confirmPassword && touched.confirmPassword ? 'true' : 'false'}
              aria-describedby={errors.confirmPassword && touched.confirmPassword ? 'confirmPassword-error' : undefined}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span id="confirmPassword-error" className="error-message" role="alert">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Address Field */}
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input form-textarea ${errors.address && touched.address ? 'input-error' : ''}`}
              placeholder="Enter your address"
              rows="3"
              aria-required="true"
              aria-invalid={errors.address && touched.address ? 'true' : 'false'}
              aria-describedby={errors.address && touched.address ? 'address-error' : undefined}
            />
            {errors.address && touched.address && (
              <span id="address-error" className="error-message" role="alert">
                {errors.address}
              </span>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.phoneNumber && touched.phoneNumber ? 'input-error' : ''}`}
              placeholder="Enter your phone number"
              aria-required="true"
              aria-invalid={errors.phoneNumber && touched.phoneNumber ? 'true' : 'false'}
              aria-describedby={errors.phoneNumber && touched.phoneNumber ? 'phoneNumber-error' : undefined}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <span id="phoneNumber-error" className="error-message" role="alert">
                {errors.phoneNumber}
              </span>
            )}
          </div>

          {/* Submit Button - Disabled when form is invalid */}
          <button 
            type="button" 
            onClick={handleSubmit} 
            className="submit-btn"
            disabled={!isFormValid}
            aria-disabled={!isFormValid}
          >
            Create Account
          </button>
        </div>

        {/* Footer Section */}
        <div className="register-footer">
          <p className="footer-text">
            Already have an account? <a href="#login" className="login-link">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;