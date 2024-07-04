import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import PropTypes from "prop-types";

import { useUserContext } from "../../context/UserContext";
import UpdateProfileTab from "../updateuser/UpdateProfileTab";

export default function UpdateProfile({ isOpen, onOpenChange }) {
	const { user } = useUserContext();

	return (
		<>
			<Modal
				scrollBehavior="inside"
				size="3xl"
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
								Update Profile
							</ModalHeader>
							<ModalBody className="px-0 scrollbar-hide">
								<UpdateProfileTab
									// setValue={setValue}
									user={user}
									onClose={onClose}
								/>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

UpdateProfile.propTypes = {
	isOpen: PropTypes.bool,
	onOpenChange: PropTypes.func,
};
