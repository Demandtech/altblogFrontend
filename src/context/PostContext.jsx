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
		isPending: false,
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

	const getAuthorPosts = async ({ id, page, order, limit, state }) => {
		updateState("isPending", true);
		try {
			if (!id) throw new Error("Id is required");

			const { data, status } = await axios().get(
				`/posts/authors/${id}/?page=${page}&order=${order}&limit=${limit}&state=${state}`
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

	const getAllPublishedPosts = async ({ search, page, order, limit }) => {
		updateState("isPending", true);
		try {
			const { data, status } = await axios().get(
				`/posts?page=${page}&search=${search}&order=${order}&limit=${limit}`
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
			const { status } = await axios().post("/posts", value);

			if (status !== 201) return;

			return true;
		} catch (error) {
			console.log(error.message);

			return false;
		}
	};

	const publishPost = async (id) => {
		try {
			updateState("isPending", true);
			const { status } = await axios().get(`posts/publish/${id}`);

			if (status !== 200) throw new Error("An error occured, try again later!");

			snackBar("Post published successfully!", "success");
		} catch (error) {
			snackBar("An error occured, please try again!", "error");
			console.log(error);
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

			setInitialState((prev) => {
				return {
					...prev,
					posts: latestPosts,
					author_posts: authorLatestPosts,
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
			const { status } = await axios().get(`posts/like/${postId}`);

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

	const userBookmarkPosts = async () => {
		try {
			const {
				status,
				data: { data },
			} = await axios().get(`posts/user/bookmark/`);

			if (status !== 200) throw new Error("Something went wrong, try again!");

			updateState("bookmarkPosts", data);

			console.log(data);

			return true;
		} catch (error) {
			console.log(error);
			return false;
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
				userBookmarkPosts,
				getFeaturedPosts,
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
