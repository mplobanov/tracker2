export const concatNames = (names: string[]) => {
	return names.filter((s) => s).join(".");
};

export const getSimpleName = (name?: string | null) => {
	if (!name) {
		return "Name";
	}
	return name?.split(" ").at(0) ?? name;
};
