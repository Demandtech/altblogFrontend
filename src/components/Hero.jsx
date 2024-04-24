import { FaSearch } from "react-icons/fa";
import heroBg from "../assets/herobg.png";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Input,
	Link,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppContext";
import { FaRegUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BiLogIn } from "react-icons/bi";

import { IoCreateOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa";

const Hero = ({ createPostOnOpen, loginOnOpen, signupOnOpen }) => {
	const { user} = useAppContext();

	return (
		<div
			style={{
				background: `url(${heroBg})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
			className=" h-[200px] lg:h-[350px] pt-5"
		>
			<div className="px-3 lg:px-10 ">
				<div className="flex justify-between items-center">
					<Link className="flex" href="/">
						ALTBLOG
						<FaMicrophoneAlt size={30} />
					</Link>
					<Dropdown>
						<DropdownTrigger>
							<Button
								endContent={<MdOutlineTravelExplore />}
								variant="flat"
								className="text-capitalize"
							>
								Explore
							</Button>
						</DropdownTrigger>
						{!user ? (
							<DropdownMenu aria-label="Dropdown">
								<DropdownItem
									textValue="login"
									onPress={loginOnOpen}
									key="login"
									startContent={<BiLogIn />}
								>
									Login
								</DropdownItem>
								<DropdownItem
									textValue="register"
									onPress={signupOnOpen}
									key="signup"
									startContent={<FiUserPlus />}
								>
									Register
								</DropdownItem>
							</DropdownMenu>
						) : (
							<DropdownMenu>
								<DropdownItem
									href="profile/userId"
									startContent={<FaRegUser />}
									textValue="create"
									key="login"
								>
									Profile
								</DropdownItem>
								<DropdownItem
									onPress={createPostOnOpen}
									textValue="create"
									key="login"
									startContent={<IoCreateOutline />}
								>
									Create Post
								</DropdownItem>
								<DropdownItem
									textValue="logout"
									key="signup"
									startContent={<CiLogout />}
									color="danger"
								>
									Sign out
								</DropdownItem>
							</DropdownMenu>
						)}
					</Dropdown>
				</div>
				<div className=" h-[calc(200px-60px)] lg:h-[calc(350px-60px)] flex items-center justify-center">
					<div className="flex w-full sm:w-1/2 md:w-2/5  lg:w-2/6 relative">
						<Input
							className="w-full px-2 rounded-md py-1 placeholder:text-sm focus:outline-black/50"
							placeholder="Search by title, author, tags"
							type="text"
						/>
						<Button
							variant="light"
							isIconOnly
							className="absolute top-1/2 -translate-y-1/2 right-2"
						>
							<FaSearch />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
Hero.propTypes = {
	loginOnOpen: PropTypes.func,
	signupOnOpen: PropTypes.func,
	createPostOnOpen: PropTypes.func,
};
export default Hero;
