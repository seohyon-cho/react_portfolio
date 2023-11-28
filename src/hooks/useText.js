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
	const toUpperText = (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};

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
		// regEx (regular Expression: 정규표현식), 문자열의 패턴 별로 특정 기능을 수행하는 식.
		// /정규표현식/
		return (txt) => {
			return txt
				.split(/-|_|\+/) // 만약 인수(구분자)로 들어가는 특수문자가 -,_,+ 일 때에는 해당 문자를 구분자 삼아 문자를 분리함. (예약어 문자열은 앞에 역슬래시(\)를 붙여서 처리해줘야 함.)
				.map((data) => toUpperText(data))
				.join(' ');
		};
	}
}
