const path = process.env.PUBLIC_URL;

export const fetchDepartment = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = data.json();
	return json;
};
export const fetchHistory = async () => {
	const data = await fetch(`${path}/DB/history.json`);
	const json = data.json();
	return json;
};
