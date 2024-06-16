import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import { FaHashtag } from "react-icons/fa";

export default function Selects({
	handleChange,
	name,
	value,
	options,
	className,
}) {
	return (
		<div className={className}>
			<Select
				items={options}
				label={<label className="capitalize">{name}</label>}
				variant="bordered"
				selectionMode={name === "tags" ? "multiple" : "single"}
				placeholder={`Select ${name}`}
				labelPlacement="outside"
				selectedKeys={value}
				classNames={{
					base: "max-w-xl",
					trigger: "min-h-12 py-2",
				}}
				isInvalid={name === "tags" && value.length > 5}
				errorMessage={`Tags can not exceed five`}
				name={name}
				onChange={(e) => {
					console.log(e.target.value)
					handleChange(name, e.target.value.split(","));
				}}
				startContent={name === "tags" && <FaHashtag />}
				isRequired={name === "category" ? true : false}
				value={value}
			>
				{(option) => (
					<SelectItem key={option.label} textValue={option.value}>
						<div className="flex gap-2 items-center">
							<div className="flex flex-col">
								<span className="text-small capitalize">{option.value}</span>
							</div>
						</div>
					</SelectItem>
				)}
			</Select>
		</div>
	);
}

Selects.propTypes = {
	handleChange: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.array,
	options: PropTypes.any,
	className: PropTypes.string,
};
