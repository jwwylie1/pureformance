import React from 'react';

export default function AmbassadorBanner() {
  // Using placeholder images - replace these URLs with your actual photos
  const photos = [
    {
      src: "/imgs/ambassador1.jpg",
      alt: "Athlete training"
    },
    {
      src: "/imgs/ambassador2.jpg",
      alt: "Sports performance"
    },
    {
      src: "/imgs/ambassador3.jpg",
      alt: "Fitness lifestyle"
    },
    {
      src: "/imgs/2-cans.jpg",
      alt: "Active lifestyle"
    }
  ];

  return (
    <div style={{
      width: '100%',
      margin: '50px 0',
      padding: '0 20px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '20px',
        width: '100%',
        height: '400px'
      }}>
        {photos.map((photo, index) => (
          <div
            key={index}
            style={{
              overflow: 'hidden',
              borderRadius: '8px',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}