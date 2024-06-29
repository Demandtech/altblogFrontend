/* eslint-disable react-hooks/exhaustive-deps */
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
	Spinner,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import TextEditor from "../TextEditor";
import { useEffect, useState } from "react";
import Select from "../Select";
import { useSearchParams } from "react-router-dom";
import { usePostContext } from "../../context/PostContext";
import { tags, categories } from "../../../data";

export default function EditPost({ isOpen, onOpenChange }) {
	const { getSinglePost, editPost } = usePostContext();
	const [isLoading, setIsLoading] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);
	const [searchParams] = useSearchParams();
	const [letterCount, setLetterCounter] = useState(0);

	const postId = searchParams.get("postId");

	const [values, setValues] = useState({
		title: "",
		tags: [],
		description: "",
		body: "",
		category: "",
	});
	const [isEdited, setIsEdited] = useState(false);

	const handleChange = (name, value) => {
		setIsEdited(true);
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
	const getPostToUpdate = async () => {
		setIsLoading(true);
		try {
			const { title, tags, description, body, category } = await getSinglePost(
				postId
			);

			setValues((prev) => {
				return { ...prev, title, tags, description, body, category };
			});
		} catch (error) {
			console.error(error);
			return;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!postId) return;

		getPostToUpdate();
	}, [postId]);

	const handleSubmitForm = async () => {
		setIsBtnLoading(true);
		try {
			await editPost(postId, values);
		} catch (error) {
			console.error(error);
		} finally {
			setIsBtnLoading(false);
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
					{isLoading ? (
						<ModalBody>
							<Spinner
								label="Loading..."
								color="default"
								size="sm"
								classNames={{
									label: "text-black/50",
								}}
								className="text-center min-h-96 flex justify-center items-center"
							/>
						</ModalBody>
					) : (
						(onClose) => (
							<>
								<ModalHeader className="flex border-bottom  flex-col gap-1">
									Edit Post
								</ModalHeader>
								<ModalBody>
									<form>
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
											onChange={(e) =>
												handleChange(e.target.name, e.target.value)
											}
										/>
										<Select
											className={"mt-8"}
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
												label="Description"
												labelPlacement="outside"
												placeholder="Enter your description"
												className="max-w-xl"
												variant="bordered"
												name="description"
												value={values.description}
												onChange={(e) =>
													handleChange(e.target.name, e.target.value)
												}
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
										<TextEditor
											setIsEdited={setIsEdited}
											body={values.body}
											setValues={setValues}
										/>
									</form>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
										Close
									</Button>
									<Button
										isDisabled={
											!values.title ||
											!values.body ||
											!values.description ||
											!isEdited
										}
										color="primary"
										onPress={handleSubmitForm}
										isLoading={isBtnLoading}
									>
										Save
									</Button>
								</ModalFooter>
							</>
						)
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

EditPost.propTypes = {
	isOpen: PropTypes.bool,
	onOpenChange: PropTypes.func,
};
