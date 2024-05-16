import { FaSearch } from "react-icons/fa";
import heroBg from "../assets/herobg.png";
import { Button, Input } from "@nextui-org/react";

import PropTypes from "prop-types";
import Navbar from "./Navbar";

const Hero = ({
	createPostOnOpen,
	loginOnOpen,
	signupOnOpen,
	setSearch,
	search,
}) => {
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
			<div className="absolute bg-white/10 dark:bg-black/10 left-0 top-0 w-full h-full"></div>
			<div className="px-3 lg:px-10 ">
				<Navbar
					loginOnOpen={loginOnOpen}
					signupOnOpen={signupOnOpen}
					createPostOnOpen={createPostOnOpen}
				/>
				<div className=" h-[calc(200px-60px)] lg:h-[calc(350px-60px)] flex items-center justify-center">
					<form className="flex w-full sm:w-1/2 md:w-2/5  lg:w-2/6 relative ">
						<Input
							className="w-full px-2 rounded-md py-1 placeholder:text-sm focus:outline-black/50 "
							placeholder="Search by title, author, tags"
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Button
							type="submit"
							variant="light"
							isIconOnly
							className="absolute top-1/2 -translate-y-1/2 right-2"
						>
							<FaSearch />
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};
Hero.propTypes = {
	loginOnOpen: PropTypes.func,
	signupOnOpen: PropTypes.func,
	createPostOnOpen: PropTypes.func,
	setSearch: PropTypes.func,
	search: PropTypes.string,
};
export default Hero;
