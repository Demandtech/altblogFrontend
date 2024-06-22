/* eslint-disable react-hooks/exhaustive-deps */

import "react-multi-carousel/lib/styles.css";
import { usePostContext } from "../context/PostContext";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import HeroCarousel from "./Carousel";


const Hero = () => {
	const { getFeaturedPosts, featuredPosts } = usePostContext();
	const [isLoading, setIsLoading] = useState();

	useEffect(() => {
		const getFeatured = async () => {
			setIsLoading(true);
			const isSuccess = await getFeaturedPosts();

			isSuccess ? setIsLoading(false) : setIsLoading(false);
		};
		getFeatured();
	}, []);

	return (
		<div className="pt-5 relative border-b pb-5">
			<div className="absolute bg-white/10 dark:bg-black/10 left-0 top-0 w-full h-full"></div>
			<div className="px-3 md:px-5 h-full">
				{isLoading ? (
					<Spinner
						className="w-full h-52"
						classNames={{ wrapper: "justify-content-center" }}
						label="Loading..."
					/>
				) : (
					<>
						{featuredPosts.length > 0 ? (
							<HeroCarousel featuredPosts={featuredPosts} />
						) : (
							<div></div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Hero;
