import Layout2 from '../../common/layout2/Layout2';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const YoutubeData = useSelector(store => store.youtubeReducer.youtube);
	const customText = useCustomText('combined');
	const shortenText = useCustomText('short');

	return (
		<div className='Youtube'>
			<Layout2 title={'Youtube'}>
				{YoutubeData?.map((data, idx) => {
					const [date, time] = data.snippet.publishedAt.split('T');

					return (
						<article key={data.id}>
							<h2>{shortenText(data.snippet.title, 50)}</h2>

							<div className='txt'>
								<p>{shortenText(data.snippet.description, 250)}</p>
								<div className='infoBox'>
									<span>{customText(date, '.')}</span>
									<em>{time.split('Z')[0]}</em>
								</div>
							</div>

							<div className='pic'>
								<Link to={`/detail/${data.id}`}>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</Link>
							</div>
						</article>
					);
				})}
			</Layout2>
		</div>
	);
}

/*
	[ 해당 페이지 (Youtube.jsx) 에서의 개발 흐름 ]

	- Youtube API 를 활용하여 동적으로 Youtube 동영상 페이지 생성
	- 썸네일 클릭 시, params 값을 전달하여 상세페이지 (Detail.jsx) 로 유튜브 영상 출력 
	- useText 커스텀 훅을 사용하여, 미리보기 문자열 가공 처리 
			(*) (useText 커스텀 훅 관련 가이드 문서 - p.100) 식으로 참조 형태로만 곁들이기. (한 페이지안에 모든 걸 구구절절 X)


	[ 해당 페이지에서 발생한 이슈 사항 ]

	- 유튜브 목록을 미리보기 형식으로 가져올 때, 유튜브 영상 자체의 제목이 너무 길어서 전반적인 목록의 UI가 깨지는 현상이 발생했음. 
	- 유튜브 영상 자체의 시간 정보값도 가져와 출력했는데, 텍스트 형식이 가독성이 떨어지고 마음에 들지 않았음. (T, - 등 필요 없는 문자들이 섞여있음.)

	[ 해결 방안 ]
	- 문자열을 원하는 문자 갯수만큼 자르고, 전체 문자열에서 내가 원하는 옵션에 따라 범용적으로 가공할 수 있는, 재활용 가능한 커스텀 훅 추가 제작 
	(커스텀 훅 관련하여 설명 내용이 담긴 페이지를 별도의 참조 링크 형태로 함께 곁들일 것.)
*/
