/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "../configs/axios";
import { useUserContext } from "./UserContext";

const PostContext = createContext(null);

const PostProvider = ({ children }) => {
	const { snackBar } = useUserContext();
	const [initialState, setInitialState] = useState({
		posts: [],
		featuredPosts: [],
		bookmarkPosts: [],
		author_posts: [],
		singlePost: null,
		isPending: true,
		relatedPosts: { posts: [], hasMore: false },
		meta: null,
	});

	const updateState = (name, value) => {
		setInitialState((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const getAuthorPosts = async ({
		id,
		page = 1,
		order,
		limit,
		state,
		search = "",
		category = "",
	}) => {
		updateState("isPending", true);

		try {
			if (!id) throw new Error("Id is required");

			const { data, status } = await axios().get(
				`/posts/authors/${id}/?page=${page}&order=${order}&limit=${limit}&state=${state}&search=${search}&category=${
					category ? category : ""
				}`
			);
			if (status !== 200) return;
			updateState("author_posts", data.data.posts);
			updateState("meta", data.data.meta);
		} catch (error) {
			console.log(error);
		} finally {
			updateState("isPending", false);
		}
	};

	const getAllPublishedPosts = async ({
		search,
		page,
		order,
		limit,
		category,
	}) => {
		updateState("isPending", true);
		try {
			const { data, status } = await axios().get(
				`/posts?page=${page}&search=${search}&order=${order}&limit=${limit}&category=${category}`
			);

			if (status !== 200) throw new Error("An error occured, try again later!");

			updateState("posts", data.data.posts);
			updateState("meta", data.data.meta);

			// console.log(data.data.meta);
		} catch (error) {
			console.log(error);
		} finally {
			updateState("isPending", false);
		}
	};

	const getSinglePost = async (id) => {
		updateState("isPending", true);
		try {
			const { data, status } = await axios().get(`posts/${id}`);

			if (status !== 200) throw new Error("An error occured, try again later!");
			updateState("singlePost", data.data);
			return data.data;
		} catch (error) {
			console.log(error);
		} finally {
			updateState("isPending", false);
		}
	};

	const getFeaturedPosts = async () => {
		try {
			const {
				data: { data },
				status,
			} = await axios().get("posts/featured");
			// console.log(status, data);
			if (status !== 200) throw new Error("An error occured");
			// console.log(data);
			updateState("featuredPosts", data);
			return true;
		} catch (error) {
			console.log(error.message);
			return false;
		}
	};

	const createPost = async (value) => {
		try {
			const { status, data } = await axios().post("/posts", value);

			if (status !== 201) return;
			console.log(data);
			return { success: true, post: data.post };
		} catch (error) {
			console.log(error);
			return { success: false, post: null, message: error.message };
		}
	};

	const publishPost = async (id) => {
		try {
			updateState("isPending", true);
			const { status } = await axios().get(`posts/publish/${id}`);

			if (status !== 200) throw new Error("An error occured, try again later!");

			const newAuthorPosts = initialState.author_posts.filter(
				(post) => post._id != id
			);

			const newMeta = {
				...initialState.meta,
				total_items:
					initialState.meta.total_items > 0
						? initialState.meta.total_items - 1
						: 0,
			};

			updateState("author_posts", newAuthorPosts);
			updateState("meta", newMeta);
			return true;
		} catch (error) {
			snackBar("An error occured, please try again!", "error");
			console.log(error);
			return false;
		} finally {
			updateState("isPending", false);
		}
	};

	const editPost = async (id, value) => {
		try {
			const { status } = await axios().put(`posts/${id}`, value);

			if (status !== 200) throw new Error("An error occured, try again later!");

			snackBar("Post updated successfully!", "success");
		} catch (error) {
			snackBar("An error occured, please try again!", "error");
			console.log(error);
		}
	};

	const deletePost = async (postId) => {
		try {
			const { status } = await axios().delete(`posts/${postId}`);

			if (status !== 200)
				throw new Error("An error occured, please try again later!");

			const latestPosts = initialState.posts.filter(
				(post) => post._id !== postId
			);
			const authorLatestPosts = initialState.author_posts.filter(
				(post) => post._id !== postId
			);

			const latestMeta = {
				...initialState.meta,
				total_items:
					initialState.meta.total_items > 0
						? initialState.meta.total_items - 1
						: 0,
			};

			setInitialState((prev) => {
				return {
					...prev,
					posts: latestPosts,
					author_posts: authorLatestPosts,
					meta: latestMeta,
				};
			});
			snackBar("Post deleted successfully", "success");
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const likePost = async (postId) => {
		if (!postId) return;
		try {
			const { status } = await axios().get(`/likes/posts/${postId}`);

			if (status !== 200)
				throw new Error("An error occured,  please try again");

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const bookmarkPost = async (postId) => {
		if (!postId) return;
		try {
			const { status, data } = await axios().get(`posts/bookmark/${postId}`);

			if (status !== 200)
				throw new Error("An error occured,  please try again");

			return data;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const getUserBookmarkPosts = async () => {
		try {
			let {
				status,
				data: { data },
			} = await axios().get(`posts/user/bookmarks`);

			if (status !== 200) throw new Error("Something went wrong, try again!");

			data = data.filter((item) => item.post);

			updateState("bookmarkPosts", data);

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const getRelatedPosts = async ({ postId, page = 1, search }) => {
		try {
			const {
				status,
				data: { data },
			} = await axios().get(
				`posts/related/${postId}?page=${page}&search=${search}`
			);

			if (status !== 200) throw new Error("Something went wrong, try again!");

			const existingPostIds = new Set(
				initialState.relatedPosts.posts.map((post) => post._id)
			);

			const newPosts = data.relatedPosts.filter(
				(post) => !existingPostIds.has(post._id)
			);

			const relatedPosts = {
				hasMore: data.hasMore,
				posts:
					page > 1
						? [...initialState.relatedPosts.posts, ...newPosts]
						: data.relatedPosts,
			};

			updateState("relatedPosts", relatedPosts);

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

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

			return { success: true, data };
		} catch (error) {
			console.log(error);
			return { success: false, data: null };
		}
	};

	return (
		<PostContext.Provider
			value={{
				...initialState,
				getAuthorPosts,
				getAllPublishedPosts,
				getSinglePost,
				publishPost,
				createPost,
				editPost,
				deletePost,
				likePost,
				bookmarkPost,
				getUserBookmarkPosts,
				getFeaturedPosts,
				getRelatedPosts,
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
		</PostContext.Provider>
	);
};

export const usePostContext = () => {
	return useContext(PostContext);
};

PostProvider.propTypes = {
	children: PropTypes.element,
};

export default PostProvider;
