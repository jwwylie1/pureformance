import React, { useState, useEffect } from 'react';

const StateOfMind = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 20;
      const yPercent = (clientY / innerHeight - 0.5) * 20;
      
      setMousePosition({ x: xPercent, y: yPercent });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50">
      {/* Flowing background elements */}
      <div className="absolute inset-0 opacity-60">
        <div 
          className="absolute w-96 h-[600px] -top-16 -left-16 bg-gradient-to-br from-sky-200/40 to-sky-300/30 rounded-[50%_30%_70%_40%] animate-pulse"
          style={{
            transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px) rotate(-15deg)`,
            transition: 'transform 0.3s ease-out',
            animationDuration: '20s'
          }}
        />
        <div 
          className="absolute w-72 h-[500px] -bottom-20 -right-5 bg-gradient-to-br from-sky-200/40 to-sky-300/30 rounded-[50%_30%_70%_40%] animate-pulse"
          style={{
            transform: `translateX(${-mousePosition.x}px) translateY(${-mousePosition.y}px) rotate(25deg)`,
            transition: 'transform 0.3s ease-out',
            animationDuration: '25s',
            animationDirection: 'reverse'
          }}
        />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4">
        {/* P Logo */}
        <div className="absolute -left-5 top-16 w-72 h-96 z-0 lg:w-80 lg:h-[400px]">
          {!imageError ? (
            <img 
              src="/P_big.png" 
              alt="P Logo"
              className="w-full h-full object-contain opacity-30 brightness-125"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[12rem] font-light text-sky-200/40">
              P
            </div>
          )}
        </div>

        {/* Main text - STATE OF MIND */}
        <div className="absolute right-5 top-24 z-30 lg:right-16">
          <div className="text-7xl lg:text-8xl xl:text-9xl font-light tracking-[8px] text-white drop-shadow-lg mb-[-10px]">
            STATE
          </div>
          <div className="text-5xl lg:text-6xl xl:text-7xl font-light tracking-[6px] text-gray-600 ml-5">
            OF MIND
          </div>
        </div>

        {/* Performance section */}
        <div className="absolute left-16 bottom-32 z-30 lg:left-24">
          <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 tracking-[2px] uppercase mb-2">
            BUILT FOR PERFORMANCE
          </div>
          <div className="text-base lg:text-lg text-gray-600 tracking-[3px] uppercase font-normal">
            ATHLETES, STUDENTS AND PROFESSIONALS
          </div>
        </div>

        {/* Gray accent block */}
        <div className="absolute right-0 top-1/2 w-60 h-44 lg:w-72 lg:h-52 bg-slate-500 z-10 transform -translate-y-1/2" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-pulse {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default StateOfMind;