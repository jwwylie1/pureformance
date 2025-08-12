import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const ItemPage = () => {
	const { fetchProductByWeblink, product } = useProductStore();

	const { item } = useParams();

	useEffect(() => {
		fetchProductByWeblink(item);
	}, [fetchProductByWeblink, item]);
	
	return (
		<p>{JSON.stringify(product)}</p>
	);
};
export default ItemPage;
