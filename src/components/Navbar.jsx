import { FaRegUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BiLogIn } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsFillMicMuteFill } from "react-icons/bs";
import { TbUserEdit } from "react-icons/tb";
import { IoBookmark, IoNotifications } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { LiaUserEditSolid } from "react-icons/lia";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Switch,
	Input,
	Avatar,
	Navbar,
} from "@nextui-org/react";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";

import PropTypes from "prop-types";
import { usePostContext } from "../context/PostContext";
import { MoonIcon, SunIcon } from "./Svgs";
import { useEffect, useState, useMemo, useCallback } from "react";
import { categories } from "../../data";
import debounce from "lodash.debounce";

const mockNotifications = [
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
		id: 1,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
		id: 2,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
		id: 3,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
		id: 4,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: true,
		id: 10,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
		id: 5,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
		id: 6,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: true,
		id: 7,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
		id: 8,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
		id: 9,
	},
];

function MyNavbar({
	createPostOnOpen,
	loginOnOpen,
	signupOnOpen,
	profileUpdateOnOpen,
	editPostOnOpen,
}) {
	const { user, logoutUser, profile } = useUserContext();
	const { singlePost, deletePost, getUserBookmarkPosts, bookmarkPosts } =
		usePostContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const existingParams = Object.fromEntries(searchParams);
	const { pathname } = useLocation();
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem("THEME");

		return savedTheme ? JSON.parse(savedTheme) : false;
	});
	const navigate = useNavigate();

	const [hideMenu, setHideMenu] = useState(false);

	const [selectedNotificationKeys, setSelectedNotificationKeys] = useState(
		new Set([])
	);

	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");

	// const selectedNotificationValue = useMemo(
	// 	() =>
	// 		Array.from(selectedNotificationKeys)
	// 			.join(", ")
	// 			.replaceAll("_", " ")
	// 			.split(","),
	// 	[selectedNotificationKeys]
	// );

	const handleDeletePost = async () => {
		if (!singlePost) return;
		const isDeleted = await deletePost(singlePost._id);

		if (isDeleted) {
			navigate("/");
		}
	};

	const handleCategory = (e) => {
		setCategory(e.target.value);
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		const params = { ...existingParams };
		if (search) {
			params.q = search;
		} else {
			delete params.q;
		}
		if (category !== "All" && category !== "") {
			params.c = category;
		} else {
			delete params.c;
		}
		if (params.p > 1) {
			params.p = 1;
		}
		setSearchParams(params);
	}, [search, category]);

	useEffect(() => {
		const rootElement = document.documentElement;

		rootElement.classList.remove("dark", "light");

		rootElement.classList.add(theme ? "dark" : "light");

		localStorage.setItem("THEME", JSON.stringify(theme));
	}, [theme]);

	return (
		<Navbar
			classNames={{
				base: "gap-0",
				wrapper: "max-w-full gap-1 sm:gap-5 sm:gap-5 px-2  sm:px-3 md:px-5",
			}}
			shouldHideOnScroll
			className="py-2"
		>
			<Link
				className={
					"transition-all flex flex-col items-center duration-300 ease-linear text-black/80 dark:text-white/80"
				}
				to="/"
			>
				<BsFillMicMuteFill size={30} />
				<span className="">BlogShot</span>
			</Link>

			{!pathname.includes("post") && (
				<form className="sm:flex max-w-md w-full transition-transform ease-linear duration-300 relative ">
					<Input
						className={`${
							!hideMenu ? "w-12" : "w-fit"
						} sm:w-full transition-width duration-250 overflow-hidden px-2 rounded-md py-1 placeholder:text-sm focus:outline-black/50`}
						placeholder="Search by title, author, tags"
						classNames={{
							input: "pl-6",
						}}
						type="text"
						value={search}
						onChange={handleChange}
						size="sm"
						endContent={
							<div className={`block`}>
								<label
									className={`${
										hideMenu ? "opacity-0 hidden " : "flex opacity-100"
									} sr-only`}
									htmlFor="currency"
								>
									Category
								</label>
								<select
									className="outline-none w-[80px]  text-ellipsis overflow-hidden text-nowrap border-0 bg-transparent text-default-400 text-small"
									id="currency"
									name="currency"
									defaultValue="category"
									onChange={handleCategory}
									value={existingParams.category}
								>
									<option value="All"> All</option>
									{categories.map((cat) => {
										return (
											<option
												value={cat.value}
												className="capitalize"
												key={cat.label}
											>
												{cat.label[0].toUpperCase() + cat.label.slice(1)}
											</option>
										);
									})}
								</select>
							</div>
						}
					/>
					<Button
						onPress={() => {
							setHideMenu(!hideMenu);
						}}
						type="button"
						variant="light"
						isIconOnly
						className="absolute top-1/2 -translate-y-1/2 left-1 md:left-2"
					>
						<FaSearch />
					</Button>
				</form>
			)}

			<div
				className={`${
					hideMenu ? "opacity-0  hidden" : "opacity-100 flex"
				}  sm:opacity-100 sm:flex items-center transition-all ease-linear duration-300`}
			>
				<Dropdown className="">
					<DropdownTrigger onClick={getUserBookmarkPosts}>
						<Button
							size="md"
							variant="light"
							className="text-capitalize rounded-full"
							isIconOnly
						>
							<IoBookmark />
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						className="max-h-[200px] w-full  p-0 rounded-none  overflow-y-auto"
						aria-label="Bookmark list dropdown"
						closeOnSelect={false}
						items={bookmarkPosts}
					>
						{(item) => {
							return (
								<DropdownItem
									textValue={item.post.title}
									key={item._id}
									className="w-[250px] text-ellipsis overflow-x-hidden"
								>
									<Link to={`/post/${item.post._id}`}>
										<span className="text-primary text-small capitalize font-semibold">
											{item.post.title}
										</span>
									</Link>
								</DropdownItem>
							);
						}}
					</DropdownMenu>
				</Dropdown>
				<Switch
					isSelected={theme}
					onValueChange={setTheme}
					value={theme}
					size="md"
					color="default"
					startContent={<SunIcon />}
					endContent={<MoonIcon />}
					classNames={{ wrapper: "mx-1 mr-2.5" }}
				/>
				<Dropdown>
					<DropdownTrigger>
						<Button
							size="md"
							isIconOnly
							variant="light"
							className="rounded-full"
						>
							{user ? (
								<Avatar
									size="sm"
									// className="w-[20px] h-[20px]"
									name={user.first_name}
									src={user?.avatar}
								/>
							) : (
								<FaRegUser />
							)}
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

				<Dropdown>
					<DropdownTrigger>
						<Button
							size="md"
							variant="light"
							className="text-capitalize rounded-full relative"
							isIconOnly
						>
							<IoNotifications />
							<sup className="bg-red-600 rounded-full w-3 h-3 absolute grid place-content-center right-2 top-2">
								{mockNotifications.filter((mock) => mock.isRead).length}
							</sup>
						</Button>
					</DropdownTrigger>

					<DropdownMenu
						selectionMode="multiple"
						aria-label="Notification list dropdown"
						className="max-h-[200px]  overflow-y-auto"
						selectedKeys={selectedNotificationKeys}
						onSelectionChange={setSelectedNotificationKeys}
						closeOnSelect={false}
						items={mockNotifications}
					>
						{(item) => (
							<DropdownItem
								showDivider
								textValue={item.message}
								key={item.id}
								className=""
							>
								{item.message}
							</DropdownItem>
						)}
					</DropdownMenu>
				</Dropdown>
			</div>
		</Navbar>
	);
}

MyNavbar.propTypes = {
	createPostOnOpen: PropTypes.func,
	loginOnOpen: PropTypes.func,
	signupOnOpen: PropTypes.func,
	profileUpdateOnOpen: PropTypes.func,
	editPostOnOpen: PropTypes.func,
	search: PropTypes.string,
	setSearch: PropTypes.func,
	authorSearch: PropTypes.string,
	setAuthorSearch: PropTypes.func,
};

export default MyNavbar;
