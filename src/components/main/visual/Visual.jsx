import { useSelector } from 'react-redux';
import './Visual.scss';

export default function Visual() {
	const YoutubeData = useSelector(store => store.youtubeReducer.youtube);
	return (
		<figure className='Visual'>
			<div className='thumbnails'>
				{
					// YoutubeData의 유무로 에러 처리를 할 수 없는 이유
					// 설사 데이터 반환에 실패하더라도, YoutubeData에는 undefined라는 값이 들어가있기 때문에
					// 데이터 반환에 실패해서 분기처리 하기 위해서는, err객체에만 있는 message라는 property로 분기처리했음.
					// YoutubeData 뒤에 무조건 옵셔널 체이닝 처리를 하는 이유는,
					// 해당 리액트가 조건문을 읽을 때, YoutubeData 값이 초기 맨 처음에는 undefined이기 때문에, undefined의 message, map 프로퍼티 접근하려는 것 자체가 구문 오류이기 때문에, 초기의 이러한 구문 오류를 피하기 위함임.
					YoutubeData?.message ? (
						<h1>{YoutubeData?.message}</h1>
					) : (
						YoutubeData?.map((vid, idx) => {
							if (idx >= 4) return null;
							return (
								<article key={vid.id}>
									<div className='pic'>
										<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />
									</div>
								</article>
							);
						})
					)
				}
			</div>
		</figure>
	);
}
