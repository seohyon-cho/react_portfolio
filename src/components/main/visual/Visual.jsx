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
		spaceBetween: 50,
		loop: true,
		slidesPerView: 3,
		centeredSlides: true,
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
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
