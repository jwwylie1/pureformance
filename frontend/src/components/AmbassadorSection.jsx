import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Users } from 'lucide-react';

export default function AmbassadorSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ambassadorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ambassadorRef.current) {
      observer.observe(ambassadorRef.current);
    }

    return () => {
      if (ambassadorRef.current) {
        observer.unobserve(ambassadorRef.current);
      }
    };
  }, []);

  return (
    <div className={`benefits-ctr transition-1s ${
      isVisible ? '' : 'animate-invisible'
    }`} ref={ambassadorRef}>
      
      <div className='core-values-header'>
        <p className='mint'>
          OUR AMBASSADORS
        </p>
        <h1 style={{ 
          fontSize: '48px',
          fontWeight: '900',
          lineHeight: '1.1',
          margin: '0'
        }}>
          COAST TO COAST,<br />
          <span>PURE PERFORMANCE</span>
        </h1>
      </div>

      {/* US Map Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '32px',
        position: 'relative'
      }}>
        <img src="/imgs/usmap.png" className="map-img" />
      </div>

      {/* Stats Text */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Trusted in over 20 states by college and professional athletes
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Join a growing community of elite performers who choose Pureformance
        </p>
      </div>

      {/* Team Badges */}

      {/* Ambassador CTA Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '700',
            padding: '16px 32px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px'
          }}
          className="bg-mint"
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0px)';
          }}
        >
          <MapPin size={20} />
          BECOME AN AMBASSADOR
        </button>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px', 
          marginTop: '16px' 
        }}>
          Represent Pureformance in your community and earn exclusive benefits
        </p>
      </div>
    </div>
  );
}