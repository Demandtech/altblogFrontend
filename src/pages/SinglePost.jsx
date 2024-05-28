/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner, Button } from "@nextui-org/react";
import { usePostContext } from "../context/PostContext";
import moment from "moment";
import { handleTime } from "../helper/convertReadingTime";
import { MdOutlineCreate, MdOutlineUpdate } from "react-icons/md";
import { CgReadme } from "react-icons/cg";
import { FaRegEye } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { BiLike, BiSolidLike, BiShareAlt, BiComment } from "react-icons/bi";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import PropTypes from "prop-types";
import PostCard from "../components/PostCard";

const SinglePost = ({ onLogin }) => {
	const { id } = useParams();
	const {
		getSinglePost,
		singlePost,
		isPending,
		likePost,
		bookmarkPost,
		getRelatedPosts,
		relatedPosts,
	} = usePostContext();
	const { user, snackBar } = useUserContext();
	const [isLike, setIsLike] = useState(singlePost?.isLiked);
	const [isBookmark, setIsBookmark] = useState(singlePost?.isBookmarked);
	const [likeCounter, setLikeCounter] = useState(singlePost?.likeCount);
	const [commentCounter, setCommentCounter] = useState(
		singlePost?.commentCount
	);
	const [writeComment, setWriteComment] = useState(false);

	const handleLike = async () => {
		if (user) {
			const isSuccess = await likePost(singlePost._id);

			if (isSuccess) {
				if (isLike) {
					setLikeCounter(likeCounter - 1);
					snackBar("Post unlike a post", "success");
				} else {
					snackBar("You like a post", "success");
					setLikeCounter(likeCounter + 1);
				}
				setIsLike(!isLike);
			} else {
				// setIsLike(!isLike);
				snackBar("Something went wrong", "error");
			}
		} else {
			onLogin();
			snackBar("Please login to like post", "error");
		}
	};

	console.log(relatedPosts);

	const handleBookmark = async () => {
		if (user) {
			setIsBookmark(!isBookmark);
			const isSuccess = await bookmarkPost(singlePost._id);

			if (isSuccess) {
				snackBar(isSuccess.message, "success");
			} else {
				setIsBookmark(!isBookmark);
				snackBar("Something went wrong", "error");
			}
		} else {
			onLogin();
			snackBar("Please login to bookmark post", "error");
		}
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: singlePost.title,
					text: singlePost.description,
					url: location.href,
				});
			} catch (error) {
				alert("An error occured, please try again!");
			}
		} else {
			alert("Web Share not supported on your browser");
		}
	};

	const handleComment = async () => {
		setWriteComment(!writeComment);
	};

	useEffect(() => {
		if (!id) return;

		const getPost = async () => {
			await getSinglePost(id);
			await getRelatedPosts({ postId: id, page: 1 });
		};
		getPost();
		localStorage.setItem("EditPostId", id);
	}, [id]);

	useEffect(() => {
		if (singlePost) {
			setIsLike(singlePost?.isLiked);
			setIsBookmark(singlePost?.isBookmarked);
			setLikeCounter(singlePost?.likeCount);
			setCommentCounter(singlePost?.commentCount);
		}
	}, [singlePost]);

	return (
		<>
			{isPending ? (
				<Spinner
					color="default"
					classNames={{ label: "opacity-50" }}
					label="Loading..."
					className="min-h-screen flex"
				/>
			) : (
				<div className="">
					<div className="px-3 lg:px-10 mb-4">
						<div className="mt-8 pb-8">
							<div className="border-b-2">
								<div className=" md:max-w-2xl">
									<h1 className="mb-3 max-w-md font-bold text-3xl">
										{singlePost?.title}
									</h1>
									<h3 className="text-black/75 dark:text-white/75">
										{singlePost?.description}
									</h3>
								</div>
								<ul className="py-5 flex flex-wrap gap-3 text-black/50 items-center dark:text-slate-300 dark:bg-[#171717]">
									<li className="text-nowrap flex items-center">
										<small className="font-semibold gap-1 pr-1 inline-flex items-center">
											<MdOutlineCreate />
											Written by:{" "}
										</small>

										<Link
											to={`/profile/${singlePost?.author?._id}`}
											className="cursor-pointer  flex hover:text-primary transition-colors duration-300 ease-linear"
										>
											<small>{singlePost?.author?.first_name} </small>
											<small className="pl-1">
												{singlePost?.author?.last_name}
											</small>
										</Link>
									</li>

									<li className="text-nowrap flex items-center gap-1">
										<small className="font-semibold gap-1 flex items-center">
											<MdOutlineUpdate />
											Last updated:{" "}
										</small>{" "}
										<small>
											{moment(singlePost?.updatedAt).format(
												"MMMM Do YYYY, h:mm:ss a"
											)}
										</small>
									</li>

									<li className="text-mowrap flex items-center">
										<small className="font-semibold flex gap-1 items-center">
											<FaRegEye />
											Views:{" "}
										</small>{" "}
										<small className="ps-1">{singlePost?.read_count}</small>
									</li>
									<li className="text-mowrap items-center inline-flex">
										<small className="font-semibold items-center gap-1 flex">
											<CgReadme /> Reading time:{" "}
										</small>{" "}
										<small className="ps-1">
											{handleTime(singlePost?.reading_time)}
										</small>
									</li>
									<div className="flex items-center">
										<li>
											<Button
												onPress={handleComment}
												size="sm"
												isIconOnly
												className="rounded-full"
												variant="light"
											>
												<BiComment className=" text-slate-300" />
												{commentCounter > 0 && (
													<sup className="text-slate-400">{commentCounter}</sup>
												)}
											</Button>
										</li>
										<li>
											<Button
												onPress={handleLike}
												size="sm"
												isIconOnly
												className="rounded-full"
												variant="light"
											>
												{isLike ? (
													<BiSolidLike className=" text-slate-300" />
												) : (
													<BiLike className=" text-slate-300" />
												)}
												{likeCounter > 0 && (
													<sup className="text-slate-400">{likeCounter}</sup>
												)}
											</Button>
										</li>
										<li>
											<Button
												onPress={handleBookmark}
												size="sm"
												isIconOnly
												className="rounded-full"
												variant="light"
											>
												{isBookmark ? (
													<IoBookmark className=" text-slate-300" />
												) : (
													<IoBookmarkOutline className=" text-slate-300" />
												)}
											</Button>
										</li>
										<li>
											<Button
												variant="light"
												onPress={handleShare}
												size="sm"
												isIconOnly
												className="rounded-full"
											>
												<BiShareAlt className=" text-slate-400" />
											</Button>
										</li>
									</div>
								</ul>
							</div>
							<style>
								{`
								.blog-body{
									// border-top: 2px solid;
									padding-top: 20px;

									h1,h2, h3{
										font-weight: bold;
										font-size: 1.2rem
									}
								   ol {
									
									list-style-type: decimal !important;
									list-style-position: inside !important;
								   }
								   ul {
									list-style-type: disc !important;
									list-style-position: inside !important;
								   }
								}
								`}
							</style>
							<div className="grid grid-cols-3">
								<div
									className="blog-body col-span-3 md:col-span-2"
									dangerouslySetInnerHTML={{ __html: singlePost?.body }}
								></div>
								<div className="col-span-3 md:col-span-1 pt-5">
									<h3 className="font-bold text-lg mb-5">Related Post</h3>
									<div className="space-y-3">
										{relatedPosts.map((item) => {
											return <PostCard {...item} key={item._id} />;
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

SinglePost.propTypes = {
	onLogin: PropTypes.func,
};

export default SinglePost;
