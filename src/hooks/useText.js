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

export function useCustomText(type) {
	if (type === 'title') {
		return (txt) => {
			return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
		};
	}

	if (type === 'short') {
		return (txt, last = 100) => {
			if (txt.length > last) {
				return txt.slice(0, last) + '...';
			} else {
				return txt;
			}
		};
	}

	if (type === 'combined') {
		return (txt, spc) => {
			return txt // 원본 텍스트를 가져옴
				.split(spc) // split을 이용해, 두 번째 인수로 받은 구분자로 분리해서 배열로 반환
				.map((data) => data.charAt(0).toUpperCase() + data.slice(1)) // 배열 값을 map으로 반복 돌며 첫 글자만 대문자로 변환해서 새로운 배열로 반환
				.join(' '); // 새롭게 반환받은 배열을 다시 ' '(빈칸)을 구분자 삼아, 하나의 문자열로 이어붙여줌.
			// 그리고 이렇게 만들어진 문자값을 Return을 통해 최종적으로 반환
		};
	}
}
