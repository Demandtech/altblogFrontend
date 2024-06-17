import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	Input,
	User,
	DropdownItem,
	Avatar,
} from "@nextui-org/react";
import { useState } from "react";
import { BiLike, BiSolidLike, BiComment, BiFlag } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { useCommentContext } from "../../context/CommentContext";
import Reply from "./Reply";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const CommentCard = ({
	comment,
	user,
	onLogin,
	snackBar,
	setComments,
	commentCounter,
	setCommentCounter,
}) => {
	const [isLike, setIsLike] = useState(comment?.isLiked);
	const [likeCounter, setLikeCounter] = useState(comment?.likeCount || 0);
	const [replyCounter, setReplyCounter] = useState(comment?.replyCount || 0);
	const {
		likeComment,
		deleteComment,
		replyComment,
		getAllReplyUsers,
		getAllCommentLikeUsers,
	} = useCommentContext();
	const [openReply, setOpenReply] = useState(false);
	const [likeBtnLoading, setLikeBtnLoading] = useState(false);
	const [value, setValue] = useState("");
	const [replies, setReplies] = useState([]);
	const [replyUsers, setReplyUsers] = useState([]);
	const [commentLikeUser, setCommentLikeUser] = useState([]);

	const handleLikeComment = async () => {
		if (user) {
			try {
				setLikeBtnLoading(true);
				const isSuccess = await likeComment(comment._id);

				if (isSuccess) {
					if (isLike) {
						setLikeCounter(likeCounter - 1);
						snackBar("You unlike a comment", "success");
					} else {
						snackBar("You like a comment", "success");
						setLikeCounter(likeCounter + 1);
					}
					setIsLike(!isLike);
				} else {
					snackBar("Something went wrong", "error");
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLikeBtnLoading(false);
			}
		} else {
			onLogin();
			snackBar("Please login to like a Comment", "error");
		}
	};

	const handleDeleteComment = async () => {
		try {
			const isSuccess = await deleteComment(comment._id);
			if (!isSuccess) throw new Error("An error occured, try again!");

			setComments((prev) => {
				return prev.filter((com) => com._id !== comment._id);
			});

			setCommentCounter(commentCounter - 1);

			snackBar("Comment deleted successfully", "error");
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitReply = async () => {
		if (!value) return snackBar("Text can not be empty");

		try {
			const reply = await replyComment({
				commentId: comment._id,
				userId: user._id,
				text: value,
			});

			replies.unshift(reply.data.data);
			if (reply.success) {
				snackBar("reply sent successfully", "success");
				setValue("");
				setReplyCounter((prev) => prev + 1);
			}
			// console.log(reply);
		} catch (error) {
			console.log(error);
		}
	};
	const handleGetCommentReplyUser = async () => {
		const result = await getAllReplyUsers(comment._id);
		if (result.success) {
			setReplyUsers(result.data.data);
		}
	};

	const handleGetCommentLikeUser = async () => {
		const result = await getAllCommentLikeUsers(comment._id);
		if (result.success) {
			setCommentLikeUser(result.data.data);
		}
	};

	return (
		<div>
			<Card className="shadow-none  flex-1 border ">
				<CardBody className="">
					<div className="flex items-start gap-2">
						<User
							name={`${comment.user.first_name} ${comment.user.last_name}`}
							description={comment.user.profession}
							avatarProps={{ src: comment.user.avatar }}
						/>
						<div className="ml-auto">
							{user?._id === comment?.user?._id ? (
								<Button
									onPress={handleDeleteComment}
									size="sm"
									isIconOnly
									className="rounded-full"
									variant="light"
									color="danger"
								>
									<RiDeleteBin5Line />
								</Button>
							) : (
								<Button
									className="rounded-full"
									variant="light"
									color="danger"
									size="sm"
									isIconOnly
								>
									<BiFlag />
								</Button>
							)}
						</div>
					</div>
					<p>
						<small>{comment.text}</small>
					</p>
				</CardBody>
				<CardFooter className="gap-2 items-center justify-end py-2">
					<div className="flex items-center">
						<Button
							onPress={() => setOpenReply(!openReply)}
							size="sm"
							isIconOnly
							className="rounded-full  px-0 text-slate-300"
							variant="light"
						>
							<BiComment className=" text-slate-300" />
						</Button>
						<Dropdown
							onOpenChange={(isOpen) => {
								if (isOpen) {
									handleGetCommentReplyUser();
								}
							}}
						>
							<DropdownTrigger>
								<Button
									className="rounded-full h-5 px-0 text-slate-300"
									variant="light"
									size="sm"
								>
									{replyCounter} {replyCounter > 1 ? " Replies" : "Reply"}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								className="max-h-[300px] overflow-auto"
								items={replyUsers}
								aria-label="reply user"
							>
								{(item) => {
									return (
										<DropdownItem textValue={item.first_name} key={item._id}>
											<div className="flex gap-2 items-center">
												<Avatar
													alt={item.first_name}
													className="flex-shrink-0"
													size="sm"
													src={item.avatar}
												/>
												<div className="flex flex-col">
													<Link to={`/profile/${item._id}`}>
														<span className="text-small">
															{item.first_name}
														</span>
													</Link>
													<span className="text-tiny text-default-400">
														{item.profession}
													</span>
												</div>
											</div>
										</DropdownItem>
									);
								}}
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className="flex items-center">
						<Button
							onPress={handleLikeComment}
							size="sm"
							className="rounded-full min-w-5 h-5 w-5 px-0 text-slate-300"
							variant="light"
							isIconOnly
							isDisabled={likeBtnLoading}
						>
							{isLike ? (
								<BiSolidLike className="text-slate-300" />
							) : (
								<BiLike className="text-slate-300" />
							)}
						</Button>
						<Dropdown
							onOpenChange={(isOpen) => {
								if (isOpen) {
									handleGetCommentLikeUser();
								}
							}}
						>
							<DropdownTrigger>
								<Button
									className="text-slate-300 w-5 min-w-10 h-5 px-0"
									variant="light"
									size="sm"
								>
									{/* <small> */}
									<span>
										{likeCounter} Like{likeCounter > 1 && "s"}
									</span>
									{/* </small> */}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="User that like Comment"
								items={commentLikeUser}
							>
								{(item) => {
									return (
										<DropdownItem textValue={item.first_name} key={item._id}>
											<div className="flex gap-2 items-center">
												<Avatar
													alt={item.first_name}
													className="flex-shrink-0"
													size="sm"
													src={item.avatar}
												/>
												<div className="flex flex-col">
													<Link to={`/profile/${item._id}`}>
														<span className="text-small">
															{item.first_name}
														</span>
													</Link>
													<span className="text-tiny text-default-400">
														{item.profession}
													</span>
												</div>
											</div>
										</DropdownItem>
									);
								}}
							</DropdownMenu>
						</Dropdown>
					</div>
				</CardFooter>
				<CardFooter
					className={`${
						openReply ? "block max-h-[300px] overflow-auto" : "hidden"
					} `}
				>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmitReply();
						}}
					>
						<Input
							endContent={
								<Button
									variant="light"
									size="sm"
									isIconOnly
									className="rounded-full"
									onPress={handleSubmitReply}
								>
									<FaSearch />
								</Button>
							}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							name="reply"
							placeholder="Type your reply"
						/>
					</form>
					<Reply
						replyCounter={replyCounter}
						openReply={openReply}
						comment={comment}
						user={user}
						replies={replies}
						setReplies={setReplies}
					/>
				</CardFooter>
			</Card>
		</div>
	);
};

CommentCard.propTypes = {
	comment: PropTypes.object.isRequired,
	user: PropTypes.object,
	onLogin: PropTypes.func,
	snackBar: PropTypes.func,
	setComments: PropTypes.func,
	commentCounter: PropTypes.number,
	setCommentCounter: PropTypes.func,
};

export default CommentCard;
