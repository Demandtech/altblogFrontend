/* eslint-disable react-hooks/exhaustive-deps */
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Textarea,
	Divider,
	Spinner,
} from "@nextui-org/react";
import { usePostContext } from "../../context/PostContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import CommentCard from "../post/CommentCard";

const Comment = ({
	user,
	postId,
	setCommentCounter,
	commentCounter,
	isOpen,
	onOpenChange,
	postTitle,
	onLogin,
	snackBar,
}) => {
	const { createComment, getAllPostComments } = usePostContext();

	const [commentPage, setCommentPage] = useState(1);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);
	const handleChange = (e) => {
		if (!user) {
			onLogin();
			return snackBar("Please login to Comment on a post", "error");
		}
		setCommentText(e.target.value);
	};
	const [btnLoading, setBtnLoading] = useState(false);
	const [commentLoading, setCommentLoading] = useState(false);

	const handleCreateComment = async (e) => {
		e.preventDefault();

		try {
			setBtnLoading(true);
			const newComment = await createComment({
				postId,
				userId: user._id,
				text: commentText,
			});

			if (newComment.success) {
				setCommentCounter(commentCounter + 1);
				comments.unshift(newComment.data.data);
				setCommentText(" ");
			} else {
				throw new Error("An error occured, try again!");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setBtnLoading(false);
		}
	};

	useEffect(() => {
		const handleGetAllPostComments = async () => {
			try {
				setCommentLoading(true);
				const allComments = await getAllPostComments({
					postId,
					page: commentPage,
				});
				console.log(allComments.data.data.hasMore);
				if (allComments.success) {
					setComments(allComments.data.data.comments);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setCommentLoading(false);
			}
		};
		if (isOpen) {
			handleGetAllPostComments();
		}
	}, [postId, isOpen]);

	return (
		<Modal
			scrollBehavior="inside"
			size="md"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement="top"
			className="sm:rounded-lg max-h-screen sm:max-h-[500px] rounded-none"
			backdrop="blur"
		>
			<ModalContent>
				<ModalHeader className="">
					<div>
						<h3>{postTitle}</h3>
					</div>
				</ModalHeader>
				<Divider />
				<ModalBody className="mt-2">
					<form
						onSubmit={handleCreateComment}
						className="w-full  flex gap-3 flex-col"
					>
						<Textarea
							variant="bordered"
							placeholder="Type your comment"
							name="comment"
							className="w-full h-[60px]"
							onChange={handleChange}
							value={commentText}
						></Textarea>

						<Button
							isLoading={btnLoading}
							isDisabled={!commentText}
							type="submit"
							className="ml-auto disabled:cursor-not-allowed"
							size="sm"
							disabled={!commentText}
						>
							Comment
						</Button>
					</form>
					{/* <Divider /> */}
					<ul className="space-y-2">
						{commentLoading && (
							<Spinner
								className="flex pb-4 justify-center"
								color=""
								size="sm"
							/>
						)}

						{comments.length > 0 && (
							<small className="font-light">Comments</small>
						)}

						{comments.length > 0 &&
							comments.map((comment) => {
								return (
									<li className="rounded-md " key={comment._id}>
										<CommentCard
											onLogin={onLogin}
											user={user}
											comment={comment}
											snackBar={snackBar}
											setComments={setComments}
											commentCounter={commentCounter}
											setCommentCounter={setCommentCounter}
										/>
									</li>
								);
							})}
					</ul>
				</ModalBody>

				{/* <ModalFooter></ModalFooter> */}
			</ModalContent>
		</Modal>
	);
};

Comment.propTypes = {
	user: PropTypes.object,
	postId: PropTypes.string,
	setCommentCounter: PropTypes.func,
	commentCounter: PropTypes.number,
	isOpen: PropTypes.bool,
	onOpenChange: PropTypes.func,
	postTitle: PropTypes.string,
	onLogin: PropTypes.func,
	snackBar: PropTypes.func,
};

export default Comment;
