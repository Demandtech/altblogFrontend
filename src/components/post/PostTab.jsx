import { Tabs, Tab } from "@nextui-org/react";
import PostsContainer from "./PostsContainer";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PostTab({ posts, editPostOnOpen, onLogin }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [state, setState] = useState("");
	const existingParams = Object.fromEntries(searchParams);

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

	useEffect(() => {
		existingParams.s = state;

		if (existingParams.p) {
			existingParams.p = 1;
		}

		setSearchParams(existingParams);
	}, [state]);
	return (
		<div className="flex w-full flex-col">
			<Tabs
				onSelectionChange={(value) => {
					setState(value !== "all" ? value : "");
				}}
				size="lg"
				aria-label="Options"
			>
				{tabs.map((tab) => {
					return (
						<Tab key={tab.key} title={tab.title}>
							<PostsContainer
								posts={posts}
								editPostOnOpen={editPostOnOpen}
								onLogin={onLogin}
							/>
						</Tab>
					);
				})}
			</Tabs>
		</div>
	);
}

PostTab.propTypes = {
	posts: PropTypes.array,
	editPostOnOpen: PropTypes.func,
	onLogin: PropTypes.func,
};
