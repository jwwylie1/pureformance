import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import FeaturedProducts from "../components/FeaturedProducts";
import BenefitsSection from "../components/BenefitsSection";
import AnimatedDivider from "../components/AnimatedDivider";
import ScrollingDivider from "../components/ScrollingDivider";
import ValuesSection from "../components/ValuesSection";
import AmbassadorSection from "../components/AmbassadorSection";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<>
			{/*}
			<div className='big-picture-ctr w-100 surf-picture'>
        UNLOCK YOUR <b className="fw-900">PURE</b>FORMANCE
      </div>

			<AnimatedDivider />

			<ValuesSection />

			<AnimatedDivider />


			<motion.div className='values-ctr w-100 min-h-0'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}>
				<BenefitsSection/>
				<div className='values-img-ctr'>
					<img className="values-img" src="/imgs/3-cans-ice-close-h.jpg" />
				</div>
			</motion.div>

			<ScrollingDivider />

			<AmbassadorSection />
			*/}

			<div className='big-picture-ctr w-100 powerade-picture'>
      </div>

			<ScrollingDivider />

			<div className="home-gradient">
				<div className="home-start-ctr">
					<img src="/P_big.png" />
					<div className="state-of-mind">
						<span className="som-state">STATE</span>
						<p>
							<span className="som-of">OF</span>&nbsp;
							<span className="som-mind">MIND</span>
						</p>
					</div>
				</div>

				<div className="performance-section">
					<img src="/imgs/3-cans-closer-v.jpg" />
					<h1>BUILT FOR PERFORMANCE</h1>
					<h3>ATHLETES, STUDENTS, AND PROFESSIONALS</h3>
				</div>

				<div className='values-section'>
					<h1>ALL IN</h1>
					<h4>IS WHO WE ARE</h4>

					<ValuesSection />
				</div>

				<AnimatedDivider />

				<BenefitsSection />
			</div>

		</>
	);
};
export default HomePage;
