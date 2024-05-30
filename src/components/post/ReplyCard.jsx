import { Button, Card, CardBody, CardFooter, User } from "@nextui-org/react";
import { useState } from "react";
import { BiLike, BiSolidLike, BiComment } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { usePostContext } from "../../context/PostContext";
import { useUserContext } from "../../context/UserContext";

const ReplyCard = ({ comment = {}, user, onLogin }) => {
	const [isLike, setIsLike] = useState(comment?.isLiked || false);
	const [likeCounter, setLikeCounter] = useState(comment?.likeCount || 0);
	const { likeComment } = usePostContext();
	const { snackBar } = useUserContext();

	console.log(user);

	const handleLike = async () => {
		// if (user) {
		// 	const isSuccess = await likeComment({ commentId: comment._id });
		// 	if (isSuccess) {
		// 		if (isLike) {
		// 			setLikeCounter(likeCounter - 1);
		// 			snackBar("You unlike a comment", "success");
		// 		} else {
		// 			snackBar("You like a post", "success");
		// 			setLikeCounter(likeCounter + 1);
		// 		}
		// 		setIsLike(!isLike);
		// 	} else {
		// 		snackBar("Something went wrong", "error");
		// 	}
		// } else {
		// 	onLogin();
		// 	snackBar("Please login to like post", "error");
		// }
	};

	return (
		<div>
			<Card className="shadow-none flex-1 border">
				<CardBody className="">
					<div className="flex items-start gap-2">
						<User
							name={`Rosco Many`}
							description={"Frontend developer"}
							// avatarProps={{ src: comment.user.avatar }}
						/>
					</div>
					<p>
						<small>{comment.text}</small>
					</p>
				</CardBody>
				<CardFooter className="gap-2 items-center justify-end py-2">
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
					{user?._id === comment?.user?._id && (
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
					)}
				</CardFooter>
			</Card>
		</div>
	);
};

ReplyCard.propTypes = {
	comment: PropTypes.object.isRequired,
	user: PropTypes.object,
	onLogin: PropTypes.func,
};

export default ReplyCard;
