export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			tags += `
        <span style='transition-duration: ${speed}s; transition-delay: ${count * interval}s; display: inline-block;'>${letter}</span>
      `;
			count++;
		}
		ref.innerHTML = tags;
	};
}
