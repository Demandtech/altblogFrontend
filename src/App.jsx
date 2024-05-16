import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import "react-quill/dist/quill.snow.css";
import Profile from "./pages/Profile";
import { useDisclosure } from "@nextui-org/react";
import Login from "./components/modals/Login";
import Signup from "./components/modals/Signup";
import CreatePost from "./components/modals/CreatePost";
import UpdateProfile from "./components/modals/UpdateProfile";
import EditPost from "./components/modals/EditPost";

function App() {
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

	return (
		<div className=" dark:bg-[#171717]">
			<Routes>
				<Route
					element={
						<Home
							loginOnOpen={loginOnOpen}
							signupOnOpen={signupOnOpen}
							createPostOnOpen={createPostOnOpen}
							editPostOnOpen={editPostOnOpen}
						/>
					}
					path="/"
				/>
				<Route
					element={
						<SinglePost
							loginOnOpen={loginOnOpen}
							signupOnOpen={signupOnOpen}
							createPostOnOpen={createPostOnOpen}
							editPostOnOpen={editPostOnOpen}
						/>
					}
					path="/post/:id"
				/>
				<Route
					element={
						<Profile
							loginOnOpen={loginOnOpen}
							signupOnOpen={signupOnOpen}
							createPostOnOpen={createPostOnOpen}
							profileUpdateOnOpen={profileUpdateOnOpen}
							editPostOnOpen={editPostOnOpen}
						/>
					}
					path="/profile/:id"
				/>
			</Routes>
			<Login isOpen={loginIsOpen} onOpenChange={loginOnOpenChange} />
			<Signup isOpen={signUpIsOpen} onOpenChange={signupOnOpenChange} />
			<CreatePost
				isOpen={createPostIsOpen}
				onOpenChange={createPostOnOpenChange}
			/>
			<UpdateProfile
				isOpen={profileUpdateIsOpen}
				onOpenChange={profileUpdateOnOpenChange}
			/>
			<EditPost isOpen={editPostIsOpen} onOpenChange={editPostOnOpenChange} />
		</div>
	);
}

export default App;
