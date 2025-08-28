import React, { useState } from 'react';
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
      description: "Driven by Lion’s Mane and B-Vitamins, Pureformance supports mental clarity, concentration, and healthy brain function. It helps you lock in on the task at hand, no matter the situation. "
    },
    {
      icon: <Zap size={40} />,
      title: "PURE ENERGY",
      subtitle: "THEOBROMINE + B-VITAMINS",
      description: "Energized with Theobromine + B-Vitamins. Theobromine is a natural compound found in tropical regions across the world that delivers smoother, longer-lasting energy than caffeine, while also supporting circulation and breathing. Combined with B-Vitamins, it fuels your body with clean, sustained performance — no sugar, no crash."
    }
  ];

  return (
    <div className="benefits-ctr">
      <h1>
        OUR BENEFITS
      </h1>
      {/* Icons section */}
      <div className="flex justify-center items-center gap-8 mb-8">
        {benefits.map((benefit, index) => (
          <button
            key={index}
            onClick={() => setActiveIcon(index)}
            className={`benefits-icon ${
              activeIcon === index 
                ? 'benefits-icon-active' 
                : 'benefits-icon-inactive'
            }`}
          >
            {benefit.icon}
          </button>
        ))}
      </div>

      {/* Content section */}
      <div className="text-center transition-all duration-500">
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
  );
}

export default BenefitsSection