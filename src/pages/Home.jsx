/* eslint-disable react-hooks/exhaustive-deps */
import Hero from "../components/Hero";
import PostsContainer from "../components/post/PostsContainer";
import { usePostContext } from "../context/PostContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Helmet } from "react-helmet";

function Home({ editPostOnOpen, loginOnOpen }) {
	const { posts, getAllPublishedPosts } = usePostContext();
	const { user } = useUserContext();
	const [searchParams] = useSearchParams();
	const { p, c, q, l, o } = Object.fromEntries(searchParams);

	useEffect(() => {
		const getPosts = async () => {
			try {
				await getAllPublishedPosts({
					search: q ? q : "",
					page: p ? p : 1,
					order: o ? o : "",
					limit: l ? l : 5,
					category: c ? c : "",
				});
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();
	}, [user, l, c, q, p, o]);

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
					className="px-2 mt-6 w-full  pb-10 lg:px-5"
					posts={posts}
					editPostOnOpen={editPostOnOpen}
					onLogin={loginOnOpen}
				/>
			</>
		</>
	);
}
Home.propTypes = {
	loginOnOpen: PropTypes.func,
	editPostOnOpen: PropTypes.func,
};
export default Home;
