import React from 'react';
import { Users, Target, Heart } from 'lucide-react';

export default function ValuesSection() {
  const values = [
    {
      icon: <Users size={40} />,
      title: "AUTHENTIC PERFORMANCE",
      description: "PLACEHOLDER: Our headquarters are located globally, but our community is universal. Our growing network of like-minded individuals empower each other to keep moving and push through new challenges together. Be a part of our community by joining our ambassador program!"
    },
    {
      icon: <Target size={40} />,
      title: "COMMUNITY DRIVEN GROWTH",
      description: "PLACEHOLDER: Our fitness enthusiasts are fearless, and each one is dedicated to pushing beyond their personal limits and unlocking their individual capability. They always work hard and strive for excellence in everything they pursue."
    },
    {
      icon: <Heart size={40} />,
      title: "A THIRD VALUE",
      description: "PLACEHOLDER: We embody a healthy lifestyle and inspire you to live life to the fullest. We help fuel your body so you can stay motivated and push past your goals while maintaining balance in all aspects of wellness."
    }
  ];

  return (
    <div className="benefits-ctr">
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
          <span style={{ fontWeight: '700' }}>PLACEHOLDER</span>
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