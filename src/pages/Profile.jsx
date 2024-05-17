import { useEffect, useState } from "react";
import PostTab from "../components/PostTab";
import { useUserContext } from "../context/UserContext";
import { usePostContext } from "../context/PostContext";
import {
	BsPostcard,
	BsFacebook,
	BsTwitter,
	BsLinkedin,
	BsPinterest,
	BsMedium,
	BsTelegram,
} from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { MdPublish } from "react-icons/md";
import { Avatar, Spinner } from "@nextui-org/react";
import PostsContainer from "../components/PostsContainer";
import { handleTime } from "../helper/convertReadingTime";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Profile = ({
	createPostOnOpen,
	loginOnOpen,
	signupOnOpen,
	profileUpdateOnOpen,
	editPostOnOpen,
}) => {
	const { id } = useParams();
	const { getUserProfile, profile, user, snackBar } = useUserContext();
	const { getAuthorPosts, author_posts } = usePostContext();
	const [isLoading, setIsLoading] = useState(true);
	const [state, setState] = useState("");
	const [page, setPage] = useState(1);
	const [order, setOrder] = useState("");
	const [limit, setLimit] = useState("5");

	useEffect(() => {
		const getProfile = async () => {
			setIsLoading(true);
			const { user, errorMessage } = await getUserProfile(id);

			if (user) {
				setIsLoading(false);
			}

			if (errorMessage) {
				setIsLoading(false);
				snackBar(errorMessage, "error");
			}
		};
		getProfile();
	}, [id, user]);

	useEffect(() => {
		const getPosts = async () => {
			try {
				await getAuthorPosts({ id: profile._id, order, page, limit, state });
			} catch (error) {
				console.log("Error Getting Post", error);
			}
		};
		if (profile) {
			getPosts();
		}
	}, [page, order, state, profile, user, limit]);

	return (
		<>
			{isLoading ? (
				<Spinner
					className="flex justify-center items-center h-screen"
					color="default"
					label="Loading..."
					size="lg"
				/>
			) : (
				<div>
					<style>
						{`
              .hero{
                position: relative;
                background: url(${profile?.banner_image}) center no-repeat;		
				background-size: cover;
              }           
            `}
					</style>
					<div className="hero  max-h-[350px] pt-4 relative">
						<div className="absolute bg-white/10 dark:bg-black/10 left-0 top-0 w-full h-full"></div>
						<div className="px-3 lg:px-10">
							<Navbar
								createPostOnOpen={createPostOnOpen}
								loginOnOpen={loginOnOpen}
								signupOnOpen={signupOnOpen}
								profileUpdateOnOpen={profileUpdateOnOpen}
							/>
						</div>
						<div className="pt-10">
							<div className="flex px-5 md:px-10 pt-3 md:pt-5 items-center gap-x-6">
								<Avatar
									className="w-20 h-20 text-large"
									name={profile?.first_name}
									src={profile?.avatar}
								/>
								<div>
									<h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
										{profile?.first_name} {profile?.last_name}
									</h3>
									<p className="text-sm font-semibold leading-6 text-indigo-600">
										{profile?.profession}
									</p>
								</div>
							</div>
						</div>
						<div className="flex gap-2 justify-end pb-9 px-3 md:px-10">
							{profile?.facebook && (
								<a
									className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 w-7 h-7 rounded-full grid place-content-center"
									href={profile.facebook}
									target="_blank"
								>
									<BsFacebook
										size={15}
										className=" transition-colors duration-200 ease-linear group-hover:text-white"
									/>
								</a>
							)}
							{profile?.twitter && (
								<a
									className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 w-7 h-7 rounded-full grid place-content-center"
									href={profile?.twitter}
									target="_blank"
								>
									<BsTwitter
										size={15}
										className=" transition-colors duration-200 ease-linear group-hover:text-white"
									/>
								</a>
							)}
							{profile?.linkedin && (
								<a
									className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 w-7 h-7 rounded-full grid place-content-center"
									href={profile?.linkedin}
									target="_blank"
								>
									<BsLinkedin
										size={15}
										className=" transition-colors duration-200 ease-linear group-hover:text-white"
									/>
								</a>
							)}
							{profile?.pinterest && (
								<a
									className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 w-7 h-7 rounded-full grid place-content-center"
									href={profile?.pinterest}
									target="_blank"
								>
									<BsPinterest
										size={15}
										className=" transition-colors duration-200 ease-linear group-hover:text-white"
									/>
								</a>
							)}
							{profile?.medium && (
								<a
									className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 w-7 h-7 rounded-full grid place-content-center"
									href={profile?.medium}
									target="_blank"
								>
									<BsMedium
										size={15}
										className=" transition-colors duration-200 ease-linear group-hover:text-white"
									/>
								</a>
							)}
							{profile?.telegram && (
								<a
									className="group bg-primary z-50 transition-background ease-linear duration-200 hover:bg-black/80 w-7 h-7 rounded-full grid place-content-center"
									href={profile?.telegram}
									target="_blank"
								>
									<BsTelegram
										size={15}
										className=" transition-colors duration-200 ease-linear group-hover:text-white"
									/>
								</a>
							)}
						</div>
					</div>
					<div className="px-5 mt-5">
						<div className="flex py-5 gap-2 flex-wrap max-w-2xl border-b dark:border-gray-600 justify-start items-center">
							<div className="p-2 rounded-md flex-1 bg-[#f7f7fc] dark:bg-[#181b1e]">
								<small className="flex  text-nowrap gap-1 items-center uppercase font-light dark:text-white/70 text-black/70">
									<BsPostcard />
									Total Posts{" "}
								</small>{" "}
								<small className="font-semibold text-base dark:text-white/90 text-black/90">
									{profile?.stats?.totalPosts}
								</small>
							</div>

							<div className="bg-[#f7f7fc] dark:bg-[#181b1e] rounded-md p-2 flex-1">
								<small className="flex  text-nowrap gap-1 items-center uppercase font-light dark:text-white/70 text-black/70">
									<IoEyeOutline />
									Total Views{" "}
								</small>{" "}
								<small className="font-semibold text-base dark:text-white/90 text-black/90">
									{profile?.stats?.totalViews}
								</small>
							</div>

							<div className="bg-[#f7f7fc] dark:bg-[#181b1e] rounded-md p-2 flex-1">
								<small className="flex  text-nowrap gap-1 items-center uppercase font-light dark:text-white/70 text-black/70">
									<MdOutlineAccessTime />
									Total read time
								</small>{" "}
								<small className="font-semibold text-base dark:text-white/90 text-black/90">
									{handleTime(profile?.stats.totalReadTime)}
								</small>
							</div>
							{profile?._id === user?._id && (
								<div className="bg-[#f7f7fc] rounded-md p-2 flex-1 dark:bg-[#181b1e]">
									<small className="flex  text-nowrap gap-1 items-center uppercase font-light dark:text-white/70 text-black/70">
										<RiDraftLine />
										Draft
									</small>{" "}
									<small className="font-semibold text-base dark:text-white/90 text-black/90">
										{profile?.stats?.totalDraft}
									</small>
								</div>
							)}
							{profile?._id === user?._id && (
								<div className="bg-[#f7f7fc] rounded-md p-2 flex-1 dark:bg-[#181b1e]">
									<small className="flex  text-nowrap gap-1 items-center uppercase font-light dark:text-white/70 text-black/70">
										{" "}
										<MdPublish />
										Published{" "}
									</small>{" "}
									<small className="font-semibold text-base dark:text-white/90 text-black/90">
										{profile?.stats?.totalPublished}
									</small>
								</div>
							)}
						</div>
					</div>
					<div className="px-5 mt-5">
						{profile?._id === user?._id ? (
							<PostTab
								setPage={setPage}
								setOrder={setOrder}
								setState={setState}
								posts={author_posts}
								editPostOnOpen={editPostOnOpen}
								setLimit={setLimit}
								limit={limit}
							/>
						) : (
							<PostsContainer
								setPage={setPage}
								setOrder={setOrder}
								posts={author_posts}
								editPostOnOpen={editPostOnOpen}
								setLimit={setLimit}
								limit={limit}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

Profile.propTypes = {
	createPostOnOpen: PropTypes.func,
	loginOnOpen: PropTypes.func,
	signupOnOpen: PropTypes.func,
	profileUpdateOnOpen: PropTypes.func,
	editPostOnOpen: PropTypes.func,
};

export default Profile;
