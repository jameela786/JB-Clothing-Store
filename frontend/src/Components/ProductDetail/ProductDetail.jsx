
import { useState,useEffect } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
// Inside ProductDetail component:
export const ProductDetail = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleAddToBag = () => {
        if (!isLoggedIn) {
            // Redirect to login with return URL
            navigate(`/login?redirect=/product/${productId}`);
            return;
        }
        // Add to bag logic
    };

    return (
        <div>
            {/* Product details visible to everyone */}
            <button onClick={handleAddToBag}>
                Add to Bag
            </button>
        </div>
    );
};
