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
	const toUpperText = txt => {
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
		return (txt, spc = '') => {
			return txt
				.split(/-|_|\+/) // 만약 인수(구분자)로 들어가는 특수문자가 -,_,+ 일 때에는 해당 문자를 구분자 삼아 문자를 분리함. (예약어 문자열은 앞에 역슬래시(\)를 붙여서 처리해줘야 함.)
				.map(data => toUpperText(data))
				.join(spc);
		};
	}
}

/*
	useText 훅 제작 배경
	- 각 컴포넌트에서 텍스트 데이터를 가공할때 자주쓰는 패턴을 미리 훅으로 제작해서 불필요한 로직을 반복하지 않기 위함
	
	useSplitText() : 인수로 특정 문자열을 받아서 해당 문자를 글자별로 분리해주는 함수 반환
	useCustomText(타입) : 타입에 따라 문자열을 가공해주는 함수 반환
	'short'타입 : 원하는 글자수만큼 글자짜르고 말줄임표 붙임
	'combined'타입 : 특정 기호를 구분해서 문자열을 분리후 원하는 요소로 이어붙여줌
*/
