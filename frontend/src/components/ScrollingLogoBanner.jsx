import React from 'react';

export default function ScrollingLogoBanner() {
  // Original Big Ten teams
  const logos = [
    { src: '/imgs/logos/umich.png', alt: 'University of Michigan' },
    { src: '/imgs/logos/msu.svg', alt: 'Michigan State University' },
    { src: '/imgs/logos/inter-miami.png', alt: 'Inter Miami CF' },
    { src: '/imgs/logos/columbus-crew.png', alt: 'Columbus Crew' },
    { src: '/imgs/logos/union.png', alt: 'Philadelphia Union' },
    { src: '/imgs/logos/clemson.png', alt: 'Clemson University' },
    { src: '/imgs/logos/slu.png', alt: 'Saint Louis University' },
    { src: '/imgs/logos/creighton.png', alt: 'Creighton University' },
    { src: '/imgs/logos/ucf.png', alt: 'UCF' },
    { src: '/imgs/logos/sdsu.png', alt: 'San Diego State University' },
    { src: '/imgs/logos/arizona.png', alt: 'University of Arizona' },
    { src: '/imgs/logos/smu.png', alt: 'SMU' },
    { src: '/imgs/logos/dartmouth.png', alt: 'Dartmouth College' },
    { src: '/imgs/logos/vatech.png', alt: 'Virginia Tech' },
    { src: '/imgs/logos/udmercy.png', alt: 'University of Detroit Mercy' },
    { src: '/imgs/logos/arkansas.png', alt: 'University of Arkansas' },
    { src: '/imgs/logos/kentucky.png', alt: 'University of Kentucky' },
    { src: '/imgs/logos/wisconsin.png', alt: 'University of Wisconsin' },
    { src: '/imgs/logos/butler.png', alt: 'Butler University' },
    { src: '/imgs/logos/uchicago.png', alt: 'University of Chicago' },
    { src: '/imgs/logos/uconn.png', alt: 'University of Connecticut' },
  ];

  return (
    <div style={{
      width: '100%',
      margin: '30px 0',
      padding: '0 20px',
      overflow: 'hidden'
    }}>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          animation: 'scroll 30s linear infinite',
          width: 'fit-content'
        }}
      >
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div
            key={`first-${index}`}
            style={{
              flexShrink: 0,
              width: '120px',
              height: '80px',
              marginRight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                maxWidth: '100px',
                maxHeight: '60px',
                objectFit: 'contain',
                transition: 'filter 0.3s ease'
              }}
              /* onMouseOver={(e) => {
                e.target.style.filter = 'grayscale(0%)';
              }}
              onMouseOut={(e) => {
                e.target.style.filter = 'grayscale(100%)';
              }} */
            />
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div
            key={`second-${index}`}
            style={{
              flexShrink: 0,
              width: '120px',
              height: '80px',
              marginRight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                maxWidth: '100px',
                maxHeight: '60px',
                objectFit: 'contain',
                transition: 'filter 0.3s ease'
              }}
              /* onMouseOver={(e) => {
                e.target.style.filter = 'grayscale(0%)';
              }}
              onMouseOut={(e) => {
                e.target.style.filter = 'grayscale(100%)';
              }} */
            />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-120px * 21 - 40px * 21));
          }
        }
      `}</style>
    </div>
  );
}