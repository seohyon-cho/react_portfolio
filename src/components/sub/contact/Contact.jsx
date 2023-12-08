import { useEffect, useRef } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);

	const mapOption = useRef({
		// 위치값 정밀하게 보정하는 법
		// 기존 구글지도 위치값 복사한 뒤, 카카오 지도 api 사이즈에서 '클릭한 위치의 마커 표시 직접해보기'에서 해당 코드를 붙여넣기 하고, 원하는 지점을 찍으면 하단에 정밀한 값이 뜸.
		center: new kakao.maps.LatLng(37.51067820147149, 127.04575409412008),
		level: 3,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		const markerInstance = new kakao.maps.Marker({
			position: mapOption.current.center,
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<div className='Contact'>
			<Layout2 title={'Contact'}>
				<article id='map' ref={mapFrame}></article>
			</Layout2>
		</div>
	);
}
