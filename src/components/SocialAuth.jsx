import { Button, Divider } from "@nextui-org/react";
import React from "react";
import { GoogleIcon, LinkedinIcon } from "./Svgs.jsx";
import { useUserContext } from "../context/UserContext.jsx";

const SocialAuth = () => {
	const { getGoogleUrl } = useUserContext();
	return (
		<div>
			{/* <Divider className="my-5" /> */}
			<div className="relative my-5">
				<div className="h-[1px] w-full bg-gray-300 "></div>
				<span className="absolute -bottom-[12px] dark:bg-black bg-white left-1/2">OR</span>
			</div>
			<p className="text-center">continue with</p>
			<div className="flex gap-3 justify-center my-5">
				<Button onPress={getGoogleUrl} variant="bordered" isIconOnly>
					<GoogleIcon />
				</Button>
				<Button variant="bordered" isIconOnly>
					<LinkedinIcon />
				</Button>
			</div>
		</div>
	);
};

export default SocialAuth;
