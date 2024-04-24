import { FaLongArrowAltLeft } from "react-icons/fa";
import heroBg from "../assets/herobg.png";
import { useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import EditPost from "../components/modals/EditPost";
import toast, { toastConfig } from "react-simple-toasts";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

toastConfig({ theme: "dark" });

const SinglePost = () => {
	const navigate = useNavigate();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { id } = useParams();

	console.log(id);

	return (
		<>
			<style>
				{`
              .hero{
                position: relative;
                background: url(${heroBg}) center no-repeat;		
				background-size: cover;
              }           
            `}
			</style>
			<div className="hero h-[250px] lg:h-[350px] pt-5">
				<div className="flex px-3 mb-2 items-center justify-between">
					<Button
						onClick={() => navigate("/")}
						className="border-black"
						variant="light"
					>
						<FaLongArrowAltLeft />
						Back
					</Button>
					<Dropdown>
						<DropdownTrigger>
							<Button className="border-black" isIconOnly variant="bordered">
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
								onPress={() =>
									toast("Post deleted successfully", {
										position: "top-center",
										clickable: true,
										clickClosable: true,
										duration: 10000,
										render: (message) => (
											<span className="text-sm bg-black/90 px-2 py-1 rounded text-danger">
												{message}
											</span>
										),
									})
								}
								key="delete"
								className="text-danger"
								color="danger"
								startContent={<RiDeleteBin5Line />}
							>
								Delete Post
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div className="lg:pt-10 text-center mx-auto max-w-xl">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Data to enrich your online business
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
						lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
						fugiat aliqua.
					</p>
				</div>
			</div>
			<EditPost isOpen={isOpen} onOpenChange={onOpenChange} />
		</>
	);
};

export default SinglePost;
