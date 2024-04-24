import { useDisclosure } from "@nextui-org/react";
import FilterPanel from "../components/FilterPanel";
import Hero from "../components/Hero";
import PostsContainer from "../components/PostsContainer";
import Login from "../components/modals/Login";
import Signup from "../components/modals/Signup";
import CreatePost from "../components/modals/CreatePost";

function Home() {
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

	return (
		<>
			<Hero
				createPostOnOpen={createPostOnOpen}
				loginOnOpen={loginOnOpen}
				signupOnOpen={signupOnOpen}
			/>
			<FilterPanel />
			<PostsContainer
				className="px-3 md:px-5 mt-6 lg:px-10"
				posts={[1, 2, 3, 4, 5, 6, 7, 8]}
			/>
			<Login onOpenChange={loginOnOpenChange} isOpen={loginIsOpen} />
			<Signup isOpen={signUpIsOpen} onOpenChange={signupOnOpenChange} />
			<CreatePost
				isOpen={createPostIsOpen}
				onOpenChange={createPostOnOpenChange}
			/>
		</>
	);
}

export default Home;
