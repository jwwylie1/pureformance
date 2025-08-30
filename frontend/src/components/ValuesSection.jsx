import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Sprout, Users } from 'lucide-react';

export default function ValuesSection() {
  const values = [
    {
      icon: <Lightbulb size={40} />,
      title: "UNIQUE STATE OF MIND",
      description: "Pureformance is built around a different approach to energy—no caffeine, no sugar, no crash. Instead, we use theobromine and other functional ingredients to provide a smoother, longer-lasting boost that fuels both the body and the mind. Our formula is designed for athletes, students, and professionals who need calm focus and energy when it matters most."
    },
    {
      icon: <Sprout size={40} />,
      title: "POWERED BY NATURE",
      description: "Our ingredients are inspired by nature — adaptogens, plant extracts, and minerals that support performance in natural ways. From Theobromine and Lion's Mane for focus, to Lemon Balm L-theanine for calm and Baja Gold salts for hydration, every element was chosen with purpose."
    },
    {
      icon: <Users size={40} />,
      title: "PUREFORMANCE FOR ALL",
      description: "We believe performance isn't just personal—it's community-driven. Pureformance is more than a drink; it's a movement built by athletes and students for everyone chasing their goals. We're committed to building an inclusive community and giving back—from supporting local athletes to partnering with organizations that make health and performance more accessible."
    }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const valuesRef = useRef(null);

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
  
      if (valuesRef.current) {
        observer.observe(valuesRef.current);
      }
  
      return () => {
        if (valuesRef.current) {
          observer.unobserve(valuesRef.current);
        }
      };
    }, []);

  return (
    <div className={`benefits-ctr transition-1s ${
      isVisible ? '' : 'animate-invisible'
    }`} ref={valuesRef}>
      <div className='core-values-header'>
        <p className='mint'>
          OUR CORE VALUES
        </p>
        <h1 style={{ 
          fontSize: '48px',
          fontWeight: '900',
          lineHeight: '1.1',
          margin: '0'
        }}>
          PLACEHOLDER,<br />
          <span>PLACEHOLDER</span>
        </h1>
      </div>

      {/* Three column layout */}
      <div className='three-col'>
        {values.map((value, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            {/* Icon */}
            <div className='values-icon mint'>
              {value.icon}
            </div>
            
            {/* Title */}
            <h2>
              {value.title}
            </h2>
            
            {/* Description */}
            <p>
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}