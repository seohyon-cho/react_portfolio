import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout/Layout2';
import './Contact.scss';
import useScript from '../../../hooks/useScript';

export default function Contact() {
	const setScript = useScript();

	//states
	const [kakao, setKakao] = useState(null);
	const [Info, setInfo] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	//refs
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);

	//get cdn script func
	const getCDN = async () => {
		await setScript(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_API}`);
		const kakao = window.kakao;
		setKakao(kakao);
		kakao.maps.load(() => getData(kakao));
	};

	//get fetch data func
	const getData = async (kakao) => {
		console.log('getData');
		const data = await fetch(process.env.PUBLIC_URL + '/DB/mapInfo.json');
		const json = await data.json();

		setInfo(
			json.mapInfo.map((el) => ({
				title: el.title,
				latlng: new kakao.maps.LatLng(...el.latlng),
				imgSrc: `${process.env.PUBLIC_URL}/img/${el.imgSrc}`,
				imgSize: new kakao.maps.Size(...el.imgSize),
				imgPos: { offset: new kakao.maps.Point(...el.imgPos) },
			}))
		);
	};

	//create mapInstance func
	const createMap = () => {
		//set ref, map, marker
		map.current = new kakao.maps.Map(mapFrame.current, { center: Info[Index].latlng });
		marker.current = new kakao.maps.Marker({
			position: Info[Index].latlng,
			image: new kakao.maps.MarkerImage(Info[Index].imgSrc, Info[Index].imgSize, Info[Index].imgPos),
		});
		marker.current.setMap(map.current);

		//add controller
		map.current.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		map.current.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		map.current.setZoomable(false);

		//window event
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	};

	// //get roadview func
	const roadview = () => {
		new kakao.maps.RoadviewClient().getNearestPanoId(Info[Index].latlng, 50, (panoId) => {
			new kakao.maps.Roadview(viewFrame.current).setPanoId(panoId, Info[Index].latlng);
		});
	};

	// //init map pos func
	const setCenter = () => {
		map.current.setCenter(Info[Index].latlng);
		roadview();
	};

	useEffect(() => getCDN(), []);

	//init render with fetched data
	useEffect(() => Info[Index] && createMap(), [Info]);

	//re-render with Index
	useEffect(() => {
		if (!Info[Index]) return;
		mapFrame.current.innerHTML = '';
		createMap();
		setTraffic(false);
		setView(false);
		roadview();
	}, [Index]);

	//re-render with Traffic
	useEffect(() => {
		Traffic ? map.current?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : map.current?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout2 title={'Contact'}>
			<div className='controlBox'>
				<nav className='branch'>
					{Info.map((el, idx) =>
						//prettier-ignore
						<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>{el.title}</button>
					)}
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
		</Layout2>
	);
}
