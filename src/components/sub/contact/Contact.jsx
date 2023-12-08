import { useEffect, useRef } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const { kakao } = window;
	const mapOption = useRef({
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	});

	useEffect(() => {
		var map = new kakao.maps.Map(mapFrame.current, mapOption.current);
	}, []);

	return (
		<div className='Contact'>
			<Layout2 title={'Contact'}>
				<article id='map' ref={mapFrame}></article>
			</Layout2>
		</div>
	);
}
