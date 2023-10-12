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
        >
            <line 
                x1="20" 
                y1="35"
                x2="70" 
                y2="35"
                stroke="black" 
                strokeWidth="3"
                className={`transform duration-300 ${isAnimated ? 'rotate-45 translate-x-9 -translate-y-2' : ''}`}
            />
            <line 
                x1="20" 
                y1="55"
                x2="70" 
                y2="55"
                stroke="black" 
                strokeWidth="3"
                className={`transform duration-300 ${isAnimated ? '-rotate-45 -translate-x-7 translate-y-10' : ''}`}
            />
        </svg>
    );
};

export default Navbar;