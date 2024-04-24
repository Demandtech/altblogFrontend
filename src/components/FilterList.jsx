import {
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	Button,
	PopoverTrigger,
	ListboxSection,
} from "@nextui-org/react";
import { useState,  useEffect } from "react";
import PropTypes from "prop-types";
import { LuSettings2 } from "react-icons/lu";

export default function FilterList({ setFilters }) {
	const [selectedKeys, setSelectedKeys] = useState([]);

	useEffect(() => {
		const filtersArr = Array.from(selectedKeys);

		let filtersObj = {};
		for (let i = 0; i < filtersArr.length; i++) {
			filtersObj[filtersArr[i]] = filtersArr[i];
		}
	
		setFilters(filtersObj);
	}, [selectedKeys]);

	return (
		<div className="flex justify-end mb-6">
			<Popover placement="bottom" offset={5}>
				<PopoverTrigger>
					<Button startContent={<LuSettings2 />} variant="flat">
						Filter
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Listbox
						selectionMode="multiple"
						aria-label="Actions"
						selectedKeys={selectedKeys}
						onSelectionChange={setSelectedKeys}
					>
						<ListboxSection showDivider>
							<ListboxItem key="views">Views</ListboxItem>
							<ListboxItem key="copy">Read Time</ListboxItem>
						</ListboxSection>
						<ListboxSection>
							<ListboxItem key="new">Newest</ListboxItem>
							<ListboxItem key="old">Oldest</ListboxItem>
						</ListboxSection>
					</Listbox>
				</PopoverContent>
			</Popover>
		</div>
	);
}

FilterList.propTypes = {
	setFilters: PropTypes.func,
};
