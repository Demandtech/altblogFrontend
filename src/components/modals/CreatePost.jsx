import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import TextEditor from "../TextEditor";
import { useEffect,  useState } from "react";
import TagSelect from "../TagSelect";

export default function CreatePost({ isOpen, onOpenChange }) {
	const [values, setValues] = useState(() => {
		const savedValues = localStorage.getItem("CREATEPOST-VALUE");

		return savedValues
			? JSON.parse(savedValues)
			: {
					title: "",
					tags: [],
					description: "",
					body: "",
			};
	});

	const handleChange = (name, value) => {
		setValues((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	useEffect(() => {
		if (!values) return;
		localStorage.setItem("CREATEPOST-VALUE", JSON.stringify(values));
	}, [values]);

	return (
		<>
			<Modal
				scrollBehavior="inside"
				size="5xl"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				className="rounded-lg"
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex border-bottom  flex-col gap-1">
								Create Blog Post
							</ModalHeader>
							<ModalBody>
								<Input
									isRequired
									className="max-w-sm"
									name="title"
									label="Title"
									type="text"
									variant="bordered"
									labelPlacement="outside"
									placeholder="Enter post title"
									value={values.title}
									onChange={(e) => {
										handleChange(e.target.name, e.target.value);
									}}
								/>
								<TagSelect setValues={handleChange} />
								<Textarea
									label="Description"
									labelPlacement="outside"
									placeholder="Enter your description"
									className="max-w-xl"
									variant="bordered"
									name="description"
									value={values.description}
									onChange={(e) => {
										handleChange(e.target.name, e.target.value);
									}}
								/>

								<label className="text-sm text-black/90" htmlFor="">
									Content
									<sup className="text-danger text-xs">*</sup>
								</label>
								<TextEditor body={values.body} setValues={setValues} />
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Save
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

CreatePost.propTypes = {
	isOpen: PropTypes.bool,
	onOpenChange: PropTypes.func,
};
