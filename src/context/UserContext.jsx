/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../configs/axios";
import toast, { toastConfig } from "react-simple-toasts";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const UserContext = createContext(null);
toastConfig({ theme: "dark" });

function UserProvider({ children }) {
	const [initial, setInitial] = useState(() => {
		const savedData = localStorage.getItem("LOGIN-DATA");

		const savedToken = savedData ? JSON.parse(savedData).token : null;
		return {
			user: null,
			token: savedToken,

			profile: null,
		};
	});

	const registerUser = async ({
		first_name,
		last_name,
		email,
		password,
		profession,
	}) => {
		try {
			const { data, status } = await axios().post("/auth/register", {
				first_name,
				last_name,
				email,
				password,
				profession,
				// role: "USER",
			});

			if (status !== 201) return;

			return { newUser: data.data.user, errorMessage: null };
		} catch (error) {
			if (error?.response.status === 404) {
				return {
					errorMessage: error.response.data.message,
				};
			}

			console.log(error);

			return {
				newUser: null,
				errorMessage: "An error occur, please try again!",
			};
		}
	};

	const loginUser = async ({ email, password }) => {
		try {
			const { data, status } = await axios().post("/auth/login", {
				email,
				password,
			});

			if (status !== 200) return;

			localStorage.setItem("LOGIN-DATA", JSON.stringify(data.data));

			setInitial((prev) => {
				return {
					...prev,
					token: data.data.token,
				};
			});
			authUser();
			return { errorMessage: null, isSuccess: true };
		} catch (error) {
			localStorage.removeItem("LOGIN-DATA");

			if (error?.response.status === 401) {
				return {
					errorMessage: error.response.data.message,
					isSuccess: false,
				};
			}
			return {
				errorMessage: "An error occured, please try again!",
				isSuccess: false,
			};
		}
	};

	const logoutUser = () => {
		localStorage.removeItem("LOGIN-DATA");
		setInitial({
			user: null,
			token: null,
			posts: [],
			draftPosts: [],
			publishedPosts: [],
		});
		snackBar("Logout successfully", "bg-red-400 px-2");
	};

	const getUserProfile = async (id) => {
		try {
			const { data, status } = await axios().get(`/users/${id}`);

			if (status !== 200) return;

			setInitial((prev) => {
				return {
					...prev,
					profile: data.data.user,
				};
			});
			return { user: data.data.user, errorMessage: null };
		} catch (error) {
			console.log(error);
			if (error.response.status === 401) {
				return {
					user: null,
					errorMessage: "Unathorized user, please login!",
				};
			}
			return {
				user: null,
				errorMessage: "An error occuered, please try again later!",
			};
		}
	};

	const updateUserDetails = async (value) => {
		try {
			const { data, status } = await axios().put("/users", value);

			console.log(status, data.user);

			if (status !== 200) return;

			setInitial((prev) => {
				return {
					...prev,
					user: data.user,
				};
			});
			const savedData = localStorage.getItem("LOGIN-DATA");
			if (!savedData) return;
			const savedUserData = JSON.parse(savedData);

			const newData = { ...savedUserData, user: data.user };

			localStorage.setItem("LOGIN-DATA", JSON.stringify(newData));
			snackBar("Profile Updated succesffully", "success");
		} catch (error) {
			console.log(error);
			snackBar("An error occured", "error");
		}
	};

	const updateUserPhotos = async (val) => {
		try {
			const { status } = await axios().post("users/photos", val, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			if (status !== 200) throw new Error("An error occured while uploading ");
			snackBar("Profile updated successfully", "success");
		} catch (error) {
			snackBar("An error occured, please try again!", "error");
			console.log(error);
		}
	};

	const authUser = async () => {
		try {
			const { data, status } = await axios().get("users/me");

			if (status !== 200) throw new Error("Error occured!");

			setInitial((prev) => {
				return {
					...prev,
					user: data?.data,
				};
			});
		} catch (error) {
			console.log(error);
		}
	};

	const snackBar = (message, type) => {
		toast(message, {
			position: "top-right",
			clickable: true,
			clickClosable: true,
			duration: 5000,

			render: (text) => (
				<div
					className={`"text-sm flex gap-1 items-center ${
						type === "success"
							? "bg-success-600 text-success-100"
							: "bg-danger-100 text-danger-400"
					} px-2 py-1 rounded text-xs`}
				>
					{type === "success" ? (
						<IoMdCheckmarkCircleOutline />
					) : (
						<RiErrorWarningFill />
					)}
					<span>{text}</span>
				</div>
			),
		});
	};

	useEffect(() => {
		if (!initial.token) return;
		authUser();
	}, [initial.token]);

	return (
		<UserContext.Provider
			value={{
				...initial,
				registerUser,
				loginUser,
				logoutUser,
				snackBar,
				getUserProfile,
				updateUserDetails,
				updateUserPhotos,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export function useUserContext() {
	return useContext(UserContext);
}

UserProvider.propTypes = {
	children: PropTypes.element,
};
export default UserProvider;
