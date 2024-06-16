import { useRef, useEffect, useState } from "react";
import FilterList from "../FilterList";
import PostCard from "./PostCard";
import PropTypes from "prop-types";
import { usePostContext } from "../../context/PostContext";
import MyPagination from "../Pagination";
import PostCardSkeleton from "./PostCardSkeleton";

const PostsContainer = ({
	posts,
	className,
	setPage,
	setOrder,
	editPostOnOpen,
	setLimit,
	limit,
	onLogin,
	commentOnOpen,
}) => {
	const { meta, isPending } = usePostContext();
	const scroll = useRef(null);

	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: "smooth" });
	}, [posts]);

	const [view, setView] = useState("grid");



	return (
		<div className={`${className}`}>
			<FilterList
				view={view}
				setView={setView}
				meta={meta}
				setOrder={setOrder}
			/>
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
						className={`mb-10 mx-auto grid max-w-2xl gap-4   border-gray-200 lg:mx-0 lg:max-w-none ${
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
										commentOnOpen={commentOnOpen}
									/>
								);
							})}
					</div>
				</div>
			)}

			{posts?.length < meta?.total_items && (
				<MyPagination
					setPage={setPage}
					total={meta?.last_page}
					page={meta?.current_page}
					setLimit={setLimit}
					limit={limit}
				/>
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
	setOrder: PropTypes.func,
	setPage: PropTypes.func,
	posts: PropTypes.array,
	className: PropTypes.string,
	editPostOnOpen: PropTypes.func,
	setLimit: PropTypes.func,
	limit: PropTypes.string,
	onLogin: PropTypes.func,
	commentOnOpen: PropTypes.func,
};

export default PostsContainer;
