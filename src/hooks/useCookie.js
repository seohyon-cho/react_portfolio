export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let dueDate = now.getTime() + 1000 * time;
		now.setTime(dueDate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
		console.log(document.cookie);
	};

	const isCookie = cookieKey => {
		if (document.cookie.indexOf(cookieKey) < 0) return false;
		else return true;
	};

	const viewCookie = () => console.log(document.cookie);

	return { setCookie, isCookie, viewCookie };
}
