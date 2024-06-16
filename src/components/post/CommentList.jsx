import React from "react";
import CommentCard from './CommentCard';
import { Spinner } from '@nextui-org/react';


export const CommentList = ({commentLoading, comments}) => {
	return (
		<ul className="space-y-2">
			{commentLoading && (
				<Spinner className="flex pb-4 justify-center" color="" size="sm" />
			)}

			{comments.length > 0 && <small className="font-light">Comments</small>}

			{comments.length > 0 &&
				comments.map((comment) => {
					return (
						<li className="rounded-md " key={comment._id}>
							<CommentCard
								onLogin={onLogin}
								user={user}
								comment={comment}
								snackBar={snackBar}
								setComments={setComments}
								commentCounter={commentCounter}
								setCommentCounter={setCommentCounter}
							/>
						</li>
					);
				})}
		</ul>
	);
};
