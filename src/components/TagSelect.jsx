import { Select, SelectItem, Chip } from "@nextui-org/react";
import PropTypes from "prop-types";
import { FaHashtag } from "react-icons/fa";

export default function TagSelect({ handleChange }) {
	const options = [
		{ label: "python", value: "python" },
		{ label: "javascript", value: "javascript" },
		{ label: "html", value: "html" },
		{ label: "css", value: "css" },
		{ label: "react", value: "react" },
		{ label: "angular", value: "angular" },
		{ label: "node.js", value: "node.js" },
		{ label: "express.js", value: "express.js" },
		{ label: "typescript", value: "typescript" },
		{ label: "vue.js", value: "vue.js" },
		{ label: "redux", value: "redux" },
		{ label: "graphql", value: "graphql" },
		{ label: "docker", value: "docker" },
		{ label: "kubernetes", value: "kubernetes" },
		{ label: "aws", value: "aws" },
		{ label: "azure", value: "azure" },
		{ label: "gcp", value: "gcp" },
		{ label: "git", value: "git" },
		{ label: "jenkins", value: "jenkins" },
		{ label: "mongodb", value: "mongodb" },
		{ label: "mysql", value: "mysql" },
		{ label: "postgresql", value: "postgresql" },
		{ label: "firebase", value: "firebase" },
		{ label: "machine learning", value: "machine learning" },
		{ label: "artificial intelligence", value: "artificial intelligence" },
		{ label: "big data", value: "big data" },
		{ label: "cybersecurity", value: "cybersecurity" },
		{ label: "blockchain", value: "blockchain" },
		{ label: "api", value: "api" },
		{ label: "microservices", value: "microservices" },
		{ label: "agile", value: "agile" },
		{ label: "devops", value: "devops" },
		{ label: "mobile development", value: "mobile development" },
		{ label: "web development", value: "web development" },
		{ label: "serverless", value: "serverless" },
		{ label: "linux", value: "linux" },
		{ label: "windows", value: "windows" },
		{ label: "macos", value: "macos" },
		{ label: "ios", value: "ios" },
		{ label: "android", value: "android" },
		{ label: "iot", value: "iot" },
		{ label: "data science", value: "data science" },
		{ label: "cloud computing", value: "cloud computing" },
		{ label: "frontend", value: "frontend" },
		{ label: "backend", value: "backend" },
		{ label: "full stack", value: "full stack" },
	];

	return (
		<Select
			items={options}
			label="Tags"
			variant="bordered"
			selectionMode="multiple"
			placeholder="Select Tags"
			labelPlacement="outside"
			classNames={{
				base: "max-w-xl",
				trigger: "min-h-12 py-2",
			}}
			onChange={(e) => handleChange(e.name, e.target.value.split(","))}
			startContent={<FaHashtag />}
			renderValue={(items) => {
				return (
					<div className="flex flex-wrap gap-2">
						{items.map((item) => (
							<Chip key={item.key}>{item.data.value}</Chip>
						))}
					</div>
				);
			}}
		>
			{(option) => (
				<SelectItem key={option.label} textValue={option.value}>
					<div className="flex gap-2 items-center">
						<div className="flex flex-col">
							<span className="text-small">{option.value}</span>
						</div>
					</div>
				</SelectItem>
			)}
		</Select>
	);
}

TagSelect.propTypes = {
	handleChange: PropTypes.func,
};
