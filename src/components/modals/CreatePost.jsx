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
import { useEffect, useState } from "react";
import TagSelect from "../TagSelect";
import { usePostContext } from "../../context/PostContext";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

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
	const [isLoading, setIsLoading] = useState(false);
	const { createPost } = usePostContext();
	const { snackBar, user } = useUserContext();
	const [letterCount, setLetterCounter] = useState(0);
	const navigate = useNavigate();

	const handleChange = (name, value) => {
		if (name === "description") {
			setLetterCounter(value.length);
		}
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

	const handleCreatePost = async (onClose) => {
		// onClose()
		setIsLoading(true);
		const result = await createPost(values);

		if (result) {
			snackBar("Post Created successfully", "success");
			localStorage.removeItem("CREATEPOST-VALUE");
			setValues({
				title: "",
				tags: [],
				description: "",
				body: "",
			});
			onClose();
			navigate(`/profile/${user._id}`);
		} else {
			snackBar("An error occured, please try again later!", "error");
		}

		setIsLoading(false);
	};

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
								<div className="relative max-w-xl">
									<Textarea
										isRequired
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
										maxLength={150}
									/>
									<span
										className={`${
											150 - letterCount < 10 ? "text-danger" : ""
										} absolute bg-white dark:bg-inherit pl-2 right-2 bottom-2 text-xs`}
									>
										{letterCount}/150
									</span>
								</div>

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
								<Button
									color="primary"
									onPress={() => handleCreatePost(onClose)}
									isDisabled={
										!values.title || !values.body || !values.description
									}
									isLoading={isLoading}
								>
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
