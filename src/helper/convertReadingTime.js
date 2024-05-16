export const handleTime = (reading_time) => {
	if (reading_time >= 3600) {
		const reading_time_hours = reading_time / 3600;
		return Math.ceil(reading_time_hours) + " hr(s)";
	} else if (reading_time >= 60) {
		const reading_time_minutes = reading_time / 60;
		return Math.ceil(reading_time_minutes) + " min(s)";
	} else {
		return reading_time + " sec(s)";
	}
};
