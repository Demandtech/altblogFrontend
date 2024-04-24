/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "../configs/axios";

const AppContext = createContext(null);

function AppProvider({ children }) {
	const [initial, setInitial] = useState({
		user: null,
		posts: ["*", "*", "*", "*", "*", "*", "*", "*"],
		draftPosts: ["*", "*", "*", "*", "*"],
		publishedPosts: ["*", "*", "*"],
	});

	const registerUser = async ({ first_name, last_name, email, password }) => {
		
		try {
			const { data, status } = await axios().post("/auth/register", {
				first_name,
				last_name,
				email,
				password,
				role: "USER",
			});

			if (status === 201) {
				setInitial((prev) => {
					return {
						...prev,
						user: data.data.user,
					};
				});

				return { newUser: data.data.user };
			}
		} catch (error) {
			if (error?.response.status === 404) {
				return {
					errorMessage: error.response.data.message,
				};
			}

			return {
				errorMessage: "An error occur, please try again!",
			};
		}
	};

	return (
		<AppContext.Provider value={{ ...initial, registerUser }}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}

AppProvider.propTypes = {
	children: PropTypes.element,
};
export default AppProvider;
