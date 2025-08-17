import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedDivider() {
  const [isVisible, setIsVisible] = useState(false);
  const dividerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
      }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => {
      if (dividerRef.current) {
        observer.unobserve(dividerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={dividerRef}
      className="w-full flex justify-center py-8"
    >
      <div className="divider-ctr">
        <div 
          className={`absolute top-0 left-0 h-full bg-sky-300 transition-all duration-1000 ease-out ${
            isVisible ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </div>
  );
}