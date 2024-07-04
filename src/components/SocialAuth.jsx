import { Button } from "@nextui-org/react";
import React from "react";
import { GoogleIcon, LinkedinIcon } from "./Svgs.jsx";
import { useUserContext } from "../context/UserContext.jsx";

const SocialAuth = () => {
	const { getGoogleUrl } = useUserContext();
	return (
		<div className="flex gap-3 justify-center my-5">
			<Button onPress={getGoogleUrl} variant="bordered" isIconOnly>
				<GoogleIcon />
			</Button>
			<Button variant="bordered" isIconOnly>
				<LinkedinIcon />
			</Button>
		</div>
	);
};

export default SocialAuth;
