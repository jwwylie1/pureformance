import { px } from 'framer-motion';
import React from 'react';

export default function HydrationTextBanner() {
  return (
    <div style={{
      width: '100%',
      height: '60px',
      backgroundColor: '#fff',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    }}>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          animation: 'scrollText 30s linear infinite',
          whiteSpace: 'nowrap'
        }}
      >
        {/* First set of text */}
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={`first-${i}`}
            style={{
              color: 'black',
              fontSize: '18px',
              fontWeight: '900',
              letterSpacing: '0.1em',
              marginRight: '80px',
              flexShrink: 0
            }}
          >
            UNLOCK YOUR PUREFORMANCE
          </span>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={`second-${i}`}
            style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '900',
              letterSpacing: '0.1em',
              marginRight: '80px',
              flexShrink: 0
            }}
          >
            UNLOCK YOUR PUREFORMANCE
          </span>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scrollText {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}