/* eslint-disable react-hooks/exhaustive-deps */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { usePostContext } from "../context/PostContext";
import { useEffect } from "react";
import { Link, User } from "@nextui-org/react";
import { MdOutlineCreate, MdOutlineUpdate } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { CgReadme } from "react-icons/cg";
import moment from "moment";
import { handleTime } from "../helper/convertReadingTime";
import {
	BsFacebook,
	BsTwitter,
	BsLinkedin,
	BsPinterest,
	BsMedium,
	BsTelegram,
} from "react-icons/bs";

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const Hero = () => {
	const { getFeaturedPosts, featuredPosts } = usePostContext();

	useEffect(() => {
		getFeaturedPosts();
	}, []);

	return (
		<div className="pt-5 relative">
			<div className="absolute bg-white/10 dark:bg-black/10 left-0 top-0 w-full h-full"></div>
			<div className="px-3 lg:px-10 h-full">
				<Carousel
					removeArrowOnDeviceType={["tablet", "mobile"]}
					infinite={true}
					autoPlay={true}
					responsive={responsive}
					swipeable={true}
					ssr={true}
					autoPlaySpeed={10000}
					keyBoardControl={true}
				>
					{featuredPosts.map((post) => {
						return (
							<div key={post._id} className=" xl:pl-24 px-2 ">
								<div className="mb-5">
									<Link
										href={`/post/${post._id}`}
										className="capitalize font-bold text-lg mb-3"
									>
										{post.title}
									</Link>
									<div
										className=" line-clamp-3 xl:max-w-[80%]"
										dangerouslySetInnerHTML={{
											__html: post.body,
										}}
									/>
								</div>
								<ul className="pb-5 flex flex-wrap gap-3 text-black/50 items-center dark:text-slate-300 dark:bg-[#171717]">
									<li className="text-nowrap flex items-center">
										<small className="font-semibold gap-1 pr-1 inline-flex items-center">
											Written by <MdOutlineCreate /> :
										</small>

										<Link
											to={`/profile/${post?.author?._id}`}
											className="cursor-pointer  flex hover:text-primary transition-colors duration-300 ease-linear"
										>
											<small>{post?.author?.first_name} </small>
											<small className="pl-1">{post?.author?.last_name}</small>
										</Link>
									</li>

									<li className="text-nowrap flex items-center gap-1">
										<small className="font-semibold gap-1 flex items-center">
											<MdOutlineUpdate />
											Last updated:{" "}
										</small>{" "}
										<small>
											{moment(post?.updatedAt).format(
												"MMMM Do YYYY, h:mm:ss a"
											)}
										</small>
									</li>

									<li className="text-mowrap flex items-center">
										<small className="font-semibold flex gap-1 items-center">
											<FaRegEye />
											Views:{" "}
										</small>{" "}
										<small className="ps-1">{post.read_count}</small>
									</li>
									<li className="text-mowrap items-center inline-flex">
										<small className="font-semibold items-center gap-1 flex">
											<CgReadme /> Reading time:{" "}
										</small>{" "}
										<small className="ps-1">
											{handleTime(post?.reading_time)}
										</small>
									</li>
								</ul>
								<div className="flex items-center">
									{/* <Link href={`/profile/${post.author?._id}`}> */}
									<User
										name={`${
											post?.author?.first_name + " " + post?.author?.last_name
										}`}
										description={post?.author?.profession}
										avatarProps={{ src: post.author?.avatar }}
										className="hidden md:flex"
									/>
									{/* </Link> */}
									<div className="flex gap-2 md:ml-auto  md:px-10">
										{post?.author?.facebook && (
											<a
												className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 dark:hover:bg-white/80 w-7 h-7 rounded-full grid place-content-center"
												href={post?.author.facebook}
												target="_blank"
											>
												<BsFacebook
													size={15}
													className=" transition-colors duration-200 ease-linear group-hover:text-white dark:group-hover:text-black"
												/>
											</a>
										)}
										{post?.author?.twitter && (
											<a
												className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 dark:hover:bg-white/80 w-7 h-7 rounded-full grid place-content-center"
												href={post?.author?.twitter}
												target="_blank"
											>
												<BsTwitter
													size={15}
													className=" transition-colors duration-200 ease-linear group-hover:text-white dark:group-hover:text-black"
												/>
											</a>
										)}
										{post?.author?.linkedin && (
											<a
												className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 dark:hover:bg-white/80 w-7 h-7 rounded-full grid place-content-center"
												href={post?.author?.linkedin}
												target="_blank"
											>
												<BsLinkedin
													size={15}
													className=" transition-colors duration-200 ease-linear group-hover:text-white dark:group-hover:text-black"
												/>
											</a>
										)}
										{post?.author?.pinterest && (
											<a
												className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 dark:hover:bg-white/80 w-7 h-7 rounded-full grid place-content-center"
												href={post?.author?.pinterest}
												target="_blank"
											>
												<BsPinterest
													size={15}
													className=" transition-colors duration-200 ease-linear group-hover:text-white dark:group-hover:text-black"
												/>
											</a>
										)}
										{post?.author?.medium && (
											<a
												className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 dark:hover:bg-white/80 w-7 h-7 rounded-full grid place-content-center"
												href={post?.author?.medium}
												target="_blank"
											>
												<BsMedium
													size={15}
													className=" transition-colors duration-200 ease-linear group-hover:text-white dark:group-hover:text-black"
												/>
											</a>
										)}
										{post?.author?.telegram && (
											<a
												className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 dark:hover:bg-white/80 w-7 h-7 rounded-full grid place-content-center"
												href={post?.author?.telegram}
												target="_blank"
											>
												<BsTelegram
													size={15}
													className=" transition-colors duration-200 ease-linear group-hover:text-white dark:group-hover:text-black"
												/>
											</a>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</Carousel>
			</div>
		</div>
	);
};

export default Hero;
