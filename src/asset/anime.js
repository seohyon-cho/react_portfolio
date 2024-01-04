import BezierEasing from 'bezier-easing';
//npm i bezier-easing
export default class Anime {
	#defOpt = { duration: 500, callback: null, easeType: 'linear' };
	//인스턴스 생성시 옵션값 전달 및 속성값 보정함수 반복 호출
	constructor(selector, props, opt) {
		console.log(selector);
		this.selector = selector;
		this.defOpt = { ...this.#defOpt, ...opt };
		this.keys = Object.keys(props);
		this.values = Object.values(props);
		this.duration = this.defOpt.duration;
		this.callback = this.defOpt.callback;
		this.easeType = this.defOpt.easeType;
		this.ease = this.defOpt.ease; //option으로 받은 ease값이 있으면 인스턴스 객체에 넘김
		this.startTime = performance.now();
		this.isBg = null;
		this.keys.forEach((key, idx) => {
			typeof this.values[idx] === 'string'
				? this.values[idx].includes('%')
					? this.getValue(key, this.values[idx], 'percent')
					: this.getValue(key, this.values[idx], 'color')
				: this.getValue(key, this.values[idx], 'basic');
		});
	}
	//타입에 따라서 들어온 value값을 보정해주는 연산
	getValue(key, value, type) {
		let currentValue = null;
		if (key !== 'scroll') {
			currentValue = parseFloat(getComputedStyle(this.selector)[key]);
		}
		key === 'scroll' ? (currentValue = this.selector.scrollTop) : (currentValue = parseFloat(getComputedStyle(this.selector)[key]));
		if (type === 'percent') {
			const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);
			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			if (key.includes('margin') || key.includes('padding')) return console.error('margin, padding값은 퍼센트 모션처리할 수 없습니다.');
			for (let cond of x) key === cond && (currentValue = (currentValue / parentW) * 100);
			for (let cond of y) key === cond && (currentValue = (currentValue / parentH) * 100);
			const percentValue = parseFloat(value);
			percentValue !== currentValue && requestAnimationFrame(time => this.run(time, key, currentValue, percentValue, type));
		}
		if (type === 'color') {
			this.isBg = true;
			currentValue = getComputedStyle(this.selector)[key];
			currentValue = this.colorToArray(currentValue);
			value = this.hexToRgb(value);
			value !== currentValue && requestAnimationFrame(time => this.run(time, key, currentValue, value, type));
		}
		if (type === 'basic') {
			value !== currentValue && requestAnimationFrame(time => this.run(time, key, currentValue, value, type));
		}
	}
	//getValue가 전달한 값과 타입을 받아서 타입에 따라 다른방식으로 반복호출
	run(time, key, currentValue, value, type) {
		let [progress, result] = this.getProgress(time, currentValue, value);
		this.setValue(key, result, type);
		progress < 1
			? ['percent', 'color', 'basic'].map(el => type === el && requestAnimationFrame(time => this.run(time, key, currentValue, value, type)))
			: this.callback && this.callback();
	}
	//전달받은 currentValue, targetValue를 비교해서 진행률과 진행률이 적용된 수치값 리턴
	getProgress(time, currentValue, value) {
		let easingProgress = null;
		currentValue?.length ? (this.isBg = true) : (this.isBg = false);
		let timelast = time - this.startTime;
		let progress = timelast / this.duration;
		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		const easingPresets = {
			linear: [0, 0, 1, 1],
			ease1: [0.4, -0.61, 0.54, 1.61],
			ease2: [0, 1.82, 0.94, -0.73]
		};

		//인스턴스 호출시 ease로 넘긴 배열값이 있으면 해당 값을 활용
		if (this.ease) {
			easingProgress = BezierEasing(...this.ease)(progress);
			//그렇지 않으면 기존 easeType값을 활용
		} else {
			Object.keys(easingPresets).map(key => this.easeType === key && (easingProgress = BezierEasing(...easingPresets[key])(progress)));
		}

		return [
			progress,
			this.isBg
				? currentValue.map((curVal, idx) => curVal + (value[idx] - curVal) * easingProgress)
				: currentValue + (value - currentValue) * easingProgress
		];
	}
	//type에 따라서 넘어온 result값을 실제 DOM의 스타일 객체에 연결
	setValue(key, result, type) {
		if (type === 'percent') this.selector.style[key] = result + '%';
		else if (type === 'color') this.selector.style[key] = `rgb(${result[0]},${result[1]},${result[2]})`;
		else if (key === 'opacity') this.selector.style[key] = result;
		else if (key === 'scroll') this.selector.scrollTop = result;
		else this.selector.style[key] = result + 'px';
	}
	//rgb로 시작하는 문자값에서 색상에 활용되는 숫자값 3개를 배열로 리턴 (기존 css에 적용되어 있는 색상값을 변환)
	colorToArray(strColor) {
		return strColor.match(/\d+/g).map(Number);
	}
	//hex방식으로 시작하는 문자값에서 색상에 활용되는 숫자값 3개를 배열로 리턴 (변경하려고 하는 색상값 변환)
	hexToRgb(hexColor) {
		const hex = hexColor.replace('#', '');
		const rgb = hex.length === 3 ? hex.match(/a-f\d/gi) : hex.match(/[a-f\d]{2}/gi);
		return rgb.map(el => {
			if (el.length === 1) el = el + el;
			return parseInt(el, 16);
		});
	}
}
