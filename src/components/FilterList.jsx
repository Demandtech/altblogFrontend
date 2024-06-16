import {
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	Button,
	PopoverTrigger,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LuSettings2, LuGrid, LuList } from "react-icons/lu";

function FilterList({ setOrder, meta, view, setView }) {
	const [selectedKeys, setSelectedKeys] = useState([]);

	useEffect(() => {
		const filtersArr = Array.from(selectedKeys);

		if (filtersArr.length > 0) {
			setOrder(filtersArr[0]);
		}
	}, [selectedKeys, setOrder]);

	return (
		<div className="flex border-b dark:border-gray-600 pb-5 flex-wrap items-center justify-between mb-6">
			<div>
				<span className="text-black/70 text-sm md:text-base dark:text-slate-300">
					Showing {meta?.first_item || 0} -{" "}
					{Math.min(
						meta?.current_page * meta?.item_per_page,
						meta?.total_items
					) || 0}{" "}
					of {meta?.total_items || 0} Result
				</span>
			</div>
			<div className="flex items-center gap-3">
				<div className="hidden md:block">
					<Button
						size="sm"
						isIconOnly
						onPress={() => setView("grid")}
						variant={view === "grid" ? "solid" : "light"}
						color={view === "grid" ? "primary" : "light"}
						className={`${view === "grid" ? "text-white dark:text-black" :  ""}`}
					>
						<LuGrid />
					</Button>

					<Button
						size="sm"
						isIconOnly
						onPress={() => setView("list")}
						variant={view === "list" ? "solid" : "light"}
						color={view !== "grid" ? "primary" : "light"}
						className={`${view === "list" ? "text-white dark:text-black" :  ""}`}
					>
						<LuList />
					</Button>
				</div>
				<Popover size="sm" placement="bottom" offset={5}>
					<PopoverTrigger>
						<Button startContent={<LuSettings2 />} variant="flat">
							Filter
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<Listbox
							selectionMode="single"
							aria-label="Actions"
							selectedKeys={selectedKeys}
							onSelectionChange={setSelectedKeys}
						>
							<ListboxItem key="read_count">Views</ListboxItem>
							<ListboxItem key="reading_time">Read Time</ListboxItem>
							<ListboxItem key="newest">Newest</ListboxItem>
							<ListboxItem key="oldest">Oldest</ListboxItem>
						</Listbox>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}

FilterList.propTypes = {
	setOrder: PropTypes.func,
	meta: PropTypes.object,
	view: PropTypes.string,
	setView: PropTypes.func,
};

export default FilterList;
