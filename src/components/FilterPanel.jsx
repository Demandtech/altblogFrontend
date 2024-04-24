import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";
import { useState } from "react";

const FilterPanel = () => {
	const [filter, setFilter] = useState("Trending");
	return (
		<div className="flex items-center flex-wrap justify-between mt-4 px-2 lg:px-10">
			<span className="font-semibold capitalize">{filter}</span>
			<Dropdown>
				<DropdownTrigger>
					<Button variant="bordered" className="text-capitalize">
						{filter}
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Static Actions">
					<DropdownItem
						onClick={() => {
							setFilter("All published post");
						}}
						key="new"
						
					>
						All published post
					</DropdownItem>
					<DropdownItem
						onClick={() => {
							setFilter("Trending");
						}}
						key="trending"
					>
						Trending
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default FilterPanel;
