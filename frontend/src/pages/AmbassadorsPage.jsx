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

{/* <div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div> */}
