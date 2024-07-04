import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../configs/axios";
import { useUserContext } from "../context/UserContext";
import { Spinner } from "@nextui-org/react";

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
				if (err.response && err?.response.status === 404) {
					snackBar(err.response.data.message, "info");
				} else {
					snackBar("Internal server error, please try again!", "error");
				}
				navigate("/");
			}
		})();
	}, []);
	return (
		<>
			<div className="flex justify-center pt-20">
				<Spinner label="Loggin in with google" />
			</div>
		</>
	);
};

export default GoogleCallback;
