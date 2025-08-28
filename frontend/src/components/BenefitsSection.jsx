import React, { useState, useEffect, useRef } from 'react';
import { Brain, Eye, Zap } from 'lucide-react';

const BenefitsSection = () => {
  const [activeIcon, setActiveIcon] = useState(0);

  const benefits = [
    {
      icon: <Brain size={40} />,
      title: "PURE CALM",
      subtitle: "LEMON BALM + L-THEANINE",
      description: "Formulated with L-Theanine and Lemon Balm to promote a balanced state of mind. These ingredients help reduce stress and smooth out energy levels, keeping you composed and steady even in high-pressure moments."
    },
    {
      icon: <Eye size={40} />,
      title: "PURE FOCUS",
      subtitle: "LIONS MANE + TAURINE",
      description: "Driven by Lion's Mane and B-Vitamins, Pureformance supports mental clarity, concentration, and healthy brain function. It helps you lock in on the task at hand, no matter the situation. "
    },
    {
      icon: <Zap size={40} />,
      title: "PURE ENERGY",
      subtitle: "THEOBROMINE + B-VITAMINS",
      description: "Energized with Theobromine + B-Vitamins. Theobromine is a natural compound found in tropical regions across the world that delivers smoother, longer-lasting energy than caffeine, while also supporting circulation and breathing. Combined with B-Vitamins, it fuels your body with clean, sustained performance — no sugar, no crash."
    }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const benefitsRef = useRef(null);

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

    if (benefitsRef.current) {
      observer.observe(benefitsRef.current);
    }

    return () => {
      if (benefitsRef.current) {
        observer.unobserve(benefitsRef.current);
      }
    };
  }, []);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleIconChange = (index) => {
    if (index !== activeIcon) {
      // Start fade out animation
      setIsAnimating(true);

      // After fade out completes, change content and fade back in
      setTimeout(() => {
        setActiveIcon(index);
        setIsAnimating(false);
      }, 200);
    }
  };

  return (
    <div className={`benefits-ctr transition-1s ${isVisible ? '' : 'animate-invisible'
      }`} ref={benefitsRef}>
      <h1>
        OUR BENEFITS
      </h1>
      {/* Icons section */}
      <div className="flex justify-center items-center gap-8 mb-8">
        {benefits.map((benefit, index) => (
          <button
            key={index}
            onClick={() => handleIconChange(index)}
            className={`benefits-icon ${activeIcon === index
              ? 'benefits-icon-active'
              : 'benefits-icon-inactive'
              }`}
          >
            {benefit.icon}
          </button>
        ))}
      </div>

      {/* Content section */}
      <div className="text-center">
        <div className={`transition-all duration-200 ease-in-out ${
            isAnimating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
          }`}>
          <h2>
            {benefits[activeIcon].title}
          </h2>

          <h4>
            {benefits[activeIcon].subtitle}
          </h4>

          <p className="text-gray-800 text-base leading-relaxed max-w-3xl mx-auto">
            {benefits[activeIcon].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BenefitsSection