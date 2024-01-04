import './Visual.scss';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useRef, useState } from 'react';

export default function Visual() {
	const num = useRef(5);
	const swiperRef = useRef(null);
	const { isSuccess, data } = useYoutubeQuery();
	// loop 값이 true일 시 초기 Index값을 0, 1을 주면 안 됨.
	// onSwipe 이벤트 발생 시 자동적으로 realIndex값이 기존 Index값에 1을 뺀값으로 적용되므로
	// useEffect에 의해서 prevIndex값이 0혹은 마지막 순번으로 변경되므로 기존 realIndex값과 중첩되서 버그발생
	const [Index, setIndex] = useState(1);
	const [PrevIndex, setPrevIndex] = useState(2);
	const [NextIndex, setNextIndex] = useState(3);

	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		spaceBetween: 50,
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(swiper.realIndex + 1);
		},
		onSwiper: swiper => (swiperRef.current = swiper),
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		}
	});

	const trimTitle = title => {
		let resultTit = '';
		if (title.includes('(')) resultTit = title.split('(')[0];
		else if (title.includes('[')) resultTit = title.split('[')[0];
		else resultTit = title;
		return resultTit;
	};

	return (
		<figure className='Visual'>
			<div className='txtBox'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= 5) return null;

							return (
								<li key={el.id} className={idx === Index ? 'on' : ''}>
									<h3>{trimTitle(el.snippet.title)}</h3>
								</li>
							);
						})}
				</ul>
			</div>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
			<nav className='preview'>
				{isSuccess && (
					<>
						<p className='prevBox' onClick={() => swiperRef.current.slidePrev(400)}>
							<img src={data[PrevIndex].snippet.thumbnails.default.url} alt={data[PrevIndex].snippet.title} />
						</p>
						<p className='nextBox' onClick={() => swiperRef.current.slideNext(400)}>
							<img src={data[NextIndex].snippet.thumbnails.default.url} alt={data[NextIndex].snippet.title} />
						</p>
					</>
				)}
			</nav>
		</figure>
	);
}
