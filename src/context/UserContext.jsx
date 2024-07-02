/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../configs/axios";
import toast, { toastConfig } from "react-simple-toasts";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircle } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";

const UserContext = createContext(null);
toastConfig({ theme: "dark" });

function UserProvider({ children }) {
	const savedThemeData = localStorage.getItem("THEME");
	const savedTokenData = localStorage.getItem("LOGIN-DATA");

	const [initial, setInitial] = useState(() => {
		const savedToken = savedTokenData ? JSON.parse(savedTokenData).token : null;
		const savedTheme = savedThemeData ? JSON.parse(savedThemeData) : false;
		return {
			user: null,
			token: savedToken,
			theme: savedTheme,
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

			console.error(error);

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

			await authUser();

			snackBar(data.data.message, "success");

			localStorage.removeItem("LOGIN-VALUE");

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
			console.error(error);
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
			console.error(error);
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
			authUser();
		} catch (error) {
			snackBar("An error occured, please try again!", "error");
			console.error(error);
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
					theme: savedThemeData ? JSON.parse(savedThemeData) : data.data.theme,
				};
			});
		} catch (error) {
			console.error(error);
		}
	};

	const changePassword = async ({
		currentPassword,
		newPassword,
		confirmPassword,
	}) => {
		try {
			if (newPassword !== confirmPassword)
				snackBar("Password does not match", "error");

			const { data, status } = await axios().post("/auth/changepassword", {
				currentPassword,
				newPassword,
			});

			if (status !== 200) throw new Error("An error occured!");

			snackBar(data.data.message, "success");

			return true;
		} catch (error) {
			if (error.response.status && error.response.status === 400) {
				snackBar(error.response.data.message || "An error occured!", "error");
			}
			snackBar("An error occured, please try again later!", "error");

			return false;
		}
	};

	const getGoogleUrl = async () => {
		try {
			const {
				data: { url },
				status,
			} = await axios().get("/auth/google/url");
			if (status !== 200 || !URL) throw new Error("An error occured!");

			window.location.assign(url);
		} catch (err) {
			console.log(err);
		}
	};

	const toggleTheme = (theme) => {
		setInitial((prev) => {
			return {
				...prev,
				theme,
			};
		});

		localStorage.setItem("THEME", JSON.stringify(theme));
	};

	const updateUserTheme = async (theme) => {
		try {
			const { data, status } = await axios().patch("/users/theme", { theme });

			if (status !== 200) return;

			setInitial((prev) => {
				return {
					...prev,
					theme: data.theme,
				};
			});
			localStorage.setItem("THEME", JSON.stringify(data.theme));
		} catch (error) {
			console.error(error);
			snackBar("An error occured", "error");
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
							? "bg-[#0aa700]"
							: type === "info"
							? "bg-[#ff9800]"
							: "bg-[#d3302f]"
					} p-3 rounded-md font-light text-sm text-white`}
				>
					{type === "success" ? (
						<IoMdCheckmarkCircleOutline size={20} />
					) : type === "info" ? (
						<BiSolidError size={20} />
					) : (
						<IoMdCloseCircle size={20} />
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

	useEffect(() => {
		const rootElement = document.documentElement;

		rootElement.classList.remove("dark", "light");

		rootElement.classList.add(initial.theme ? "dark" : "light");
	}, [initial.theme, initial.user]);

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
				updateUserTheme,
				toggleTheme,
				changePassword,
				getGoogleUrl,
				authUser
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
