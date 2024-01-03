import { useSelector } from 'react-redux';
import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export default function Visual() {
	const Vids = useSelector(store => store.youtube.data);
	const swiperOpt = useRef({
		modules: [Autoplay],
		autoplay: { delay: 4000, disableOnInteraction: true },
		spaceBetween: 0,
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		breakpoints: {
			1000: { slidesPerView: 3 },
			640: { slidesPerView: 2 }
		},
		onSwiper: swiper => {
			swiper.slideNext(300);
		}
	});
	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
				{Vids.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={data.id}>
							<div className='inner'>
								<div className='picBox'>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</div>
								<div className='txtBox'>
									<h2>{data.snippet.title}</h2>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

/*
	Swiper의 props를 통해서 UI 구조가 변경되면, 해당 내용은 스크립트를 통해서 동적제어 되고 있기 때문에,
	일반 css로 반응형 처리를 하는 것이 불가능함. 

	--> 따라서, breakpoints를 이용해서 브라우저 폭에 따라 swiper의 option 값을 변경함. 
	- 초기값으로 모바일 버전 옵션을 설정하고, breakpoints로 브라우저가 늘어나는 구간마다 옵션값 덮어쓰기 
*/
