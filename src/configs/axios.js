import axios from "axios";

export default () => {
	const savedToken = localStorage.getItem("LOGIN-DATA");

	let token;

	if (savedToken) {
		token = JSON.parse(savedToken).token;
	}

	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (token) {
		instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response && error.response.status === 401) {
				localStorage.removeItem("LOGIN-DATA");
			}
			return Promise.reject(error);
		}
	);

	return instance;
};
