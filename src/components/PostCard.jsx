import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Chip,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	User,
	Textarea,
} from "@nextui-org/react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiSolidLike, BiShareAlt, BiComment } from "react-icons/bi";
import { IoBookmarkOutline, IoTimerOutline, IoBookmark } from "react-icons/io5";
import PropTypes from "prop-types";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import { FaRegEye } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { usePostContext } from "../context/PostContext";
import { handleTime } from "../helper/convertReadingTime";
import { MdPublish } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

const PostCard = ({
	title,
	body,
	author,
	createdAt,
	tags,
	_id,
	reading_time,
	read_count,
	state,
	editPostOnOpen,
	publishedAt,
	isLiked,
	likeCount,
	onLogin,
	isBookmarked,
	description,
	commentCount,
}) => {
	const { user, snackBar } = useUserContext();
	const { publishPost, deletePost, likePost, bookmarkPost } = usePostContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLike, setIsLike] = useState(isLiked);
	const [isBookmark, setIsBookmark] = useState(isBookmarked);
	const [likeCounter, setLikeCounter] = useState(likeCount);
	const [commentCounter, setCommentCounter] = useState(commentCount);
	const [writeComment, setWriteComment] = useState(false);

	const existingParams = Object.fromEntries(searchParams);

	const handleEditPost = () => {
		editPostOnOpen();

		const params = { ...existingParams, postId: _id };
		setSearchParams(params);
	};

	const truncateText = (text) => {
		const wordCount = text.split(" ");

		let words = wordCount.filter((word) => word != "");

		words = wordCount.map((el) => {
			const modifiedElement = el
				.replace(/<\/?[a-zA-Z]+(?:\s[^>]*)?>/g, "<span>")
				.replace(/<\/?br\s*\/?>/g, "");
			return modifiedElement;
		});

		return words.join(" ");
	};

	const handleLike = async () => {
		if (user) {
			const isSuccess = await likePost(_id);

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

	const handleBookmark = async () => {
		if (user) {
			setIsBookmark(!isBookmark);
			const isSuccess = await bookmarkPost(_id);

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
					title: title,
					text: description,
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

		setCommentCounter(commentCounter + 1);
	};

	return (
		<Card
			isHoverable={true}
			className="dark:bg-[#27272a]  transition-all duration-300 ease-linear dark:border-none dark:shadow-sm border flex shadow-sm hover:drop-shadow-lg flex-col items-start"
		>
			<CardHeader className="flex items-center gap-x-3 text-xs">
				<time dateTime={"2020-03-16"} className="text-gray-500">
					{moment(state == "DRAFT" ? createdAt : publishedAt).format("ll")}
				</time>

				<Chip size="sm" endContent={<FaRegEye />}>
					{read_count}
				</Chip>
				<Chip size="sm" startContent={<IoTimerOutline />}>
					{handleTime(reading_time)}
				</Chip>
				{user?._id === author?._id && (
					<Dropdown className="">
						<DropdownTrigger>
							<Button className="ml-auto" isIconOnly variant="light">
								<BsThreeDotsVertical className="dark:text-white/80" />
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions">
							{state === "DRAFT" && (
								<DropdownItem
									onPress={() => {
										publishPost(_id);
									}}
									key="publish"
									startContent={<MdPublish />}
								>
									Publish Post
								</DropdownItem>
							)}
							<DropdownItem
								onPress={handleEditPost}
								key="edit"
								startContent={<FiEdit />}
							>
								Edit Post
							</DropdownItem>

							<DropdownItem
								startContent={<RiDeleteBin5Line />}
								key="delete"
								className="text-danger"
								color="danger"
								onPress={() => deletePost(_id)}
							>
								Delete Post
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				)}
			</CardHeader>
			<div className="flex gap-2 px-3 flex-wrap">
				{tags?.length > 0 &&
					tags
						.map((tag) => {
							return (
								<Chip
									key={tag}
									className="capitalize  cursor-pointer "
									size="sm"
								>
									{tags}
								</Chip>
							);
						})
						.slice(0, 2)}
			</div>
			<CardBody className="group relative">
				<h3 className="text-lg mb-3  font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
					<Link
						to={`/post/${_id}`}
						className="capitalize w-full !line-clamp-1 text-black dark:text-white hover:text-blue-400 transition-colors duration-150 ease-linear"
					>
						{title}
					</Link>
				</h3>

				<div
					className="line-clamp-3 ! dark:text-slate-300"
					dangerouslySetInnerHTML={{
						__html: truncateText(body),
					}}
				/>
			</CardBody>
			<CardFooter className="flex gap-x-4">
				<Link className="text-dark" to={`/profile/${author?._id}`}>
					<User
						name={`${author?.first_name + " " + author?.last_name}`}
						description={author?.profession}
						avatarProps={{ src: author?.avatar }}
					/>
				</Link>

				<div className="ml-auto flex">
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
					<Button
						variant="light"
						onPress={handleShare}
						size="sm"
						isIconOnly
						className="rounded-full"
					>
						<BiShareAlt className=" text-slate-400" />
					</Button>
				</div>
			</CardFooter>
			<CardFooter className={writeComment ? "block" : "hidden"}>
				<div className="w-full overflow-hidden flex gap-3 flex-col">
					<Textarea
						placeholder="Type your comment"
						width={"100%"}
						name=""
						id=""
						className="w-full"
						// rows="2"
					></Textarea>
					<Button className="ml-auto" size="sm ">
						Comment
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

PostCard.propTypes = {
	title: PropTypes.string,
	author: PropTypes.object,
	body: PropTypes.string,
	createdAt: PropTypes.string,
	publishedAt: PropTypes.string,
	tags: PropTypes.array,
	_id: PropTypes.string,
	read_count: PropTypes.number,
	reading_time: PropTypes.number,
	state: PropTypes.string,
	editPostOnOpen: PropTypes.func,
	isLiked: PropTypes.bool,
	isBookmarked: PropTypes.bool,
	likeCount: PropTypes.number,
	onLogin: PropTypes.func,
	description: PropTypes.string,
	commentCount: PropTypes.number,
};
export default PostCard;
