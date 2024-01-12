import { useCallback, useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Contact() {
	const form = useRef();
	const resetForm = () => {
		const elArr = form.current.children;
		Array.from(elArr).forEach(el => {
			if (el.name === 'user_name' || el.name === 'user_email' || el.name === 'message') el.value = '';
		});
	};

	const sendEmail = e => {
		e.preventDefault();

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if (!user.value || !email.value || !txtArea.value) return alert('성함과 회신 받을 이메일 주소, 문의 내용을 모두 입력해주세요.');
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

	const kakao = useRef(window.kakao);
	const [Index, setIndex] = useState(0);
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);

	const marker = useRef(null);
	const mapInstance = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const roadview = useCallback(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	}, [Index]);

	const setCenter = useCallback(() => {
		console.log('setCenter');
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

	const throttledSetCenter = useThrottle(setCenter, 100);

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

	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		viewFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, { center: mapInfo.current[Index].latlng, level: 3 });
		marker.current.setMap(mapInstance.current);

		setTraffic(false);
		setView(false);

		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false);
	}, [Index]);

	useEffect(() => {
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	useEffect(() => {
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
	[ Contact.jsx 의 기능 소개 ]

	- email.js api를 활용하여, 폼 메일 기능 연동 
	- Kakao map api를 활용하여, 카카오 지도 정보 연동 
	- 지도 정보를 제공해야하는 지점이 많은 경우, 여러 지도 정보들을 효율적으로 관리하기 위하여, 객체 값을 연동한 지도 데이터 반복 출력 
	- 로드뷰 기능 추가 
	- useThrottle 커스텀 훅 생성해서 기능 적용. 


	[ 해당 컴포넌트에서 발생한 이슈 사항 ]

	- cdn 방식으로 데이터를 연동하다보니, 리액트 컴포넌트 안쪽에서 kakao 객체 호출이 실패했었음. 
	- 복수 개의 지점을 만들면서 사용자 이벤트에 의해 지도 정보를 실시간으로 변경해야 하는데, 실시간 변경 시 코드의 복잡도가 올라가게 됨. 
	- 로드뷰 출력 시, 무거운 함수가 불필요하게 많이 동작됨. 
	- 브라우저 리사이즈 시마다, 마커 위치가 중앙으로 갱신되지 않음. 
	- 브라우저 리사이즈 시마다, 버벅임 현상 발생 


	[ 해결 방안 ]

	- 컴포넌트 안쪽에서 window 객체로부터 비구조화할당으로 직접 Kakao 객체 추출 및 활용 
	- 여러 가지 지도 정보를 각각의 객체로 구조화해서 배열로 그룹화한 뒤, 자동으로 지도 인스턴스 생성해주는 로직 구현 
	- 보고자 하는 지점을 변경함으로서 지도 정보가 변경되면서, 굳이 생성될 필요 없는 로드뷰 인스턴스가 같이 생성되면서 발생하는 문제점이었으므로, roadview 버튼에 클릭 이벤트가 발생하지 않으면, 굳이 인스턴스를 생성하지 않도록 처리. 
	- resize 이벤트가 발생할 때마다, 마커 위치를 중앙으로 이동시키는 메소드 호출. 
	- resize 시마다, 너무 많은 지도 정보를 계속해서 불러오는 상태였으므로, useThrottle이라는 커스텀 훅을 생성해서, 1초에 60번씩 발생하던 함수 호출을 1초에 3번으로 줄여 버벅임 완화. 
		(*) useThrottle 관련 작업 가이드 내용을 별도로 페이지로 만든 뒤 참조 링크 식으로 곁들이기. (p.100 어쩌구저쩌구 참고)
*/
