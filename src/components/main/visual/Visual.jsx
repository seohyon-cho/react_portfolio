import './Visual.scss';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Visual() {
	const { isSuccess, data } = useYoutubeQuery();
	console.log(data);

	return (
		<figure className='Visual'>
			<Swiper>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= 5) return null;
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
		</figure>
	);
}
