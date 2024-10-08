import { Tabs, Tab } from "@nextui-org/react";
import PropTypes from "prop-types";
import BasicInfoTab from "./BasicInfoTab";
import PhotosTab from "./PhotosTab";
import SettingTab from "./SettingTab";

export default function UpdateProfileTab({ user, onClose }) {
	return (
		<div className="flex w-full flex-col">
			<Tabs classNames={{ tabList: "ml-5" }} size="lg" aria-label="Options">
				<Tab key="profile" title="Profile">
					<BasicInfoTab user={user} />
				</Tab>
				<Tab key="photo" title="Photo">
					<PhotosTab user={user} />
				</Tab>
				<Tab key="settings" title="Settings">
					<SettingTab onClose={onClose} />
				</Tab>
			</Tabs>
		</div>
	);
}

UpdateProfileTab.propTypes = {
	user: PropTypes.object,
};
