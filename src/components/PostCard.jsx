import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Chip,
	Link,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	User,
} from "@nextui-org/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiSolidLike, BiShareAlt } from "react-icons/bi";
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
import { useSearchParams } from "react-router-dom";
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
}) => {
	const { user, snackBar } = useUserContext();
	const { publishPost, deletePost, likePost, bookmarkPost } = usePostContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLike, setIsLike] = useState(isLiked);
	const [isBookmark, setIsBookmark] = useState(isBookmarked);
	const [likeCounter, setLikeCounter] = useState(likeCount);
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
					snackBar("Post unlike", "success");
				} else {
					snackBar("Post liked", "success");
					setLikeCounter(likeCounter + 1);
				}
				setIsLike(!isLike);
			} else {
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

	return (
		<Card className="dark:bg-[#27272a] dark:border-none dark:shadow-sm border flex shadow-sm flex-col items-start">
			<CardHeader className="flex items-center gap-x-3 text-xs">
				<time dateTime={"2020-03-16"} className="text-gray-500">
					{moment(state == "DRAFT" ? createdAt : publishedAt).format("ll")}
				</time>
				{tags?.length > 0 && (
					<Chip
						className="capitalize bg-[#ede8f5] dark:bg-[#171717] dark:text-white/70"
						size="sm"
					>
						{tags[0]}
					</Chip>
				)}

				<Chip
					size="sm"
					className="pe-3 bg-[#ede8f5] dark:bg-[#171717] dark:text-white/70"
					endContent={<FaRegEye />}
				>
					{read_count}
				</Chip>
				<Chip
					size="sm"
					className="bg-[#ede8f5] dark:bg-[#171717] dark:text-white/70"
					startContent={<IoTimerOutline />}
				>
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
			<CardBody className="group relative">
				<h3 className="text-lg mb-3  font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
					<Link
						href={`/post/${_id}`}
						className="capitalize w-full !line-clamp-1"
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
				<Link className="text-dark" href={`/profile/${author?._id}`}>
					<User
						name={`${author?.first_name + " " + author?.last_name}`}
						description={author?.profession}
						avatarProps={{ src: author?.avatar }}
					/>
				</Link>

				<div className="ml-auto flex">
					<Button
						onPress={handleLike}
						size="sm"
						isIconOnly
						className="rounded-full"
						variant="light"
					>
						{isLike ? (
							<BiSolidLike className="text-[#955055]" />
						) : (
							<BiLike className="text-[#955055]" />
						)}
						{likeCounter > 0 && <sup className="">{likeCounter}</sup>}
					</Button>
					<Button
						onPress={handleBookmark}
						size="sm"
						isIconOnly
						className="rounded-full"
						variant="light"
					>
						{isBookmark ? (
							<IoBookmark className="text-[#955055]" />
						) : (
							<IoBookmarkOutline className="text-[#955055]" />
						)}
					</Button>
					<Button
						variant="light"
						// onPress={handleBookmark}
						size="sm"
						isIconOnly
						className="rounded-full"
					>
						{/* {isBookmark ? (
							<IoBookmark className="text-[#955055]" />
						) : (
							<IoBookmarkOutline className="text-[#955055]" />
						)} */}
						<BiShareAlt className="text-[#955055]" />
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
};
export default PostCard;
