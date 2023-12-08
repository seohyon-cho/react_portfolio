import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Contact.scss';

export default function Contact() {
	const [Index, setIndex] = useState(1);

	const { kakao } = window;
	const mapFrame = useRef(null);
	// 참조객체를 사용해, 지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	// 마커 인스턴스 생성
	const markerInstance = new kakao.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt),
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, { center: mapInfo.current[Index].latlng, level: 3 });
		markerInstance.setMap(mapInstance);

		// 마커 생성?
	}, []);

	return (
		<div className='Contact'>
			<Layout2 title={'Contact'}>
				<article id='map' ref={mapFrame}></article>
			</Layout2>
		</div>
	);
}
