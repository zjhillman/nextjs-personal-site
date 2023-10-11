'use client'

import { useState } from 'react';

const Navbar = () => {
    const [isAnimated, setIsAnimated] = useState(false);

    return (
        <svg 
            width="50" 
            height="50" 
            viewBox="0 0 90 90" 
            xmlns="http://www.w3.org/2000/svg" 
            onClick={() => setIsAnimated(!isAnimated)}
            className="transition-all duration-300"
        >
            <line 
                x1="20" 
                y1={isAnimated ? "35" : "35"} 
                x2="70" 
                y2={isAnimated ? "55" : "35"} 
                stroke="black" 
                stroke-width="3" 
            />
            <line 
                x1="20" 
                y1={isAnimated ? "55" : "55"} 
                x2="70" 
                y2={isAnimated ? "35" : "55"} 
                stroke="black" 
                stroke-width="3"
            />
        </svg>
    );
};

export default Navbar;