/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import axios from "../configs/axios";
// import { useUserContext } from "./UserContext";

const CommentContext = createContext(null);

const CommentProvider = ({ children }) => {
	const createComment = async ({ postId, userId, text }) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().post("/comments", { postId, userId, text });

			if (status !== 200) throw new Error("An error occured, try again!");

			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	const getAllPostComments = async ({ postId, page = 1 }) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get(`/comments/${postId}/?page=${page}`);

			if (status !== 200) throw new Error("An error occured, try again!");

			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	const likeComment = async (commentId) => {
		if (!commentId) return;
		try {
			const { status, data } = await axios().get(
				`/likes/comments/${commentId}`
			);

			if (status !== 200)
				throw new Error("An error occured,  please try again");
			console.log(status, data);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const deleteComment = async (commentId) => {
		try {
			const { status } = await axios().delete(`comments/${commentId}`);

			if (status !== 200)
				throw new Error("An error occured, please try again later!");

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const getAllPostCommentUsers = async (postId) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get(`/comments/users/${postId}`);

			if (status !== 200) throw new Error("An error occured, try again!");

			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	const getAllPostLikeUsers = async (postId) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get(`/likes/users/${postId}`);

			if (status !== 200) throw new Error("An error occured, try again!");

			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	const replyComment = async ({ commentId, userId, text }) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().post("/comments/reply", { commentId, userId, text });

			if (status !== 200) throw new Error("An error occured, try again!");

			await getAllCommentReply({ commentId, page: 1 });

			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	const getAllCommentReply = async ({ commentId, page = 1 }) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get(`/comments/reply/${commentId}/?page=${page}`);

			console.log(data);

			if (status !== 200) throw new Error("An error occured, try again!");

			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	const likeReply = async (replyId) => {
		if (!replyId) return;
		try {
			const { status, data } = await axios().get(`/likes/reply/${replyId}`);

			if (status !== 200)
				throw new Error("An error occured,  please try again");
			console.log(status, data);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const getAllReplyUsers = async (commentId) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get(`/comments/reply/users/${commentId}`);

			if (status !== 200) throw new Error("An error occured, try again!");
			// console.log(data);
			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};
	const getAllCommentLikeUsers = async (commentId) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get(`/likes/comments/users/${commentId}`);

			if (status !== 200) throw new Error("An error occured, try again!");
			// console.log(data);
			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	return (
		<CommentContext.Provider
			value={{
				createComment,
				getAllPostComments,
				likeComment,
				deleteComment,
				getAllPostCommentUsers,
				getAllPostLikeUsers,
				replyComment,
				getAllCommentReply,
				likeReply,
				getAllReplyUsers,
				getAllCommentLikeUsers,
			}}
		>
			{children}
		</CommentContext.Provider>
	);
};

export const useCommentContext = () => {
	return useContext(CommentContext);
};

CommentProvider.propTypes = {
	children: PropTypes.element,
};

export default CommentProvider;
