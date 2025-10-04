import { px } from 'framer-motion';
import React from 'react';

export default function HydrationTextBanner() {
  return (
    <div className="scrolling-banner">
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