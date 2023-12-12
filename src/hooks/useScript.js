const useScript = () => {
	return (url) => {
		return new Promise((res, rej) => {
			const script = document.createElement('script');
			script.src = url;
			script.addEventListener('load', () => {
				res();
			});
			script.addEventListener('error', (e) => {
				rej(e);
			});
			document.head.appendChild(script);
		});
	};
};

export default useScript;
