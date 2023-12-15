import { useSelector } from 'react-redux';
import './Visual.scss';

export default function Visual() {
	const YoutubeData = useSelector(store => store.youtubeReducer.youtube);
	return (
		<figure className='Visual'>
			<div className='thumbnails'>
				{YoutubeData?.map((vid, idx) => {
					if (idx >= 4) return null;
					return (
						<article key={vid.id}>
							<div className='pic'>
								<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />
							</div>
						</article>
					);
				})}
			</div>
		</figure>
	);
}
