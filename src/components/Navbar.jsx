import { FaRegUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BiLogIn } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { useUserContext } from "../context/UserContext";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Link,
	Switch,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";
import PropTypes from "prop-types";
import { usePostContext } from "../context/PostContext";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsFillMicMuteFill } from "react-icons/bs";

import { TbUserEdit } from "react-icons/tb";
import { MoonIcon, SunIcon } from "./Svgs";
import { useEffect, useState } from "react";

function Navbar({
	createPostOnOpen,
	loginOnOpen,
	signupOnOpen,
	profileUpdateOnOpen,
	editPostOnOpen,
}) {
	const { user, logoutUser, profile } = useUserContext();
	const { singlePost, deletePost } = usePostContext();
	const { pathname } = useLocation();
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem("THEME");

		return savedTheme ? JSON.parse(savedTheme) : false;
	});
	const navigate = useNavigate();

	const handleDeletePost = async () => {
		if (!singlePost) return;
		const isDeleted = await deletePost(singlePost._id);

		if (isDeleted) {
			navigate("/");
		}
	};

	useEffect(() => {
		const rootElement = document.documentElement;

		rootElement.classList.remove("dark", "light");

		rootElement.classList.add(theme ? "dark" : "light");

		localStorage.setItem("THEME", JSON.stringify(theme));
	}, [theme]);

	return (
		<div className="flex justify-between items-center">
			<Link className="flex" href="/">
				<BsFillMicMuteFill size={30} />
				ALTBLOG
			</Link>
			<div className="flex">
				<Switch
					isSelected={theme}
					onValueChange={setTheme}
					value={theme}
					size="lg"
					color="default"
					startContent={<SunIcon />}
					endContent={<MoonIcon />}
				/>

				<Dropdown>
					<DropdownTrigger>
						<Button
							endContent={<MdOutlineTravelExplore />}
							variant="flat"
							className="text-capitalize"
						>
							Menu
						</Button>
					</DropdownTrigger>
					{!user ? (
						<DropdownMenu aria-label="Menu dropdown">
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
							{pathname.includes("post") && (
								<DropdownItem
									textValue="author"
									key="author"
									startContent={<RiDeleteBin2Line />}
									href={`/profile/${singlePost?.author?._id}`}
								>
									Author Profile
								</DropdownItem>
							)}
						</DropdownMenu>
					) : (
						<DropdownMenu aria-label="Menu dropdown">
							<DropdownItem
								onPress={createPostOnOpen}
								textValue="create"
								key="create"
								startContent={<IoCreateOutline />}
							>
								Create New Post
							</DropdownItem>
							{pathname.includes("post") &&
								user?._id === singlePost?.author?._id && (
									<DropdownItem
										onPress={editPostOnOpen}
										textValue="edit"
										key="edit"
										startContent={<CiEdit />}
									>
										Edit Post
									</DropdownItem>
								)}

							{pathname.includes("post") &&
								user?._id !== singlePost?.author?._id && (
									<DropdownItem
										textValue="author"
										key="author"
										startContent={<TbUserEdit />}
										href={`/profile/${singlePost?.author?._id}`}
									>
										Author Profile
									</DropdownItem>
								)}

							{pathname.includes("profile") && profile?._id === user?._id ? (
								<DropdownItem
									onPress={profileUpdateOnOpen}
									startContent={<LiaUserEditSolid />}
									key="update"
									textValue="update"
								>
									Update Profile
								</DropdownItem>
							) : (
								<DropdownItem
									href={`/profile/${user._id}`}
									startContent={<FaRegUser />}
									textValue="profile"
									key="profile"
								>
									My Profile
								</DropdownItem>
							)}
							{pathname.includes("post") &&
								user?._id === singlePost?.author?._id && (
									<DropdownItem
										textValue="delete"
										key="delete"
										startContent={<RiDeleteBin2Line />}
										color="danger"
										onPress={handleDeletePost}
									>
										Delete Post
									</DropdownItem>
								)}
							<DropdownItem
								textValue="logout"
								key="logout"
								startContent={<CiLogout />}
								onPress={logoutUser}
								color="danger"
							>
								Sign out
							</DropdownItem>
						</DropdownMenu>
					)}
				</Dropdown>
			</div>
		</div>
	);
}

Navbar.propTypes = {
	createPostOnOpen: PropTypes.func,
	loginOnOpen: PropTypes.func,
	signupOnOpen: PropTypes.func,
	profileUpdateOnOpen: PropTypes.func,
	editPostOnOpen: PropTypes.func,
};

export default Navbar;
