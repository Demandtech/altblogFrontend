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
import { useState } from "react";
import TagSelect from "../TagSelect";
import { useParams } from 'react-router-dom';


export default function EditPost({ isOpen, onOpenChange }) {

    const {id} = useParams()

	console.log(id)

	const [values, setValues] = useState({
		title: "",
		tags: [],
		description: "",
		body: "",
	});

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
								Edit Post
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
										setValues((prev) => {
											return {
												...prev,
												title: e.target.value,
											};
										});
									}}
								/>
								<TagSelect setValues={setValues} />
								<Textarea
									label="Description"
									labelPlacement="outside"
									placeholder="Enter your description"
									className="max-w-xl"
									variant="bordered"
									name="description"
									value={values.description}
									onChange={(e) => {
										setValues((prev) => {
											return {
												...prev,
												description: e.target.value,
											};
										});
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

EditPost.propTypes = {
	isOpen: PropTypes.bool,
	onOpenChange: PropTypes.func,
};
