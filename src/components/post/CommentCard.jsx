import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Input,
	User,
} from "@nextui-org/react";
import { useState } from "react";
import { BiLike, BiSolidLike, BiComment, BiFlag } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { usePostContext } from "../../context/PostContext";
import Reply from "./Reply";

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
	const { likeComment, deleteComment } = usePostContext();
	const [openReply, setOpenReply] = useState(false);
	const [likeBtnLoading, setLikeBtnLoading] = useState(false);

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

	return (
		<div>
			<Card className="shadow-none flex-1 border">
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
					<Button
						onPress={() => setOpenReply(!openReply)}
						size="sm"
						// isIconOnly
						className="rounded-full h-5 px-0 text-slate-300"
						variant="light"
						startContent={<BiComment className=" text-slate-300" />}
					>
						Reply
					</Button>
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
						<Button
							className="text-slate-300 w-5 min-w-10 h-5 px-0"
							variant="light"
							size="sm"
							onPress={() => console.log("Clicked")}
						>
							{/* <small> */}
							<span>
								{likeCounter} Like{likeCounter > 1 && "s"}
							</span>
							{/* </small> */}
						</Button>
					</div>
				</CardFooter>
				<CardFooter className={`${openReply ? "block" : "hidden"} `}>
					<form action="">
						<Input name="reply" placeholder="Type your reply" />
					</form>
					<Reply user={user} />
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
