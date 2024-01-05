import './Visual.scss';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useRef, useState } from 'react';

export default function Visual() {
	const num = useRef(8);
	const swiperRef = useRef(null);
	const { isSuccess, data } = useYoutubeQuery();
	const [Index, setIndex] = useState(0);
	const [PrevIndex, setPrevIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);

	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		spaceBetween: 50,
		loopedSlides: num.current, //loop모드일때 실제동작될 슬라이드 갯수 지정하면 초기순번 어그러지는 무제 해결 가능
		onSwiper: swiper => {
			swiperRef.current = swiper;
		},
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(swiper.realIndex + 1);
		},
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
							if (idx >= num.current) return null;

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

			<ul className='pagination'>
				{Array(num.current)
					.fill()
					.map((_, idx) => {
						return <li key={idx} className={idx === Index ? 'on' : ''} onClick={() => swiperRef.current.slideToLoop(idx, 400)}></li>;
					})}
			</ul>

			<div className='barFrame'>
				<p className='bar' style={{ width: (100 / num.current) * (Index + 1) + '%' }}></p>
			</div>

			<div className='counter'>
				<strong>0{Index + 1}</strong>/<span>0{num.current}</span>
			</div>
		</figure>
	);
}
