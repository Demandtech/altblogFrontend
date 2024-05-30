import React from "react";
import ReplyCard from "./ReplyCard";

const Reply = ({ user }) => {
	return (
		<ul className="w-4/5 ml-auto space-y-2 mt-4">
            <small>Replies</small>
			{["", "", ""].map((_, index) => {
				return (
					<li key={index}>
						{" "}
						<ReplyCard user={user} />
					</li>
				);
			})}
		</ul>
	);
};

export default Reply;
