import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
	useDisclosure,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import TextEditor from "../TextEditor";
import { useEffect, useState } from "react";
import Select from "../Select";
import { usePostContext } from "../../context/PostContext";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { tags, categories } from "../../../data";

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
					category: "",
			  };
	});
	const [isLoading, setIsLoading] = useState(false);
	const { createPost, publishPost } = usePostContext();
	const { snackBar, user } = useUserContext();
	const [letterCount, setLetterCounter] = useState(0);
	const [postId, setPostId] = useState(null);
	const navigate = useNavigate();
	const {
		isOpen: actionOpen,
		onOpen,
		onOpenChange: actionChange,
	} = useDisclosure();

	const handleChange = (name, value) => {
		if (name === "description") {
			setLetterCounter(value.length);
		}
		if (name === "category") {
			setValues((prev) => {
				return {
					...prev,
					category: value[0],
					tags: [],
				};
			});
		} else {
			setValues((prev) => {
				return {
					...prev,
					[name]: value,
				};
			});
		}
	};

	useEffect(() => {
		if (!values) return;
		localStorage.setItem("CREATEPOST-VALUE", JSON.stringify(values));
	}, [values]);

	const handleCreatePost = async (onClose) => {
		try {
			setIsLoading(true);
			if (values.tags.length > 5)
				return snackBar("Tags can not exceed 5", "error");

			const result = await createPost(values);

			if (result.success) {
				setPostId(result.post._id);
				localStorage.removeItem("CREATEPOST-VALUE");
				setValues({
					title: "",
					tags: [],
					description: "",
					body: "",
					category: "",
				});
				onOpen();
				onClose();
				setIsLoading(false);
			} else {
				console.log(result);
				snackBar(result.message, "error");
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
		}
	};

	const handlePublishPost = async (onClose) => {
		setIsLoading(true);
		try {
			const isSuccess = await publishPost(postId);
			if (isSuccess) {
				snackBar("Post published successfully!", "success");
				navigate(`/profile/${user._id}`);
			}
			onClose();
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Modal
				scrollBehavior="inside"
				size="5xl"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top"
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
								<Select
									name="category"
									handleChange={handleChange}
									value={[values.category]}
									options={categories}
								/>
								<Select
									name="tags"
									handleChange={handleChange}
									value={values.tags}
									options={tags.filter(
										(tag) => tag.category === values.category
									)}
								/>

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
										!values.title ||
										!values.body ||
										!values.description ||
										values.tags.length > 5
									}
									isLoading={isLoading}
									className="text-white dark:text-black"
								>
									Continue
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>

			<Modal
				isOpen={actionOpen}
				onOpenChange={actionChange}
				placement="center"
				size="sm"
				className="pb-5"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Do you want to publish</ModalHeader>
							<ModalBody>
								<p className="text-sm text-center">
									Post can be saved to draft or publish immediately
								</p>
								<div className="flex justify-center gap-5">
									<Button
										onPress={() => {
											snackBar("You Post saved successfully", "success");
											setIsLoading(false);
											onClose();
										}}
									>
										Save
									</Button>
									<Button
										onPress={() => handlePublishPost(onClose)}
										color="primary"
										className="text-white dark:text-black"
										isLoading={isLoading}
										isDisabled={isLoading}
									>
										Publish
									</Button>
								</div>
							</ModalBody>
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
