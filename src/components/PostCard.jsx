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
import { BiLike, BiSolidLike } from "react-icons/bi";
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
}) => {
	const { user } = useUserContext();
	const { publishPost, deletePost, likePost, bookmarkPost } = usePostContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLike, setIsLike] = useState(false);
	const [isBookmark, setIsBookmark] = useState(false);
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
		setIsLike(!isLike);
		await likePost(_id);
	};

	const handleBookmark = () => {
		setIsBookmark(!isBookmark);
		bookmarkPost(_id);
	};

	return (
		<Card className="dark:bg-[#27272a] dark:border-none dark:shadow-sm border flex shadow-sm flex-col items-start">
			<CardHeader className="flex items-center gap-x-3 text-xs">
				<time dateTime={"2020-03-16"} className="text-gray-500">
					{moment(state == "DRAFT" ? createdAt : publishedAt).format("ll")}
				</time>
				{tags.length > 0 && (
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
				{user?._id !== author?._id && (
					<div className="ml-auto flex gap-2">
						<Button
							onPress={handleLike}
							size="sm"
							isIconOnly
							className="rounded-full bg-[#ebced0]"
						>
							{isLike ? (
								<BiSolidLike className="text-[#955055]" />
							) : (
								<BiLike className="text-[#955055]" />
							)}
						</Button>
						<Button
							onPress={handleBookmark}
							size="sm"
							isIconOnly
							className="rounded-full bg-[#ebced0]"
						>
							{isBookmark ? (
								<IoBookmark className="text-[#955055]" />
							) : (
								<IoBookmarkOutline className="text-[#955055]" />
							)}
						</Button>
					</div>
				)}
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
};
export default PostCard;
