import './Visual.scss';
import { useSelector } from 'react-redux';

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	console.log(youtube);
	return (
		<figure className='Visual'>
			{youtube.map((vid, idx) => {
				if (idx >= 5) return null;
				return (
					<article key={vid.id}>
						<h3>{vid.snippet.title}</h3>
					</article>
				);
			})}
		</figure>
	);
}
