import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Instagram, Music } from 'lucide-react';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`about-ctr transition-1s ${
        isVisible ? '' : 'animate-invisible'
      }`}
      ref={contactRef}
      style={{ textAlign: 'center', padding: '48px 16px', marginTop: '150px' }}
    >
      {/* Header */}
      <div className="core-values-header">
        <h1
          style={{
            fontSize: '120px',
            fontWeight: '900',
            lineHeight: '0.6',
          }}
        >
          OUR STORY<br />
          <span>EST. 2024</span>
        </h1>
      </div>

      {/* Story / About Section */}
      <div className="about-main">
        <p>
          Pureformance started with a simple idea: energy could be done differently. 
          We saw how traditional energy drinks relied on caffeine, sugar, and quick fixes that left people crashing. 
          So we set out to build something different.
          <br/><br/>
          Born from late nights, trial and error, and a drive to perform at the highest level, 
          we set out to create a formula that fuels both body and mind without the crash.
          <br/><br/>
          Our mission is simple: to create energy that feels as good as it performs, and to build a community 
          that stands for more than just a drink. Giving athletes, students, and professionals a new way 
          to power their performance — one built on calm, focused energy.
        </p>
        <img src="/imgs/about-hat.png" />
      </div>

      <div className="flex items-center justify-between max-w-7xl mx-auto py-16 px-8">
        {/* Left Image */}
        <div className="flex-shrink-0 mr-12">
          <div className="w-80 h-80 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-200 opacity-50"></div>
            <div className="relative text-white text-center">
              <div className="text-2xl font-bold mb-2">Two bottles</div>
              <div className="text-lg">being held up</div>
              <div className="text-sm mt-2">Community Image</div>
            </div>
          </div>
        </div>
        
        {/* Right Content */}
        <div className="flex-1">
          <h1 className="text-6xl font-black text-gray-900 mb-8 leading-tight">
            JOIN THE<br />COMMUNITY
          </h1>
          
          <p className="text-3xl font-light text-cyan-400 mb-8">Follow Us On:</p>
          
          {/* Social Media Icons Placeholder */}
          <div className="flex space-x-6 justify-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">IG</span>
            </div>
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">TW</span>
            </div>
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">FB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
