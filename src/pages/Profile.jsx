import { useNavigate, useParams } from "react-router-dom";
import PostTab from "../components/Tab";
import { useAppContext } from "../context/AppContext";
import { FaLongArrowAltLeft } from "react-icons/fa";
import heroBg from "../assets/herobg.png";

import { BsPostcard } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { MdPublish } from "react-icons/md";

import { Button, useDisclosure, Avatar } from "@nextui-org/react";
import EditPost from "../components/modals/EditPost";

const Profile = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { posts, draftPosts, publishedPosts } = useAppContext();
	return (
		<div>
			<style>
				{`
              .hero{
                position: relative;
                background: url(${heroBg}) center no-repeat;		
				background-size: cover;
              }           
            `}
			</style>
			<div className="hero h-[250px] lg:h-[350px] pt-5">
				<div className="flex px-5 mb-2 items-center justify-between">
					<Button
						onClick={() => navigate(-1)}
						className="border-black"
						// isIconOnly
						variant="light"
					>
						<FaLongArrowAltLeft />
						Back
					</Button>
				</div>
				<div>
					<div className="flex px-5 md:px-10 pt-3 md:pt-5 items-center gap-x-6">
						<Avatar className="w-20 h-20 text-large" name="Rasheed" />
						<div>
							<h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
								Leslie Alexander
							</h3>
							<p className="text-sm font-semibold leading-6 text-indigo-600">
								Co-Founder / CEO
							</p>
						</div>
					</div>
					<div className="flex mt-5 gap-2 flex-wrap pl-5 md:pl-10">
						<li className="flex gap-1.5 font-semibold text-lg">
							<span className="flex  gap-1 items-center">
								<BsPostcard /> Blog Posts:{" "}
							</span>{" "}
							<span>1</span>
						</li>
						-
						<li className="flex gap-1.5 font-semibold text-lg">
							<span className="flex gap-1 items-center">
								<IoEyeOutline /> View:{" "}
							</span>{" "}
							<span>1</span>
						</li>
						-
						<li className="flex gap-1.5 font-semibold text-lg">
							<span className="flex gap-1 items-center">
								<MdOutlineAccessTime /> Minutes Read:{" "}
							</span>{" "}
							<span>1</span>
						</li>
						-
						<li className="flex gap-1.5 font-semibold text-lg">
							<span className="flex gap-1 items-center">
								<RiDraftLine />
								Draft:{" "}
							</span>{" "}
							<span>1</span>
						</li>
						-
						<li className="flex font-semibold gap-1.5 text-lg">
							<span className="flex gap-1 items-center">
								{" "}
								<MdPublish />
								Published:{" "}
							</span>{" "}
							<span>1</span>
						</li>
					</div>
				</div>
			</div>
			<div className="px-5 mt-5">
				<PostTab
					posts={posts}
					draftPosts={draftPosts}
					publishedPosts={publishedPosts}
				/>
			</div>
			<EditPost isOpen={isOpen} onOpenChange={onOpenChange} />
		</div>
	);
};

export default Profile;
