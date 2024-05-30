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

const MyModal = ({ children }) => {
	<Modal>
		<ModalContent>{children}</ModalContent>
	</Modal>;
};
