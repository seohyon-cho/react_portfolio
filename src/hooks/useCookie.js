export function useCookie() {
	return (name, value, time) => {
		let now = new Date();
		let dueDate = now.getTime() + 1000 * time;
		now.setTime(dueDate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	};
}
