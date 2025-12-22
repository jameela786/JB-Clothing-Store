import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useSearchParams } from 'react-router-dom'
import './HeaderP.css';

// ==================== HEADER COMPONENT ====================
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [searchParams]  = useSearchParams();
  const [searchText,setSearchText] = useState(searchParams.get('search') || '')

  // Add scroll effect to header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (e, category) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate(`/landingpage?category=${category}`); // Navigate with query param
  };

  const handleSearchSubmit = (e)=>{
    if(e.key==='Enter'){
      e.preventDefault();
      const trimmedSearch = searchText.trim();
      if(trimmedSearch){
        const currentCategory = searchParams.get('category')
        const params = new URLSearchParams();
        params.set('search',trimmedSearch);
        if(currentCategory){
          params.set('category',currentCategory)
        }
        navigate(`/landingpage?${params.toString()}`);
        
      }
      else{
        const currentCategory = searchParams.get('category');
        if(currentCategory){
          navigate(`/landingpage?category=${currentCategory}`)
        }else{
          navigate('/landingpage');
        }
      }
    }
  
  }

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearchText(urlSearch);
  }, [searchParams]);


  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <a href="/landingpage" >
          <h1>JB</h1>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <a 
            href="/landingpage?category=men" 
            className="nav-link"
            onClick={(e) => handleCategoryClick(e, 'men')}
          >
            Men
          </a>
          <a 
            href="/landingpage?category=women" 
            className="nav-link"
            onClick={(e) => handleCategoryClick(e, 'women')}
          >
            Women
          </a>
          <a 
            href="/landingpage?category=Unisex" 
            className="nav-link"
            onClick={(e) => handleCategoryClick(e, 'Unisex')}
          >
            Unisex
          </a>
          <a 
            href="/landingpage?category=Girls" 
            className="nav-link"
            onClick={(e) => handleCategoryClick(e, 'Girls')}
          >
            Girls
          </a>
        </nav>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </div>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/login">
            <button className="btn-login">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn-signup">Sign Up</button>
          </Link>


        </div>
      </div>
    </header>
  );
};
