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
import { useCommentContext } from "../../context/CommentContext";
import { useEffect, useState, useRef } from "react";
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
	const { createComment, getAllPostComments } = useCommentContext();

	const [page, setPage] = useState(1);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);
	const [btnLoading, setBtnLoading] = useState(false);
	const [commentLoading, setCommentLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	const containerRef = useRef(null);
	const bottomRef = useRef(null);

	// console.log(getAllPostComments)

	const handleChange = (e) => {
		if (!user) {
			onLogin();
			return snackBar("Please login to Comment on a post", "error");
		}
		setCommentText(e.target.value);
	};

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

	const handleGetAllPostComments = async () => {
		try {
			setCommentLoading(true);
			const allComments = await getAllPostComments({
				postId,
				page,
			});

			if (allComments.success) {
				const commentsList = allComments.data.data.comments;

				setComments((prev) => {
					const prevIds = new Set(prev.map((comment) => comment._id));
					const newComments = commentsList.filter(
						(comment) => !prevIds.has(comment._id)
					);
					return [...prev, ...newComments];
				});

				setHasMore(allComments.data.data.hasMore);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setCommentLoading(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			setPage(1);
			handleGetAllPostComments();
		}
	}, [postId, isOpen]);

	useEffect(() => {
		if (isOpen) {
			handleGetAllPostComments();
		}
	}, [page, isOpen]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && comments.length > 0) {
					if (hasMore) {
						setPage(page + 1);
					}
				}
			},
			{
				root: containerRef.current,
				threshold: 1.0,
			}
		);

		if (bottomRef.current) {
			observer.observe(bottomRef.current);
		}

		return () => {
			if (bottomRef.current) {
				observer.unobserve(bottomRef.current);
			}
		};
	}, [isOpen, comments]);

	return (
		<Modal
			scrollBehavior="inside"
			size="md"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement="top"
			className="sm:rounded-lg max-h-screen sm:max-h-[400px] rounded-none"
			backdrop="blur"
			ref={containerRef}
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

					<ul className="space-y-2">
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

						{commentLoading && (
							<Spinner
								className="flex pb-4 justify-center"
								color=""
								size="sm"
							/>
						)}
					</ul>
					<div ref={bottomRef} style={{ height: "1px" }}></div>
				</ModalBody>
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
