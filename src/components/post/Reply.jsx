import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReplyCard from "./ReplyCard";
import { useCommentContext } from "../../context/CommentContext";

const Reply = ({
	user,
	openReply,
	comment,
	replyCounter,
	replies,
	setReplies,
}) => {
	// const [replies, setReplies] = useState([]);
	const { getAllCommentReply } = useCommentContext();
	const [page, setPage] = useState(1);

	const handleGetAllCommentReply = async () => {
		const allReplies = await getAllCommentReply({
			commentId: comment._id,
			page,
		});

		if (allReplies.success) {
			setReplies(allReplies.data.data.replies);
		}
		// console.log(allReplies.data.data.replies);
	};

	useEffect(() => {
		if (openReply) {
			handleGetAllCommentReply();
		}
	}, [openReply]);

	return (
		<div className="pt-5">
			<div>
				<small>
					{replyCounter > 0 ? replyCounter : 0}{" "}
					{replyCounter > 1 ? "Replies" : "Reply"}
				</small>
			</div>
			{replies?.length > 0 ? (
				replies?.map((reply) => {
					return (
						<ul
							key={reply._id}
							className=" w-4/5 ml-auto  space-y-2 mt-4 max-h-[200px]"
						>
							<li>
								<ReplyCard reply={reply} user={user} />
							</li>
						</ul>
					);
				})
			) : (
				<div className={"text-center font-light w-full py-2"}>
					<small>No reply yet</small>
				</div>
			)}
		</div>
	);
};

Reply.propTypes = {
	user: PropTypes.object,
	comment: PropTypes.object,
	openReply: PropTypes.bool.isRequired,
	replyCounter: PropTypes.number,
	replies: PropTypes.array,
	setReplies: PropTypes.func,
};

export default Reply;
