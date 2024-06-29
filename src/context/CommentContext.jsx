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
			console.error(error);
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
			console.error(error);
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

			return true;
		} catch (error) {
			console.error(error);
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
			console.error(error);
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
			console.error(error);
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
			console.error(error);
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

			return { success: true, data };
		} catch (error) {
			console.error(error);
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
