import React, { useEffect, useState, useRef } from 'react';
import { Leaf, Brain, Zap, Eye, Flower, Heart, Coffee, Wind } from 'lucide-react';
import { motion } from "framer-motion";


export default function IngredientsPage() {
  const ingredients = [
    {
      name: "BAJA GOLD SALTS",
      icon: <Leaf size={40} />,
      description: "A natural source of electrolytes with over 90 trace minerals, including magnesium, potassium, and calcium. These salts provide superior hydration, nerve support, and muscle performance compared to ordinary processed salts."
    },
    {
      name: "L-THEANINE",
      icon: <Brain size={40} />,
      description: "An amino acid naturally found in green tea leaves that promotes calm focus. It smooths energy levels, keeping the mind clear and steady without jitters."
    },
    {
      name: "B-VITAMINS",
      icon: <Zap size={40} />,
      description: "Vitamins that support energy metabolism and healthy nervous system function. They convert carbohydrates, fats, and proteins into usable energy, sustaining performance and speeding recovery after workouts."
    },
    {
      name: "LIONS MANE",
      icon: <Eye size={40} />,
      description: "A mushroom extract studied for its effects on memory, focus, and cognitive health. It helps sharpen concentration and maintain mental strength during training and competition."
    },
    {
      name: "GINGER ROOT",
      icon: <Flower size={40} />,
      description: "A natural root with anti-inflammatory and digestive ingredients. It supports recovery by easing soreness and inflammation while promoting digestive comfort before and after activity."
    },
    {
      name: "LEMON BALM",
      icon: <Heart size={40} />,
      description: "A calming herb from the mint family that helps reduce stress and supports relaxation. It promotes a balanced mindset in high-pressure moments, aiding both recovery and consistent performance."
    }
  ];

  const theobromineProperties = [
    {
      icon: Wind,
      title: "Supports breathing",
      description: "It relaxes airway muscles, promoting easier airflow and improved oxygen delivery — critical for endurance and athletic output."
    },
    {
      icon: Zap,
      title: "Sustained energy",
      description: "Provides a steady lift in focus and stamina without overstimulation."
    },
    {
      icon: Leaf,
      title: "Found in nature",
      description: "Present in cacao and Yerba mate — drinks already trusted by athletes worldwide."
    },
    {
      icon: Heart,
      title: "Cardiovascular support",
      description: "Improves circulation and supports overall heart health, enhancing endurance."
    },
    {
      icon: Brain,
      title: "Mood & focus",
      description: "Helps athletes stay mentally sharp while maintaining calm, even under stress."
    }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const productRef = useRef(null);
  
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
  
      if (productRef.current) {
        observer.observe(productRef.current);
      }
  
      return () => {
        if (productRef.current) {
          observer.unobserve(productRef.current);
        }
      };
    }, []);

  

  return (
    <>
      <div className='big-picture-ctr w-100 surf-picture'>
        OUR UNIQUE FORMULA
      </div>

      <motion.div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '60px 20px'
      }}
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          maxWidth: '800px',
          margin: '0 auto 80px auto'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Built By Athletes, <b>For Athletes</b>
          </h2>
          <h3 style={{
            fontSize: '34px',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }} className='mint'>
            Unlock Your Pureformance
          </h3>
        </div>

        {/* Main Content Container */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* INGREDIENTS Header */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1
          }}>
            <h1 style={{
              fontSize: '140px',
              fontWeight: '900',
              color: 'rgba(229, 231, 235, 0.8)',
              letterSpacing: '0.2em',
              margin: '0'
            }}>
              INGREDIENTS
            </h1>
          </div>

          {/* Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px 1fr',
            gap: '10px',
            alignItems: 'start',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Left Side Ingredients */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              marginTop: '100px',

            }}
            className={`transition-1s ${
            isVisible ? '' : 'animate-invisible'
          }`} ref={productRef}>
              {ingredients.slice(0, 3).map((ingredient, index) => (
                <div key={ingredient.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{ textAlign: 'right' }}>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      color: '#1f2937',
                      marginBottom: '8px',
                      letterSpacing: '0.05em'
                    }}>
                      {ingredient.name}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#6b7280',
                      lineHeight: '1.5',
                    }}>
                      {ingredient.description}
                    </p>
                  </div>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    borderWidth: '2px',
                    borderColor: '#4ab9cf',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4ab9cf',
                    flexShrink: 0
                  }}>
                    {ingredient.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Center Can Image */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '400px',
                height: '800px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '-50px',
              }}>
                <img src="/imgs/ingredients-can.png" 
                className='ingredients-can' />
              </div>
            </div>

            {/* Right Side Ingredients */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              marginTop: '100px'
            }} className={`transition-1s ${
            isVisible ? '' : 'animate-invisible'
          }`} ref={productRef}>
              {ingredients.slice(3, 6).map((ingredient, index) => (
                <div key={ingredient.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  justifyContent: 'flex-start'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    borderWidth: '2px',
                    borderColor: '#4ab9cf',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4ab9cf',
                    flexShrink: 0
                  }}>
                    {ingredient.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      color: '#1f2937',
                      marginBottom: '8px',
                      letterSpacing: '0.05em'
                    }}>
                      {ingredient.name}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#6b7280',
                      lineHeight: '1.5',
                    }}>
                      {ingredient.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

{/* Theobromine Below Can */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                textAlign: 'center',
                marginTop: '50px',
              }}>
                <div>
                  <p style={{
                    fontSize: '26px',
                    fontWeight: '900',
                    color: '#4ab9cf',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    Our Difference
                  </p>
                  {/* <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#6b7280',
                    marginBottom: '4px',
                    letterSpacing: '0.05em'
                  }}>
                    ALTERNATE ENERGY
                  </p> */}
                  <h1 style={{
                    fontSize: '66px',
                    fontWeight: '900',
                    color: '#1f2937',
                    marginBottom: '8px',
                    letterSpacing: '0.07em',
                    WebkitTextStrokeWidth: '2px',
                    fontFamily: 'Eurostile'
                  }}>
                    THEOBROMINE
                  </h1>
                  <p style={{
                    fontSize: '20px',
                    color: '#6b7280',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    maxWidth: '600px',
                  }}>
                    A natural compound found in <b>cacao beans</b> and <b>Yerba mate</b>, long used by athletes for its smooth, sustained energy. Unlike caffeine, theobromine avoids the spikes and crashes.
                  </p>
                </div>
              </div>

          <div className="w-full text-left">
            <p className="text-xl font-semibold text-gray-800 mb-12 mt-8 text-center">
              What makes theobromine unique for performance:
            </p>

            <div className="flex gap-4 mb-6">
              {theobromineProperties.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex-1 text-center">
                    <div className="mb-3">
                      <IconComponent className="w-8 h-8 text-gray-700 mx-auto" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 text-md">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-md text-gray-600 mt-10 leading-relaxed italic text-center">
              Theobromine is what sets Pureformance apart — a smoother, more sustainable form of energy designed for athletes who need to perform at their peak without the crash.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}