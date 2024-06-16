/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import axios from "../configs/axios";
// import { useUserContext } from "./UserContext";

const CommentContext = createContext(null);

const CommentProvider = ({ children }) => {
	// const { snackBar } = useUserContext();
	// const [initialState, setInitialState] = useState({
	// 	posts: [],
	// 	featuredPosts: [],
	// 	bookmarkPosts: [],
	// 	author_posts: [],
	// 	singlePost: null,
	// 	isPending: true,
	// 	relatedPosts: { posts: [], hasMore: false },
	// 	meta: null,
	// });

	// const updateState = (name, value) => {
	// 	setInitialState((prev) => {
	// 		return {
	// 			...prev,
	// 			[name]: value,
	// 		};
	// 	});
	// };

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

            console.log(data);

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

			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	return (
		<CommentContext.Provider
			value={{
				// ...initialState,

				createComment,
				getAllPostComments,
				likeComment,
				deleteComment,
				getAllPostCommentUsers,
				getAllPostLikeUsers,
				replyComment,
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
