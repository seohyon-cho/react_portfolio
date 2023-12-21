import { useCallback, useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Contact() {
	// form Email
	const form = useRef();
	const resetForm = () => {
		const elArr = form.current.children;
		// 그룹 형식의 DOM을 탐색할 때 반환되는 두 가지 형태의 유사 배열
		// 1. parentDOM(부모돔).children : HTML Collection (유사배열: forEach, map 모두 반복 불가. Live DOM: 상태변경이 실시간으로 이루어짐.)
		// 2. parentDOM(부모돔).querySelectorAll : NodeList (유사배열이긴 하지만, 제한적으로 forEach로는 반복 가능. static DOM: 탐색된 시점의 정적인 돔.)

		// form.current.children은 콘솔로 찍어보면 HTML 컬렉션 어쩌구 뜰 거임.
		// .children으로 받는 건 forEach랑 map으로 반복 불가능함.
		// DOM의 children으로 받은 건 유사배열이긴 한데 forEach로 반복이 불가능해서, Array.from으로 해당 배열을 순수 배열로 변경해서 forEach로 반복을 돌 수 있게 처리.
		Array.from(elArr).forEach(el => {
			if (el.name === 'user_name' || el.name === 'user_email' || el.name === 'message') el.value = '';
		});
	};

	const sendEmail = e => {
		e.preventDefault();

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if (!user.value || !email.value || !txtArea.value) return alert('성함과 회신 받을 이메일 주소, 문의 내용을 모두 입력해주세요.');
		// const elArr = form.current.children;
		// const result = Array.from(elArr).forEach(el => {
		// 	if (!el.value) return false;
		// });
		// if (!result) return alert('모든 항목을 입력해주세요!');

		emailjs.sendForm('service_v8ufydl', 'template_e33l0oe', form.current, 'upPLj_wKd4_bGkOZ4').then(
			result => {
				alert('문의 내용이 성공적으로 전송되었습니다!');
				resetForm();
			},
			error => {
				alert('일시적인 장애로 문의 전송에 실패하였습니다. 다음의 메일 주소로 전송해주세요.');
				resetForm();
			}
		);
	};
	// const { kakao } = window;
	const kakao = useRef(window.kakao);
	// 화면에 출력될 지도 정보 배열의 순번이 담길 state
	const [Index, setIndex] = useState(0);
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);

	const marker = useRef(null);
	const mapInstance = useRef(null);
	// 교통정보 관련 state
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	// 로드뷰 출력 함수
	const roadview = useCallback(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	}, [Index]);

	// 지도 위치 중앙 고정 함수
	const setCenter = useCallback(() => {
		console.log('setCenter');
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

	// useThrottle로 setCenter 함수를 인수로 넣어서, throttling이 적용된 새로운 함수로 반환 (hof : 고차함수)
	const throttledSetCenter = useThrottle(setCenter, 100);

	// 참조객체를 사용해, 지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	// 지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]);

	// 마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	// 컴포넌트 마운트 시, 참조객체에 담아놓은 돔 프레임에 지도 인스턴스 출력 및 마커 세팅
	// Index 값 변경 시마다 지도 정보 갱신하여 화면 재렌더링 useEffect
	useEffect(() => {
		// 지도 중첩 생성 안 되도록 생성 직전 초기화 작업

		// Index값이 변경되는 것은 결국 출력할 맵 정보가 변경된다는 의미이므로, 기존의 viewFrame안쪽의 정보를 지워서 초기화
		mapFrame.current.innerHTML = '';
		viewFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, { center: mapInfo.current[Index].latlng, level: 3 });
		marker.current.setMap(mapInstance.current);
		// Index가 바뀔 때마다 setTraffic이 다시 false로 기본셋팅 되도록.
		setTraffic(false);
		setView(false);

		// 지도 타입 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		// 지도 줌 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		// 마우스 휠에 기본적으로 내장되어 있는 줌 기능 비활성화
		mapInstance.current.setZoomable(false);
	}, [Index]);

	useEffect(() => {
		// resize 이벤트에 throttle 적용된 함수를 등록 (이벤트 자체는 1초에 60번 발생하지만, 핸들러함수는 1초에 2번만 실행됨.)
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter]);

	// 교통정보 관련 false, true를 담은 state를 만들고, 해당 state의 값에 따라서 특정 값을 출력하는 함수를 만드는 것.
	// Traffic 토글 시마다 화면 재렌더링 useEffect
	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	// view 토글 시마다 화면 재렌더링 useEffect
	useEffect(() => {
		// View 토글 시에 무조건 로드뷰 정보를 호출하는 것이 아닌, viewFrame 내에 내용이 없을 때에만 호출하고, 값이 있을 때에는 기존 데이터를 그대로 재활용해서 불필요한 로드뷰 중복호출(재호출)을 막음으로써 고용량의 이미지 re-fetching을 방지해줌.
		View && viewFrame.current.children.length === 0 && roadview();
	}, [View, roadview]);
	return (
		<div className='Contact'>
			<Layout2 title={'Contact'}>
				<div id='mailSection'>
					<form ref={form} onSubmit={sendEmail}>
						<label>Name</label>
						<input type='text' name='user_name' />
						<label>Email</label>
						<input type='email' name='user_email' />
						<label>Message</label>
						<textarea name='message' />
						<input type='submit' value='Send' />
					</form>
				</div>
				<div id='mapSection'>
					<div className='controlBox'>
						<nav className='branch'>
							{mapInfo.current.map((el, idx) => (
								<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
									{el.title}
								</button>
							))}
						</nav>
						<nav className='info'>
							<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
							<button onClick={() => setView(!View)}>{View ? 'map' : 'road view'}</button>
							<button onClick={setCenter}>위치 초기화</button>
						</nav>
					</div>
					<section className='tab'>
						<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
						<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
					</section>
				</div>
			</Layout2>
		</div>
	);
}

/*
	[[ 이번 예제에서 중요하게 숙지해야 할 개념 주석 정리 ]]

	1. cdn 으로 window에 불러온 외부 객체 값을 가져와서 인스턴스 생성
	2. 인스턴스 값을 참조객체(useRef)에 담는 이유 : useEffect의 의존성 배열[]에 불필요하게 등록하지 않기 위해서 
	3. 화면 변경점이 발생해야 될 때, 무조건 state 값에 따라서 변경되게끔 로직화 한 뒤, 이벤트 발생 시 state 값을 변경해서 화면 재렌더링 유도하는 것임. 
*/
