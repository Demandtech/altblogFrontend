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
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import toast, { toastConfig } from "react-simple-toasts";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

toastConfig({ theme: "dark" });

export default function Signup({ isOpen, onOpenChange }) {
	const [isLoading, setIsLoading] = useState(false);
	const { registerUser, user } = useAppContext();
	const [values, setValues] = useState(() => {
		const savedSignupValue = localStorage.getItem("SIGNUP-VALUE");
		return savedSignupValue
			? JSON.parse(savedSignupValue)
			: {
					first_name: "",
					last_name: "",
					email: "",
					password: "",
			  };
	});
	const checkInput = (e) => {
		const { value, name } = e.target;

		switch (name) {
			case "email":
				setInputError((prev) => {
					return {
						...prev,
						[name]: !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
					};
				});
				break;
			case "first_name":
				setInputError((prev) => {
					return {
						...prev,
						[name]: !value.match(/^[A-Za-z\s]+$/),
					};
				});
				break;
			case "last_name":
				setInputError((prev) => {
					return {
						...prev,
						[name]: !value.match(/^[A-Za-z\s]+$/),
					};
				});
				break;
			case "password":
				setInputError((prev) => {
					return {
						...prev,
						[name]: !value.match(
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?]{8,}$/
						),
					};
				});
				break;

			default:
				break;
		}
	};
	const [inputError, setInputError] = useState({
		first_name: false,
		last_name: false,
		email: false,
		password: false,
	});

	const handleChange = (e) => {
		const { value, name } = e.target;

		checkInput(e);

		setValues((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	console.log(inputError);

	const handleSignup = async (onClose) => {
		setIsLoading(true);

		const { newUser, errorMessage } = await registerUser(values);

		if (newUser) {
			toast(`Welcome ${newUser?.first_name}, Registration successfull`, {
				position: "top-center",
				clickable: true,
				clickClosable: true,
				duration: 10000,

				render: (message) => (
					<div className=" text-sm flex gap-3 items-center bg-black/90 px-2 py-1 rounded text-success">
						<IoMdCheckmarkCircleOutline />
						<span>{message}</span>
					</div>
				),
			});
			onClose();
			setIsLoading(false);
			localStorage.removeItem("SIGNUP-VALUE");
			setValues({
				first_name: "",
				last_name: "",
				email: "",
				password: "",
			});
		} else {
			toast(errorMessage, {
				position: "top-center",
				clickable: true,
				clickClosable: true,
				duration: 10000,
				render: (message) => (
					<span className="text-sm flex gap-3 items-center bg-black/90 px-2 py-1 rounded text-danger">
						<RiErrorWarningFill />
						{message}
					</span>
				),
			});
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!values) return;
		localStorage.setItem("SIGNUP-VALUE", JSON.stringify(values));
	}, [values]);

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="First name"
									placeholder="Enter your first name"
									variant="bordered"
									type="text"
									value={values.first_name}
									name="first_name"
									onChange={handleChange}
									isInvalid={inputError.first_name}
									color={inputError.first_name ? "danger" : "default"}
									errorMessage={
										inputError.first_name && "Please enter a valid  first name"
									}
								/>
								<Input
									label="Last name"
									placeholder="Enter your last name"
									type="text"
									variant="bordered"
									value={values.last_name}
									onChange={handleChange}
									name="last_name"
									isInvalid={inputError.last_name}
									color={inputError.last_name ? "danger" : "default"}
									errorMessage={
										inputError.last_name && "Please enter a valid last name"
									}
								/>
								<Input
									endContent={
										<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Email"
									placeholder="Enter your email"
									variant="bordered"
									value={values.email}
									onChange={handleChange}
									name="email"
									isInvalid={inputError.email}
									color={inputError.email ? "danger" : "default"}
									errorMessage={inputError.email && "Enter a  valid email"}
								/>
								<Input
									endContent={
										<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									}
									label="Password"
									placeholder="Enter your password"
									type="password"
									variant="bordered"
									value={values.password}
									name="password"
									onChange={handleChange}
									isInvalid={inputError.password}
									color={inputError.password ? "danger" : "default"}
									errorMessage={
										inputError.password && "Enter a  strong password"
									}
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
									isDisabled={
										Object.values(inputError).some((val) => val) ||
										Object.values(values).some((val) => !val)
									}
									isLoading={isLoading}
									color="primary"
									onPress={() => handleSignup(onClose)}
								>
									Sign Up
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

Signup.propTypes = {
	isOpen: PropTypes.bool,
	onOpenChange: PropTypes.func,
};
