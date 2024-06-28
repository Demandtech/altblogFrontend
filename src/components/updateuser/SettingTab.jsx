import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../Svgs";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { ThemeSwitch } from "../ThemeSwitch";

const SettingTab = () => {
	const { updateUserTheme, changePassword, theme, toggleTheme } =
		useUserContext();
	const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
	const [isVisibleNew, setIsVisibleNew] = useState(false);
	const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
	const [value, setValue] = useState({
		current_password: "",
		new_password: "",
		confirm_password: "",
	});
	const [valueError, setValueError] = useState({
		current_password: false,
		new_password: false,
		confirm_password: false,
	});

	const toggleVisibilityCurrent = () => setIsVisibleCurrent(!isVisibleCurrent);
	const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
	const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValue((prev) => ({ ...prev, [name]: value }));
	};

	const checkPassword = (e) => {
		const { name } = e.target;
		switch (name) {
			case "current_password":
				setValueError((prev) => ({
					...prev,
					[name]: !value[name].match(
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?]{8,}$/
					),
				}));
				break;
			case "new_password":
				setValueError((prev) => ({
					...prev,
					[name]:
						!value[name].match(
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?]{8,}$/
						) || value.current_password === value.new_password,
				}));
				break;
			case "confirm_password":
				setValueError((prev) => ({
					...prev,
					[name]: value.new_password !== value.confirm_password,
				}));
				break;
			default:
				break;
		}
	};

	const handleChangePassword = async () => {
		const data = {
			currentPassword: value.current_password,
			confirmPassword: value.confirm_password,
			newPassword: value.new_password,
		};

		await changePassword(data);
	};

	const handleThemeChange = (e) => {
		updateUserTheme(e);
		toggleTheme(e);
	};

	return (
		<div className="p-5">
			<div className="mb-4 flex flex-col space-y-3">
				<label htmlFor="theme block mb-3 dark:text-white/60">
					Preferred theme
				</label>
				<div className="flex items-center gap-2">
					<ThemeSwitch size="lg" setTheme={handleThemeChange} theme={theme} />{" "}
					<span>{theme ? "Dark mode" : "Light mode"}</span>
				</div>
			</div>
			<form>
				<h3 className="mb-3">Change Password</h3>
				<div className="flex flex-col gap-3 mb-5">
					<Input
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={toggleVisibilityCurrent}
							>
								{isVisibleCurrent ? (
									<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
								) : (
									<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
								)}
							</button>
						}
						isRequired
						label="Current Password"
						placeholder="Enter current password"
						name="current_password"
						onBlur={checkPassword}
						isInvalid={valueError.current_password}
						onChange={handleChange}
						type={isVisibleCurrent ? "text" : "password"}
						errorMessage="Current password is invalid"
					/>
					<Input
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={toggleVisibilityNew}
							>
								{isVisibleNew ? (
									<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
								) : (
									<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
								)}
							</button>
						}
						isRequired
						label="New Password"
						placeholder="Enter new password"
						onBlur={checkPassword}
						onChange={handleChange}
						name="new_password"
						type={isVisibleNew ? "text" : "password"}
						isInvalid={valueError.new_password}
						errorMessage={
							value.current_password === value.new_password
								? "New password must be different from the current password"
								: "New password is not strong enough"
						}
					/>
					<Input
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={toggleVisibilityConfirm}
							>
								{isVisibleConfirm ? (
									<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
								) : (
									<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
								)}
							</button>
						}
						isRequired
						onBlur={checkPassword}
						onChange={handleChange}
						name="confirm_password"
						label="Confirm Password"
						placeholder="Confirm password"
						type={isVisibleConfirm ? "text" : "password"}
						isInvalid={valueError.confirm_password}
						errorMessage="Passwords do not match"
					/>
				</div>
				<div className="flex justify-end">
					<Button
						isDisabled={
							Object.values(valueError).some((val) => val) ||
							Object.values(value).some((val) => !val)
						}
						color="primary"
						className="text-white dark:text-black disabled:opacity-50 disabled:cursor-not-allowed"
						onPress={handleChangePassword}
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SettingTab;
