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
import {
	MailIcon,
	EyeFilledIcon,
	EyeSlashFilledIcon,
	GoogleIcon,
	LinkedinIcon,
} from "../Svgs.jsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext.jsx";

export default function Signup({ isOpen, onOpenChange, onLogin }) {
	const [isLoading, setIsLoading] = useState(false);
	const { registerUser, snackBar } = useUserContext();
	const [isVisible, setIsVisible] = useState(false);
	const [values, setValues] = useState(() => {
		const savedSignupValue = localStorage.getItem("SIGNUP-VALUE");
		return savedSignupValue
			? JSON.parse(savedSignupValue)
			: {
					first_name: "",
					last_name: "",
					email: "",
					password: "",
					profession: "",
			  };
	});
	const toggleVisibility = () => setIsVisible(!isVisible);
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
			case "profession":
				setInputError((prev) => {
					return {
						...prev,
						[name]: !value,
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
		profession: false,
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

	const handleSignup = async (onClose) => {
		setIsLoading(true);

		const { newUser, errorMessage } = await registerUser(values);

		if (newUser) {
			snackBar(
				`Welcome ${newUser?.first_name}, Registration successfull`,
				"success"
			);
			onClose();
			setIsLoading(false);
			localStorage.removeItem("SIGNUP-VALUE");
			setValues({
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				profession: "",
			});
		}
		if (errorMessage) {
			snackBar(errorMessage, "error");
			setIsLoading(false);
		}
	};

	const handleLogin = (onClose) => {
		onClose();
		onLogin();
	};

	useEffect(() => {
		if (!values) return;
		localStorage.setItem("SIGNUP-VALUE", JSON.stringify(values));
	}, [values]);

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
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
									label="Profession"
									placeholder="Enter your profession"
									type="text"
									variant="bordered"
									value={values.profession}
									onChange={handleChange}
									name="profession"
									isInvalid={inputError.profession}
									color={inputError.profession ? "danger" : "default"}
									errorMessage={
										inputError.profession && "Please enter a valid last name"
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
								<div className="w-full">
									<div className="flex items-center gap-5 md:gap-0 flex-wrap justify-center md:justify-between w-full">
										<div className="">
											<small>
												already a member?{" "}
												<button
													onClick={() => handleLogin(onClose)}
													className="text-primary"
												>
													Sign in
												</button>
											</small>
										</div>
										<div className='flex gap-5'>
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
												className="text-white dark:text-black"
											>
												Sign Up
											</Button>
										</div>
									</div>
									<div className="flex gap-3 justify-center my-5">
										<Button variant="bordered" isIconOnly>
											<GoogleIcon />
										</Button>
										<Button variant="bordered" isIconOnly>
											{/* <?xml version="1.0" encoding="iso-8859-1"?> */}
											<LinkedinIcon />
										</Button>
									</div>
								</div>
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
	onLogin: PropTypes.func,
};
