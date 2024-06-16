import { Pagination } from "@nextui-org/react";
import PropTypes from "prop-types";

function MyPagination({ page, total, setPage, setLimit, limit }) {
	return (
		<div className="flex items-center flex-wrap gap-4 justify-center mb-10">
			<Pagination
				className="flex text-white dark:text-black justify-center"
				
				isCompact
				showControls
				loop
				page={page}
				onChange={setPage}
				total={total}
				classNames={"text-white"}
			/>
			<div>
				<select
					onChange={(e) => setLimit(e.target.value)}
					name="limit"
					className="text-black/50 dark:text-slate-300 text-sm border dark:border-white/50 px-2 py-1 rounded"
					id=""
					value={limit}
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="20">20</option>
					<option value="25">25</option>
					<option value="30">30</option>
					<option value="35">35</option>
					<option value="40">40</option>
					<option value="50">50</option>
				</select>
			</div>
		</div>
	);
}
MyPagination.propTypes = {
	page: PropTypes.number,
	total: PropTypes.number,
	setPage: PropTypes.func,
	setLimit: PropTypes.func,
	limit: PropTypes.string,
};

export default MyPagination;
