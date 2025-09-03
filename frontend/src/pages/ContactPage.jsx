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
      className={`benefits-ctr transition-1s ${
        isVisible ? '' : 'animate-invisible'
      }`}
      ref={contactRef}
      style={{ textAlign: 'center', padding: '48px 16px', marginTop: '150px' }}
    >
      {/* Header */}
      <div className="core-values-header">
        <h1
          style={{
            fontSize: '48px',
            fontWeight: '900',
            lineHeight: '1.1',
            margin: '0'
          }}
        >
          STAY CONNECTED<br />
          <span>PURE PERFORMANCE</span>
        </h1>
      </div>

      {/* Story / About Section */}
      <div style={{ maxWidth: '800px', margin: '32px auto' }}>
        <p style={{ color: '#374151', fontSize: '18px', lineHeight: '1.6' }}>
          Pureformance started with a simple idea: energy could be done differently. 
          We saw how traditional energy drinks relied on caffeine, sugar, and quick fixes that left people crashing. 
          So we set out to build something different.
        </p>
        <p style={{ color: '#374151', fontSize: '18px', lineHeight: '1.6' }}>
          Born from late nights, trial and error, and a drive to perform at the highest level, 
          we set out to create a formula that fuels both body and mind without the crash.
        </p>
        <p style={{ color: '#374151', fontSize: '18px', lineHeight: '1.6' }}>
          Our mission is simple: to create energy that feels as good as it performs, and to build a community 
          that stands for more than just a drink. Giving athletes, students, and professionals a new way 
          to power their performance — one built on calm, focused energy.
        </p>
      </div>

      {/* Socials */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
          Follow Us
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '16px'
          }}
        >
          <a
            href="https://www.instagram.com/pureformanceofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '18px', color: '#6b7280' }}
          >
            <Instagram size={20} /> @pureformanceofficial
          </a>
          <a
            href="https://www.tiktok.com/@pureformanceofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '18px', color: '#6b7280' }}
          >
            <Music size={20} /> @pureformanceofficial
          </a>
        </div>
      </div>
    </div>
  );
}
