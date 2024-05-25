import { useRef, useEffect, useState } from "react";
import FilterList from "./FilterList";
import PostCard from "./PostCard";
import PropTypes from "prop-types";
import { Spinner } from "@nextui-org/react";
import { usePostContext } from "../context/PostContext";
import MyPagination from "./Pagination";

const PostsContainer = ({
	posts,
	className,
	setPage,
	setOrder,
	editPostOnOpen,
	setLimit,
	limit,
	onLogin,
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
			{isPending && posts.length === 0 && (
				<Spinner
					label="Loading..."
					color="default"
					size="sm"
					classNames={{
						label: "text-black/50",
					}}
					className="text-center  flex justify-center items-center pt-10"
				/>
			)}

			{posts.length > 0 && !isPending && (
				<div>
					<div
						className={`mb-10 mx-auto grid max-w-2xl  grid-cols-1 gap-8  border-gray-200 lg:mx-0 lg:max-w-none ${
							view === "grid" ? "md:grid-cols-2  lg:grid-cols-3" : ""
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
									/>
								);
							})}
					</div>
					<MyPagination
						setPage={setPage}
						total={meta?.last_page}
						page={meta?.current_page}
						setLimit={setLimit}
						limit={limit}
					/>
				</div>
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
};

export default PostsContainer;
