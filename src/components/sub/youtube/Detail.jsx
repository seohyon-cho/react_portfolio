import Layout2 from '../../common/layout2/Layout2';
import './Detail.scss';
import { useParams } from 'react-router-dom';
import { useYoutubeQueryById } from '../../../hooks/useYoutubeQuery';

export default function Detail() {
	const { id } = useParams();

	const { data: YoutubeData, isSuccess } = useYoutubeQueryById(id);

	return (
		<Layout2 title={'Detail'}>
			{isSuccess && YoutubeData && (
				<article>
					<h3>{YoutubeData.title}</h3>
					<div className='videoBox'>
						<iframe src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`} title={YoutubeData.title}></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout2>
	);
}
