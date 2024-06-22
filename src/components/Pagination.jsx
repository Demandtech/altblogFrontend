import { Pagination } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function MyPagination({ total }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const existingParams = Object.fromEntries(searchParams);

	const params = { ...existingParams };

	const limitOptions = useMemo(() => {
		const options = [];
		for (let i = 5; i <= total; i += 5) {
			options.push(i);
		}
		return options;
	}, [total, limit]);

	useEffect(() => {
		if (limit && limit > 5) {
			params.l = limit;

			if (params.p > 1) {
				params.p = 1;
			}
		} else {
			delete params.l;
		}

		setSearchParams(params);
	}, [limit]);

	useEffect(() => {
		if (page > 1) {
			params.p = page;
		} else {
			delete params.p;
		}
		setSearchParams(params);
	}, [page]);

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
					onChange={(e) => setLimit(Number(e.target.value))}
					name="limit"
					className="text-black/50 dark:text-slate-300 text-sm border dark:border-white/50 px-2 py-1 rounded"
					id=""
					value={limit}
				>
					{limitOptions.map((option) => {
						return <option value={option}>{option}</option>;
					})}					
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
