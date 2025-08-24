import React from 'react';
import { Leaf, Brain, Zap, Eye, Flower, Heart, Coffee } from 'lucide-react';

export default function IngredientsPage() {
  const ingredients = [
    {
      name: "BAJA GOLD SALTS",
      icon: <Leaf size={40} />,
      color: "#10b981", // emerald
      description: "PLACEHOLDER: Essential electrolytes derived from ancient sea beds that help maintain optimal hydration and cellular function during intense physical activity."
    },
    {
      name: "L-THEANINE", 
      icon: <Brain size={40} />,
      color: "#3b82f6", // blue
      description: "PLACEHOLDER: A natural amino acid found in tea leaves that promotes calm focus and mental clarity while reducing jitters commonly associated with caffeine."
    },
    {
      name: "B-VITAMINS",
      icon: <Zap size={40} />,
      color: "#f59e0b", // amber
      description: "PLACEHOLDER: Essential nutrients that support energy metabolism, nervous system function, and help convert food into sustained energy for peak performance."
    },
    {
      name: "LIONS MANE",
      icon: <Eye size={40} />,
      color: "#8b5cf6", // violet
      description: "PLACEHOLDER: A powerful mushroom extract known for enhancing cognitive function, improving focus, and supporting overall brain health and neuroplasticity."
    },
    {
      name: "GINGER ROOT", 
      icon: <Flower size={40} />,
      color: "#f97316", // orange
      description: "PLACEHOLDER: A natural root extract with anti-inflammatory properties that aids digestion, reduces nausea, and supports overall digestive wellness."
    },
    {
      name: "LEMON BALM",
      icon: <Heart size={40} />,
      color: "#06b6d4", // cyan
      description: "PLACEHOLDER: A calming herb from the mint family that helps reduce stress and anxiety while promoting relaxation and improved sleep quality."
    }
  ];

  return (
  <>
    <div className='big-picture-ctr w-100 surf-picture'>
        OUR UNIQUE FORMULA
    </div>

    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '60px 20px'
    }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '80px',
        maxWidth: '800px',
        margin: '0 auto 80px auto'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Built By Athletes, <b>For Athletes</b>
        </h2>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#f59e0b',
          letterSpacing: '0.05em'
        }}>
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
            fontSize: '120px',
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
          gap: '60px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left Side Ingredients */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '60px',
            paddingTop: '100px'
          }}>
            {ingredients.slice(0, 3).map((ingredient, index) => (
              <div key={ingredient.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                justifyContent: 'flex-end'
              }}>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#1f2937',
                    marginBottom: '8px',
                    letterSpacing: '0.05em'
                  }}>
                    {ingredient.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.5',
                    maxWidth: '300px'
                  }}>
                    {ingredient.description}
                  </p>
                </div>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  color: ingredient.color,
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
            gap: '60px'
          }}>
            <div style={{
              width: '350px',
              height: '500px',
              backgroundColor: '#e5e7eb',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                fontSize: '48px',
                color: '#9ca3af',
                fontWeight: '700'
              }}>
                ENERGY DRINK
              </div>
            </div>

            {/* Theobromine Below Can */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                color: '#8b4513'
              }}>
                <Coffee size={40} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#1f2937',
                  marginBottom: '8px',
                  letterSpacing: '0.05em'
                }}>
                  THEOBROMINE
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  maxWidth: '280px'
                }}>
                  A natural compound found in cacao that provides smooth, sustained energy without the crash, while supporting cardiovascular health and mood enhancement.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Ingredients */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '60px',
            paddingTop: '100px'
          }}>
            {ingredients.slice(3, 6).map((ingredient, index) => (
              <div key={ingredient.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                justifyContent: 'flex-start'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  color: ingredient.color,
                  flexShrink: 0
                }}>
                  {ingredient.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#1f2937',
                    marginBottom: '8px',
                    letterSpacing: '0.05em'
                  }}>
                    {ingredient.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.5',
                    maxWidth: '300px'
                  }}>
                    {ingredient.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
  );
}