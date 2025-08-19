import React, { useState } from 'react';
import { Brain, Eye, Zap } from 'lucide-react';

const BenefitsSection = () => {
  const [activeIcon, setActiveIcon] = useState(0);

  const benefits = [
    {
      icon: <Brain size={40} />,
      title: "PURE CALM",
      subtitle: "LEMON BALM + L-THEANINE",
      description: "PLACEHOLDERA published study conducted by the University of California showed that consuming our energy formula during your pre-workout routine enhances sustained energy levels and reduces fatigue by up to 35% during intense training sessions."
    },
    {
      icon: <Eye size={40} />,
      title: "PURE FOCUS",
      subtitle: "LIONS MANE + TAURINE",
      description: "PLACEHOLDERResearch from Sports Science Institute demonstrates that our proprietary blend increases power output and endurance capacity. Athletes reported 20% improvement in workout intensity and duration when using our formula consistently."
    },
    {
      icon: <Zap size={40} />,
      title: "PURE ENERGY",
      subtitle: "THEOBROMINE + B-VITAMINS",
      description: "PLACEHOLDERClinical trials at the Institute of Exercise Medicine found that our antioxidant-rich formula accelerates muscle recovery by 40% and provides cellular protection against exercise-induced oxidative stress and inflammation."
    }
  ];

  return (
    <div className="benefits-ctr">
      <h1>
        PLACEHOLDER
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