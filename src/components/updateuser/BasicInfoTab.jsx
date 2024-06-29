import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import PropTypes from "prop-types";
import { Input, Select, SelectItem, Avatar, Button } from "@nextui-org/react";
import { countries } from "../../helper/countries";

const BasicInfoTab = ({ user }) => {
	const [value, setValue] = useState({
		first_name: user?.first_name,
		last_name: user?.last_name,
		email: user?.email,
		profession: user?.profession,
		dob: user?.dob,
		country: user?.country,
		sex: user?.sex,
		phone: user?.phone,
		facebook: user?.facebook,
		linkedin: user?.linkedin,
		twitter: user?.twitter,
		medium: user?.medium,
		pinterest: user?.pinterest,
		telegram: user?.telegram,
	});
	const { updateUserDetails } = useUserContext();
	const [isLoading, setIsLoading] = useState(false);
	const [isInputChange, setIsInputChange] = useState(false);
	const sexOptions = [
		{ name: "FEMALE", key: "f" },
		{ name: "MALE", key: "m" },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (!name) return;

		setIsInputChange(true);

		if (name == "country") {
			const selectedCountry = countries.find((coun) => coun.name === value);
			setValue((prev) => {
				return {
					...prev,
					country: selectedCountry,
				};
			});
			return;
		} else {
			setValue((prev) => {
				return {
					...prev,
					[name]: value,
				};
			});
		}
	};

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await updateUserDetails(value);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleUpdateUser} className="mt-7">
			<div className="grid px-5 mb-10 gap-3  md:grid-cols-2">
				<Input
					isRequired
					type="text"
					name="first_name"
					label="First name"
					placeholder="First Name"
					value={value.first_name}
					onChange={handleChange}
				/>
				<Input
					isRequired
					text="text"
					name="last_name"
					label="Last name"
					placeholder="Last Name"
					value={value.last_name}
					onChange={handleChange}
				/>
				<Input
					isRequired
					type="text"
					label="Profession"
					name="profession"
					placeholder="Profession"
					value={value.profession}
					onChange={handleChange}
				/>
				<Input
					isRequired
					name="email"
					label="Email"
					placeholder="Email address"
					value={value.email}
					onChange={handleChange}
				/>
				<Select
					name="country"
					size="md"
					label="Select Country"
					onChange={handleChange}
					selectedKeys={[value?.country?.name]}
				>
					{countries.map((item) => {
						return (
							<SelectItem
								startContent={
									<Avatar
										className="w-6 h-6"
										src={`https://flagcdn.com/${item.key}.svg`}
									/>
								}
								key={item.name}
								value={item}
							>
								{item.name}
							</SelectItem>
						);
					})}
				</Select>
				<Input
					name="phone"
					label="Phone"
					placeholder="Phone number"
					value={value.phone}
					onChange={handleChange}
				/>
				<Input
					label="Date of birth"
					placeholder="Your date of birth"
					type="date"
					name="dob"
					value={value.dob}
					onChange={handleChange}
				/>
				<Select
					onChange={handleChange}
					name="sex"
					size="md"
					label="Sex"
					selectedKeys={[value.sex]}
				>
					{sexOptions.map((item) => {
						return (
							<SelectItem value={item.name} key={item.name}>
								{item.name}
							</SelectItem>
						);
					})}
				</Select>
				<Input
					label="Linkedin"
					placeholder="Enter Linkedin profile url"
					type="text"
					name="linkedin"
					value={value.linkedin}
					onChange={handleChange}
				/>
				<Input
					label="Facebook"
					placeholder="Enter facebook profile url"
					type="text"
					name="facebook"
					value={value.facebook}
					onChange={handleChange}
				/>
				<Input
					label="Twitter"
					placeholder="Your date of birth"
					type="text"
					name="twitter"
					value={value.twitter}
					onChange={handleChange}
				/>
				<Input
					label="Medium"
					placeholder="Enter medium profile url"
					type="text"
					name="medium"
					value={value.medium}
					onChange={handleChange}
				/>
				<Input
					label="Pintrest"
					placeholder="Enter pintrest profile url"
					type="text"
					name="pinterest"
					value={value.pinterest}
					onChange={handleChange}
				/>
				<Input
					label="Telegram"
					placeholder="Enter telegram profile url"
					type="text"
					name="telegram"
					value={value.telegram}
					onChange={handleChange}
				/>
			</div>
			<div className="flex">
				<Button
					color="primary"
					className="px-3 ml-auto text-white dark:text-black"
					type="submit"
					isLoading={isLoading}
					isDisabled={
						!value.first_name ||
						!value.last_name ||
						!value.profession ||
						!value.email ||
						!isInputChange
					}
				>
					Update
				</Button>
			</div>
		</form>
	);
};

BasicInfoTab.propTypes = {
	user: PropTypes.object,
};

export default BasicInfoTab;
