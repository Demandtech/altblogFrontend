import { useState } from "react";
import FilterList from "./FilterList";
import PostCard from "./PostCard";
import PropTypes from "prop-types";
import { Pagination } from "@nextui-org/react";

const PostsContainer = ({ posts, className }) => {
	const [filters, setFilters] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	console.log(filters)

	return (
		<div className={className}>
			<FilterList setFilters={setFilters} />
			<div
				className={`mb-10 mx-auto grid max-w-2xl grid-cols-1 gap-8  border-gray-200 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3`}
			>
				{posts &&
					posts.map((post, index) => {
						return <PostCard {...post} key={index} />;
					})}
			</div>

			<Pagination
				className="flex justify-center mb-5"
				isCompact
				showControls
				loop
				page={currentPage}
				onChange={setCurrentPage}
				total={posts.length}
			/>
		</div>
	);
};

PostsContainer.propTypes = {
	posts: PropTypes.array,
	className: PropTypes.string,
};

export default PostsContainer;
