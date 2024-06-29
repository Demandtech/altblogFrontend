import { useRef, useEffect, useState } from "react";
import FilterBar from "../FilterBar";
import PostCard from "./PostCard";
import PropTypes from "prop-types";
import { usePostContext } from "../../context/PostContext";
import MyPagination from "../Pagination";
import PostCardSkeleton from "./PostCardSkeleton";

const PostsContainer = ({ posts, className, editPostOnOpen, onLogin }) => {
	const { meta, isPending } = usePostContext();
	const scroll = useRef(null);
	const [view, setView] = useState("grid");

	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: "smooth" });
	}, [posts]);

	return (
		<div className={`${className}`}>
			<FilterBar view={view} setView={setView} meta={meta} />
			{isPending && (
				<div
					className={`mb-10  grid max-w-2xl gap-4  border-gray-200 lg:mx-0 lg:max-w-none ${
						view === "grid" ? "responsive-grid" : ""
					}`}
				>
					{["", "", "", "", ""].map((_, index) => {
						return <PostCardSkeleton key={index} />;
					})}
				</div>
			)}
			{posts.length > 0 && !isPending && (
				<div>
					<div
						className={`mb-10 w-full gap-4   border-gray-200 lg:mx-0 lg:max-w-none ${
							view === "grid" ? "responsive-grid" : ""
						}`}
					>
						{posts &&
							posts.map((post, index) => {
								return (
									<PostCard
										{...post}
										editPostOnOpen={editPostOnOpen}
										key={index}
										onLogin={onLogin}
										// commentOnOpen={commentOnOpen}
									/>
								);
							})}
					</div>
				</div>
			)}

			{posts?.length < meta?.total_items && (
				<MyPagination total={meta?.last_page} />
			)}

			{!isPending && posts.length === 0 && (
				<div>
					<h3 className="text-2xl font-semibold text-center">No Post found!</h3>
				</div>
			)}
		</div>
	);
};

PostsContainer.propTypes = {
	posts: PropTypes.array,
	className: PropTypes.string,
	editPostOnOpen: PropTypes.func,
	onLogin: PropTypes.func,
};

export default PostsContainer;
