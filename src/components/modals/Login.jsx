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
import { MailIcon, EyeFilledIcon, EyeSlashFilledIcon } from "../Svgs.jsx";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext.jsx";

export default function Login({ isOpen, onOpenChange }) {
	const [isLoading, setIsLoading] = useState(false);
	const { loginUser, snackBar } = useUserContext();
	const [values, setValues] = useState(() => {
		const savedLoginValue = localStorage.getItem("LOGIN-VALUE");
		return savedLoginValue
			? JSON.parse(savedLoginValue)
			: {
					email: "",
					password: "",
			};
	});
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleChange = (e) => {
		const { value, name } = e.target;

		setValues((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleLogin = async (onClose) => {
		setIsLoading(true);

		const { isSuccess, errorMessage } = await loginUser(values);

		if (isSuccess) {
			snackBar(`Welcome back!`, "success");
			onClose();
			setIsLoading(false);
			localStorage.removeItem("LOGIN-VALUE");
			setValues({
				email: "",
				password: "",
			});
		} else {
			if (errorMessage) {
				snackBar(errorMessage, "error");
				setIsLoading(false);
			}
		}
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
									isInvalid={!values.email}
									color={!values.email ? "danger" : "default"}
									errorMessage={!values.email && "Email is required"}
								/>
								<Input
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									label="Password"
									placeholder="Enter your password"
									type={isVisible ? "text" : "password"}
									variant="bordered"
									name="password"
									onChange={handleChange}
									value={values.password}
									isInvalid={!values.password}
									color={!values.password ? "danger" : "default"}
									errorMessage={!values.password && "Password is required!"}
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
									isDisabled={!values.email || !values.password}
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
