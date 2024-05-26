import { Routes, Route, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import "react-quill/dist/quill.snow.css";
import Profile from "./pages/Profile";
import { Spinner, useDisclosure } from "@nextui-org/react";
import Login from "./components/modals/Login";
import Signup from "./components/modals/Signup";
import CreatePost from "./components/modals/CreatePost";
import UpdateProfile from "./components/modals/UpdateProfile";
import EditPost from "./components/modals/EditPost";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
	const [onMount, setOnMount] = useState(false);
	const {
		isOpen: loginIsOpen,
		onOpen: loginOnOpen,
		onOpenChange: loginOnOpenChange,
	} = useDisclosure();

	const {
		isOpen: signUpIsOpen,
		onOpen: signupOnOpen,
		onOpenChange: signupOnOpenChange,
	} = useDisclosure();

	const {
		isOpen: createPostIsOpen,
		onOpen: createPostOnOpen,
		onOpenChange: createPostOnOpenChange,
	} = useDisclosure();

	const {
		isOpen: profileUpdateIsOpen,
		onOpen: profileUpdateOnOpen,
		onOpenChange: profileUpdateOnOpenChange,
	} = useDisclosure();

	const {
		isOpen: editPostIsOpen,
		onOpen: editPostOnOpen,
		onOpenChange: editPostOnOpenChange,
	} = useDisclosure();

	const [search, setSearch] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();

	const existingParams = Object.fromEntries(searchParams);

	const handleEdit = () => {
		const id = localStorage.getItem("EditPostId");
		const params = { ...existingParams, postId: id };
		setSearchParams(params);
		editPostOnOpen();
	};

	document.onreadystatechange = () => {
		setOnMount(true);
	};

	return (
		<>
			{!onMount ? (
				<Spinner
					className="w-full bg-black/20 h-svh flex justify-center items-center"
					label="Loading... Please wait"
				/>
			) : (
				<motion.div className=" dark:bg-[#171717] min-h-svh w-full ">
					<Navbar
						createPostOnOpen={createPostOnOpen}
						signupOnOpen={signupOnOpen}
						loginOnOpen={loginOnOpen}
						setSearch={setSearch}
						search={search}
						editPostOnOpen={handleEdit}
						profileUpdateOnOpen={profileUpdateOnOpen}
					/>
					<Routes>
						<Route
							element={
								<Home
									loginOnOpen={loginOnOpen}
									editPostOnOpen={editPostOnOpen}
									search={search}
								/>
							}
							path="/"
						/>
						<Route element={<SinglePost />} path="/post/:id" />
						<Route
							element={
								<Profile
									loginOnOpen={loginOnOpen}
									editPostOnOpen={editPostOnOpen}
								/>
							}
							path="/profile/:id"
						/>
					</Routes>
					<Login
						onSignUpOpen={signupOnOpen}
						isOpen={loginIsOpen}
						onOpenChange={loginOnOpenChange}
					/>
					<Signup
						onLogin={loginOnOpen}
						isOpen={signUpIsOpen}
						onOpenChange={signupOnOpenChange}
					/>
					<CreatePost
						isOpen={createPostIsOpen}
						onOpenChange={createPostOnOpenChange}
					/>
					<UpdateProfile
						isOpen={profileUpdateIsOpen}
						onOpenChange={profileUpdateOnOpenChange}
					/>
					<EditPost
						isOpen={editPostIsOpen}
						onOpenChange={editPostOnOpenChange}
					/>
				</motion.div>
			)}
		</>
	);
}

export default App;
