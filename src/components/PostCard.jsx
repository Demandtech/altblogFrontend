import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Chip,
	Link,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	User,
} from "@nextui-org/react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { IoBookmarkOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const PostCard = ({ onOpen }) => {
	return (
		<Card className="bg-black/5 flex shadow-none flex-col items-start justify-between">
			<CardHeader className="flex items-center gap-x-4 text-xs">
				<time dateTime="2020-03-16" className="text-gray-500">
					Mar 16, 2020
				</time>
				<Chip size="sm">Marketing</Chip>

				<Dropdown>
					<DropdownTrigger>
						<Button className="ml-auto" isIconOnly variant="light">
							<BsThreeDotsVertical /> 
						</Button> 
					</DropdownTrigger>
					<DropdownMenu aria-label="Static Actions">
						<DropdownItem
							onPress={() => {
								onOpen();
							}}
							key="edit"
							startContent={<FiEdit />}
						>
							Edit Post
						</DropdownItem>
						<DropdownItem
							startContent={<RiDeleteBin5Line />}
							key="delete"
							className="text-danger"
							color="danger"
						>
							Delete Post
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</CardHeader>
			<CardBody className="group relative">
				<h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
					<Link
						// className="text-lg bg-red-500  w-full line-clamp-1  font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
						href="/posdId"
					>
						{/* <span className="absolute inset-0"></span> */}
						Conversion rate Boost your conversion rate
					</Link>
				</h3>
				<p className="mt-2 pr-4 md:pr-10 line-clamp-3 text-sm leading-6 text-gray-600">
					Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam
					vitae illo. Non aliquid explicabo necessitatibus unde. Sed
					exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti
					dicta.
				</p>
			</CardBody>
			<CardFooter className="flex gap-x-4">
				<User name="Jane Doe" description="Product Designer" />
				<div className="ml-auto flex gap-2">
					<Button size="sm" isIconOnly className="rounded-full">
						<BiLike />
					</Button>
					<Button size="sm" isIconOnly className="rounded-full">
						<IoBookmarkOutline />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

PostCard.propTypes = {
	onOpen: PropTypes.func,
};
export default PostCard;
