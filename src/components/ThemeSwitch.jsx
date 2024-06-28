import { Switch } from "@nextui-org/react";
import React from "react";
import { MoonIcon, SunIcon } from "./Svgs";

export const ThemeSwitch = ({ theme, setTheme, className, size }) => {
	return (
		<div className={className}>
			<Switch
				isSelected={theme}
				onValueChange={(val) => setTheme(val)}
				value={theme}
				size={size}
				color="default"
				startContent={<SunIcon />}
				endContent={<MoonIcon />}
				// classNames={{ wrapper: "mx-1 mr-2.5" }}
			/>
		</div>
	);
};
