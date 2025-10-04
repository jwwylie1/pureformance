import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedDivider from "../components/AnimatedDivider";
import AmbassadorBanner from "../components/AmbassadorBanner"
import ScrollingLogoBanner from "../components/ScrollingLogoBanner";
import ScrollingDivider from "../components/ScrollingDivider";
import { Scroll } from "lucide-react";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const AmbassadorsPage = () => {

	return (
		<>
			<div className="surfing-ctr">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/imgs/surf-ambassador.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support the video format */}
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay for better text readability */}
      <div className="video-mask"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-black text-black mb-2 leading-tight">
            BRAND
          </h1>
          <h1 className="text-7xl md:text-8xl font-black text-black leading-tight"
              style={{
                WebkitTextStroke: '2px black',
                WebkitTextFillColor: 'transparent'
              }}>
            PARTNERSHIPS
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-black font-medium mb-12 max-w-2xl">
          Join the community of high level athletes, students, and professionals striving for peak performance
        </p>
        
        {/* CTA Button */}
        <button className="bg-white text-black font-bold text-lg px-12 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg">
          BECOME AN AMBASSADOR
        </button>
      </div>
    </div>

			<ScrollingDivider />

      <AmbassadorBanner />

      <AnimatedDivider />

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '32px',
        position: 'relative'
      }}>
        <img src="/imgs/usmap.png" className="map-img" />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Trusted in over 20 states by college and professional athletes
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Join a growing community of elite performers who choose Pureformance
        </p>
      </div>

      <ScrollingLogoBanner />

      <button class="become-ambassador-btn">
        Become an Ambassador
      </button>
		</>
	);
};
export default AmbassadorsPage;
