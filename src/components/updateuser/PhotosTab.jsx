import {
	Avatar,
	Button,
	Tooltip,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Divider,
} from "@nextui-org/react";
import { TbCameraPlus } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

function PhotosTab({ user }) {
	const { updateUserPhotos } = useUserContext();
	const [isLoading, setIsLoading] = useState(false);
	const [value, setValue] = useState({
		avatar: user?.avatar || "",
		banner_image: user?.banner_image || "",
	});
	const [displayValue, setDisplayValue] = useState({
		avatar: user?.avatar || "",
		banner: user?.banner || "",
	});
	const handleChange = (e) => {
		const { name, files } = e.target;

		const file = files[0];
		const image = URL.createObjectURL(file);

		setDisplayValue((prev) => {
			return {
				...prev,
				[name]: image,
			};
		});

		setValue((prev) => {
			return { ...prev, [name]: file };
		});
	};

	const handleSubmit = async (val) => {
		setIsLoading(true);
		await updateUserPhotos(val);

		setIsLoading(false);
	};

	return (
		<div className="pt-5">
			<p className="mb-5 font-semibold text-center">
				Change Banner and Profile Picture
			</p>
			<div className="relativ">
				<div className="flex items-center relative justify-center h-48">
					<div className="left-0 !h-[200px]  right-0  absolute  mt-5">
						<img
							className="!h-48 w-full object-cover object-center"
							src={displayValue.banner}
						/>
					</div>
					<Avatar className="w-40 h-40 text-large" src={displayValue.avatar} />
					<div className="absolute ">
						<Popover className="" placement="bottom">
							<PopoverTrigger>
								<Button
									size="sm"
									variant="flat"
									isIconOnly
									className="rounded-full"
								>
									<TbCameraPlus className="dark:text-white/70" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="px-0 rounded-none">
								<div className="px-3 py-2">
									<label htmlFor="avatar" className="">
										Upload image
									</label>
									<input
										id="avatar"
										type="file"
										name="avatar"
										hidden
										onChange={handleChange}
										accept="image/*"
									/>
								</div>
								<Divider />
								<div className="px-3 py-2">Take a photo</div>
							</PopoverContent>
						</Popover>
					</div>
					<div className="absolute right-5 top-5 flex items-center gap-5">
						<Popover placement="bottom">
							<PopoverTrigger>
								<Button
									size="sm"
									variant="flat"
									isIconOnly
									className="rounded-full"
								>
									<TbCameraPlus className="dark:text-white/70" />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<div className="px-1 py-2">
									<label htmlFor="banner_image" className="">
										Upload image
									</label>
									<input
										id="banner_image"
										type="file"
										name="banner_image"
										hidden
										onChange={handleChange}
										accept="image/*"
									/>
								</div>
							</PopoverContent>
						</Popover>

						<Tooltip
							className=" border-none"
							placement="bottom"
							content="Remove photo"
							size="sm"
						>
							<Button
								size="sm"
								variant="light"
								isIconOnly
								className="rounded-full"
							>
								<IoIosClose className="dark:text-white/70" />
							</Button>
						</Tooltip>
					</div>
				</div>
			</div>
			<div className="flex justify-end mt-5">
				<Button
					onPress={() => handleSubmit(value)}
					className="ml-auto text-white dark:text-black"
					color="primary"
					isLoading={isLoading}
				>
					Update
				</Button>
			</div>
		</div>
	);
}

PhotosTab.propTypes = {
	user: PropTypes.object,
};

export default PhotosTab;
