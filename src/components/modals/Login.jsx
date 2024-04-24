import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Checkbox,
	Input,
	Link,
} from "@nextui-org/react";
import { MailIcon, LockIcon } from "../Svgs.jsx";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Login({ isOpen, onOpenChange }) {
	const [isLoading, setIsLoading] = useState(false);
	const [values, setValues] = useState(() => {
		const savedLoginValue = localStorage.getItem("LOGIN-VALUE");

		return savedLoginValue
			? JSON.parse(savedLoginValue)
			: {
					email: "",
					password: "",
			};
	});

	const handleChange = (e) => {
		const { value, name } = e.target;

		setValues((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleLogin = (onClose) => {
		localStorage.removeItem("LOGIN-VALUE");
		setValues({
			email: "",
			password: "",
		});
		onClose();
	};

	useEffect(() => {
		if (!values) return;
		localStorage.setItem("LOGIN-VALUE", JSON.stringify(values));
	}, [values]);
	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									endContent={
										<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Email"
									placeholder="Enter your email"
									variant="bordered"
									name="email"
									value={values.email}
									onChange={handleChange}
								/>
								<Input
									endContent={
										<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Password"
									placeholder="Enter your password"
									type="password"
									variant="bordered"
									name="password"
									onChange={handleChange}
									value={values.password}
								/>
								<div className="flex py-2 px-1 justify-between">
									<Checkbox
										classNames={{
											label: "text-small",
										}}
									>
										Remember me
									</Checkbox>
									<Link color="primary" href="#" size="sm">
										Forgot password?
									</Link>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="flat" onPress={onClose}>
									Close
								</Button>
								<Button
									isLoading={isLoading}
									color="primary"
									onPress={() => handleLogin(onClose)}
								>
									Sign in
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

Login.propTypes = {
	isOpen: PropTypes.bool,
	onOpenChange: PropTypes.func,
};
