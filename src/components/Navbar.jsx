import { FaRegUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BiLogIn } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { useUserContext } from "../context/UserContext";
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
import { LiaUserEditSolid } from "react-icons/lia";
import PropTypes from "prop-types";
import { usePostContext } from "../context/PostContext";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsFillMicMuteFill } from "react-icons/bs";
import { TbUserEdit } from "react-icons/tb";
import { MoonIcon, SunIcon } from "./Svgs";
import { useEffect, useState } from "react";
import { IoBookmark, IoNotifications } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { categories } from "../../data";

const mockNotifications = [
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: true,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: true,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
	},
	{
		senderId: "",
		message: "John your  post",
		isRead: false,
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
}) {
	const { user, logoutUser, profile } = useUserContext();
	const { singlePost, deletePost, userBookmarkPosts, bookmarkPosts } =
		usePostContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const existingParams = Object.fromEntries(searchParams);
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

	return (
		<Navbar classNames={{ wrapper: "max-w-full" }} shouldHideOnScroll>
			<Link className="flex text-black/80 dark:text-white/80" to="/">
				<BsFillMicMuteFill size={30} />
				<span className=" hidden sm:block">BlogShot</span>
			</Link>

			<form className="flex max-w-md w-full  relative ">
				<Input
					className="w-full px-2 rounded-md py-1 placeholder:text-sm focus:outline-black/50 "
					placeholder="Search by title, author, tags"
					classNames={{
						input: "pl-4 md:pl-6",
					}}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					size="sm"
					endContent={
						<div className="flex items-center">
							<label className="sr-only" htmlFor="currency">
								Category
							</label>
							<select
								className="outline-none w-[100px] text-ellipsis overflow-hidden text-nowrap border-0 bg-transparent text-default-400 text-small"
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
					type="submit"
					variant="light"
					isIconOnly
					className="absolute top-1/2 -translate-y-1/2 left-0 md:left-2"
				>
					<FaSearch />
				</Button>
			</form>

			<div className="flex  items-center">
				<Dropdown className="">
					<DropdownTrigger onClick={userBookmarkPosts}>
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
						className="max-h-[200px] max-w-[300px] p-0 rounded-none  overflow-y-auto"
						aria-label="Bookmark list dropdown"
					>
						<DropdownItem
							textValue="Bookmark Posts"
							className=" bg-white dark:bg-black z-50 sticky top-0 rounded-none  border-b"
						>
							<h3 className="font-bold text-base">Bookmark Posts</h3>
						</DropdownItem>
						{bookmarkPosts.map((bookmark) => {
							return (
								<DropdownItem
									textValue={bookmark.post.title}
									key={bookmark._id}
									className=""
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
								9
							</sup>
						</Button>
					</DropdownTrigger>

					<DropdownMenu
						selectionMode="multiple"
						aria-label="Notification list dropdown"
						className="max-h-[200px] p-0 rounded-none  overflow-y-auto"
					>
						<DropdownItem className="sticky top-0 z-10 bg-white dark:bg-black rounded-none border-b">
							<h3 className="font-bold text-base">Notifications</h3>
						</DropdownItem>
						{mockNotifications.map((not, idx) => {
							return (
								<DropdownItem
									textValue="register"
									key={idx}
									className={`${not.isRead ? "bg-red-300" : " bg-transparent"}`}
								>
									John like a post
								</DropdownItem>
							);
						})}
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
};

export default MyNavbar;
