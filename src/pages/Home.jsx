import Hero from "../components/Hero";
import PostsContainer from "../components/PostsContainer";
import { usePostContext } from "../context/PostContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

function Home({ createPostOnOpen, loginOnOpen, signupOnOpen, editPostOnOpen }) {
	const { posts, getAllPublishedPosts } = usePostContext();
	const [search, setSearch] = useState("");
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
	}, [page]);

	return (
		<>
			<Hero
				createPostOnOpen={createPostOnOpen}
				loginOnOpen={loginOnOpen}
				signupOnOpen={signupOnOpen}
				setSearch={setSearch}
				search={search}
			/>
			<PostsContainer
				setOrder={setOrder}
				setPage={setPage}
				className="px-3 md:px-5 mt-6 lg:px-10 pb-10"
				posts={posts}
				editPostOnOpen={editPostOnOpen}
				setLimit={setLimit}
				limit={limit}
			/>
		</>
	);
}
Home.propTypes = {
	createPostOnOpen: PropTypes.func,
	loginOnOpen: PropTypes.func,
	signupOnOpen: PropTypes.func,
	editPostOnOpen: PropTypes.func,
};
export default Home;
