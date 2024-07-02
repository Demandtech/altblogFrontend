import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../configs/axios";
import { useUserContext } from "../context/UserContext";

const GoogleCallback = () => {
	const navigate = useNavigate();
	const { snackBar, authUser } = useUserContext();

	useEffect(() => {
		(async () => {
			try {
				const { data, status } = await axios().get(
					`/auth/google/token${window.location.search}`
				);

				if (status !== 200) return;

				localStorage.setItem("LOGIN-DATA", JSON.stringify(data.data));

				snackBar(data.data.message, "success");

				await authUser();

				navigate("/");
			} catch (err) {
				console.log(err);
				if (err.response && err?.response.status === 404) {
					console.log(err.response);
				}
				navigate("/");
			}
		})();
	}, []);
	return <></>;
};

export default GoogleCallback;
