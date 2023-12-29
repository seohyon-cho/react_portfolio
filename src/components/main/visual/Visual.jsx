import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSelector } from 'react-redux';

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	return (
		<figure className='Visual'>
			<Swiper>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<h3>{vid.snippet.title}</h3>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

// npm install swiper@8 스와이퍼 설치 명령어
