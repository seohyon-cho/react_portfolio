import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';
function Btns() {
	//Swiper컴포넌트 안쪽에 있는 또다른 자식 컴포넌트 안쪽에서만 useSwiper hook사용가능
	//hook으로부터 생성된 객체(인스턴스)에는 다양한 prototype메서드와 property값 활용가능
	const swiper = useSwiper();
	useEffect(() => {
		swiper.init(0);
		swiper.slideNext(300);
	}, [swiper]);
	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiper.slideNext(300);
					swiper.autoplay.start();
				}}>
				start
			</button>
			<button onClick={() => swiper.autoplay.stop()}>stop</button>
		</nav>
	);
}
export default function Visual() {
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
					delay: 2000,
					disableOnInteraction: true
				}}
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
									<Link to={`/detail/${vid.id}`}>View Detail</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
				<Btns />
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

/*
	중요하게 숙지해야 할 내용

	1. swiper 컴포넌트의 기본 사용법
	2. useSwiper라는 전용 Hook을 이용해서 swiper 인스턴스를 생성하기 위해서는 swiper 안쪽에 또 다른 자식 컴포넌트를 호출 한 뒤 해당 컴포넌트에 인스턴스를 복사.
	3. 자식 컴포넌트에서 생성된 인스턴스 객체를 부모 컴포넌트에서 활용하기 위해서, 빈 참조객체를 만든 뒤, 자식 컴포넌트에 전달해서, 역으로 자식 컴포넌트로부터 인스턴스를 참조객체로 전달 받음. 
	4. swiper 컴포넌트 안쪽에 지저분한 props 들은 컴포넌트 외부에 객체로 만들어서 전개연산자{...}로 연결 가능.

	JSX를 커스텀해서 만드는 리액트 전용 메서드
	// React.createElement('태그명', {...props}, children요소)
	// React.createElement('p', {className: 'abc'}, 'text') --> <p className='abc'>text</p>
*/
