import axios from "axios";

// export default axios.create({
// 	baseURL: import.meta.env.VITE_API_BASE_URI,
// 	timeout: 5000,
// });


export default () => {
	return axios.create({
		baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};