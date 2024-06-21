/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import axios from "../configs/axios";

const ReplyContext = createContext(null);

const ReplyProvider = ({ children }) => {
	
	const createReply = async ({ commentId, userId, text }) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().post("/replies", { commentId, userId, text });

			if (status !== 200) throw new Error("An error occured, try again!");

			await getAllReplies({ commentId, page: 1 });

			return { success: true, data };
		} catch (error) {
			console.error(error);
			return { success: false, data: null };
		}
	};

	const getAllReplies = async ({ commentId, page = 1 }) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get(`/replies/${commentId}/?page=${page}`);

			if (status !== 200) throw new Error("An error occured, try again!");

			return { success: true, data };
		} catch (error) {
			console.error(error);
			return { success: false, data: null };
		}
	};

	const likeReply = async (replyId) => {
		if (!replyId) return;
		try {
			const { status, data } = await axios().get(`/likes/reply/${replyId}`);

			if (status !== 200)
				throw new Error("An error occured,  please try again");

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const getAllReplyUsers = async (commentId) => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get(`/replies/users/${commentId}`);

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

	const deleteReply = async (replyId) => {
		try {
			const { status } = await axios().delete(`/replies/${replyId}`);

			if (status !== 200)
				throw new Error("An error occured, please try again later!");

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	return (
		<ReplyContext.Provider
			value={{
				createReply,
				getAllReplies,
				likeReply,
				getAllReplyUsers,
				getAllCommentLikeUsers,
				deleteReply,
			}}
		>
			{children}
		</ReplyContext.Provider>
	);
};

export const useReplyContext = () => {
	return useContext(ReplyContext);
};

ReplyProvider.propTypes = {
	children: PropTypes.element,
};

export default ReplyProvider;
