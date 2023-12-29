import './Visual.scss';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Btns({ btnDetail }) {
	// Swiper 컴포넌트 안쪽에 있는 또 다른 자식 컴포넌트 안쪽에서만 useSwiper hook을 호출하고 사용할 수 있음.
	// hook으로부터 생성된 객체(인스턴스)에서는 다양한 prototype 메서드와 property 활용이 가능함.
	const swiper = useSwiper();
	useEffect(() => {
		swiper.init(0);
		btnDetail?.addEventListener('mouseenter', () => swiper.autoplay.stop());
		btnDetail?.addEventListener('mouseleave', () => swiper.autoplay.start());
		// swiper.slideNext(300);
		// swiper.autoplay.start();
		// swiper.slideTo(4);
	}, [swiper, btnDetail]);

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiper.autoplay.stop();
				}}>
				stop
			</button>
			<button
				onClick={() => {
					// 다시 롤링 시작 버튼 클릭 시, 딜레이 없이 바로 slide를 넘기기 위해서 일단은 버튼 클릭 직후에는 다음 슬라이드로 한 번 넘기고 동시에 롤링 재시작.
					swiper.slideNext(300);
					swiper.autoplay.start();
				}}>
				start
			</button>
		</nav>
	);
}

export default function Visual() {
	const btnDetail = useRef(null);

	const { youtube } = useSelector(store => store.youtubeReducer);
	const shortenText = useCustomText('short');

	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
				}}
				autoplay={{
					delay: 1000,
					disableOnInteraction: true
				}}
				speed={3000}
				loop={true}>
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
									<Link to={`/detail/${vid.id}`} ref={btnDetail}>
										View Detail
									</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
				<Btns btnDetail={btnDetail.current} />
			</Swiper>
		</figure>
	);
}

// npm install swiper@8 스와이퍼 설치 명령어

/*
	React 에서 Swiper의 코어 기능을 적용하기 위해서는 useSwiper라는 hook을 호출해야 함.

	Swiper 안 쪽에서 또 다른 컴포넌트를 연결해주고, 그 컴포넌트 안쪽에서 useSwiper로부터 객체 생성

	해당 자식 컴포넌트 안쪽에서 생성된 객체로부터 Swiper core에 등록되어 있는 모든 메서드와 property를 리액트에서도 사용가능하게 됨.
*/
