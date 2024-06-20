import {
	Button,
	Card,
	CardBody,
	DropdownMenu,
	DropdownTrigger,
	DropdownItem,
	CardFooter,
	Dropdown,
	User,
} from "@nextui-org/react";
import { useState } from "react";
import { BiLike, BiSolidLike, BiFlag } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { useUserContext } from "../../context/UserContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import { useReplyContext } from '../../context/ReplyContext';

const ReplyCard = ({ reply, user, onLogin }) => {
	const [isLike, setIsLike] = useState(reply?.isLiked || false);
	const [likeCounter, setLikeCounter] = useState(reply?.likeCount || 0);
	const { likeReply, deleteReply } = useReplyContext();
	const { snackBar } = useUserContext();

	const handleLike = async () => {
		if (user) {
			const isSuccess = await likeReply(reply._id);
			if (isSuccess) {
				if (isLike) {
					setLikeCounter(likeCounter - 1);
					snackBar("You unlike a reply", "success");
				} else {
					snackBar("You like a reply", "success");
					setLikeCounter(likeCounter + 1);
				}
				setIsLike(!isLike);
			} else {
				snackBar("Something went wrong", "error");
			}
		} else {
			onLogin();
			snackBar("Please login to like post", "error");
		}
	};

	console.log(reply._id)

	return (
		<div>
			<Card className="shadow-none flex-1 border ">
				<CardBody className="">
					<div className="flex items-start gap-2">
						<User
							name={`${reply.user.first_name} ${reply.user.last_name}`}
							description={"Frontend developer"}
							avatarProps={{ src: reply.user.avatar }}
						/>
						<div className="ml-auto">
							{user._id === reply.user._id ? (
								<Dropdown className="">
									<DropdownTrigger>
										<Button className="ml-auto" isIconOnly variant="light">
											<BsThreeDotsVertical className="dark:text-white/80" />
										</Button>
									</DropdownTrigger>
									<DropdownMenu aria-label="User menu dropdown">
										<DropdownItem
											// onPress={handleEditPost}
											key="edit"
											startContent={<FiEdit />}
										>
											Edit Reply
										</DropdownItem>

										<DropdownItem
											startContent={<RiDeleteBin5Line />}
											key="delete"
											className="text-danger"
											color="danger"
											// onPress={handleDeleteComment}
										>
											Delete Reply
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							) : (
								<Button
									className="rounded-full"
									variant="light"
									color="danger"
									size="sm"
									isIconOnly
								>
									<BiFlag />
								</Button>
							)}
						</div>
					</div>
					<p>
						<small>{reply.text}</small>
					</p>
				</CardBody>
				<CardFooter className="gap-2 items-center justify-between py-2">
					<div>
						<small className="text-slate-300">
							{moment(reply.createdAt).startOf("day").fromNow()}
						</small>
					</div>
					<div className="flex items-center">
						<Button
							onPress={handleLike}
							size="sm"
							className="rounded-full min-w-5 h-5 w-5 px-0 text-slate-300"
							variant="light"
							isIconOnly
						>
							{isLike ? (
								<BiSolidLike className="text-slate-300" />
							) : (
								<BiLike className="text-slate-300" />
							)}
						</Button>
						<Button
							className="text-slate-300 w-5 min-w-10 h-5 px-0"
							variant="light"
							size="sm"
						>
							{/* <small> */}
							<span>
								{likeCounter} Like{likeCounter > 1 && "s"}
							</span>
							{/* </small> */}
						</Button>
					</div>
					{/* {user?._id === reply?.user?._id && (
						<Button
							// onPress={handleBookmark}
							size="sm"
							className="rounded-full h-5 group px-0 text-slate-300 hover:text-danger-100 "
							variant="light"
							startContent={
								<RiDeleteBin5Line className=" text-slate-300 group-hover:text-danger-100" />
							}
						>
							Delete
						</Button>
					)} */}
				</CardFooter>
			</Card>
		</div>
	);
};

ReplyCard.propTypes = {
	reply: PropTypes.object.isRequired,
	user: PropTypes.object,
	onLogin: PropTypes.func,
};

export default ReplyCard;
