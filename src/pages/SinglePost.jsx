import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { usePostContext } from "../context/PostContext";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import moment from "moment";
import { handleTime } from "../helper/convertReadingTime";
import { MdOutlineCreate, MdOutlineUpdate } from "react-icons/md";
import { CgReadme } from "react-icons/cg";
import { FaRegEye } from "react-icons/fa";

const SinglePost = ({
	createPostOnOpen,
	loginOnOpen,
	signupOnOpen,
	editPostOnOpen,
}) => {
	const { id } = useParams();
	const { getSinglePost, singlePost, isPending } = usePostContext();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (!id) return;
		const getPost = async () => {
			await getSinglePost(id);
		};
		getPost();
	}, [id]);

	const existingParams = Object.fromEntries(searchParams);

	const handleEdit = () => {
		const params = { ...existingParams, postId: id };
		setSearchParams(params);
		editPostOnOpen();
	};

	// console.log(singlePost.author);

	return (
		<>
			{isPending ? (
				<Spinner
					color="default"
					classNames={{ label: "opacity-50" }}
					label="Loading..."
					className="min-h-screen flex"
				/>
			) : (
				<div className="hero h-[250px] lg:h-[350px] pt-5">
					<div className="px-3 lg:px-10 mb-4">
						<Navbar
							createPostOnOpen={createPostOnOpen}
							loginOnOpen={loginOnOpen}
							signupOnOpen={signupOnOpen}
							editPostOnOpen={handleEdit}
						/>
						<div className="mt-8 pb-8">
							<div className=" max-w-2xl">
								<h1 className="mb-3 max-w-md font-bold text-3xl">
									{singlePost?.title}
								</h1>
								<h3 className="text-black/75 dark:text-white/75">
									{singlePost?.description}
								</h3>
							</div>
							<ul className="py-5 flex flex-wrap gap-3 text-black/50 items-center dark:text-slate-300 dark:bg-[#171717]">
								<li className="text-nowrap flex items-center">
									<small className="font-semibold gap-1 pr-1 inline-flex items-center">
										<MdOutlineCreate />
										Written by:{" "}
									</small>

									<Link
										to={`/profile/${singlePost?.author?._id}`}
										className="cursor-pointer  flex hover:text-primary transition-colors duration-300 ease-linear"
									>
										<small>{singlePost?.author?.first_name} </small>
										<small className="pl-1">
											{singlePost?.author?.last_name}
										</small>
									</Link>
								</li>

								<li className="text-nowrap flex items-center gap-1">
									<small className="font-semibold gap-1 flex items-center">
										<MdOutlineUpdate />
										Last updated:{" "}
									</small>{" "}
									<small>
										{moment(singlePost?.updatedAt).format(
											"MMMM Do YYYY, h:mm:ss a"
										)}
									</small>
								</li>

								<li className="text-mowrap flex items-center">
									<small className="font-semibold flex gap-1 items-center">
										<FaRegEye />
										Views:{" "}
									</small>{" "}
									<small className="ps-1">{singlePost?.read_count}</small>
								</li>
								<li className="text-mowrap items-center inline-flex">
									<small className="font-semibold items-center gap-1 flex">
										<CgReadme /> Reading time:{" "}
									</small>{" "}
									<small className="ps-1">
										{handleTime(singlePost?.reading_time)}
									</small>
								</li>
							</ul>
							<style>
								{`
								.blog-body{
									h1,h2, h3{
										font-weight: bold;
										font-size: 1.2rem
									}
								   ol {
									
									list-style-type: decimal !important;
									list-style-position: inside !important;
								   }
								   ul {
									list-style-type: disc !important;
									list-style-position: inside !important;
								   }
								}
								`}
							</style>
							<div
								className="blog-body"
								dangerouslySetInnerHTML={{ __html: singlePost?.body }}
							></div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

SinglePost.propTypes = {
	createPostOnOpen: PropTypes.func,
	loginOnOpen: PropTypes.func,
	signupOnOpen: PropTypes.func,
	editPostOnOpen: PropTypes.func,
};

export default SinglePost;
