import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';

//Visual parent component
export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	const shortenText = useCustomText('short');
	const swiperRef = useRef(null);

	const swiperOption = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true, renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>` },
		autoplay: { delay: 2000, disableOnInteraction: true },
		loop: true
	});

	return (
		<figure className='Visual'>
			<Swiper {...swiperOption.current}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;

					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<div className='picBox'>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
								</div>
								<div className='txtBox'>
									<h2>{shortenText(vid.snippet.title, 50)}</h2>

									<Link to={`/detail/${vid.id}`} onMouseEnter={swiperRef.current?.autoplay?.stop} onMouseLeave={swiperRef.current?.autoplay?.start}>
										<span></span>View Detail
									</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
				<Btns swiperRef={swiperRef} />
			</Swiper>
		</figure>
	);
}
//Swiper control child component
function Btns({ swiperRef }) {
	swiperRef.current = useSwiper();
	const [Rolling, setRolling] = useState(true);

	const startRolling = () => {
		swiperRef.current.slideNext(300);
		swiperRef.current.autoplay.start();
		setRolling(true);
	};
	const stopRolling = () => {
		swiperRef.current.autoplay.stop();
		setRolling(false);
	};

	// Btns 컴포넌트에서 인스턴스의 이벤트문을 활용하여
	useEffect(() => {
		// slide가 바뀔 때마다 현재 롤링 유무에 따라 Rolling state값 변경
		swiperRef.current.on('slideChange', () => {
			swiperRef.current.autoplay.running ? setRolling(true) : setRolling(false);
		});
	}, [swiperRef]);

	// Rolling state 값에 따라서 버튼 활성화 처리
	return (
		<nav className='swiperController'>{Rolling ? <button onClick={stopRolling}>stop</button> : <button onClick={startRolling}>start</button>}</nav>
	);
}
