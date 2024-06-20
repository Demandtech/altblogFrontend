/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { usePostContext } from "../context/PostContext";
import PropTypes from "prop-types";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Avatar,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function UserList({ postId, commentCounter, list }) {
	const [users, setUsers] = useState([]);
	const [dropDownOpen, setDropDownOpen] = useState(false);
	const { getAllPostCommentUsers, getAllPostLikeUsers } = usePostContext();

	useEffect(() => {
		const commentUsers = async () => {
			try {
				const allUsers = await getAllPostCommentUsers(postId);

				if (allUsers.success) {
					let users = allUsers.data.data;

					setUsers(users);
				}
			} catch (err) {
				console.log(err);
			}
		};
		const likeUsers = async () => {
			try {
				const allUsers = await getAllPostLikeUsers(postId);

				if (allUsers.success) {
					let users = allUsers.data.data;

					setUsers(users);
				}
			} catch (err) {
				console.log(err);
			}
		};

		if (dropDownOpen && list === "comment") {
			commentUsers();
		} else if (dropDownOpen && list === "like") {
			likeUsers();
		}
	}, [dropDownOpen, postId, list]);

	return (
		<Dropdown
			onOpenChange={(value) => {
				setDropDownOpen(value);
			}}
		>
			<DropdownTrigger>
				<Button
					isIconOnly
					className="px-0  min-w-2 w-full"
					variant="light"
					size="sm"
				>
					<span className="text-slate-400">{commentCounter}</span>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				items={users}
				aria-label="Post comment user"
				className="max-h-[500px] overflow-y-auto"
			>
				{(item) => (
					<DropdownItem textValue={item.first_name} key={item._id}>
						{" "}
						<div className="flex gap-2 items-center">
							<Avatar
								alt={item.first_name}
								className="flex-shrink-0"
								size="sm"
								src={item.avatar}
							/>
							<div className="flex flex-col">
								<Link to={`/profile/${item._id}`}>
									<span className="text-small">{item.first_name}</span>
								</Link>
								<span className="text-tiny text-default-400">
									{item.profession}
								</span>
							</div>
						</div>
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}
UserList.propTypes = {
	postId: PropTypes.string,
	commentCounter: PropTypes.number,
	list: PropTypes.string,
};
