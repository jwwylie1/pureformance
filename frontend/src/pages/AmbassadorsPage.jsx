import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedDivider from "../components/AnimatedDivider";
import AmbassadorBanner from "../components/AmbassadorBanner"
import ScrollingLogoBanner from "../components/ScrollingLogoBanner";

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
			<div className='big-picture-ctr w-100 surf-picture'>
        OUR AMBASSADORS
      </div>

			<AnimatedDivider />

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
		</>
	);
};
export default AmbassadorsPage;
