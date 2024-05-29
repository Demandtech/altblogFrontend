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
import { FaCheckCircle, FaSearch } from "react-icons/fa";
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
	DropdownSection,
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
import { useEffect, useState, useMemo } from "react";
import { categories } from "../../data";
import { debounce } from "lodash";

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
		id: 5,
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
	setSearch,
	search,
	setAuthorSearch,
	authorSearch,
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
	const [selectedBookmarkKeys, setSelectedBookmarkKeys] = useState(new Set([]));
	const [selectedNotificationKeys, setSelectedNotificationKeys] = useState(
		new Set([])
	);

	const selectedBookmarkValue = useMemo(
		() =>
			Array.from(selectedBookmarkKeys)
				.join(", ")
				.replaceAll("_", " ")
				.split(","),
		[selectedBookmarkKeys]
	);
	const selectedNotificationValue = useMemo(
		() =>
			Array.from(selectedNotificationKeys)
				.join(", ")
				.replaceAll("_", " ")
				.split(","),
		[selectedNotificationKeys]
	);

	console.log(selectedBookmarkValue, selectedNotificationValue);

	const handleDeletePost = async () => {
		if (!singlePost) return;
		const isDeleted = await deletePost(singlePost._id);

		if (isDeleted) {
			navigate("/");
		}
	};

	const handleCategory = (e) => {
		const params = { ...existingParams, category: e.target.value };
		setSearchParams(params);
	};

	useEffect(() => {
		const rootElement = document.documentElement;

		rootElement.classList.remove("dark", "light");

		rootElement.classList.add(theme ? "dark" : "light");

		localStorage.setItem("THEME", JSON.stringify(theme));
	}, [theme]);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};
	const handleAuthorSearchChange = (e) => {
		setAuthorSearch(e.target.value);
	};

	const searchDebounce = debounce(handleSearchChange, 500);
	const authorSearchDebounce = debounce(handleAuthorSearchChange, 500);

	return (
		<Navbar
			classNames={{ wrapper: "max-w-full px-2 sm:px-6 md:px-10" }}
			shouldHideOnScroll
		>
			<Link
				className={`${
					hideMenu ? "opacity-0 hidden " : "flex opacity-100"
				} sm:opacity-100 sm:flex transition-all duration-300 ease-linear text-black/80 dark:text-white/80`}
				to="/"
			>
				<BsFillMicMuteFill size={30} />
				<span className=" hidden sm:block">BlogShot</span>
			</Link>

			{pathname === "/" && (
				<form className="flex max-w-md w-full transition-transform ease-linear duration-300 relative ">
					<Input
						className="w-full px-2 rounded-md py-1 placeholder:text-sm focus:outline-black/50 "
						placeholder="Search by title, author, tags"
						classNames={{
							input: "pl-4 md:pl-6",
						}}
						type="text"
						value={search}
						onChange={searchDebounce}
						size="sm"
						endContent={
							<div className="flex items-center">
								<label className="sr-only" htmlFor="currency">
									Category
								</label>
								<select
									className="outline-none w-[80px] text-ellipsis overflow-hidden text-nowrap border-0 bg-transparent text-default-400 text-small"
									id="currency"
									name="currency"
									defaultValue={"category"}
									onChange={handleCategory}
									value={existingParams.category}
								>
									<option value={"category"} disabled>
										{" "}
										Category
									</option>
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
						className="absolute top-1/2 -translate-y-1/2 left-0 md:left-2"
					>
						<FaSearch />
					</Button>
				</form>
			)}
			{pathname.includes("profile") && (
				<form className="flex max-w-md w-full transition-transform ease-linear duration-300 relative ">
					<Input
						className="w-full px-2 rounded-md py-1 placeholder:text-sm focus:outline-black/50 "
						placeholder="Search by title, tags"
						classNames={{
							input: "pl-4 md:pl-6",
						}}
						type="text"
						value={authorSearch}
						onChange={handleAuthorSearchChange}
						size="sm"
						endContent={
							<div className="flex items-center">
								<label className="sr-only" htmlFor="currency">
									Category
								</label>
								<select
									className="outline-none w-[80px] text-ellipsis overflow-hidden text-nowrap border-0 bg-transparent text-default-400 text-small"
									id="currency"
									name="currency"
									defaultValue={"category"}
									onChange={handleCategory}
									value={existingParams.category}
								>
									<option value={"category"} disabled>
										{" "}
										Category
									</option>
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
						className="absolute top-1/2 -translate-y-1/2 left-0 md:left-2"
					>
						<FaSearch />
					</Button>
				</form>
			)}

			<div
				className={`${
					hideMenu ? "opacity-0 hidden " : "flex opacity-100"
				} opacity-100 sm:flex items-center`}
			>
				<Dropdown className="">
					<DropdownTrigger onClick={getUserBookmarkPosts}>
						<Button
							size="sm"
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
						selectionMode="multiple"
						selectedKeys={selectedBookmarkKeys}
						onSelectionChange={setSelectedBookmarkKeys}
						closeOnSelect={false}
					>
						<DropdownItem
							selectedIcon={<IoBookmark />}
							d
							textValue="Bookmark Posts"
							showDivider
							className=" bg-white dark:bg-[#18181b] z-50 sticky top-0 rounded-none "
						>
							<h3 className="font-bold text-base">Bookmark Posts</h3>
						</DropdownItem>
						{bookmarkPosts.map((bookmark) => {
							return (
								<DropdownItem
									textValue={bookmark.post.title}
									key={bookmark._id}
									className="w-[250px] text-ellipsis overflow-x-hidden"
								>
									<Link to={`/post/${bookmark.post._id}`}>
										<span className="text-primary text-small capitalize font-semibold">
											{bookmark.post.title}
										</span>
									</Link>
								</DropdownItem>
							);
						})}
					</DropdownMenu>
				</Dropdown>
				<Switch
					isSelected={theme}
					onValueChange={setTheme}
					value={theme}
					size="sm"
					color="default"
					startContent={<SunIcon />}
					endContent={<MoonIcon />}
					classNames={{ wrapper: "mx-1" }}
				/>
				<Dropdown>
					<DropdownTrigger>
						<Button
							size="sm"
							isIconOnly
							variant="light"
							className="rounded-full"
						>
							{user ? (
								<Avatar
									size="sm"
									className="w-[20px] h-[20px]"
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

				<Dropdown size="sm">
					<DropdownTrigger>
						<Button
							size="sm"
							variant="light"
							className="text-capitalize rounded-full relative"
							isIconOnly
						>
							<IoNotifications />
							<sup className="bg-red-600 rounded-full w-3 h-3 absolute grid place-content-center right-1 top-1">
								{mockNotifications.filter((mock) => mock.isRead).length}
							</sup>
						</Button>
					</DropdownTrigger>

					<DropdownMenu
						selectionMode="multiple"
						aria-label="Notification list dropdown"
						className="max-h-[200px] p-0  overflow-y-auto"
						selectedKeys={selectedNotificationKeys}
						onSelectionChange={setSelectedNotificationKeys}
						closeOnSelect={false}
					>
						<DropdownItem
							key=""
							selectedIcon={<FaCheckCircle />}
							className="sticky top-0 z-10 bg-white border-b-1  rounded-none dark:bg-[#18181b] "
						>
							<h3 className="font-bold text-base">Notifications</h3>
						</DropdownItem>
						<DropdownSection>
							{mockNotifications
								.filter((item) => item.isRead)
								.map((not) => {
									return (
										<DropdownItem
											showDivider
											textValue="register"
											key={not.id}
											className="bg-red-600 rounded-none"
										>
											John like a post
										</DropdownItem>
									);
								})}

							{mockNotifications
								.filter((item) => !item.isRead)
								.map((not) => {
									return (
										<DropdownItem
											showDivider
											textValue="register"
											key={not.id}
											className=" bg-transparent rounded-none"
										>
											John like a post
										</DropdownItem>
									);
								})}
						</DropdownSection>
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
