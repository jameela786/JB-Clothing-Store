import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../Header/HeaderP';
import { Footer } from '../Footer/FooterP';
import { ProductCard } from '../ProductCard/ProductCardP';
import { useAuth } from '../AuthContext/AuthContext';
import { Pagination } from '../Pagination/PaginationP';
import { data } from '../JsonData/data';
import { HeroBanner } from '../HeroBanner/HeroBanner';
import './LandingPageP.css'

const LandingPage = () => {
  const { isLoggedIn } = useAuth();
  const [searParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  console.log("selectedcategory=",selectedCategory)
  const productsData = data[0].products;
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); 
  let filteredProducts = productsData;

  // Step 1: Filter by category (if exists)
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      product => product.gender?.toLowerCase() === selectedCategory.toLowerCase()
    );
   
  }

  // Step 2: Filter by search query (if exists)
  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    
    filteredProducts = filteredProducts.filter(product => {
      // Search in product name
      const nameMatch = product.product?.toLowerCase().includes(query);
      
      // Search in brand
      const brandMatch = product.brand?.toLowerCase().includes(query);
      
      // Search in category/gender
      const categoryMatch = product.gender?.toLowerCase().includes(query);
      
      // Search in additional info
      const infoMatch = product.additionalInfo?.toLowerCase().includes(query);
      
      // Return true if ANY field matches
      return nameMatch || brandMatch || categoryMatch || infoMatch;
    });
  }
  // Calculate pagination values
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  console.log("indexOfFirstProduct, indexOfLastProduct", indexOfFirstProduct, indexOfLastProduct, productsData, [{ 1: 12 }, { 2: 13 }, { 3: 14 }, { 4: 15 }].slice(0, 3))
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  console.log("currentProducts==", currentProducts)

    // Reset to page 1 when category changes .WHY: Prevent showing empty pages in new category
  // ============================================
  useEffect(() => {
    setCurrentPage(1); // Reset pagination on category change
  }, [selectedCategory]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top smoothly when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset to page 1 if needed
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="app">
      {/* Header - Sticky */}
      <Header />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Content */}
      <main className="main-content">
        {/* Products Section Header */}
        <div className="products-header">
          <h2 className="section-title">
            {searchQuery 
              ? `Search results for "${searchQuery}"` 
              : selectedCategory
              ? `${selectedCategory}'s Fashion`
              : 'Trending Products'
            }</h2>
          <p className="section-subtitle">
            Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className='products-grid'>
            {currentProducts.map((product) => (
              <ProductCard
                key={product.productId} 
                product={product} 
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>


      <Footer />
    </div>
  );
};


export default LandingPage;