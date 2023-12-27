import Layout2 from '../../common/layout2/Layout2';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('short');

	const { data: Vids, isSuccess } = useYoutubeQuery();

	return (
		<div className='Youtube'>
			<Layout2 title={'Youtube'}>
				{isSuccess &&
					Vids.map((data, idx) => {
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
