import { Tabs, Tab } from "@nextui-org/react";
import PostsContainer from "./PostsContainer";
import PropTypes from "prop-types";

export default function PostTab({
	setOrder,
	setPage,
	setState,
	posts,
	editPostOnOpen,
	setLimit,
	limit,
}) {
	const tabs = [
		{
			key: "all",
			title: "All",
		},
		{
			key: "draft",
			title: "Draft",
		},
		{
			key: "published",
			title: "Published",
		},
	];

	return (
		<div className="flex w-full flex-col">
			<Tabs
				onSelectionChange={(value) => {
					setPage(1);
					setState(value !== "all" ? value : "");
				}}
				size="lg"
				aria-label="Options"
			>
				{tabs.map((tab) => {
					return (
						<Tab key={tab.key} title={tab.title}>
							<PostsContainer
								setOrder={setOrder}
								setPage={setPage}
								posts={posts}
								editPostOnOpen={editPostOnOpen}
								setLimit={setLimit}
								limit={limit}
							/>
						</Tab>
					);
				})}
			</Tabs>
		</div>
	);
}

PostTab.propTypes = {
	setState: PropTypes.func,
	setOrder: PropTypes.func,
	setPage: PropTypes.func,
	posts: PropTypes.array,
	editPostOnOpen: PropTypes.func,
	setLimit: PropTypes.func,
	limit: PropTypes.string,
};
