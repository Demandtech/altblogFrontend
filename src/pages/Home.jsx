/* eslint-disable react-hooks/exhaustive-deps */
import Hero from "../components/Hero";
import PostsContainer from "../components/post/PostsContainer";
import { usePostContext } from "../context/PostContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Helmet } from "react-helmet";

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
			await getAllPublishedPosts({
				search,
				page,
				order,
				limit,
				category: existingParams.category ? existingParams.category : "",
			});

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
	}, [order, search, limit, existingParams.category]);

	useEffect(() => {
		getPosts();
	}, [page, user]);

	return (
		<>
			<Helmet>
				<title>Home | Blogshot</title>
				<meta
					name="description"
					content="Welcome to BLOGSHOT, your go-to source for insightful blog posts on a variety of topics."
				/>
				<meta name="author" content="Rasheed Adekunle" />
				<meta name="keywords" content="blog, articles, insights, BLOGSHOT" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Home | BLOGSHOT" />
				<meta
					property="og:description"
					content="Welcome to BLOGSHOT, your go-to source for insightful blog posts on a variety of topics."
				/>
				<meta property="og:site_name" content="BLOGSHOT" />
				<meta property="og:locale" content="en_US" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Home | BLOGSHOT" />
				<meta
					name="twitter:description"
					content="Welcome to BLOGSHOT, your go-to source for insightful blog posts on a variety of topics."
				/>
			</Helmet>
			<>
				<Hero />
				<PostsContainer
					setOrder={setOrder}
					setPage={setPage}
					className="px-2 mt-6 w-full  pb-10 lg:px-5"
					posts={posts}
					editPostOnOpen={editPostOnOpen}
					setLimit={setLimit}
					limit={limit}
					onLogin={loginOnOpen}
				/>
			</>
		</>
	);
}
Home.propTypes = {
	loginOnOpen: PropTypes.func,
	editPostOnOpen: PropTypes.func,

	search: PropTypes.string,
};
export default Home;
