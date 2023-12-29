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
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

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

	const throttleSetCenter = useThrottle(setCenter);

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
		window.addEventListener('resize', throttleSetCenter);
		return () => window.removeEventListener('resize', throttleSetCenter);
	}, [throttleSetCenter]);

	useEffect(() => {
		View && viewFrame.current.children.length === 0 && roadview();
	}, [View, roadview]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

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
