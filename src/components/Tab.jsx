import { Tabs, Tab } from "@nextui-org/react";
import PostsContainer from "./PostsContainer";
import PropTypes from "prop-types";

export default function PostTab({ posts, draftPosts, publishedPosts }) {
	return (
		<div className="flex w-full flex-col">
			<Tabs size="lg" aria-label="Options">
				<Tab key="all" title="All">
					<PostsContainer posts={posts} />
				</Tab>
				<Tab key="draft" title="Draft">
					<PostsContainer posts={draftPosts} />
				</Tab>
				<Tab key="published" title="Published">
					<PostsContainer posts={publishedPosts} />
				</Tab>
			</Tabs>
		</div>
	);
}

PostTab.propTypes = {
	posts: PropTypes.array,
	draftPosts: PropTypes.array,
	publishedPosts: PropTypes.array,
};
