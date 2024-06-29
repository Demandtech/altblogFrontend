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
	Avatar,
} from "@nextui-org/react";
import { useState, useSyncExternalStore } from "react";
import { BiLike, BiSolidLike, BiFlag } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { useUserContext } from "../../context/UserContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import { useReplyContext } from "../../context/ReplyContext";
import { Link } from "react-router-dom";

const ReplyCard = ({ reply, user, onLogin, setReplies, commentId }) => {
	const [isLike, setIsLike] = useState(reply?.isLiked || false);
	const [likeCounter, setLikeCounter] = useState(reply?.likeCount || 0);
	const { likeReply, deleteReply, getAllReplyUsers } = useReplyContext();
	const [replyLikeUsers, setReplyLikeUsers] = useState([]);
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
			snackBar("Please login to continue", "info");
		}
	};

	const handleDelete = async () => {
		if (user) {
			const isSuccess = await deleteReply(reply._id);

			if (isSuccess) {
				setReplies((prev) => {
					return prev.filter((rep) => rep._id !== reply._id);
				});
				snackBar("Reply deleted successfully", "info");
			}
		} else {
			onLogin();
			snackBar("Please login to continue", "info");
		}
	};

	const handleAllRepliesUser = async () => {
		const result = await getAllReplyUsers(commentId);
		if (result.success) {
			setReplyLikeUsers(result.data.data);
		}
	};

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
							{user?._id === reply?.user?._id ? (
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
											onPress={handleDelete}
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
							{moment(reply.createdAt).startOf("").fromNow()}
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
						{/* <Button
							className="text-slate-300 w-5 min-w-10 h-5 px-0"
							variant="light"
							size="sm"
							onPress={handleAllRepliesUser}
						>
							
							<span>
								{likeCounter} Like{likeCounter > 1 && "s"}
							</span>
						
						</Button> */}
						<Dropdown
							onOpenChange={(isOpen) => {
								if (isOpen) {
									handleAllRepliesUser();
								}
							}}
						>
							<DropdownTrigger>
								<Button
									className="text-slate-300 w-5 min-w-10 h-5 px-0"
									variant="light"
									size="sm"
								>
									<span>
										{likeCounter} Like{likeCounter > 1 && "s"}
									</span>
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="User that like Comment"
								items={replyLikeUsers}
							>
								{(item) => {
									return (
										<DropdownItem textValue={item.first_name} key={item._id}>
											<div className="flex gap-2 items-center">
												<Avatar
													alt={item.first_name}
													className="flex-shrink-0"
													size="sm"
													src={item.avatar}
												/>
												<div className="flex flex-col">
													<Link to={`/profile/${item._id}`}>
														<span className="text-small">
															{item.first_name}
														</span>
													</Link>
													<span className="text-tiny text-default-400">
														{item.profession}
													</span>
												</div>
											</div>
										</DropdownItem>
									);
								}}
							</DropdownMenu>
						</Dropdown>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

ReplyCard.propTypes = {
	reply: PropTypes.object.isRequired,
	user: PropTypes.object,
	onLogin: PropTypes.func,
	setReplies: PropTypes.func,
};

export default ReplyCard;
