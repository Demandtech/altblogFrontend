/* eslint-disable react-hooks/exhaustive-deps */
import Hero from "../components/Hero";
import PostsContainer from "../components/PostsContainer";
import { usePostContext } from "../context/PostContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function Home({ editPostOnOpen, loginOnOpen, search }) {
	const { posts, getAllPublishedPosts } = usePostContext();
	const { user } = useUserContext();
	const [order, setOrder] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const pageParam = searchParams.get("page");
	const [page, setPage] = useState(pageParam ?? 1);
	const [limit, setLimit] = useState("5");

	const existingParams = Object.fromEntries(searchParams);

	const getPosts = async () => {
		try {
			await getAllPublishedPosts({ search, page, order, limit });

			let params = { ...existingParams, page };

			if (page > 1) {
				setSearchParams(params);
			} else {
				delete params.page;
				setSearchParams(params);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setPage(1);
		getPosts();
	}, [order, search, limit]);

	useEffect(() => {
		getPosts();
	}, [page, user]);

	return (
		<>
			<Hero />
			<PostsContainer
				setOrder={setOrder}
				setPage={setPage}
				className="px-3 md:px-5 mt-6 lg:px-10 pb-10"
				posts={posts}
				editPostOnOpen={editPostOnOpen}
				setLimit={setLimit}
				limit={limit}
				onLogin={loginOnOpen}
			/>
		</>
	);
}
Home.propTypes = {
	loginOnOpen: PropTypes.func,
	editPostOnOpen: PropTypes.func,
	search: PropTypes.string,
};
export default Home;
