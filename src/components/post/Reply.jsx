/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import ReplyCard from "./ReplyCard";
import { useReplyContext } from "../../context/ReplyContext";

const Reply = ({
	user,
	openReply,
	comment,
	replyCounter,
	replies,
	setReplies,
	onLogin,
}) => {
	const { getAllReplies } = useReplyContext();
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);

	const handleGetAllCommentReply = async () => {
		const allReplies = await getAllReplies({
			commentId: comment._id,
			page,
		});

		if (allReplies.success) {
			const repliesList = allReplies.data.data.replies;

			setReplies((prev) => {
				const prevIds = new Set(prev.map((comment) => comment._id));
				const newComments = repliesList.filter(
					(comment) => !prevIds.has(comment._id)
				);
				return [...prev, ...newComments];
			});

			setHasMore(allReplies.data.data.hasMore);
		}
	};

	const containerRef = useRef(null);
	const bottomRef = useRef(null);

	useEffect(() => {
		if (openReply) {
			handleGetAllCommentReply();
		}
	}, [openReply, page]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && replies.length > 0) {
					if (hasMore) {
						setPage(page + 1);
					}
				}
			},
			{
				root: containerRef.current,
				threshold: 1.0,
			}
		);

		if (bottomRef.current) {
			observer.observe(bottomRef.current);
		}

		return () => {
			if (bottomRef.current) {
				observer.unobserve(bottomRef.current);
			}
		};
	}, [openReply, replies]);

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
							className=" w-5/6 ml-auto  space-y-2 mt-4 max-h-[200px]"
						>
							<li>
								<ReplyCard
									commentId={comment._id}
									onLogin={onLogin}
									setReplies={setReplies}
									reply={reply}
									user={user}
								/>
							</li>
						</ul>
					);
				})
			) : (
				<div className={"text-center font-light w-full py-2"}>
					<small>No reply yet</small>
				</div>
			)}
			<div ref={bottomRef} style={{ height: "1px" }}></div>
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
